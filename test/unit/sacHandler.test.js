'use strict';

const { handleAfterRead } = require('../../srv/handlers/consumers/sacHandler');

const ELLIPSIS = '…';

function makeReq(elements) {
    return { target: { elements } };
}

describe('handleAfterRead', () => {
    it('does nothing when no @odata.MaxLength annotations exist', () => {
        const data = [{ Title: 'Short text' }];
        const req = makeReq({ Title: {} });
        handleAfterRead(data, req);
        expect(data[0].Title).toBe('Short text');
    });

    it('does nothing when aData is an empty array', () => {
        const req = makeReq({ Title: { '@odata.MaxLength': 5 } });
        expect(() => handleAfterRead([], req)).not.toThrow();
    });

    it('truncates a string field exceeding maxLength using substr(0, maxLength-3) + ellipsis', () => {
        // maxLength=8: substr(0, 5) + '…' = 'Hello' + '…'
        const data = [{ Title: 'Hello World' }];
        const req = makeReq({ Title: { '@odata.MaxLength': 8 } });
        handleAfterRead(data, req);
        expect(data[0].Title).toBe('Hello' + ELLIPSIS);
    });

    it('does not modify a string field within maxLength', () => {
        const data = [{ Title: 'Short' }];
        const req = makeReq({ Title: { '@odata.MaxLength': 10 } });
        handleAfterRead(data, req);
        expect(data[0].Title).toBe('Short');
    });

    it('does not modify a string field equal to maxLength', () => {
        const data = [{ Title: 'Exactly10!' }];
        const req = makeReq({ Title: { '@odata.MaxLength': 10 } });
        handleAfterRead(data, req);
        expect(data[0].Title).toBe('Exactly10!');
    });

    it('uses substr(0, maxLength) for @odata.Type Edm.DateTime with no ellipsis', () => {
        const data = [{ CreatedAt: '2024-01-15T10:00:00.000Z' }];
        const req = makeReq({
            CreatedAt: {
                '@odata.MaxLength': 10,
                '@odata.Type': 'Edm.DateTime'
            }
        });
        handleAfterRead(data, req);
        expect(data[0].CreatedAt).toBe('2024-01-15');
    });

    it('processes all records in the aData array', () => {
        // maxLength=8 → substr(0,5) + '…'
        const data = [
            { Title: 'Hello World' },      // 'Hello…'
            { Title: 'Another long value' } // 'Anoth…'
        ];
        const req = makeReq({ Title: { '@odata.MaxLength': 8 } });
        handleAfterRead(data, req);
        expect(data[0].Title).toBe('Hello' + ELLIPSIS);
        expect(data[1].Title).toBe('Anoth' + ELLIPSIS);
    });

    it('processes multiple annotated elements independently on the same record', () => {
        const data = [{ Title: 'Hello World', Code: 'ABCDEFGHIJ' }];
        const req = makeReq({
            Title: { '@odata.MaxLength': 8 },
            Code:  { '@odata.MaxLength': 6 }
        });
        handleAfterRead(data, req);
        // Title: substr(0,5)+'…' = 'Hello…'
        expect(data[0].Title).toBe('Hello' + ELLIPSIS);
        // Code: substr(0,3)+'…' = 'ABC…'
        expect(data[0].Code).toBe('ABC' + ELLIPSIS);
    });

    it('skips a record where the annotated field value is null', () => {
        const data = [{ Title: null }];
        const req = makeReq({ Title: { '@odata.MaxLength': 5 } });
        expect(() => handleAfterRead(data, req)).not.toThrow();
        expect(data[0].Title).toBeNull();
    });

    it('skips a record where the annotated field is absent', () => {
        const data = [{ OtherField: 'value' }];
        const req = makeReq({ Title: { '@odata.MaxLength': 5 } });
        expect(() => handleAfterRead(data, req)).not.toThrow();
    });
});
