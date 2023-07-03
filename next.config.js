/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack: (config) => {
    // load worker files as a urls with `file-loader`
    config.module.rules.unshift({
      test: /pdf\.worker\.(min\.)?js/,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[contenthash].[ext]",
            publicPath: "_next/static/worker",
            outputPath: "static/worker",
          },
        },
      ],
    });

    config.externals.push({
      sharp: "commonjs sharp",
      canvas: "commonjs canvas",
    });

    return config;
  },
};

module.exports = nextConfig;
