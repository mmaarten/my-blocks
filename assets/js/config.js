import { __ } from '@wordpress/i18n';

export const themeColors = [
  {
    name: __( 'Primary' ),
    slug: 'primary',
    color: '#007bff',
  },
  {
    name: __( 'Secondary' ),
    slug: 'secondary',
    color: '#6c757d',
  },
  {
    name: __( 'Success' ),
    slug: 'success',
    color: '#28a745',
  },
  {
    name: __( 'Info' ),
    slug: 'info',
    color: '#17a2b8',
  },
  {
    name: __( 'Warning' ),
    slug: 'warning',
    color: '#ffc107',
  },
  {
    name: __( 'Danger' ),
    slug: 'danger',
    color: '#dc3545',
  },
  {
    name: __( 'Light' ),
    slug: 'light',
    color: '#f8f9fa',
  },
  {
    name: __( 'Dark' ),
    slug: 'dark',
    color: '#343a40',
  },
];

export const textColors = [
  {
    name: __( 'Muted' ),
    slug: 'muted',
    color: '#6c757d',
  },
  {
    name: __( 'Body' ),
    slug: 'muted',
    color: '#212529',
  },
  {
    name: __( 'Black 50' ),
    slug: 'black-50',
    color: 'rgba(0, 0, 0, .5)',
  },
  {
    name: __( 'White 50' ),
    slug: 'white-50',
    color: 'rgba(255, 255, 255, .5)',
  },
  ...themeColors
];

export const backgroundColors = [
  {
    name: __( 'White' ),
    slug: 'white',
    color: '#ffffff',
  },
  ...themeColors
];
