export interface IScreenState {
    isSignInModalShow?: boolean;
    isSignInWelcomeShow?: boolean;
    isSignUpWelcomeShow?: boolean;
    isContactForm?: boolean;
    isLoading?: boolean;
    isSharing?: boolean;
    sharePostId?: string;
}

export interface ScreenAction {
    type: string;
    isSignInModalShow?: boolean;
    isSignInWelcomeShow?: boolean;
    isSignUpWelcomeShow?: boolean;
    isContactForm?: boolean;
    isLoading?: boolean;
    isSharing?: boolean;
    sharePostId?: string;
}
