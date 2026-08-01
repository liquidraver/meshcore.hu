// Kis saját Docusaurus plugin: a blog/*.md hírek front matterjéből (title, description,
// slug) épít egy egyszerű, dátum szerint csökkenő listát, amit a főoldali Hírek doboz
// (src/pages/index.js) usePluginData('news-feed')-del olvas ki.
//
// Miért nem a beépített blog plugin globalData-ját használjuk? A @docusaurus/plugin-content-blog
// (3.10) nem hív setGlobalData-t, tehát a bejegyzések listája nem érhető el a React fákban a
// blog saját oldalain kívül — ezért kell ez a vékony kiegészítő plugin.

import fs from 'node:fs';
import path from 'node:path';
import {parseMarkdownFile, DEFAULT_PARSE_FRONT_MATTER} from '@docusaurus/utils';

export default function newsFeedPlugin(context, options) {
  const {routeBasePath, blogDir = 'blog'} = options;
  const blogDirPath = path.join(context.siteDir, blogDir);

  return {
    name: 'news-feed-plugin',

    getPathsToWatch() {
      return [path.join(blogDirPath, '*.md')];
    },

    async loadContent() {
      const fileNames = fs
        .readdirSync(blogDirPath)
        .filter((fileName) => fileName.endsWith('.md'));

      const items = await Promise.all(
        fileNames.map(async (fileName) => {
          const filePath = path.join(blogDirPath, fileName);
          const fileContent = fs.readFileSync(filePath, 'utf-8');
          const {frontMatter} = await parseMarkdownFile({
            filePath,
            fileContent,
            parseFrontMatter: DEFAULT_PARSE_FRONT_MATTER,
          });

          // A dátum a fájlnév YYYY-MM-DD előtagjából jön, ugyanúgy, ahogy a blog
          // plugin is a fájlnévből vezeti le a bejegyzés dátumát.
          const dateMatch = fileName.match(/^(\d{4}-\d{2}-\d{2})-/);
          const date = dateMatch ? dateMatch[1] : null;
          const slug = frontMatter.slug ?? fileName.replace(/\.md$/, '');

          return {
            title: frontMatter.title,
            description: frontMatter.description,
            date,
            formattedDate: date
              ? new Intl.DateTimeFormat('hu-HU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }).format(new Date(date))
              : null,
            permalink: `/${routeBasePath}/${slug}`,
          };
        }),
      );

      items.sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));
      return {items};
    },

    async contentLoaded({content, actions}) {
      actions.setGlobalData(content);
    },
  };
}
