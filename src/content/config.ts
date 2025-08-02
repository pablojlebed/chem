// src/content/config.ts
import { defineCollection, z } from 'astro:content';

// Define a 'notes' collection schema
const notesCollection = defineCollection({
  type: 'content', // 'content' for Markdown/MDX, 'data' for JSON/YAML
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(), // Publication date
    updatedDate: z.date().optional(), // Optional update date
    tags: z.array(z.string()).default(['technical']), // Tags for filtering/categorization
    heroImage: z.string().optional(),
    author: z.string(), // Optional hero image for the note
  }),
});

// Export your collection(s) here
export const collections = {
  'notes': notesCollection,
};