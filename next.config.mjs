/** @type {import('next').NextConfig} */
export const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "dctahvizk",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};
