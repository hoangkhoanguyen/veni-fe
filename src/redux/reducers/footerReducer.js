// Use Redux
const initialState = {
    SignInFooter: {
        description: 'See personalized recommendations',
        buttonName: 'Sign in',
        newCustomer: 'New customer?',
        signUpBtn: 'Start here.'
    },
    BackToTop: {
        content: 'Back to top'
    },
    Accessibility: [
        {
            id: 1,
            title: 'Get to Know Us',
            list: [
                {
                    id: 1,
                    item: 'Careers',
                },
                {
                    id: 2,
                    item: 'Blog',
                },
                {
                    id: 3,
                    item: 'About Amazon',
                },
                {
                    id: 4,
                    item: 'Investor Relations',
                },
                {
                    id: 5,
                    item: 'Amazon Devices',
                },
            ]
        },
        {
            id: 2,
            title: 'Make Money with Us',
            list: [
                {
                    id: 1,
                    item: 'Sell products on Amazon',
                },
                {
                    id: 2,
                    item: 'Sell on Amazon Business',
                },
                {
                    id: 3,
                    item: 'Sell apps on Amazon',
                },
                {
                    id: 4,
                    item: 'Become an Affiliate',
                },
                {
                    id: 5,
                    item: 'Advertise Your Products',
                },
                {
                    id: 6,
                    item: 'Self-Publish with Us',
                },
                {
                    id: 7,
                    item: 'Host an Amazon Hub',
                },
                {
                    id: 8,
                    item: 'See More Make Money with Us',
                }
            ]
        },
        {
            id: 3,
            title: 'Amazon Payment Products',
            list: [
                {
                    id: 1,
                    item: 'Amazon Business Card',
                },
                {
                    id: 2,
                    item: 'Shop with Points',
                },
                {
                    id: 3,
                    item: 'Reload Your Balance',
                },
                {
                    id: 4,
                    item: 'Amazon Currency Converter',
                }
            ]
        },
        {
            id: 4,
            title: 'Let Us Help You',
            list: [
                {
                    id: 1,
                    item: 'Amazon and COVID-19',
                },
                {
                    id: 2,
                    item: 'Your Account',
                },
                {
                    id: 3,
                    item: 'Your Orders',
                },
                {
                    id: 4,
                    item: 'Shipping Rates & Policies',
                },
                {
                    id: 5,
                    item: 'Returns & Replacements',
                },
                {
                    id: 6,
                    item: 'Manage Your Content and Devices',
                },
                {
                    id: 7,
                    item: 'Amazon Assistant',
                },
                {
                    id: 8,
                    item: 'Help',
                }
            ]
        },
    ],
    // PadItem: 
    Descline: [
        {
            id: 1,
            title: 'Amazon Music',
            content: 'Stream millions of songs'
        },
        {
            id: 2,
            title: 'Amazon Advertising',
            content: 'Find, attract, and engage customers'
        },
        {
            id: 3,
            title: 'Amazon Drive',
            content: 'Cloud storage from Amazon'
        },
        {
            id: 4,
            title: '6pm',
            content: 'Score deals on fashion brands'
        },
        {
            id: 5,
            title: 'AbeBooks',
            content: 'Books, art & collectibles'
        },
        {
            id: 6,
            title: 'ACX',
            content: 'Audiobook Publishing Made Easy'
        },
        {
            id: 7,
            title: 'Alexa',
            content: 'Actionable Analytics for the Web'
        },
        {
            id: 8,
            title: 'Sell on Amazon',
            content: 'Start a Selling Account'
        },
        {
            id: 9,
            title: 'Amazon Business',
            content: 'Everything For Your Business'
        },
        {
            id: 10,
            title: 'AmazonGlobal',
            content: 'Ship Orders Internationally'
        },
        {
            id: 11,
            title: 'Home Services',
            content: 'Experienced Pros Happiness Guarantee'
        },
        {
            id: 12,
            title: 'Amazon Ignite',
            content: 'Sell your original Digital Educational Resources'
        },

        {
            id: 13,
            title: 'Amazon Web Services',
            content: 'Scalable Cloud Computing Services'
        },
        {
            id: 14,
            title: 'Audible',
            content: 'Listen to Books & Original Audio Performances'
        },
        {
            id: 15,
            title: 'Book Depository',
            content: 'Books With Free Delivery Worldwide'
        },
        {
            id: 16,
            title: 'Box Office Mojo',
            content: 'Find Movie Box Office Data'
        },
        {
            id: 17,
            title: 'ComiXology',
            content: 'Thousands of Digital Comics'
        },
        {
            id: 18,
            title: 'DPReview',
            content: 'Digital Photography'
        },
        {
            id: 19,
            title: 'East Dane',
            content: "Designer Men's Fashion"
        },
        {
            id: 20,
            title: 'Fabric',
            content: 'Sewing, Quilting & Knitting'
        },
        {
            id: 21,
            title: 'Goodreads',
            content: 'Book reviews & recommendations'
        },
        {
            id: 22,
            title: 'IMDb',
            content: 'Movies, TV & Celebrities'
        },
        {
            id: 23,
            title: 'IMDbPro',
            content: 'Get Info Entertainment Professionals Need'
        },
        {
            id: 24,
            title: 'Kindle Direct Publishing',
            content: 'Indie Digital & Print Publishing Made Easy'
        },
        {
            id: 25,
            title: 'Prime Video Direct',
            content: 'Video Distribution Made Easy'
        },
        {
            id: 26,
            title: 'Shopbop',
            content: 'Designer Fashion Brands'
        },
        {
            id: 27,
            title: 'Woot!',
            content: 'Deals and Shenanigans'
        },
        {
            id: 28,
            title: 'Zappos',
            content: 'Shoes & Clothing'
        },
        {
            id: 29,
            title: 'Ring',
            content: 'Smart Home Security Systems'
        },
        {
            id: 30,
            title: 'eero WiFi',
            content: 'Stream 4K Video in Every Room'
        },
        {
            id: 31,
            title: 'Blink',
            content: 'Smart Security for Every Home'
        },
        {
            id: 32,
            title: 'Neighbors App',
            content: 'Real-Time Crime & Safety Alerts'
        },
        {
            id: 33,
            title: 'Amazon Subscription Boxes',
            content: 'Top subscription boxes – right to your door'
        },
        {
            id: 34,
            title: 'PillPack',
            content: 'Pharmacy Simplified'
        },
        {
            id: 35,
            title: 'Amazon Second Chance',
            content: 'Pass it on, trade it in, give it a second life'
        },
    ],
    CopyRight: {
        link: [
            {
                id: 1,
                title: 'Conditions of Use',
                link: ''
            },
            {
                id: 2,
                title: 'Privacy Notice',
                link: ''
            },
            {
                id: 3,
                title: 'Interest-Based Ads',
                link: ''
            },
        ],
        CopyRight: '© 1996-2021, Amazon.com, Inc. or its affiliates'
    }
}


const footerReducer = (state = initialState, action) => {
    let {
        description,
        buttonName,
        newCustomer,
        signUpBtn,
    } = state.SignInFooter

    return state
}
export default footerReducer


// Use Redux toolkit
// import { createSlice } from "@reduxjs/toolkit";

// export const footerReducer = createSlice({
//     name: 'footerReducer',
//     initialState: {
//         SignInFooter: {
//             description: 'See personalized recommendations',
//             buttonName: 'Sign in',
//             newCustomer: 'New customer?',
//             signUpBtn: 'Start here.'
//         },
//     },
//     reducers:{
//         getContent: (state, action) => {
//             state.
//         }
//     }
// })