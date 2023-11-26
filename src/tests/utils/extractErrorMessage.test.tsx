import { describe, expect, it } from 'vitest';
import { extractErrorMessage } from '../../utils/extractErrorMessage';

describe('Testing extractErrorMessage utility function', () => {
  // it('returns correct error message for route error response', () => {
  //   const error = {
  //     status: 404,
  //     statusText: 'Not Found',
  //     internal: true,
  //     data: 'Error: No route matches URL "/non-existent-url"',
  //     error: new Error('Error: No route matches URL "/non-existent-url"'),
  //   };
  //   const result = extractErrorMessage(error);
  //   expect(result).toBe('404 Not Found');
  // });
  it('returns correct error message for instance of Error', () => {
    const error = new Error('Test error');
    const result = extractErrorMessage(error);
    expect(result).toBe('Test error');
  });
  it('returns correct error message for string error', () => {
    const error = 'Test error';
    const result = extractErrorMessage(error);
    expect(result).toBe('Test error');
  });
  it('returns "Unknown error" for unknown error type', () => {
    const error = {};
    const result = extractErrorMessage(error);
    expect(result).toBe('Unknown error');
  });
});
