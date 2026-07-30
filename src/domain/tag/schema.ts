import z from "zod";

export const TagSchema = z.object({
    name: z.string().trim().min(1, "Name is required.").max(100),
    description: z.string().trim().optional(),
    color: z.string().trim().optional()
});
export type TagBody = z.infer<typeof TagSchema>;

export const TagFilterSchema = z.object({
    searchCode: z.string().trim().optional(),
    searchName: z.string().trim().optional()
});
export type TagFilters = z.infer<typeof TagFilterSchema>;