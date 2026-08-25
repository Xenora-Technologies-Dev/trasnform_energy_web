import { getCollection } from 'astro:content';

export async function getPublishedProjects() {
  try {
    return (await getCollection('projects')).filter((entry) => !entry.data.draft);
  } catch {
    return [];
  }
}

export { getPublishedInsights } from './insights';
