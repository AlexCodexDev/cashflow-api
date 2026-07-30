import z from "zod";

export const WalletSchema = z.object({
    name: z.string().trim().min(1, "Name is required.").max(100),
    description: z.string().trim().optional(),
    paymentCode: z.string().trim().min(1, "Payment is required.")
});
export type WalletBody = z.infer<typeof WalletSchema>;

export const WalletFilterSchema = z.object({
    searchCode: z.string().trim().optional(),
    searchName: z.string().trim().optional()
});
export type WalletFilter = z.infer<typeof WalletFilterSchema>;