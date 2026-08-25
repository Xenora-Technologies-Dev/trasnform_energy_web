import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { insightContentTypes, insightRegions, insightCategories } from './data/energy-news-config';

const categoryIds = insightCategories.map((category) => category.id) as [string, ...string[]];

const insights = defineCollection({
  loader: glob({ pattern: '*.{md,mdx}', base: './src/content/insights' }),
  schema: z.object({
    title: z.string(),
    description: z.string().min(80).max(180),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    sourceDate: z.coerce.date(),
    draft: z.boolean().default(false),
    indexable: z.boolean().default(true),
    featured: z.boolean().default(false),
    archived: z.boolean().default(false),
    contentType: z.enum(insightContentTypes),
    region: z.enum(insightRegions),
    categories: z.array(z.enum(categoryIds)).min(1),
    tags: z.array(z.string()).default([]),
    sourceId: z.string(),
    sourceName: z.string(),
    sourceUrl: z.string().url(),
    originalUrl: z.string().url(),
    summary: z.string().min(180),
    whyItMatters: z.string().min(120),
    perspective: z.string().optional(),
    relatedServiceSlugs: z.array(z.string()).optional(),
    heroImage: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    sector: z.string(),
    draft: z.boolean().default(false),
    location: z.string().optional(),
    year: z.string().optional(),
  }),
});

export const collections = { insights, projects };
