export interface TelegramSession {
  phone: string
}

export interface TelegramConfirmationData {
  phone_code?: string
  key: string
}