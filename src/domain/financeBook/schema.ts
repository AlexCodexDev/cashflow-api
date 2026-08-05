import z from "zod";

export const FinanceBookSchema = z.object({
    name: z.string().trim().min(1, "Name is required.").max(100),
    logo: z.string().trim().optional(),
    description: z.string().trim().optional()
});
export type FinanceBookTypes = z.infer<typeof FinanceBookSchema>;