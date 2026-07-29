import z from "zod";

export const TagSchema = z.object({
    name: z.string().trim().min(1, "Name is required.").max(100),
    description: z.string().trim().optional(),
    color: z.string().trim().optional()
});
export type TagBody = z.infer<typeof TagSchema>;

export const TagParamSchema = z.object({
    code: z.string().trim().min(1, "Code is required.")
});
export type TagParams = z.infer<typeof TagParamSchema>;

export const TagFilterSchema = z.object({
    searchCode: z.string().trim(),
    searchName: z.string().trim()
});
export type TagFilters = z.infer<typeof TagFilterSchema>;