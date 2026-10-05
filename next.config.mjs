import mdx from "@next/mdx";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/Portfolio-Ali",
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["next-mdx-remote"],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "**",
      },
    ],
  },
  typescript: { ignoreBuildErrors: true },
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
  async redirects() {
    return [
      {
        source: '/work',
        destination: '/#work',
        permanent: true,
      },
      {
        source: '/work/:slug*',
        destination: '/#work',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/#about',
        permanent: true,
      },
      {
        source: '/gallery',
        destination: '/#gallery',
        permanent: true,
      },
    ];
  },
};

export default withMDX(nextConfig);
