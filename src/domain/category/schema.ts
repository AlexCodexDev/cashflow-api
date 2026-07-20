import z from "zod";

export const CategorySchema = z.object({
    name: z.string().max(100),
    color: z.string().max(10).optional(),
    logo: z.string().max(50).optional(),
    description: z.string().optional()
});