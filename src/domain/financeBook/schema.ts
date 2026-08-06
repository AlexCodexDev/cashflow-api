import z from "zod";

const types = ["PERSONAL","BUSSINESS"] as const;

export const FinanceBookSchema = z.object({
    name: z.string().trim().min(1, "Name is required.").max(100),
    type: z.enum(types),
    logo: z.string().trim().optional(),
    description: z.string().trim().optional()
});
export type FinanceBookTypes = z.infer<typeof FinanceBookSchema>;

export const FinanceBookParamSchema = z.object({
    code: z.string().trim().min(1, "Code is required.").max(50)
});
export type FinanceBookParams = z.infer<typeof FinanceBookParamSchema>;

export const FinanceBookFilterSchema = z.object({
    searchName: z.string().trim().optional(),
    searchType: z.string().trim().optional()
});
export type FinanceBookFilter = z.infer<typeof FinanceBookFilterSchema>;