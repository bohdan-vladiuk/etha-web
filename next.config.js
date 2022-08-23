/** @type {import('next').NextConfig} */
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
    reactStrictMode: false,
});

module.exports = withBundleAnalyzer({
    images: {
        domains: ['resources.etha.one', '*', 'api.producthunt.com'],
    },
});
