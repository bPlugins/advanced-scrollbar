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
  { label: __('Elastic', 'advanced-scrollbar'), value: 'elastic' }
]

export const cursorEffectsOptions = [
  { label: __('None', 'advanced-scrollbar'), value: '', default: true },
  { label: __('Spark', 'advanced-scrollbar'), value: 'spark' },
  { label: __('Spark Simple', 'advanced-scrollbar'), value: 'sparkSimple' },
  { label: __('Starburst', 'advanced-scrollbar'), value: 'starburst' }
]