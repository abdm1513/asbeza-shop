export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }

  if (typeof error === 'string') {
    return error
  }

  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message)
  }

  return 'የሆነ ስህተት ተከስቷል። እባክዎ ቆይተው እንደገና ይሞክሩ'
}

export const errorMessages = {
  network: 'የኢንተርኔት ግንኙነትዎን ያረጋግጡ',
  unauthorized: 'እባክዎ መግቢያ ይሞሉ',
  forbidden: 'ይህን አሰራር ለማከናወን ፈቃድ የለዎትም',
  notFound: 'የሚፈልጉት ነገር አልተገኘም',
  serverError: 'የአገልጋይ ስህተት ተከስቷል። ቆይተው ይሞክሩ',
} as const