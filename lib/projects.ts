import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import { Project } from './types';

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

const projectsDirectory = path.join(process.cwd(), 'content/projects');

export async function getAllProjects(): Promise<Project[]> {
  const fileNames = await fs.readdir(projectsDirectory);
  const allProjectsData = await Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.md$/, '');
      return getProjectById(id);
    })
  );

  // Sort projects by date
  return allProjectsData
    .filter((project): project is Project => project !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const fullPath = path.join(projectsDirectory, `${id}.md`);
    const fileContents = await fs.readFile(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const { data, content } = matter(fileContents);

    // Convert markdown to HTML
    const contentHtml = md.render(content);

    return {
      id,
      title: data.title,
      description: data.description,
      date: data.date,
      category: data.category,
      image: data.image,
      featured: data.featured,
      content: contentHtml,
    };
  } catch (error) {
    return null;
  }
}