interface RouteFrontmatter {
  title: { ko: string; en: string };
  cover_image_url: string;
  countries: string[];
}

export function getRoutePosts() {
  try {
    const posts = Object.entries(
      import.meta.globEager('../pages/posts/routes/*.md') as Record<string, RouteFrontmatter>,
    ).map(([filePath, frontmatter]) => {
      const path = filePath.replace('../pages', '').replace('.md', '');
      const fileName = path.split('/').at(-1);
      if (!fileName) throw Error('File name is not detected');
      const [from, to] = fileName.split('T');
      return { fileName, path, from, to, ...frontmatter };
    });
    return posts;
  } catch (error) {
    console.error(error);
  }
}

interface TechFrontmatter {
  title: string;
  date: string;
  cover_image_url: string;
}

export function getTechPosts() {
  try {
    const posts = Object.entries(
      import.meta.globEager('../pages/posts/techs/*.md') as Record<string, TechFrontmatter>,
    ).map(([filePath, frontmatter]) => {
      const path = filePath.replace('../pages', '').replace('.md', '');
      const fileName = path.split('/').at(-1);
      if (!fileName) throw Error('File name is not detected');
      return { fileName, path, ...frontmatter };
    });
    return posts;
  } catch (error) {
    console.error(error);
  }
}
