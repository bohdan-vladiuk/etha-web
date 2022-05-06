export const faqs: FaqDetails[] = [
    {
        question: 'What is Etha?',
        answer: 'Unlike other apps that will try to force an unnecessary subscription model, sell your data or bombard you with ads, Thrive opts for a more honest business model where you pay once and you get everything forever.',
    },
    {
        question: "Why isn't this app free?",
        answer: 'Unlike other apps that will try to force an unnecessary subscription model, sell your data or bombard you with ads, Thrive opts for a more honest business model where you pay once and you get everything forever.',
    },
    {
        question: 'How does Etha reduce biasedness?',
        answer: 'Unlike other apps that will try to force an unnecessary subscription model, sell your data or bombard you with ads, Thrive opts for a more honest business model where you pay once and you get everything forever.',
    },
    {
        question: 'LeaderQ Score, what does it mean?',
        answer: 'Unlike other apps that will try to force an unnecessary subscription model, sell your data or bombard you with ads, Thrive opts for a more honest business model where you pay once and you get everything forever.',
    },
    {
        question: 'Why agree or disagree?',
        answer: 'Unlike other apps that will try to force an unnecessary subscription model, sell your data or bombard you with ads, Thrive opts for a more honest business model where you pay once and you get everything forever.',
    },
];

export const featurePoints: string[] = [
    'Stay up to date with what politicians are saying about current events.',
    'Access to LeaderQ scores for politicians, which is their public approval rating',
    "Users Interact with the statements to impact politician's LeaderQ score and hold them accountable.",
    "Real-time representation of news and people's opinions on politicians and specific subjects and policies.",
    'Verified, aggregated news from more than 10,000+ media channels',
    "Conversations tie into the politician's LeaderQ score, making them more or less popular over time.",
    'We use our technology to limit the distribution and reach of harmful or misleading information',
    'Making sure you get less-biased content at all times.',
];

export interface FaqDetails {
    question: string;
    answer: string;
}
