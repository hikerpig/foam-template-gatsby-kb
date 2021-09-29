# Foam

👋 Welcome to your new Foam Workspace!

## Getting started

This documentation assumes that you have a GitHub account and have [Visual Studio Code](https://code.visualstudio.com/) installed on your Linux/MacOS/Windows machine.

1. If you haven't yet, browse over to the main [Foam documentation workspace](https://foambubble.github.io/foam) to get an idea of what Foam is and how to use it.
2. Press "Use this template" button at [foam-template-gatsby-kb](https://github.com/hikerpig/foam-template-gatsby-kb) (that's this repository!) to fork it to your own GitHub account. If you want to keep your thoughts to yourself, remember to set the repository private.
3. [Clone the repository to your local machine](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) and open it in VS Code.
    *Open the repository as a folder using the `File > Open...` menu item. In VS Code, "open workspace" refers to [multi-root workspaces](https://code.visualstudio.com/docs/editor/multi-root-workspaces).*
4. When prompted to install recommended extensions, click **Install all** (or **Show Recommendations** if you want to review and install them one by one)
5. Open [_layouts/gatsby-config.js](_layouts/gatsby-config.js) and edit the `pathPrefix` to be the name of the repository.

After setting up the repository, open [.vscode/settings.json](.vscode/settings.json) and edit, add or remove any settings you'd like for your Foam workspace.

To learn more about how to use **Foam**, read the [Recipes](https://foambubble.github.io/foam/recipes) bubbles of the Foam documentation workspace.

### Some Gatsby configurations

Check the `_layouts/gatsby-config.js` file, and there is some configs you should concern if you want to deploy your site and view it correctly.

Check the repo for [latest gatsby-config.js](https://github.com/hikerpig/foam-template-gatsby-kb/blob/master/_layouts/gatsby-config.js).

```js
const path = require('path')

const PATH_PREFIX = process.env.PATH_PREFIX

module.exports = {
  pathPrefix: PATH_PREFIX || `/`, // b. If you are using Netlify/Vercel, your can keep it this way
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
        rootNote: '/readme',
        contentPath: `${__dirname}/..`,
        ignore: [
          '**/_layouts/**',
          '**/.git/**',
          '**/.github/**',
          '**/.vscode/**',
          '**/.cache/**',
        ],
        // this is an option for extending `gatsby-plugin-mdx` options inside `gatsby-theme-kb`,
        getPluginMdx(defaultPluginMdx) {
          // so you can have your relative referenced files served, e.g. '../assets/img.png'.
          defaultPluginMdx.options.gatsbyRemarkPlugins.push({
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              ignoreFileExtensions: ['md', 'mdx'],
            },
          })

          // an example of syntax highlighting
          defaultPluginMdx.options.gatsbyRemarkPlugins.push({
            resolve: 'gatsby-remark-prismjs',
            options: {
              noInlineHighlight: true,
            },
          })

          // add math support
          defaultPluginMdx.options.remarkPlugins.push(require('remark-math'))
          if (!defaultPluginMdx.options.rehypePlugins) defaultPluginMdx.options.rehypePlugins = []
          defaultPluginMdx.options.rehypePlugins.push(require('rehype-katex'))
          return defaultPluginMdx
        },
      },
    },
    {
      // this plugin makes sure your static files will be served by gatsby,
      //   but of course you need to reference them by absolute path, e.g. '/assets/img.png'.
      // if you have multiple directories, copy this plugin section and specify other directory
      // check https://github.com/csath/gatsby-plugin-copy-files-enhanced to find docs for this plugin
      resolve: 'gatsby-plugin-copy-files-enhanced',
      options: {
        source: path.resolve(__dirname, `../assets`),
        destination: '/assets',
        purge: false,
      },
    },
  ],
}
```

### About Syntax highlight

The default gatsby config has a simple support of codeblock syntax highlight through `gatsby-remark-prismjs` and some css file. If you have other preference, feel free to remove those configs and add your own.

There is an example of shiki and twoslash mentioned in [this issue](https://github.com/hikerpig/foam-template-gatsby-kb/issues/5#issuecomment-782902350).

### More options

For more available theme options, check [gatsby-theme-kb README](https://github.com/hikerpig/gatsby-project-kb/tree/master/packages/gatsby-theme-kb).

### Deploy

#### Option 1. To Vercel

Check the [demo of this repo](https://foam-template-gatsby-kb.vercel.app/) in Vercel.

Goto [New Project](https://vercel.com/new) page of Vercel, import your own repo in github (after connecting your github to Vercel, of course).

1. While configuring the site, select `_layouts`  as your source code directory.

![](https://i.loli.net/2021/01/28/pMxdXwuYGzF5LDg.png)

2. Select `Gatsby.js` as 'FRAMEWORK PRESET'.

![](https://i.loli.net/2021/01/28/Ccw4a9l8zeJxDXt.png)

Then  click the 'Deploy' button of the form, you will see Vercel building and deploying your site.

#### Option 2. To Github Pages

At first you need to enable GitHub Pages in your repo's settings, set `gh-pages` branch as source.

And once you push the `master` branch, github actions will build the site and add generated files to `gh-pages` branch. The action workflow config is located in `.github/workflows/Deploy.yml`. It comes with you when you fork this repository, if you don't need it or want to get rid  the `gh-pages` noise, just delete the file.

After the building is done, you can visit your site in `https://{yourname}.github.io/{your-repo-name}/`, e.g. [https://hikerpig.github.io/foam-template-gatsby-kb/](https://hikerpig.github.io/foam-template-gatsby-kb/).

## Using Foam

We've created a few Bubbles (markdown documents) to get you started.

- [[inbox]] - a place to write down quick notes to be categorised later
- [[foam-tips]] - tips to get the most out of your Foam workspace
- [[todo]] - a place to keep track of things to do

The demo on Vercel has some of Foam docs and has more usage examples (like images), check the [feature/foam-docs branch](https://github.com/hikerpig/foam-template-gatsby-kb/tree/feature/foam-docs) to see then.

### Important configurations for foam

You may need to configure Foam to work with this template, for the config `foam.edit.linkReferenceDefinitions`:

- `"withoutExtensions"`, this is the default option, the generated definition url will not include the `md` extension part.
- `"off"`, with this option selected, Foam won't generate link definitions in the bottom of the document, this might be inconvenient for you to navigate across your files on Github, but totally fine with gatsby-theme-kb.

## Note on `[[wiki-links]]`

⚠️ Until [foambubble/foam#16](https://github.com/foambubble/foam/issues/16) is resolved, `[[wiki-links]]` links (like the links above) won't work in the GitHub Markdown preview (i.e. this Readme on github.com).

They should work as expected in VS Code, and in rendered GitHub Pages.

If GitHub preview (or general 100% support with all Markdown tools) is a requirement, for the time being you can use the standard `[description](page.md)` syntax.

[//begin]: # "Autogenerated link references for markdown compatibility"
[inbox]: inbox.md "Inbox"
[foam-tips]: foam-tips.md "Foam tips"
[todo]: todo.md "Todo"
[//end]: # "Autogenerated link references"
