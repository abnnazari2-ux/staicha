import { z } from "zod";

export const ServiceSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  short: z.string().min(1),
  long: z.string().min(1),
  forWhom: z.array(z.string().min(1)).min(1),
  process: z
    .array(z.object({ step: z.string().min(1), detail: z.string().min(1) }))
    .min(1),
});

export const TeamMemberSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  qualifications: z.string(),
  title: z.string().min(1),
  bio: z.string().min(1),
  email: z.string().email(),
  image: z.string().url().or(z.string().startsWith("/")),
});

export const TestimonialSchema = z.object({
  quote: z.string().min(1),
  name: z.string().min(1),
  title: z.string().min(1),
  company: z.string().min(1),
});

export const InsightSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  category: z.enum(["Audit", "Tax", "Advisory", "General"]),
  date: z.string(),
  author: z.string().min(1),
  excerpt: z.string().min(1),
  image: z.string().url().or(z.string().startsWith("/")),
  body: z
    .array(
      z.object({
        type: z.enum(["p", "h2", "quote"]),
        text: z.string().min(1),
      })
    )
    .min(1),
});

export const PositionSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  department: z.string().min(1),
  location: z.string().min(1),
  type: z.enum(["Full-time", "Part-time", "Contract"]),
  summary: z.string().min(1),
  responsibilities: z.array(z.string().min(1)).min(1),
  requirements: z.array(z.string().min(1)).min(1),
});

export const SCHEMAS = {
  services: z.array(ServiceSchema),
  team: z.array(TeamMemberSchema),
  testimonials: z.array(TestimonialSchema),
  insights: z.array(InsightSchema),
  careers: z.array(PositionSchema),
} as const;

export type Collection = keyof typeof SCHEMAS;
