export interface ContactUsForm {
    name: string;
    phone?: string;
    email: string;
    message: string;
}

export interface SubscribeToNewsLetter {
    fullName: string;
    email: string;
    message: string;
}

export interface UnsubscribeToNewsLetter {
    email: string;
    message: string;
}