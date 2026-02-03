export interface SponsorData {
    name: string;
    image: string;
    category: string;
    contribution: string;
    details: string;
}

export const sponsors: SponsorData[] = [
    {
        name: "Nkosh",
        image: "/Nkosh.png",
        category: "Title Partner",
        contribution: "Core Infrastructure & Agricultural Tech Support",
        details: "Leading the way in agricultural innovation and technology integration for Robo Rumble 3.0."
    },
    {
        name: "RedBull",
        image: "/redbull2.png",
        category: "Energy Partner",
        contribution: "Athlete & Participant High-Performance Support",
        details: "Fueling the minds of 1000+ engineers throughout the high-intensity competition cycles."
    },
    {
        name: "Dominos",
        image: "/dominos.png",
        category: "Food Partner",
        contribution: "Logistical Sustenance Distribution",
        details: "Ensuring zero downtime for participants with strategic logistical support."
    },
    {
        name: "DailyWash",
        image: "/dailywash.jpg",
        category: "Service Partner",
        contribution: "Hygiene & Operational Maintenance",
        details: "Maintaining operational excellence and hygiene standards across the event campus."
    },
    {
        name: "CSJMIF",
        image: "/CSJMIF.jpg",
        category: "Incubation Partner",
        contribution: "Venture Capital & Startup Support",
        details: "Providing the next generation of robotics startups with the necessary runway to take off."
    },
    {
        name: "Sahara",
        image: "/sahara.jpg",
        category: "Media Partner",
        contribution: "Broadcast & Information Diffusion",
        details: "Broadcasting the spirit of innovation to a regional audience of millions."
    },
];
