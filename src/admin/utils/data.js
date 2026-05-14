import { changeLog } from "./changeLog";

const origin = location.origin;
const slug = 'advanced-scrollbar';

export const pricingPage = `${origin}/wp-admin/options-general.php?page=advanced-scrollbar#/pricing`;


export const dashboardInfo = (info) => {
  const { version, nonce, ...props } = info;

  return {
    name: `Advanced Scrollbar`,
    displayName: `Advanced Scrollbar -  The ultimate scrollbar collection`,
    description: 'Advanced Scrollbar is a powerful and versatile plugin that can help you customize and enhance the scrollbar on your WordPress website.',
    slug,
    version,
    nonce,
    info,
    ...props,
    displayOurPlugins: true,
    media: {
      logo: `https://ps.w.org/${slug}/assets/icon-128x128.png`,
      banner: `https://ps.w.org/${slug}/assets/banner-772x250.png`,
      thumbnail: `https://bplugins.com/wp-content/themes/b-technologies/assets/images/products/${slug}.png`,
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
  }
}

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