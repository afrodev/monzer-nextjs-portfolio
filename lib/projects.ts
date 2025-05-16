import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import { Project } from './types';

// Configure MarkdownIt with options to preserve spacing
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,  // Convert '\n' in paragraphs into <br>
});

// Add a custom rule to ensure proper paragraph spacing
md.renderer.rules.paragraph_open = () => '<p class="mb-6">';

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

    // Ensure proper paragraph breaks by adding extra newlines
    const enhancedContent = content
      // Replace single newlines with double newlines to ensure paragraph breaks
      .replace(/\n(?!\n)/g, '\n\n')
      // Clean up any excessive newlines (more than 2)
      .replace(/\n{3,}/g, '\n\n');

    // Convert markdown to HTML with enhanced spacing
    const contentHtml = md.render(enhancedContent);

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