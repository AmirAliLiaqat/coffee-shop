/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["placehold.co", "images.unsplash.com"],
  },
  webpack: (config, { isServer }) => {
    // Add a rule to handle canvg
    config.module.rules.push({
      test: /\.js$/,
      include: /node_modules\/canvg/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
          plugins: ["@babel/plugin-transform-runtime"],
        },
      },
    });

    return config;
  },
};

module.exports = nextConfig;
