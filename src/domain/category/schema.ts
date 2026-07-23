import z from "zod";

export const CategorySchema = z.object({
    name: z.string().min(1).max(100),
    color: z.string().max(20).optional(),
    icon: z.string().max(50).optional(),
    description: z.string().optional()
});
export type CategoryBody = z.infer<typeof CategorySchema>;

export const CategoryParamSchema = z.object({
    code: z.string().min(1)
});
export type CategoryParams = z.infer<typeof CategoryParamSchema>;