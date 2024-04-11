const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
});

module.exports = {
  publicPath: "/Vue-CLI_app/",
  /* publicPath: process.env.NODE_ENV === "production" ? "/Vue-CLI_app/" : "/", */
};
