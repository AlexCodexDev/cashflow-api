import z from "zod";

export const PaymentSchema = z.object({
    name: z.string().trim().min(1, "Name is required.").max(100),
    icon: z.string().trim().optional(),
    color: z.string().trim().optional(),
    description: z.string().trim().optional()
});
export type PaymentBody = z.infer<typeof PaymentSchema>;

export const PaymentFilterSchema = z.object({
    searchCode: z.string().trim().optional(),
    searchName: z.string().trim().optional()
});
export type PaymentFilter = z.infer<typeof PaymentFilterSchema>;