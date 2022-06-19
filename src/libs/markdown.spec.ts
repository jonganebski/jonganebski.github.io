import { describe, expect, it } from 'vitest';
import { getRoutePosts, getTechPosts } from './markdown';

describe('Markdown Pages', () => {
  it('should have correct format', () => {
    getRoutePosts()?.forEach(({ cover_image_url, countries, title, from, to, points }) => {
      expect(cover_image_url).toBeTruthy();
      expect(countries.length).gte(1);
      expect(new Date(from).getTime()).not.NaN;
      expect(new Date(to).getTime()).not.NaN;
      expect(points.length).equal(0);
      expect(title.en).toBeTruthy();
      expect(title.ko).toBeTruthy();
    });

    getTechPosts()?.forEach(({ cover_image_url, title, date }) => {
      expect(cover_image_url).toBeTruthy();
      expect(new Date(date).getTime()).not.NaN;
      expect(title.en).toBeTruthy();
      expect(title.ko).toBeTruthy();
    });
  });
});
