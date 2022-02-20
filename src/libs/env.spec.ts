import { describe, expect, it } from 'vitest';
import * as envVariables from './env';

describe('Environment Variables', () => {
  it('should have environment variables', () => {
    Object.values(envVariables).forEach((value) => {
      expect(value).toBeTruthy();
    });
  });
});
