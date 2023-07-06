/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["links.papareact.com", "fakestoreapi.com", "https://www.stickpng.com"]
    },
    env: {
        NEXTAUTH_SECRET: 'iBFdGWYZa+2o/BPw7wmRIZljYm2ObSp/2x6LN1GI/fs=',
    },
}

module.exports = nextConfig
