import z from "zod";

export const CategorySchema = z.object({
    name: z.string().min(1).max(100),
    color: z.string().max(10).optional(),
    icon: z.string().max(50).optional(),
    description: z.string().optional()
});

export const CategoryParamSchema = z.object({
    code: z.string().min(1)
})