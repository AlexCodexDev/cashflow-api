import z from "zod";

export const WalletSchema = z.object({
    name: z.string().trim().min(1, "Name is required.").max(100),
    financeBookCode: z.string().trim().min(1, "Finance book code is required."),
    openingBalance: z.number().min(0),
    currentBalance: z.number().min(0)
});
export type WalletBody = z.infer<typeof WalletSchema>;

export const WalletFilterSchema = z.object({
    searchCode: z.string().trim().optional(),
    searchName: z.string().trim().optional()
});
export type WalletFilter = z.infer<typeof WalletFilterSchema>;