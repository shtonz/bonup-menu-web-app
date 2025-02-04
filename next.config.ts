import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["bonupp.s3.eu-north-1.amazonaws.com", "randomuser.me"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/200",
        search: "",
      },
    ],
  },
  //Removes toast built-in icon
  devIndicators: {
    appIsrStatus: false,
  },
};

export default nextConfig;
