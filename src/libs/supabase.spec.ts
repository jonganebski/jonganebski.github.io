import { describe, expect, it } from 'vitest';
import { supabase } from './supabase';

describe('Supabase Client', () => {
  it('should exist', () => {
    expect(supabase).toBeTruthy();
  });
});
