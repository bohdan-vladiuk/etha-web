export const teamCardLarge: LargeCardDetails[] = [
    {
        name: 'Nicole Ogloza',
        shortInfo:
            'Nicole is the founder of Etha with years of experience in Fortune 5 companies such as Workday and Warner Bros.',
        image: 'https://resources.etha.one/team-images/nicole.png',
        title: 'Founder and Project Manager',
        funfact: 'Favourite Sport: Roller Skating',
    },
    {
        name: 'Aastik Saini',
        shortInfo: 'Aastik is the Technical Co-Founder for Etha, and has experience in four high growth startups.',
        image: 'https://resources.etha.one/team-images/aastik.png',
        title: 'Technical Co-Founder',
        funfact: 'Spirit Pokemon: Snorlax',
    },
    {
        name: 'Ambraish Gupta',
        shortInfo:
            "Ambarish has founded a very successful startup, Knowlarity. He is a graduate from IIT in india, and holds a Carnige Mellon MBA. He acts as Etha's primary advisor and strategist.",
        image: 'https://resources.etha.one/team-images/ambraish.png',
        title: 'Primary Advisor and Strategist',
        funfact: 'Left Knowlarity two years ago to found his private equity firm, Basis Vectors',
    },
    {
        name: 'Ajay Shrivastava',
        shortInfo:
            "Ajay has served as the COO for Knowlarity with Ambarish in the past, and is a highly acclaimed technologist. He will act as Etha's advisor in product technology and strategy",
        image: 'https://resources.etha.one/team-images/ajay.png',
        title: 'Product Technology Advisor',
        funfact: 'Chief Product Technology Officer at a leading Media firm in India, HT Media.',
    },
    {
        name: 'Rajnish Prasad',
        shortInfo:
            "Rajnish is a long-time, principal software architect at Netflix for the past 7 years. He will act as Etha's software architecture and scalability advisor",
        image: 'https://resources.etha.one/team-images/Rajnish.png',
        title: 'Software Architect and Scalability Advisor',
        funfact: 'Favourite Sport: Roller Skating',
    },
    {
        name: 'Mary Mac',
        shortInfo:
            'Mary has completed her Masters at Stanford Universty and an undergrad from UCLA in English and professional writing.',
        image: 'https://resources.etha.one/team-images/mary.png',
        title: 'Marketing and Content Strategist',
        funfact: 'Favourite Sport: Roller Skating',
    },
    {
        name: 'Daniel Viol',
        shortInfo:
            'Daniel is a lead in User Interface Design at Etha and enjoys his job in the field of User Design for year to come.',
        image: 'https://resources.etha.one/team-images/daniel.png',
        title: 'Lead UI Designer',
        funfact: 'Favourite Sport: Roller Skating',
    },
    {
        name: 'Igor Magalhaes',
        shortInfo:
            'Igor is our lead technical marketer at Etha. He studied civil engineering, only to leave and pursue his passion in marketing, founding his own company.',
        image: 'https://resources.etha.one/team-images/igor.png',
        title: 'Founder and Project Manager',
        funfact: 'Favourite Holiday: Carnival in Brazil',
    },
    {
        name: 'Justin Knuth',
        shortInfo: "Justin is Etha's Front-End React Developer. He is currently a freelancer in website development.",
        image: 'https://resources.etha.one/team-images/justin.png',
        title: 'Front-End Developer',
        funfact: 'Favorite Band: Interpol',
    },
    {
        name: 'Manik Chandra Paul',
        image: 'https://resources.etha.one/team-images/manik.png',
        title: 'Lead Graphics Designer',
        shortInfo:
            'Manik has 7 years of expeirence in graphic design for Branding, Logo, Ui Designs and all types of print media. He used to be an independent freelancer.',
        funfact: 'Loves to Travel',
    },
    {
        name: 'Sumit Mandal',
        shortInfo:
            'Sumit is a user experience designer and an engineer with a bachelors degree in computers. He is also an XR developer.',
        image: 'https://resources.etha.one/team-images/sumit.png',
        title: 'UX Design Lead',
        funfact: 'Favourite Anime: Detective Conan',
    },
    {
        name: 'Prem Ranjan',
        shortInfo: 'Prem is a full-stack developer with experience of Java, Kotlin, React, AWS.',
        image: 'https://resources.etha.one/team-images/prem.png',
        title: 'Senior Full-Stack Dev',
        funfact: '',
    },
];
export const teamCardSmall: SmallCardDetails[] = [
    {
        name: 'Pradeep Giri',
        image: 'https://resources.etha.one/team-images/pradeep.png',
        title: 'Dev Ops Engineer',
    },
    {
        name: 'Max Androit',
        image: 'https://resources.etha.one/team-images/max.png',
        title: 'Max Andriot',
    },

    {
        name: 'Eduard Tora',
        image: 'https://resources.etha.one/team-images/eduard.png',
        title: 'Lead Project Manager',
    },
    {
        name: 'Jonathan Arabov',
        image: 'https://resources.etha.one/team-images/jonathan.png',
        title: 'Public Relations Specialist',
    },
    {
        name: 'Shrey Gupta',
        image: 'https://resources.etha.one/team-images/shrey.png',
        title: 'Investment Lead',
    },
    {
        name: 'Udayan Bhakar',
        image: 'https://resources.etha.one/team-images/udayan.png',
        title: 'Junior Front-End Dev',
    },
    {
        name: 'Ayan Tripuraneni',
        image: 'https://resources.etha.one/team-images/ayan.png',
        title: 'HR',
    },
    {
        name: 'Advaita Saravanan',
        image: 'https://resources.etha.one/team-images/addie.png',
        title: 'Data Analyst',
    },
];

export interface LargeCardDetails {
    name: string;
    shortInfo: string;
    image: string;
    title: string;
    funfact: string;
}

export interface SmallCardDetails {
    name: string;
    image: string;
    title: string;
}
