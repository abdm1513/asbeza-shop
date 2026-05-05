// import { z } from 'zod'

// export const customerInfoSchema = z.object({
//   name: z.string().min(2, 'ስም ቢያንስ 2 ቁምፊ መሆን አለበት'),
//   phone: z.string().min(9, 'ስልክ ቁጥር ቢያንስ 9 አሃዝ መሆን አለበት'),
//   address: z.string().min(5, 'አድራሻ ቢያንስ 5 ቁምፊ መሆን አለበት'),
//   notes: z.string().optional(),
// })

// export const deliveryInfoSchema = z.object({
//   deliveryMethod: z.enum(['delivery', 'pickup']),
//   deliveryTime: z.enum(['asap', 'scheduled']),
//   scheduledDate: z.string().optional(),
//   scheduledTime: z.string().optional(),
// })

// export const checkoutSchema = z.object({
//   customer: customerInfoSchema,
//   delivery: deliveryInfoSchema,
// })

// export type CustomerInfoFormData = z.infer<typeof customerInfoSchema>
// export type DeliveryInfoFormData = z.infer<typeof deliveryInfoSchema>
// export type CheckoutFormData = z.infer<typeof checkoutSchema>

import { z } from 'zod'

export const customerInfoSchema = z.object({
  name: z.string().min(2, 'ስም ቢያንስ 2 ቁምፊ መሆን አለበት'),
  phone: z.string().min(9, 'ስልክ ቁጥር ቢያንስ 9 አሃዝ መሆን አለበት'),
  address: z.string().optional(),
  notes: z.string().optional(),
})

export const deliveryInfoSchema = z.object({
  deliveryMethod: z.enum(['delivery', 'pickup']),
  deliveryTime: z.enum(['asap', 'scheduled']),
  scheduledDate: z.string().optional(),
  scheduledTime: z.string().optional(),
})

export const checkoutSchema = z.object({
  customer: customerInfoSchema,
  delivery: deliveryInfoSchema,
})

export type CustomerInfoFormData = z.infer<typeof customerInfoSchema>
export type DeliveryInfoFormData = z.infer<typeof deliveryInfoSchema>
export type CheckoutFormData = z.infer<typeof checkoutSchema>