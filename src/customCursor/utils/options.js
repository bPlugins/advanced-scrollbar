import { __ } from '@wordpress/i18n';
export const cursorStyleTabs = [
  { name: 'shape', title: __('Cursor', 'advanced-scrollbar') },
  { name: 'effect', title: __('Click Effect', 'advanced-scrollbar') }
];

export const cursorShapeTabs = [
  { name: 'shape', title: __('Cursor', 'advanced-scrollbar') },
  { name: 'style', title: __('Shape Style', 'advanced-scrollbar') }
];

export const cursorEffectTabs = [
  { name: 'type', title: __('Effect', 'advanced-scrollbar') },
  { name: 'style', title: __('Effect Style', 'advanced-scrollbar') }
];

// export const 

export const cursorSourceOptions =(isPremium)=> [
  { label: __('Cursor Only', 'advanced-scrollbar'), value: 'cursor', default: true },
  { label: __('Customizable Shape', 'advanced-scrollbar'), value: 'shape' },
  { label: __(`Most Popular ${isPremium ? '' : '(Pro)'}`, 'advanced-scrollbar'), value: 'predefined' },
  { label: __(`Custom Url ${isPremium ? '' : '(Pro)'}`, 'advanced-scrollbar'), value: 'customUrl' },
]

export const cursorProOptions = ['matrix', 'cyberpunk', 'analog', 'digital', 'glow', 'gradient', 'image', 'magnetic', 'neon', 'pixelated', 'ribbon', 'ring', 'sketch', 'spotlight', 'splash', 'text']

export const cursorOptions = [
  { label: __('Default', 'advanced-scrollbar'), value: '', default: true },
  { label: __('Unset', 'advanced-scrollbar'), value: 'unset' },
  { label: __('Follow', 'advanced-scrollbar'), value: 'follow' },
  { label: __('Blob', 'advanced-scrollbar'), value: 'blob' },
  { label: __('Dot', 'advanced-scrollbar'), value: 'dot' },
  { label: __('Elastic', 'advanced-scrollbar'), value: 'elastic' },
  { label: __(`Glitch Matrix`, 'advanced-scrollbar'), value: 'matrix' },
  { label: __(`Glitch Cyberpunk`, 'advanced-scrollbar'), value: 'cyberpunk' },
  { label: __(`Glitch Analog`, 'advanced-scrollbar'), value: 'analog' },
  { label: __(`Glitch Digital Error`, 'advanced-scrollbar'), value: 'digital' },
  { label: __(`Glow`, 'advanced-scrollbar'), value: 'glow' },
  { label: __(`Gradient`, 'advanced-scrollbar'), value: 'gradient' },
  { label: __(`Image`, 'advanced-scrollbar'), value: 'image' },
  { label: __(`Magnetic`, 'advanced-scrollbar'), value: 'magnetic' },
  { label: __(`Neon`, 'advanced-scrollbar'), value: 'neon' },
  { label: __(`Pixelated`, 'advanced-scrollbar'), value: 'pixelated' },
  { label: __(`Ribbon`, 'advanced-scrollbar'), value: 'ribbon' },
  { label: __(`Ring`, 'advanced-scrollbar'), value: 'ring' },
  // { label: __('Ripple','advanced-scrollbar'), value: 'ripple' },
  { label: __(`Sketch`, 'advanced-scrollbar'), value: 'sketch' },
  { label: __(`Spotlight`, 'advanced-scrollbar'), value: 'spotlight' },
  { label: __(`Splash`, 'advanced-scrollbar'), value: 'splash' },
  { label: __(`Text`, 'advanced-scrollbar'), value: 'text' },
]

export const cursorEffectsOptions = [
  { label: __("None", 'advanced-scrollbar'), value: "", default: true },
  { label: __('Unset', 'advanced-scrollbar'), value: 'unset' },
  { label: __("Spark", 'advanced-scrollbar'), value: "spark" },
  { label: __("Spark Simple", 'advanced-scrollbar'), value: "sparkSimple" },
  { label: __("Starburst", 'advanced-scrollbar'), value: "starburst" },
  { label: __("Radial", 'advanced-scrollbar'), value: "radial" },
  { label: __("Explosion", 'advanced-scrollbar'), value: "explosion" },
  { label: __("Ripple Circle", 'advanced-scrollbar'), value: "rippleCircle" },
  { label: __("Ripple Double", 'advanced-scrollbar'), value: "rippleDouble" },
  { label: __("Ripple Wave", 'advanced-scrollbar'), value: "rippleWave" },
  { label: __("Ripple Pulse", 'advanced-scrollbar'), value: "ripplePulse" },
  // { Label: __("Ripple Tsunami", 'advanced-scrollbar'), value: "tsunami" },
]

export const glitchIntensityOptions = [
  { label: __('Low', 'advanced-scrollbar'), value: 'low' },
  { label: __('Medium', 'advanced-scrollbar'), value: 'medium', default: true },
  { label: __('High', 'advanced-scrollbar'), value: 'high' },
];

export const glitchSpeedOptions = [
  { label: __('Slow', 'advanced-scrollbar'), value: 'slow' },
  { label: __('Medium', 'advanced-scrollbar'), value: 'medium' },
  { label: __('Fast', 'advanced-scrollbar'), value: 'fast' },
];

export const glitchBlendModeOptions = [
  { label: __('Normal', 'advanced-scrollbar'), value: 'normal' },
  { label: __('Multiply', 'advanced-scrollbar'), value: 'multiply' },
  { label: __('Screen', 'advanced-scrollbar'), value: 'screen' },
  { label: __('Overlay', 'advanced-scrollbar'), value: 'overlay' },
  { label: __('Difference', 'advanced-scrollbar'), value: 'difference' },
];

export const magneticTargetElDefaults = 'button, a, textarea, select, [role="button"], [type="submit"]'

export const effectSparkEasingOptions = [
  { label: __('Ease Out', 'advanced-scrollbar'), value: 'ease-out', default: true },
  { label: __('Ease In', 'advanced-scrollbar'), value: 'ease-in' },
  { label: __('Ease In Out', 'advanced-scrollbar'), value: 'ease-in-out' },
  { label: __('Linear', 'advanced-scrollbar'), value: 'linear' }
]