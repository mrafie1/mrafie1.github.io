// Import the glob loader
import { glob } from "astro/loaders";
// Import utilities from `astro:content`
import { defineCollection } from "astro:content";
// Import Zod
import { z } from "astro/zod";
// Define a `loader` and `schema` for each collection
const blog = defineCollection({
    loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/blog" }),
    schema: z.object({
      title: z.string(),
      pubDate: z.date(),
      image: z.object({
        url: z.string(),
        alt: z.string()
      }).optional(),
      tags: z.array(z.string()).optional()
    })
});

const project = defineCollection({
  loader: glob({
    pattern: '**/index.md',
    base: './src/content/project'
  }),
schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      tech: z.array(z.string()),
      image: image().optional(),
      githublink: z.string().optional(),
      projectlink: z.string().optional(),
    }),
})

// Export a single `collections` object to register your collection(s)

export const collections = { blog, project };