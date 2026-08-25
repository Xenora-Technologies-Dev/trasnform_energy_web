import { getCollection } from 'astro:content';

export async function getPublishedInsights() {
  try {
    return (await getCollection('insights')).filter((entry) => !entry.data.draft);
  } catch {
    return [];
  }
}

export async function getPublishedProjects() {
  try {
    return (await getCollection('projects')).filter((entry) => !entry.data.draft);
  } catch {
    return [];
  }
}
