/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'server.kecimol.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
}

module.exports = nextConfig
