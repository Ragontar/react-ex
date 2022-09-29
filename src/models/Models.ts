export interface TelegramSession {
    phone: string
}

export interface TelegramConfirmationCode {
    phone_code?: string
    key: string
}