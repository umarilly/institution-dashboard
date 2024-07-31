// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'oxauth-onboarding.s3.us-east-1.amazonaws.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'd1nhio0ox7pgb.cloudfront.net',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
