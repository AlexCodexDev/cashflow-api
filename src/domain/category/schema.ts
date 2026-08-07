import z from "zod";

export const CategorySchema = z.object({
    financeBookCode: z.string().trim().min(1, "Finance book is required."),
    name: z.string().trim().min(1, "Name is required.").max(100),
    color: z.string().trim().max(20).optional(),
    icon: z.string().trim().max(50).optional(),
    description: z.string().trim().optional()
});
export type CategoryBody = z.infer<typeof CategorySchema>;

export const CategoryFilterSchema = z.object({
    searchCode: z.string().trim().optional(),
    searchName: z.string().trim().optional()
});
export type CategoryFilters = z.infer<typeof CategoryFilterSchema>;