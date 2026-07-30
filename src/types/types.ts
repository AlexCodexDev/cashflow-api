import z from "zod";

export const CheckCodeSchema = z.object({
    code: z.string().trim().min(1, "Code is required.")
});
export type CheckCodeTypes = z.infer<typeof CheckCodeSchema>;