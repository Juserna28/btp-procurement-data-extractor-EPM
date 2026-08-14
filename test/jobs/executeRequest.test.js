'use strict';

// Mock axios BEFORE importing Utils so the module picks up the mock
jest.mock('axios', () => ({
    default: { request: jest.fn() }
}));

const { executeRequest } = require('../../srv/utils/Utils');
const axiosMock = require('axios').default;

function make429(headers = {}) {
    return {
        response: {
            status: 429,
            headers: {
                'x-ratelimit-remaining-minute': '0',
                'x-ratelimit-remaining-hour': '0',
                'x-ratelimit-remaining-day': '0',
                ...headers
            }
        },
        message: 'Request failed with status code 429'
    };
}

beforeEach(() => {
    axiosMock.request.mockReset();
    jest.useFakeTimers();
});

afterEach(() => {
    jest.useRealTimers();
});

describe('executeRequest — axios wrapper with 429 retry logic', () => {
    it('resolves with the axios response on first-attempt success', async () => {
        const response = { data: { value: 'ok' }, status: 200 };
        axiosMock.request.mockResolvedValueOnce(response);

        await expect(executeRequest({}, 3)).resolves.toBe(response);
        expect(axiosMock.request).toHaveBeenCalledTimes(1);
    });

    it('rejects immediately on a non-429 HTTP error (e.g. 500)', async () => {
        const error = { response: { status: 500, data: { message: 'Server Error' } }, message: 'Request failed with status code 500' };
        axiosMock.request.mockRejectedValueOnce(error);

        await expect(executeRequest({}, 3)).rejects.toBe(error);
        expect(axiosMock.request).toHaveBeenCalledTimes(1);
    });

    it('rejects immediately on a network error with no response object', async () => {
        const error = new Error('Network Error');
        axiosMock.request.mockRejectedValueOnce(error);

        await expect(executeRequest({}, 3)).rejects.toBe(error);
        expect(axiosMock.request).toHaveBeenCalledTimes(1);
    });

    it('retries after 1000ms when x-ratelimit-remaining-minute is not 0', async () => {
        const error = make429({
            'x-ratelimit-remaining-minute': '5',
            'x-ratelimit-remaining-hour': '100',
            'x-ratelimit-remaining-day': '1000'
        });
        const success = { data: 'retried-ok', status: 200 };
        axiosMock.request
            .mockRejectedValueOnce(error)
            .mockResolvedValueOnce(success);

        const promise = executeRequest({}, 2);
        await jest.advanceTimersByTimeAsync(1000);
        const result = await promise;

        expect(result).toBe(success);
        expect(axiosMock.request).toHaveBeenCalledTimes(2);
    });

    it('retries after 60000ms when minute is exhausted but hour is not', async () => {
        const error = make429({
            'x-ratelimit-remaining-minute': '0',
            'x-ratelimit-remaining-hour': '50',
            'x-ratelimit-remaining-day': '500'
        });
        const success = { data: 'retried-ok' };
        axiosMock.request
            .mockRejectedValueOnce(error)
            .mockResolvedValueOnce(success);

        const promise = executeRequest({}, 2);
        await jest.advanceTimersByTimeAsync(60000);
        const result = await promise;

        expect(result).toBe(success);
        expect(axiosMock.request).toHaveBeenCalledTimes(2);
    });

    it('retries after 3600000ms when minute and hour are exhausted but day is not', async () => {
        const error = make429({
            'x-ratelimit-remaining-minute': '0',
            'x-ratelimit-remaining-hour': '0',
            'x-ratelimit-remaining-day': '10'
        });
        const success = { data: 'retried-ok' };
        axiosMock.request
            .mockRejectedValueOnce(error)
            .mockResolvedValueOnce(success);

        const promise = executeRequest({}, 2);
        await jest.advanceTimersByTimeAsync(3600000);
        const result = await promise;

        expect(result).toBe(success);
        expect(axiosMock.request).toHaveBeenCalledTimes(2);
    });

    it('rejects without retrying when all rate-limit headers are 0 (delay is undefined)', async () => {
        // All headers at '0' → delay remains undefined → condition `retries-1>0 && delay` fails
        const error = make429(); // all zeros by default
        axiosMock.request.mockRejectedValueOnce(error);

        await expect(executeRequest({}, 3)).rejects.toBe(error);
        // No retry should have occurred
        expect(axiosMock.request).toHaveBeenCalledTimes(1);
    });

    it('rejects when retries counter reaches 1 (no remaining retries)', async () => {
        const error = make429({
            'x-ratelimit-remaining-minute': '5',
            'x-ratelimit-remaining-hour': '100',
            'x-ratelimit-remaining-day': '1000'
        });
        // retries=1 → retries-1 = 0 → condition fails → reject
        axiosMock.request.mockRejectedValueOnce(error);

        await expect(executeRequest({}, 1)).rejects.toBe(error);
        expect(axiosMock.request).toHaveBeenCalledTimes(1);
    });
});
