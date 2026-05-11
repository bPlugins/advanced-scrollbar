import { changeLog } from "./changeLog";

const origin = location.origin;
const slug = 'advanced-scrollbar';

export const pricingPage = `${origin}/wp-admin/options-general.php?page=advanced-scrollbar#/pricing`;

// export const dashboardInfo = (info) => {
//   const { isPremium } = info;

//   const proSuffix = isPremium ? ' Pro' : '';

//   return {
//     name: ` Advanced Scrollbar${proSuffix}`,
//     displayName: `Advanced Scrollbar${proSuffix} -  The ultimate scrollbar collection`,
//     description: 'Advanced Scrollbar is a powerful and versatile plugin that can help you customize and enhance the scrollbar on your WordPress website.',
//     slug,
//     logo: `https://ps.w.org/${slug}/assets/icon-128x128.png`,
//     banner: `https://ps.w.org/${slug}/assets/banner-772x250.png`,
//     video: 'https://www.youtube.com/watch?v=xuAVOi80HE8',
//     isYoutube: true,
//     isPremium,
//     ...info,
//     pages: {
//       org: `https://wordpress.org/plugins/${slug}/`,
//       landing: `https://bplugins.com/products/${slug}/`,
//       docs: `https://scrollbar.bplugins.com/`,
//       pricing: pricingPage,
//     },
//     freemius: {
//       product_id: '14870',
//       plan_id: '24760',
//       public_key: 'pk_419d245dc8547a274d192990c096a'
//     },
//     options: { title: "Advanced Scrollbar" }
//   }
// }

export const dashboardInfo = (info) => {
  const { version, isPremium = false, hasPro = false, licenseActiveNonce, nonce, ...props } = info;

  const proSuffix = isPremium ? ' Pro' : '';

  return {
    name: `Advanced Scrollbar${proSuffix}`,
    displayName: `Advanced Scrollbar${proSuffix} -  The ultimate scrollbar collection`,
    description: 'Advanced Scrollbar is a powerful and versatile plugin that can help you customize and enhance the scrollbar on your WordPress website.',
    slug,
    version,
    isPremium,
    hasPro,
    nonce,
    info,
    ...props,
    displayOurPlugins: true,
    media: {
      logo: `https://ps.w.org/${slug}/assets/icon-128x128.png`,
      banner: `https://ps.w.org/${slug}/assets/banner-772x250.png`,
      thumbnail: `https://bplugins.com/wp-content/themes/b-technologies/assets/images/products/${slug}.png`,
      // proThumbnail: `https://bplugins.com/wp-content/themes/b-technologies/assets/images/products/${slug}-pro.png`,
      video: 'https://www.youtube.com/watch?v=xuAVOi80HE8',
      isYoutube: true
    },
    pages: {
      org: `https://wordpress.org/plugins/${slug}/`,
      landing: `https://bplugins.com/products/advanced-scrollbar/`,
      docs: `https://scrollbar.bplugins.com/`,
      pricing: `https://bplugins.com/products/advanced-scrollbar/pricing`,
    },
    freemius: {
      product_id: 14870,
      plan_id: 24760,
      public_key: 'pk_419d245dc8547a274d192990c096a'
    },
    licenseActiveNonce,
    changelogs: changeLog,
    proFeatures: [
      "Dynamic full height scrollbar",
      "Scrollbar gradient color",
      "Floating Scrollbar",
      "Elastic cursor",
      "Glitch cursor",
      "Magnetic cursor",
      'Pixelated cursor',
      "Ribbon cursor",
      "Ring cursor",
      "Splash cursor",
      "Most popular cursors",
      "Ripples cursor click effect",
      "Pulse cursor click effect",
      "Wave cursor click effect",
      "Explosion cursor click effect"
    ],
    // startButton: {
    //   label: 'Start Now',
    //   url: `wp-admin/post-new.php?post_type=page&title=bBlocks&content=<!-- wp:b-blocks/container /-->`
    // }
  }
}

// export const pricingInfo = {
//   cycles: [
//     // {
//     //     cycle: 'monthly',
//     //     label: 'Monthly',
//     //     isDefault: false
//     // },
//     // {
//     //     cycle: 'annual',
//     //     label: 'Yearly',
//     //     isDefault: true
//     // },
//     {
//       cycle: 'lifetime',
//       label: 'Lifetime',
//       isDefault: false
//     }
//   ],
//   plans: [
//     {
//       name: 'Single Site',
//       quantity: 1,
//       prices: {
//         // monthly: '4.99',
//         // annual: '47.88',
//         lifetime: '29.99'
//       },
//       pricePrefix: '',
//       priceSuffix: '',
//       isFeatured: false,
//       note: ''
//     },
//     {
//       name: '3 Sites',
//       quantity: 3,
//       prices: {
//         // monthly: '8.99',
//         // annual: '83.88',
//         lifetime: '79.99'
//       },
//       pricePrefix: '',
//       priceSuffix: '',
//       isFeatured: true,
//       note: ''
//     },
//     {
//       name: 'Unlimited Sites',
//       quantity: 'null',
//       prices: {
//         // monthly: '26.99',
//         // annual: '199',
//         lifetime: '199.99'
//       },
//       pricePrefix: '',
//       priceSuffix: '',
//       isFeatured: false,
//       note: ''
//     }
//   ],
//   features: [
//     "Dynamic full height scrollbar",
//     "Scrollbar gradient color",
//     "Floating Scrollbar",
//     "Elastic cursor",
//     "Glitch cursor",
//     "Magnetic cursor",
//     'Pixelated cursor',
//     "Ribbon cursor",
//     "Ring cursor",
//     "Splash cursor",
//     "Most popular cursors",
//     "Ripples cursor click effect",
//     "Pulse cursor click effect",
//     "Wave cursor click effect",
//     "Explosion cursor click effect"
//   ],
//   button: {
//     label: 'Buy Now ➜'
//   },
//   featured: {
//     text: 'Best Value'
//   },
// }

export const pricingInfo = {
  logo: `https://ps.w.org/${slug}/assets/icon-128x128.png?rev=3471261`, // Optional
  pluginId: 14870,
  planId: 24760,
  licenses: [
    1,
    3,
    null
  ],
  button: {
    label: 'Buy Now ➜'
  },
  featured: {
    selected: 3, // choose from licenses item
  }
};