import { __ } from '@wordpress/i18n';

export const shapeAndEffectOptions = [
  { name: 'shape', title: __('Cursor', 'advanced-scrollbar') },
  { name: 'effect', title: __('Click Effect', 'advanced-scrollbar') }
]

export const shapeStyleTabs = [
  { name: 'type', title: __('Shape', 'advanced-scrollbar') },
  { name: 'style', title: __('Shape Style', 'advanced-scrollbar') }
]

export const cursorOptions = [
  { label: __('Default', 'advanced-scrollbar'), value: '', default: true },
  { label: __('Follow', 'advanced-scrollbar'), value: 'follow' },
  { label: __('Blob', 'advanced-scrollbar'), value: 'blob' },
  { label: __('Dot', 'advanced-scrollbar'), value: 'dot' },
  { label: __('Elastic', 'advanced-scrollbar'), value: 'elastic' },
  { label: __('Glitch Matrix', 'advanced-scrollbar'), value: 'matrix' },
  { label: __('Glitch Cyberpunk', 'advanced-scrollbar'), value: 'cyberpunk' },
  { label: __('Glitch Analog', 'advanced-scrollbar'), value: 'analog' },
  { label: __('Glitch Digital Error', 'advanced-scrollbar'), value: 'digital' },
  { label: __('Glow', 'advanced-scrollbar'), value: 'glow' },
  { label: __('Gradient', 'advanced-scrollbar'), value: 'gradient' },
  { label: __('Image', 'advanced-scrollbar'), value: 'image' },
  { label: __('Magnetic', 'advanced-scrollbar'), value: 'magnetic' },
  { label: __('Neon', 'advanced-scrollbar'), value: 'neon' },  
  { label: __('Pixelated', 'advanced-scrollbar'), value: 'pixelated' },
  { label: __('Ribbon', 'advanced-scrollbar'), value: 'ribbon' },
  { label: __('Ring', 'advanced-scrollbar'), value: 'ring' },
  // { label: __('Ripple','advanced-scrollbar'), value: 'ripple' },
  { label: __('Sketch', 'advanced-scrollbar'), value: 'sketch' },
  { label: __('Spotlight', 'advanced-scrollbar'), value: 'spotlight' },
  { label: __('Splash', 'advanced-scrollbar'), value: 'splash' },
  { label: __('Text', 'advanced-scrollbar'), value: 'text' }
]

export const cursorEffectsOptions = [
  { label: __('None', 'advanced-scrollbar'), value: '', default: true },
  { label: __('Spark', 'advanced-scrollbar'), value: 'spark' },
  { label: __('Spark Simple', 'advanced-scrollbar'), value: 'sparkSimple' },
  { label: __('Starburst', 'advanced-scrollbar'), value: 'starburst' },
  { label: __('Radial', 'advanced-scrollbar'), value: 'radial' },
  { label: __('Explosion', 'advanced-scrollbar'), value: 'explosion' },
  { label: __('Ripple Circle', 'advanced-scrollbar'), value: 'rippleCircle' },
  { label: __('Ripple Double', 'advanced-scrollbar'), value: 'rippleDouble' },
  { label: __('Ripple Wave', 'advanced-scrollbar'), value: 'rippleWave' },
  { label: __('Ripple Pulse', 'advanced-scrollbar'), value: 'ripplePulse' }
  // { Label: __('Ripple Tsunami', 'advanced-scrollbar'), value: 'tsunami' },
]