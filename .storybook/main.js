const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  stories: [
    "../src/components/Intro.stories.mdx",
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "@storybook/addon-a11y",
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.
    const rootDir = path.resolve(__dirname, "../");
    const srcDir = rootDir + "/src";
    const linariaCacheDir = srcDir + "/.linaria_cache";
    config.plugins.push(new MiniCssExtractPlugin());
    console.log(">>>>>>>>>>>>>>>>>>>>>>>> plugins", config.plugins);
    // console.log(
    //   ">>>>>>>>>>>>>>>>>>>>>>>> rules",
    //   JSON.stringify(config.module.rules)
    // );

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.js$/,
      include: srcDir,
      use: [
        { loader: "babel-loader" },
        {
          loader: "@linaria/webpack-loader",
          options: {
            cacheDirectory: linariaCacheDir,
            sourceMap: configType !== "PRODUCTION",
          },
        },
      ],
    });

    config.module.rules.push({
      test: /\.css$/i,
      use: [MiniCssExtractPlugin.loader, "css-loader"],
    });

    // Return the altered config
    return config;
  },
};
