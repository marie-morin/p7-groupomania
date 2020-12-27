module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/frontend/dist/" : "/",
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/styles/_base.scss";
          @import "@/styles/_variables.scss";
          @import "@/styles/_mixins.scss";
          @import "@/styles/_global.scss";
        `,
      },
    },
  },
};
