/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["links.papareact.com", "fakestoreapi.com", "https://www.stickpng.com"]
    },
    env: {
        NEXTAUTH_SECRET: 'Ey7nTKnggBc0bRN8WUjyShw2qzOZ6KW4fUyqcKBePxY=',
    },
}

module.exports = nextConfig
