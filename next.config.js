/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["links.papareact.com", "fakestoreapi.com", "https://www.stickpng.com"]
    },
    env: {
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        stripe_public_key: process.env.STRIPE_PUBLIC_KEY
    },
}

module.exports = nextConfig
