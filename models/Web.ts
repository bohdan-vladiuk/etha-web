export const faqs: FaqDetails[] = [
    {
        question: 'What is Etha?',
        answer: 'Etha is an Interactive News Social Media Application that aims to inroduce more transparency into the political system by providing the general public with a way to hold politicians accountable. Our AI makes sure to provide credible and factual information and mitigate the spread of misinformation in order to promote intelligent political discourse.',
    },
    {
        question: 'Why is this app free?',
        answer: 'The app is free for the primary reason for information to be accesible to everyone. We aim to inform people better and in turn use the wisdom of the general public to show politicians what we actually care about.',
    },
    {
        question: 'How does Etha reduce biasedness?',
        answer: 'We have devloped AI solutions that help us collect data from more than 10,000 news media channels. It uses the previous known data, crowdsourcing (wisdom of the public) and the nrratives of the news articles to understand and mitigate the biasedness on the applicaiton.',
    },
    {
        question: 'LeaderQ Score, what does it mean?',
        answer: 'The LeaderQ score is the public approval rating of a certain politician. It varies depending on how people have been reacting to the statements made by the politician. This value changes based on the agrees, disagrees and the various constructive comments made by the users reagarding the political leader.',
    },
    {
        question: 'Why agree or disagree?',
        answer: 'Agree and Disagree breaks down the subjective narratives of various ideologies into an objective format. This helps us understand the perspectives and ideologies that are being promoted in the media right now and how it affects the people on the long run.',
    },
];

export const featurePoints: string[] = [
    'Stay up to date with what politicians are saying about current events.',
    'Access to LeaderQ scores for politicians, which is their public approval rating',
    'Verified, aggregated news from more than 10,000+ media channels',
    'Making sure you get less-biased content at all times.',
    "Users Interact with the statements to impact politician's LeaderQ score and hold them accountable.",
    "Real-time representation of news and people's opinions on politicians and specific subjects and policies.",
    "Conversations tie into the politician's LeaderQ score, making them more or less popular over time.",
    'We use our technology to limit the distribution and reach of harmful or misleading information',
];

export interface FaqDetails {
    question: string;
    answer: string;
}
