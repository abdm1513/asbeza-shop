import { z } from 'zod'

// Ethiopian phone number validation
const phoneRegex = /^(\+251|0)[0-9]{9}$/
// const cleanPhoneForEmail = (phone: string) => phone.replace(/\D/g, '')

export const loginSchema = z.object({
  phone: z.string()
    .min(10, 'ስልክ ቁጥር ቢያንስ 10 አሃዝ መሆን አለበት')
    .max(13, 'ስልክ ቁጥር ከ13 አሃዝ መብለጥ አይችልም')
    .regex(phoneRegex, 'እባክዎ ትክክለኛ የኢትዮጵያ ስልክ ቁጥር ያስገቡ (ለምሳሌ: +251912023119, 0912023119)'),
  password: z.string()
    .min(8, 'የይለፍ ቃል ቢያንስ 8 ቁምፊ መሆን አለበት'),
})

export const registerSchema = z.object({
  name: z.string()
    .min(2, 'ስም ቢያንስ 2 ቁምፊ መሆን አለበት')
    .max(50, 'ስም ከ50 ቁምፊ መብለጥ አይችልም'),
  phone: z.string()
    .min(10, 'ስልክ ቁጥር ቢያንስ 10 አሃዝ መሆን አለበት')
    .max(13, 'ስልክ ቁጥር ከ13 አሃዝ መብለጥ አይችልም')
    .regex(phoneRegex, 'እባክዎ ትክክለኛ የኢትዮጵያ ስልክ ቁጥር ያስገቡ (ለምሳሌ: +251912023119, 0912023119)'),
  password: z.string()
    .min(8, 'የይለፍ ቃል ቢያንስ 8 ቁምፊ መሆን አለበት')
    .regex(/[A-Z]/, 'የይለፍ ቃል ቢያንስ አንድ ካፒታል ፊደል መያዝ አለበት')
    .regex(/[a-z]/, 'የይለፍ ቃል ቢያንስ አንድ ስሞል ፊደል መያዝ አለበት')
    .regex(/[0-9]/, 'የይለፍ ቃል ቢያንስ አንድ ቁጥር መያዝ አለበት'),
  confirmPassword: z.string(),
  address: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "የይለፍ ቃሎች አይመሳሰሉም",
  path: ["confirmPassword"],
})

export const forgotPasswordSchema = z.object({
  phone: z.string()
    .min(10, 'ስልክ ቁጥር ቢያንስ 10 አሃዝ መሆን አለበት')
    .regex(phoneRegex, 'እባክዎ ትክክለኛ የኢትዮጵያ ስልክ ቁጥር ያስገቡ'),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>