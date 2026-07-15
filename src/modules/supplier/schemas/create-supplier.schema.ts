import { z } from "zod";
import { parsePhoneNumber } from "../../../utils/phone.helper";

export const createSupplierSchema = z.object({
  name: z.string().trim().min(1, "Supplier name is required."),
  contactName: z.string().trim().min(1, "Contact name is required."),
  address: z.string().trim().min(1, "Address is required."),
  email: z.union([z.literal(""), z.email("Invalid email address.").optional()]),
  phone: z
    .string()
    .trim()
    .refine(
      (phone) => {
        const { localNumber } = parsePhoneNumber(phone);

        return localNumber.length > 0;
      },
      { message: "Invalid phone number." },
    ),
});

export type CreateSupplierBody = z.infer<typeof createSupplierSchema>;
