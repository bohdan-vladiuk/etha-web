export interface ContactUsForm {
    name: string;
    phone?: string;
    email: string;
    message: string;
}

export interface SubscribeToNewsLetter {
    name: string;
    email: string;
    message: string;
}

export interface UnsubscribeToNewsLetter {
    email: string;
    message: string;
}
