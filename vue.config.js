module.exports = {
  chainWebpack(config) {
    const isProduction = process.env.NODE_ENV === "production";
    config.when(
      isProduction,
      () => {
        config.plugins
          .delete("html")
          .delete("preload")
          .delete("prefetch")
          .end()
          .entry("app")
          .clear()
          .add("./packages/index.js")
          .end()
          .output.set("filename", "tableFormItem.js");
      },
      () => {
        config.entry("app").clear().add("./main.js");
      }
    );
  },
};
