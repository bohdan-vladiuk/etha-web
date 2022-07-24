/** @type {import('next').NextConfig} */
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
    reactStrictMode: false,
    images: {
        domains: ['resources.etha.one', '*'],
    },
});

module.exports = withBundleAnalyzer({});
