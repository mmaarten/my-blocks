import { __ } from '@wordpress/i18n';

//
// Colors.
//

export const colors = [
  {
    name: __( 'Primary', 'my-blocks' ),
    slug: 'primary',
    color: '#007bff',
  },
  {
    name: __( 'Secondary', 'my-blocks' ),
    slug: 'secondary',
    color: '#6c757d',
  },
  {
    name: __( 'Success', 'my-blocks' ),
    slug: 'success',
    color: '#28a745',
  },
  {
    name: __( 'Info', 'my-blocks' ),
    slug: 'info',
    color: '#17a2b8',
  },
  {
    name: __( 'Warning', 'my-blocks' ),
    slug: 'warning',
    color: '#ffc107',
  },
  {
    name: __( 'Danger', 'my-blocks' ),
    slug: 'danger',
    color: '#dc3545',
  },
  {
    name: __( 'Light', 'my-blocks' ),
    slug: 'light',
    color: '#f8f9fa',
  },
  {
    name: __( 'Dark', 'my-blocks' ),
    slug: 'dark',
    color: '#343a40',
  },
];

//
// Font sizes.
//
// Slug: letter and numbers need to be seperated by a dash `-`.
//

const fontSizeBase = 16;

export const fontSizes = [
  {
    name: __( 'Small', 'my-blocks' ),
    shortName: __( 'SM', 'my-blocks' ),
    slug: 'small',
    size: fontSizeBase * .875,
  },
  {
    name: __( 'Normal', 'my-blocks' ),
    shortName: __( 'N', 'my-blocks' ),
    slug: 'normal',
    size: fontSizeBase,
  },
  {
    name: __( 'Large', 'my-blocks' ),
    shortName: __( 'LG', 'my-blocks' ),
    slug: 'large',
    size: fontSizeBase * 1.25,
  },
  {
    name: __( 'Heading 1', 'my-blocks' ),
    shortName: __( 'H1', 'my-blocks' ),
    slug: 'h-1',
    size: fontSizeBase * 2.5,
  },
  {
    name: __( 'Heading 2', 'my-blocks' ),
    shortName: __( 'H2', 'my-blocks' ),
    slug: 'h-2',
    size: fontSizeBase * 2,
  },
  {
    name: __( 'Heading 3', 'my-blocks' ),
    shortName: __( 'H3', 'my-blocks' ),
    slug: 'h-3',
    size: fontSizeBase * 1.75,
  },
  {
    name: __( 'Heading 4', 'my-blocks' ),
    shortName: __( 'H4', 'my-blocks' ),
    slug: 'h-4',
    size: fontSizeBase * 1.5,
  },
  {
    name: __( 'Heading 5', 'my-blocks' ),
    shortName: __( 'H5', 'my-blocks' ),
    slug: 'h-5',
    size: fontSizeBase * 1.25,
  },
  {
    name: __( 'Heading 6', 'my-blocks' ),
    shortName: __( 'H6', 'my-blocks' ),
    slug: 'h-6',
    size: fontSizeBase,
  },
  {
    name: __( 'Display 1', 'my-blocks' ),
    shortName: __( 'D1', 'my-blocks' ),
    slug: 'display-1',
    size: 16 * 6,
  },
  {
    name: __( 'Display 2', 'my-blocks' ),
    shortName: __( 'D2', 'my-blocks' ),
    slug: 'display-2',
    size: 16 * 5.5,
  },
  {
    name: __( 'Display 3', 'my-blocks' ),
    shortName: __( 'D3', 'my-blocks' ),
    slug: 'display-3',
    size: 16 * 4.5,
  },
  {
    name: __( 'Display 4', 'my-blocks' ),
    shortName: __( 'D4', 'my-blocks' ),
    slug: 'display-4',
    size: 16 * 3.5,
  },
];

export const fontWeights = [
  { name: __( '- Default -', 'my-blocks' ), slug: null },
  { name: __( 'Lighter', 'my-blocks' ), slug: 'lighter' },
  { name: __( 'Light', 'my-blocks' ), slug: 'light' },
  { name: __( 'Normal', 'my-blocks' ), slug: 'normal' },
  { name: __( 'Bold', 'my-blocks' ), slug: 'bold' },
  { name: __( 'Bolder', 'my-blocks' ), slug: 'bolder' },
];

//
// Theme color options.
//
export const themeColorOptions = [
  { label: __( 'Primary', 'my-blocks' ), value: 'primary' },
  { label: __( 'Secondary', 'my-blocks' ), value: 'secondary' },
  { label: __( 'Success', 'my-blocks' ), value: 'success' },
  { label: __( 'Info', 'my-blocks' ), value: 'info' },
  { label: __( 'Warning', 'my-blocks' ), value: 'warning' },
  { label: __( 'Danger', 'my-blocks' ), value: 'danger' },
  { label: __( 'Light', 'my-blocks' ), value: 'light' },
  { label: __( 'Dark', 'my-blocks' ), value: 'dark' },
];
