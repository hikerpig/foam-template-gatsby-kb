module.exports = {
  pathPrefix: `/foam-template-gatsby-kb`, // a. If you are using github pages, this should be the name of your repo
  // pathPrefix: `/`, // b. If you are using Netlify/Vercel, your can keep it this way
  siteMetadata: {
    // some SEO configs using by gatsby-theme-kb
    title: `Foam`, // Replace it with your site's title
    author: `Your Name`, // Replace it with your name
    description: `My personal knowledge base`, // Replace it with your site's description
  },
  plugins: [
    {
      resolve: `gatsby-theme-kb`,
      options: {
        rootNote: "/readme",
        contentPath: `${__dirname}/..`,
        ignore: [
          "**/_layouts/**",
          "**/.git/**",
          "**/.github/**",
          "**/.vscode/**",
          "**/.cache/**",
        ],
      },
    },
  ],
};
