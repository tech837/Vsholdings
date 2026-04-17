export type IconType = 'MapPin' | 'Waves' | 'Leaf' | 'Layout';

export interface ProjectFeature {
    icon: IconType;
    title: string;
    desc: string;
}

export interface ProjectGalleryItem {
    src: string;
    title: string;
}

export interface ProjectFloorPlan {
    src: string;
    label: string;
    buildArea: string;
    availability: string;
}

export interface ProjectFaq {
    question: string;
    answer: string;
}

export interface ProjectData {
    slug: string;
    projectName: string;
    locationLine1: string;
    locationLine2: string;
    status: string;
    configurations: string;
    heroImage: string;
    section2Image: string;
    carouselImages: string[];
    elevatedBgImage: string;
    featuresDescription: string;
    features: ProjectFeature[];
    locationDesc: string;
    mapIframeSrc: string;
    gallery: ProjectGalleryItem[];
    floorPlansText: string;
    floorPlans: ProjectFloorPlan[];
    brochureBg: string;
    faq: ProjectFaq[];
    overlayBgImage: string;
    address: string;
    mapLink: string;
}

export const projectsData: Record<string, ProjectData> = {
    "sendhur": {
        slug: "sendhur",
        projectName: "Sendhur Villa",
        locationLine1: "Namakkal",
        locationLine2: "Namakkal, Tamil Nadu",
        status: "Available",
        configurations: "2BHK | 3BHK",
        heroImage: "/images/Home_Page/sendhur page.jpg",
        section2Image: "/images/Home_Page/sendhur page.jpg",
        carouselImages: [
            "/images/Home_Page/Elevation front 2.png",
            "/images/Home_Page/sendoor 2.jpg",
            "/images/Home_Page/sendoor3.jpg",
        ],
        elevatedBgImage: "/images/Home_Page/bgimg.png",
        featuresDescription: "Strategically located in Namakkal with seamless access to key destinations.",
        features: [
            { icon: 'MapPin', title: 'Prime Location', desc: "Strategically located in Namakkal with seamless access to key destinations." },
            { icon: 'Waves', title: 'Premium Amenities', desc: "Enjoy 15+ curated amenities with private pools and resort-style living." },
            { icon: 'Leaf', title: 'Peaceful Living', desc: "A calm, green environment designed for comfort and relaxation." },
            { icon: 'Layout', title: 'Modern Design', desc: "Thoughtfully crafted architecture with refined, contemporary aesthetics." }
        ],
        locationDesc: "Located in the heart of Namakkal, offering quick access to major roads, business hubs, schools, and everyday essentials.",
        mapIframeSrc: "https://maps.google.com/maps?q=11.2274,78.1673&t=&z=16&ie=UTF8&iwloc=&output=embed",
        address: "Sendhur Villa, Namakkal, Tamil Nadu",
        mapLink: "https://maps.app.goo.gl/NGZpRKeewfEMu7RB7",
        gallery: [
            { src: "/images/Home_Page/GYM.jpg", title: "GYMNASIUM" },
            { src: "/images/Home_Page/swimming pool.avif", title: "SWIMMING POOL" },
            { src: "/images/Home_Page/living room.jpg", title: "LIVING ROOM" },
            { src: "/images/Home_Page/bedroom.jpeg", title: "BEDROOM" },
            { src: "/images/Home_Page/bathroom.jpeg", title: "BATHROOM" },
        ],
        floorPlansText: "Choose from well-designed 2BHK and 3BHK  homes tailored for modern living.",
        floorPlans: [
            { src: "/images/Home_Page/sendhur 2 BHK Type 1.jpg", label: "2 BHK TYPE 1", buildArea: "1146 sq.ft", availability: "12 Units Available" },
            { src: "/images/Home_Page/sendhur 2 BHK Type 2.jpg", label: "2 BHK TYPE 2", buildArea: "1250 sq.ft", availability: "8 Units Available" },
            { src: "/images/Home_Page/sendhur 3 BHK Type 1.jpg", label: "3 BHK TYPE 1", buildArea: "1520 sq.ft", availability: "3 Units Available" },
            { src: "/images/Home_Page/sendhur 3 BHK Type 2.jpg", label: "3 BHK TYPE 2", buildArea: "1680 sq.ft", availability: "Sold Out" },
        ],
        brochureBg: "/images/Home_Page/sendoor3.jpg",
        overlayBgImage: "/images/Home_Page/sendoor3.jpg",
        faq: [
            {
                question: "What is the exact location of Sendhur Villa?",
                answer: "Sendhur Villa is located in Namakkal, Tamil Nadu, offering excellent connectivity to key roads, business hubs, schools, and essential services."
            },
            {
                question: "What unit configurations are available?",
                answer: "Sendhur Villa offers a range of configurations including Studio, 1 BHK, and 2 BHK units, specifically designed to maximize space and natural light."
            },
            {
                question: "What amenities are included?",
                answer: "Residents enjoy premium amenities such as 24/7 security, landscaped gardens, modern fitness facilities, and dedicated parking spaces."
            },
            {
                question: "When is the expected handover?",
                answer: "The project is currently in an advanced stage of development. Please contact our sales team for the most accurate and up-to-date handover schedule."
            }
        ]
    },
    "meira": {
        slug: "meira",
        projectName: "Meira Bloom",
        locationLine1: "Namakkal",
        locationLine2: "Namakkal, Tamil Nadu",
        status: "Available",
        configurations: "2BHK | 3BHK",
        heroImage: "/images/Home_Page/myraa2.jpg",
        section2Image: "/images/Home_Page/meira page.png",
        carouselImages: [
            "/images/Home_Page/myraa 3.jpg",
            "/images/Home_Page/myraa2.jpg",
            "/images/Home_Page/myraa4.jpg",
        ],
        elevatedBgImage: "/images/Home_Page/bgimg.png",
        featuresDescription: "Strategically located in Namakkal with seamless access to key destinations.",
        features: [
            { icon: 'MapPin', title: 'Prime Location', desc: "Strategically located in Namakkal with seamless access to key destinations." },
            { icon: 'Waves', title: 'Premium Amenities', desc: "Enjoy 15+ curated amenities with private pools and resort-style living." },
            { icon: 'Leaf', title: 'Peaceful Living', desc: "A calm, green environment designed for comfort and relaxation." },
            { icon: 'Layout', title: 'Modern Design', desc: "Thoughtfully crafted architecture with refined, contemporary aesthetics." }
        ],
        locationDesc: "Located in the growing hub of Namakkal, Meira Bloom offers unparalleled access to schools, hospitals, and major transit points.",
        mapIframeSrc: "https://maps.google.com/maps?q=11.2114415,78.1680249&t=&z=17&ie=UTF8&iwloc=&output=embed",
        address: "6569+H6C, Meira Blooms, K K Nagar, Namakkal, Tamil Nadu 637001",
        mapLink: "https://www.google.com/maps/place/Meira+Blooms/@11.2114468,78.16545,17z/data=!3m1!4b1!4m6!3m5!1s0x3babcf0079fc8161:0x8376d5d51f209ed8!8m2!3d11.2114415!4d78.1680249!16s%2Fg%2F11z17tj44x",
        gallery: [
            { src: "/images/Home_Page/GYM.jpg", title: "GYMNASIUM" },
            { src: "/images/Home_Page/swimming pool.avif", title: "SWIMMING POOL" },
            { src: "/images/Home_Page/living room.jpg", title: "LIVING ROOM" },
            { src: "/images/Home_Page/bedroom.jpeg", title: "BEDROOM" },
            { src: "/images/Home_Page/bathroom.jpeg", title: "BATHROOM" },
        ],
        floorPlansText: "Choose from well-designed 1 BHK and 2 BHK <br className=\"hidden md:block\" /> homes tailored for modern living.",
        floorPlans: [
            { src: "/images/Home_Page/sendhur 2 BHK Type 1.jpg", label: "1 BHK TYPE 1", buildArea: "680 sq.ft", availability: "12 Units Available" },
            { src: "/images/Home_Page/sendhur 2 BHK Type 2.jpg", label: "1 BHK TYPE 2", buildArea: "750 sq.ft", availability: "Sold Out" },
            { src: "/images/Home_Page/sendhur 3 BHK Type 1.jpg", label: "2 BHK TYPE 1", buildArea: "1100 sq.ft", availability: "6 Units Available" },
            { src: "/images/Home_Page/sendhur 3 BHK Type 2.jpg", label: "2 BHK TYPE 2", buildArea: "1220 sq.ft", availability: "2 Units Available" },
        ],
        brochureBg: "/images/Home_Page/myraa4.jpg",
        overlayBgImage: "/images/Home_Page/meira page.png",
        faq: [
            {
                question: "What is the exact location of Meira Bloom?",
                answer: "Meira Bloom is perfectly situated in Namakkal, Tamil Nadu, offering easy accessibility to major transportation routes, educational institutions, and commercial centers."
            },
            {
                question: "What unit configurations are available?",
                answer: "Meira Bloom offers premium living spaces including 1 BHK and 2 BHK configurations, designed with a focus on ventilation and modern aesthetics."
            },
            {
                question: "What amenities are included?",
                answer: "Amenities at Meira Bloom include round-the-clock security, beautifully landscaped common areas, water treatment systems, and ample parking."
            },
            {
                question: "When is the expected handover?",
                answer: "Construction is progressing rapidly. For the latest updates on completion dates and site visits, please get in touch with our dedicated sales advisors."
            }
        ]
    }
};
