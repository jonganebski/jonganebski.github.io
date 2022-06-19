import { mount } from '@vue/test-utils';
import { beforeAll, describe, expect, it } from 'vitest';
import { getRoutePosts } from '~/libs/markdown';
import { i18n } from '~/plugins/i18n';
import { useCountryNames } from './useCountryNames';

describe('useCountryNames', () => {
  let countryName: { [key: string]: string };

  beforeAll(() => {
    countryName = mount(
      { setup: () => useCountryNames(), template: `<div></div>` },
      { global: { plugins: [i18n] } },
    ).vm.countryName;
  });

  it('should have country names from the route posts', async () => {
    getRoutePosts()?.forEach(({ countries }) => {
      countries.forEach((countryCode) => {
        expect(countryName[countryCode]).toBeTruthy();
      });
    });
  });
});
