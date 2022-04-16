import { mount } from '@vue/test-utils';
import { beforeAll, describe, expect, it } from 'vitest';
import { i18n } from '~/plugins/i18n';
import {
  ONE_DAY,
  ONE_HOUR,
  ONE_MINUTE,
  ONE_MONTH,
  ONE_SECOND,
  ONE_WEEK,
  ONE_YEAR,
  useTimeAgo,
} from './index';

describe('useTimeAgo', () => {
  let timeAgo: (dateStr: string) => string;

  beforeAll(() => {
    timeAgo = mount(
      { setup: () => useTimeAgo(), template: `<div></div>` },
      { global: { plugins: [i18n] } },
    ).vm.timeAgo;
  });

  it('should print years', () => {
    for (let m = 1; m <= 10; m++) {
      expect(timeAgo(new Date(Date.now() - m * ONE_YEAR).toISOString())).eq(`${m}년 전`);
    }
  });

  it('should print months', () => {
    for (let m = 1; m < 12; m++) {
      expect(timeAgo(new Date(Date.now() - m * ONE_MONTH).toISOString())).eq(`${m}달 전`);
    }
  });

  it('should print weeks', () => {
    for (let m = 1; m < 5; m++) {
      expect(timeAgo(new Date(Date.now() - m * ONE_WEEK).toISOString())).eq(`${m}주 전`);
    }
  });

  it('should print days', () => {
    for (let m = 1; m < 7; m++) {
      expect(timeAgo(new Date(Date.now() - m * ONE_DAY).toISOString())).eq(`${m}일 전`);
    }
  });

  it('should print hours', () => {
    for (let m = 1; m < 24; m++) {
      expect(timeAgo(new Date(Date.now() - m * ONE_HOUR).toISOString())).eq(`${m}시간 전`);
    }
  });

  it('should print minutes', () => {
    for (let m = 1; m < 60; m++) {
      expect(timeAgo(new Date(Date.now() - m * ONE_MINUTE).toISOString())).eq(`${m}분 전`);
    }
  });

  it('should print just now', () => {
    for (let m = 1; m < 60; m++) {
      expect(timeAgo(new Date(Date.now() - m * ONE_SECOND).toISOString())).eq(`방금 전`);
    }
  });
});
