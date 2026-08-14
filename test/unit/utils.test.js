'use strict';

const {
    cleanData,
    processCustomFields,
    flattenTypes,
    removeNullValues,
    truncateData,
    deduplicateKeys,
    normalizeToArray,
    deleteCustomFields
} = require('../../srv/utils/Utils');

const ELLIPSIS = '…';

// ─── cleanData ───────────────────────────────────────────────────────────────

describe('cleanData', () => {
    it('rounds a numeric field to 3 decimal places', () => {
        const data = { Amount: '1.2345' };
        const result = cleanData(['Amount'], data, 'TestRealm');
        expect(result.Amount).toBe(1.235);
    });

    it('clamps a value above 999999999999999 to the sentinel maximum', () => {
        const data = { Amount: '9999999999999999' };
        const result = cleanData(['Amount'], data, 'TestRealm');
        expect(result.Amount).toBe(999999999999999);
    });

    it('injects Realm into the data object', () => {
        const data = {};
        const result = cleanData([], data, 'MyRealm');
        expect(result.Realm).toBe('MyRealm');
    });

    it('preserves null for a null cleaning property value', () => {
        const data = { Amount: null };
        const result = cleanData(['Amount'], data, 'TestRealm');
        // null is falsy: null && Math.round(...) short-circuits to null
        expect(result.Amount).toBeNull();
    });

    it('does not modify fields not listed in cleaning properties', () => {
        const data = { Amount: '5.5', Name: 'keep-me' };
        cleanData(['Amount'], data, 'TestRealm');
        expect(data.Name).toBe('keep-me');
    });

    it('does nothing to amount fields when cleaning array is empty', () => {
        const data = { Amount: '5.5' };
        const result = cleanData([], data, 'TestRealm');
        expect(result.Amount).toBe('5.5');
    });
});

// ─── processCustomFields ─────────────────────────────────────────────────────

describe('processCustomFields', () => {
    it('maps a cus_ string field to CusField1 with value and name', () => {
        const data = { cus_color: 'red' };
        const result = processCustomFields(data);
        expect(result.CusField1).toEqual({ value: 'red', name: 'cus_color' });
    });

    it('deletes the original cus_ key after mapping', () => {
        const data = { cus_color: 'red' };
        const result = processCustomFields(data);
        expect(result.cus_color).toBeUndefined();
    });

    it('maps an arb_ string field to the first CusField slot', () => {
        const data = { arb_priority: 'high' };
        const result = processCustomFields(data);
        expect(result.CusField1).toEqual({ value: 'high', name: 'arb_priority' });
        expect(result.arb_priority).toBeUndefined();
    });

    it('increments the string counter across multiple cus_ fields', () => {
        const data = { cus_a: 'val1', cus_b: 'val2' };
        const result = processCustomFields(data);
        expect(result.CusField1).toBeDefined();
        expect(result.CusField2).toBeDefined();
    });

    it('extracts the .Day property from a Day-type value object', () => {
        const data = { cus_startDate: { Day: '2024-01-15' } };
        const result = processCustomFields(data);
        expect(result.CusField1.value).toBe('2024-01-15');
    });

    it('stores null as value when the custom field is null', () => {
        const data = { cus_field: null };
        const result = processCustomFields(data);
        expect(result.CusField1.value).toBeNull();
    });

    it('maps a cus_ array field to CusFieldVector slots', () => {
        const data = { cus_tags: [{ label: 'tag1' }] };
        const result = processCustomFields(data);
        expect(result.CusFieldVector1_1).toEqual({ value: 'tag1', name: 'cus_tags_label' });
        expect(result.cus_tags).toBeUndefined();
    });

    it('drops array field entries at or beyond position 5 (max 4 stored per vector)', () => {
        // 5 fields in one entry – the 5th triggers the break after post-increment reaches 5
        const data = {
            cus_items: [{ f1: 'a', f2: 'b', f3: 'c', f4: 'd', f5: 'dropped' }]
        };
        const result = processCustomFields(data);
        expect(result.CusFieldVector1_1).toBeDefined();
        expect(result.CusFieldVector1_2).toBeDefined();
        expect(result.CusFieldVector1_3).toBeDefined();
        expect(result.CusFieldVector1_4).toBeDefined();
        expect(result.CusFieldVector1_5).toBeUndefined(); // dropped at break
    });
});

// ─── flattenTypes ─────────────────────────────────────────────────────────────

