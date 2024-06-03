/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "dctahvizk",
    NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN: 
      "pk.eyJ1IjoicGF1bC10ZXMiLCJhIjoiY2x3dGR3ODI1MDJiZDJscXpxMXBmNHQ2eiJ9.Yrd8qMv0zpu1sFGbT2zO4w",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;