describe('flattenTypes', () => {
    it('returns primitive scalar properties unchanged', () => {
        const data = { name: 'test', count: 5 };
        const result = flattenTypes(data);
        expect(result.name).toBe('test');
        expect(result.count).toBe(5);
    });

    it('flattens a nested object using underscore separator', () => {
        const data = { address: { city: 'Berlin', country: 'DE' } };
        const result = flattenTypes(data);
        expect(result.address_city).toBe('Berlin');
        expect(result.address_country).toBe('DE');
        expect(result.address).toBeUndefined();
    });

    it('treats null nested objects as null (not recursed)', () => {
        const data = { address: null, name: 'test' };
        const result = flattenTypes(data);
        expect(result.address).toBeNull();
        expect(result.name).toBe('test');
    });
});

// ─── removeNullValues ─────────────────────────────────────────────────────────

describe('removeNullValues', () => {
    it('removes a top-level null property', () => {
        const data = { name: 'test', code: null };
        const result = removeNullValues(data);
        expect(result.code).toBeUndefined();
        expect(result.name).toBe('test');
    });

    it('removes a nested null property', () => {
        const data = { address: { city: 'Berlin', zip: null } };
        const result = removeNullValues(data);
        expect(result.address.zip).toBeUndefined();
        expect(result.address.city).toBe('Berlin');
    });

    it('preserves numeric 0', () => {
        const data = { count: 0 };
        const result = removeNullValues(data);
        expect(result.count).toBe(0);
    });

    it('preserves boolean false', () => {
        const data = { active: false };
        const result = removeNullValues(data);
        expect(result.active).toBe(false);
    });

    it('preserves empty string', () => {
        const data = { name: '' };
        const result = removeNullValues(data);
        expect(result.name).toBe('');
    });
});

// ─── truncateData ─────────────────────────────────────────────────────────────

describe('truncateData', () => {
    it('truncates a string longer than n to slice(0, n-1) + ellipsis (total n chars)', () => {
        const data = { title: 'Hello World!' };
        const result = truncateData(['title'], data, 5);
        // slice(0, 5 - 1) + '…' = 'Hell' + '…' = 'Hell…'
        expect(result.title).toBe('Hell' + ELLIPSIS);
        expect(result.title.length).toBe(5);
    });

    it('leaves a string at exactly n characters unchanged', () => {
        const data = { title: 'Hello' };
        const result = truncateData(['title'], data, 5);
        expect(result.title).toBe('Hello');
    });

    it('leaves a string shorter than n unchanged', () => {
        const data = { title: 'Hi' };
        const result = truncateData(['title'], data, 10);
        expect(result.title).toBe('Hi');
    });

    it('only modifies the specified properties, ignores the rest', () => {
        const data = { title: 'Hello World!', description: 'A very long description too' };
        truncateData(['title'], data, 5);
        expect(data.description).toBe('A very long description too');
    });
});

// ─── deduplicateKeys ──────────────────────────────────────────────────────────

describe('deduplicateKeys', () => {
    it('returns the object unchanged when all keys are unique', () => {
        const data = { a: 1, b: 2 };
        const result = deduplicateKeys(data);
        expect(result).toEqual({ a: 1, b: 2 });
    });

    it('renames the second occurrence of a case-insensitive duplicate to key_2', () => {
        const data = { ID: 'first', id: 'second' };
        const result = deduplicateKeys(data);
        expect(result.ID).toBe('first');
        expect(result.id_2).toBe('second');
    });

    it('compares keys case-insensitively', () => {
        const data = { Name: 'Alice', name: 'Bob' };
        const result = deduplicateKeys(data);
        expect(result.Name).toBe('Alice');
        expect(result.name_2).toBe('Bob');
    });
});

// ─── normalizeToArray ─────────────────────────────────────────────────────────

describe('normalizeToArray', () => {
    it('wraps a non-array value in a one-element array', () => {
        expect(normalizeToArray('hello')).toEqual(['hello']);
    });

    it('returns an existing array unchanged (same reference)', () => {
        const arr = [1, 2, 3];
        expect(normalizeToArray(arr)).toBe(arr);
    });

    it('returns an empty array for null', () => {
        expect(normalizeToArray(null)).toEqual([]);
    });

    it('returns an empty array for undefined', () => {
        expect(normalizeToArray(undefined)).toEqual([]);
    });
});

// ─── deleteCustomFields ───────────────────────────────────────────────────────

describe('deleteCustomFields', () => {
    it('removes all cus_ prefixed keys from a flat object', () => {
        const data = { name: 'test', cus_color: 'red', cus_size: 'large' };
        const result = deleteCustomFields(data);
        expect(result.cus_color).toBeUndefined();
        expect(result.cus_size).toBeUndefined();
    });

    it('preserves all non-cus_ keys', () => {
        const data = { name: 'test', id: '123', cus_color: 'red' };
        const result = deleteCustomFields(data);
        expect(result.name).toBe('test');
        expect(result.id).toBe('123');
    });
});
