# The Complete Guide For Setting Up React.TS Application

## Installation

```bash
yarn install
```

## Run

```bash
yarn start
```

---

## How this app is built

> with webpack, Babel, TypeScript, Sass, CSS Module, Tailwind, React Refresh(HMR)

In this tutorial, we're going to set up a React application without using create-react-app.
We're going to learn how to set up from scratch with TypeScript, Sass, Tailwind CSS, CSS module, abd Absolute paths.

## Basic concepts you need to know beforehand

### 1. TSC does type checking, Babel does transpiling

- TSC(TypeScript Compiler) that is included in the TypeScript package will only be used as a type checker of your source codes, and you can achieve it by setting:

```json
{
	"complierOptions": {
		...
		"noEmit": true, /* Disable emitting files from a compilation. */
		...
	}
}
```

- `@babel/preset-typescript` will be used to compile(transpile) TypeScript to JavaScript
  - why I use `@babel/preset-typescript` over [ts-loader](https://github.com/TypeStrong/ts-loader) and [awesome-typescript-loader](https://github.com/s-panferov/awesome-typescript-loader) to complie TypeScript?
    - it's blazingly faster than the others and has more perks(read #4)
    - `ts-loader` doesn't natively support HMR(Hot Module Replacement)
    - `awesome-typescript-loader`'s latest release is on Jun 22, 2018
    - [TypeScript With Babel: A Beautiful Marriage - Matt Turnbull's Post](https://iamturns.com/typescript-babel/)

### 2. We're gonna try the Fast Refresh Feature

The [Fast Refresh](https://reactnative.dev/docs/fast-refresh) is a React Native feature that allows you to get near-instant feedback for changes in your React components However, my idol, Dan Abramov [talked about applying it across the board in 2019](https://github.com/facebook/react/issues/16604#issuecomment-528663101) - as a replacement for purely userland solutions (like [react-hot-loader](https://www.npmjs.com/package/react-hot-loader)).

If you navigate to the `React Hot Loader` page on npm, you'll see
![React Hot Loader NPM page](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/t5ci7q96w3rdwpftu44e.png)

as mentioned above, we're using the webpack; therefore, we're going to use [@pmmmwh/react-refresh-webpack-plugin](https://github.com/pmmmwh/react-refresh-webpack-plugin) to apply the Fast Refresh feature to our app. I mean, it's for development, so what's the harm of trying it right?

### 3. What's up with all the CSS libraries such as CSS Module, Sass, and Tailwind CSS

I'm not saying you should use all of these libraries, but it's just to show you how to set up these for your future projects. In my case, I use Sass and CSS Module combination when I work on page components, and the Tailwind CSS when I need to create prototypes fast and when I make reuseable small components.

Okay, enough with the prerequisites.
Let's begin.

## Step 1. Create a folder for your project

```bash
$ mkdir my-app && cd my-app # create and go to my-app folder
```

## Step 2. Generate 'package.json' file

```bash
$ yarn init
```

then fill in the questions shown below following the prompt

![yarn init](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qfux82jnzpnwoqwooqc6.png)

if you prefer to generate one based on your own defaults, use:

```bash
$ yarn init --yes # or '-y' in short
```

[yarn init - docs](https://classic.yarnpkg.com/lang/en/docs/cli/init/)

You can definitely change the settings later on, so don't worry.

## Step 3. Add React and React-related packages

```bash
$ yarn add react react-dom react-router-dom
$ yarn add --dev @types/react @types/react-dom @types/react-router-dom # for TypeScript
```

- [react](https://www.npmjs.com/package/react)(v18.2.0) : The `react` package contains only the functionality necessary to define React components. It is typically used together with a React renderer like `react-dom` for the web, or `react-native` for the native environments.
- [react-dom](https://www.npmjs.com/package/react-dom)(v18.2.0): This package serves as the entry point to the DOM and server renderers for React. It is intended to be paired with the generic React package, which is shipped as `react` to npm.
- [react-router-dom](https://www.npmjs.com/package/react-router-dom)(v6.4.4): contains bindings for using [React Router](https://github.com/remix-run/react-router) in web applications.
- `@types/react`, `@types/react-dom`, `@types/react-router-dom` from TypeScript

## Step 4. Add Webpack and Webpack Cli packages

with the Webpack, you can combine all of your React codes into one or more _bundles_, that are static assets including not only JavaScript or TypeScript files, but also Sass or Image files(png, jpg)

```bash
$ yarn add --dev webpack webpack-cli webpack-dev-server
$ yarn add --dev @types/webpack @types/webpack-dev-server # for TypeScript
```

- [webpack](https://webpack.js.org/)(v5.75.0)
- [webpack-cli](https://webpack.js.org/api/cli/)(v5.0.1): enables you to use the command-line interface of the Webpack
- [webpack-dev-server](https://webpack.js.org/configuration/dev-server/)(v4.11.1)
- `@types/webpack`, `@types/webpack-dev-server`: for TypeScript

## Step 5. Add Babel core and preset for React packages

Babel is a compiler(or transpiler) and a toolchain that is mainly used to convert ECMAScript 2015+ code into a backward-compatible version of JavaScript in current and older browsers or environments. The `preset-react` package will convert JSX syntax to JavaScript codes that browsers can understand.

```bash
$ yarn add --dev @babel/core @babel/preset-env @babel/preset-react
$ yarn add --dev @babel/preset-typescript # for TypeScript
$ yarn add --dev @babel/register # to use webpack.config.ts (TypeScript)
```

- [@babel/core](https://babeljs.io/docs/en/babel-core)(v7.20.5): core files of Babel compiler

#### Presets for Babel

- [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env)(v7.20.2): allow you to use the latest JavaScript without needing to micromanage which syntax transforms (and optionally, browser polyfills) are needed by your target environment(s)
- [@babel/preset-react](https://www.npmjs.com/package/@babel/preset-react)(v7.18.6): process and transform jsx syntax and display name
- [@babel/preset-typescript](https://babeljs.io/docs/en/babel-preset-typescript)(v7.18.6) - since ts-loader for the Webpack doesn't natively support HMR, I prefer Babel's preset to handle TypeScript, also because basically webpack works as a module bundler and Babel works as a compiler(transpiler).
  ![ts-loader documentation](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/85pc2jci02bc43767kfm.png)
- [@babel/register](https://babeljs.io/docs/en/babel-register/)(v.7.18.9): The require hook will bind itself to node's `require` and automatically compile files on the fly. You need it when you want to use the webpack config file as TypeScript.
  If you use `webpack.config.ts`, and the `webpack cli` will complain `Unable load /{path}/webpack.config.ts` and `Unable to use specified module loader for ".ts"` if you don't have `@babel/register`. No need extra configurations.

> Webpack and Babel packages are added using `--dev | -D` flag not to include those in the final code bundle

# Step 6. Create 'babel.config.json' file

```json
{
  // there's room for discussions, but I won't exclude node_modules here
  // https://stackoverflow.com/questions/54156617/why-would-we-exclude-node-modules-when-using-babel-loader
  // "exclude": "node_modules/**",
  "presets": [
    "@babel/preset-env",
    [
      "@babel/preset-react",
      {
        "runtime": "automatic" // the default option, "classic" does not automatic import anything.
        // https://stackoverflow.com/questions/32070303/uncaught-referenceerror-react-is-not-defined
      }
    ],
    "@babel/preset-typescript" // transpile typescript
  ]
}
```

## Step 7. Add loaders for webpack

> Disclaimer: these loaders are third-party packages maintained by community members, it potentially does not have the same support, security policy or license as webpack, and it is not maintained by webpack. - webpack documentation

There are instructions below about implementations of the loaders listed below; however, you can go to the links and follow the instructions if you encounter any issues along the way.

```bash
$ yarn add --dev babel-loader # to connect Babel and webpack
$ yarn add --dev html-webpack-plugin html-loader # for HTML
$ yarn add --dev style-loader css-loader sass-loader postcss postcss-loader postcss-preset-env mini-css-extract-plugin # for CSS
$ yarn add --dev react-refresh @pmmmwh/react-refresh-webpack-plugin # for HMR
```

### # connect babel and webpack

- [babel-loader](https://webpack.js.org/loaders/babel-loader/)(v9.1.0): allows transpiling JavaScript files using [Babel](https://github.com/babel/babel) and [webpack](https://github.com/webpack/webpack).

### # html-related

- [html-webpack-plugin](https://webpack.js.org/plugins/html-webpack-plugin/#root)(v5.5.0): generate an HTML5 file for you that includes all your webpack bundles in the body using `script` tags. You can use your own template as well.
- [html-loader](https://webpack.js.org/loaders/html-loader/)(v4.2.0): exports HTML as string. HTML is minimized when the compiler demands.

### # style-related

- [style-loader](https://webpack.js.org/loaders/style-loader/)(v3.3.1): inject CSS into the DOM. It will be only used when it's on development. `MiniCssExtractPlugin` will be used for production.
  - Simply, the `style-loader` directly injects CSS inside style tags in the DOM, `MiniCssExtractPlugin` bundles your CSS and creates separate CSS files.
  - One of the reasons I decided to use as above is that when using the `style-loader`, it's imperative receiving unnecessary inline styles whereas you can load css files **on demand** when using `MiniCssExtractPlugin`. It doesn't make a huge difference if your application is relatively small thou.
- [css-loader](https://webpack.js.org/loaders/css-loader/)(v6.7.2): interpret `@import` and `url()` like `import/require()` and will resolve them.

  > You need the two loaders above even if you don't wanna use Sass or Tailwind

- [postcss-loader](https://webpack.js.org/loaders/postcss-loader/)(v7.0.2): allow using postcss and to use **Tailwind CSS**.
  - w/ [postcss](https://github.com/postcss/postcss#usage)(v8.4.19): a tool for transforming styles with JS plugins. These plugins can lint your CSS, support variables and mixins, transpile future CSS syntax, inline images, and more.
  - w/ [postcss-preset-env](https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env)(v7.8.3): convert modern CSS into something most browsers can understand, determining the polyfills you need based on your targeted browsers or runtime environments. It takes the support data that comes from MDN and Can I Use and determine from a [browserlist](https://github.com/browserslist/browserslist) whether those transformations are needed. It also packs [Autoprefixer](https://github.com/postcss/autoprefixer) within and shares the list with it, so prefixes are only applied when you're going to need them given your browser support list.

> Since we're going to use Sass and Tailwind CSS in addition to the native CSS, as recommended on the [Tailwind's official documentation](https://tailwindcss.com/docs/installation/using-postcss), we're going to use PostCSS. \*You don't have to install `autoprefixer` because it is already included in the `postcss-preset-env`

- [sass-loader](https://webpack.js.org/loaders/sass-loader/)(v13.2.0): load a Sass/SCSS file and compiles it to CSS.

  - w/ [sass](https://sass-lang.com/documentation/)(v1.56.2): Sass is a stylesheet language that’s compiled to CSS. It allows you to use [variables](https://sass-lang.com/documentation/variables), [nested rules](https://sass-lang.com/documentation/style-rules#nesting), [mixins](https://sass-lang.com/documentation/at-rules/mixin), [functions](https://sass-lang.com/documentation/modules), and more, all with a fully CSS-compatible syntax.

- [MiniCssExtractPlugin](https://webpack.js.org/plugins/mini-css-extract-plugin/)(v2.7.2): extract CSS into separate files. It creates a CSS file per JS file which contains CSS. It supports **On-Demand-Loading** of CSS and SourceMaps. We're going to use it in production.

### # HMR (Hot Module Replacement) related (developement only)

[What is 'Hot Module Replacement?'](https://webpack.js.org/concepts/hot-module-replacement/)

instead of using classic `HotModuleReplacementPlugin`, we're going to implement "Fast Refresh" with `react-refresh` and `@pmmmwh/react-refresh-webpack-plugin`.
TMI: [Next.js natively supports the Fast Refresh](https://nextjs.org/docs/basic-features/fast-refresh)

> `react-refresh` implements the wiring necessary to integrate Fast Refresh into bundlers. Fast Refresh is a feature that lets you edit React components in a running application without losing their state. It is similar to an old feature known as "hot reloading", but Fast Refresh is more reliable and officially supported by React.

Disclaimer: `@pmmmwh/react-refresh-webpack-plugin` is not 100% stable

- [@pmmmwh/react-refresh-webpack-plugin](https://github.com/pmmmwh/react-refresh-webpack-plugin)(v0.5.10)
- [react-refresh](https://www.npmjs.com/package/react-refresh)(v0.14.0)([rough guide from #gaearon](https://github.com/facebook/react/issues/16604#issuecomment-528663101))

## Step 8. Add extra

```bash
$ yarn add --dev typescript-plugin-css-modules # to use CSS module in TypeScript
```

- [typescript-plugin-css-modules](https://github.com/mrmckeb/typescript-plugin-css-modules)(v4.1.1): A [TypeScript language service plugin](https://github.com/Microsoft/TypeScript/wiki/Writing-a-Language-Service-Plugin) for [CSS Modules](https://github.com/css-modules/css-modules).

After everything is installed, your `package.json` should look something like this:

```json
{
  "name": "my-app",
  "version": "0.0.1",
  "description": "Brandon's complete guide for manual react app setup with TypeScript ",
  "main": "./index.js",
  "author": "brandonwie",
  "license": "MIT",
  "private": false,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.4.5"
  },
  "devDependencies": {
    "@babel/core": "^7.20.5",
    "@babel/preset-env": "^7.20.2",
    "@babel/preset-react": "^7.18.6",
    "@babel/preset-typescript": "^7.18.6",
    "@babel/register": "^7.18.9",
    "@pmmmwh/react-refresh-webpack-plugin": "^0.5.10",
    "@types/react": "^18.0.26",
    "@types/react-dom": "^18.0.9",
    "@types/react-router-dom": "^5.3.3",
    "@types/webpack": "^5.28.0",
    "@types/webpack-dev-server": "^4.7.2",
    "babel-loader": "^9.1.0",
    "css-loader": "^6.7.2",
    "html-loader": "^4.2.0",
    "html-webpack-plugin": "^5.5.0",
    "mini-css-extract-plugin": "^2.7.2",
    "postcss": "^8.4.19",
    "postcss-loader": "^7.0.2",
    "postcss-preset-env": "^7.8.3",
    "react-refresh": "^0.14.0",
    "sass": "^1.56.2",
    "sass-loader": "^13.2.0",
    "style-loader": "^3.3.1",
    "tailwindcss": "^3.2.4",
    "typescript": "^4.9.3",
    "typescript-plugin-css-modules": "^4.1.1",
    "webpack": "^5.75.0",
    "webpack-cli": "^5.0.1",
    "webpack-dev-server": "^4.11.1"
  }
}
```

## Step 9. Create tsconfig.json

```bash
$ touch tsconfig.json
# or you can let tsc to handle it
$ tsc --init
```

your settings should look something like this:

```json
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig to read more about this file */
    /* Language and Environment */
    //NOTE @brandonwie target latest version of ECMAScript
    "target": "ESNext" /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */,
    "lib": [
      "DOM",
      "DOM.Iterable",
      "ESNext"
    ] /* Specify a set of bundled library declaration files that describe the target runtime environment. */,
    "jsx": "react-jsx" /* Specify what JSX code is generated. */,
    /* Modules */
    "module": "ESNext" /* Specify what module code is generated. */,
    //NOTE @brandonwie Search under node_modules for no-relative imports
    "moduleResolution": "node" /* Specify how TypeScript looks up a file from a given module specifier. */,
    "baseUrl": "./src" /* Specify the base directory to resolve non-relative module names. */,
    "paths": {
      "@*": ["*"]
    } /* Specify a set of entries that re-map imports to additional lookup locations. */,
    "types": [
      "node"
    ] /* Specify type package names to be included without being referenced in a source file. */,
    "resolveJsonModule": true /* Enable importing .json files. */,

    /* JavaScript Support */
    //NOTE @brandonwie Process & infer types from .js files
    "allowJs": true /* Allow JavaScript files to be a part of your program. Use the 'checkJS' option to get errors from these files. */,
    "checkJs": true /* Enable error reporting in type-checked JavaScript files. */,
    /* Emit */
    //NOTE @brandonwie Don't emit; allow Babel to tranform files
    "noEmit": true /* Disable emitting files from a compilation. */,
    //NOTE @brandonwie Disallow features that require cross-file information for emit
    "isolatedModules": true /* Ensure that each file can be safely transpiled without relying on other imports. */,
    "allowSyntheticDefaultImports": true /* Allow 'import x from y' when a module doesn't have a default export. */,
    //NOTE @brandonwie Import non-ES modules as default imports
    "esModuleInterop": true /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */,
    "forceConsistentCasingInFileNames": true /* Ensure that casing is correct in imports. */,
    //NOTE @brandonwie Enable strictest settings like strictNullChecks & noImplicitAny
    "strict": true /* Enable all strict type-checking options. */,
    "noImplicitAny": true /* Enable error reporting for expressions and declarations with an implied 'any' type. */,
    "strictNullChecks": true /* When type checking, take into account 'null' and 'undefined'. */,
    "noFallthroughCasesInSwitch": true /* Enable error reporting for fallthrough cases in switch statements. */,
    "skipLibCheck": true /* Skip type checking all .d.ts files. */
  },
  "include": ["src", "declaration.d.ts"] /* Include modules in the program. */,
  "exclude": ["node_modules", "build"] /* Exclude modules from the program. */,
  "plugins": [{ "name": "typescript-plugin-css-modules" }] // to use css modules
}
```

Some of the settings above are personal; however, settings that aren't boolean are necessary.

## Step 10. Create webpack.config.ts

```bash
$ touch webpack.config.ts
```

your settings should look something like this:

```typescript
import path from 'path';
import webpack from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
//create css file per js file: https://webpack.kr/plugins/mini-css-extract-plugin/
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

const isDevelopment = process.env.NODE_ENV !== 'production';
// define plugins
const plugins: webpack.WebpackPluginInstance[] = [
  new HTMLWebpackPlugin({
    template: './public/index.html', // you have to have the template file
  }),
];
isDevelopment
  ? plugins.push(new ReactRefreshWebpackPlugin())
  : plugins.push(new MiniCssExtractPlugin());

const config: webpack.Configuration = {
  mode: isDevelopment ? 'development' : 'production',
  devServer: {
    hot: true,
    port: 3000,
  },
  entry: './src/index.tsx', // codes will be inside src folder
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    // more configurations: https://webpack.js.org/configuration/
  },
  plugins,
  resolve: {
    modules: [path.resolve(__dirname, './src'), 'node_modules'],
    // automatically resolve certain extensions (Ex. import './file' will automatically look for file.js)
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.css'],
    alias: {
      // absolute path importing files
      '@pages': path.resolve(__dirname, './src/pages'),
    },
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              plugins: [
                isDevelopment && require.resolve('react-refresh/babel'),
              ].filter(Boolean),
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/i, // .sass or .scss
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // for Tailwind CSS
          'postcss-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
};

export default config;
```

The code above is based on many other references, so I recommend you to play along with the settings when you finish the setup. Also, you can use `.js` file instead of `.ts` file and don't use `@babel/register` since I just wanted to try it with TypeScript.

## Step 11. Create postcss.config.js

```bash
$ touch postcss.config.js
```

your settings should look something like this:

```javascript
module.exports = {
  // didn't add autoprefixer because it is already included in postcss-preset-env
  plugins: [require('tailwindcss'), require('postcss-preset-env')],
};
```

## Step 12. Create tailwind.config.js

```bash
$ touch tailwind.config.js
```

your settings should look something like this:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

## Step 13. Create public folder and index.html file to use it as a template

From the setting above, we told the webpack to find `./public/index.html` and use it as a template file

```typescript
const plugins: webpack.WebpackPluginInstance[] = [
  new HTMLWebpackPlugin({
    template: './public/index.html', // you have to have the template file
  }),
];
```

```bash
$ mkdir public && touch public/index.html
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Brandon's App'</title>
  </head>
  <body>
    <div id="root"></div>
    <!-- for react -->
  </body>
</html>
```

If you use VSCode, simply you can type `!` and `enter` to create the HTML codes.

## Step 14. Create src folder, index.tsx, and App.tsx

```bash
$ mkdir src && touch src/index.tsx src/App.tsx
```

Your entry is set to `index.tsx` in the `src` folder in `webpack.config.ts` file

```typescript
const config: webpack.Configuration = {
  mode: isDevelopment ? 'development' : 'production',
  devServer: {
    hot: true,
    port: 3000,
  },
  entry: './src/index.tsx', // codes will be inside src folder
  ...
}
```

Your `index.tsx` file should look something like this:

```typescript
import { createRoot } from 'react-dom/client';

import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(<App />);
```

If you've been using React version 17 or below, you may find the rendering method is somewhat different. Please follow the link, [How to Upgrade to React 18](https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html).

Your `App.tsx` file may look something like this:

```typescript
import styles from './App.module';
import SamplePage from '@pages/Sample';
import './main.css';

const App: React.FC = () => {
  return (
    <div>
      <div className={styles.title}>CSS module works!</div>
      <div className={styles.subtitle}>CSS module + Tailwind works!</div>
      <div
        className={
          'border-[10px] border-solid border-red-800 rounded-full w-[200px] h-[200px] flex items-center justify-center text-center'
        }
      >
        Tailwind works!
      </div>
      <SamplePage />
    </div>
  );
};

export default App;
```

I hope you get the ideas here. What we've been setting are now available in our codes.

> 🙏 Please checkout this repository for more settings and codes

## Step 15. (optional) add scripts to package.json

```json
  "scripts": {
    "start": "webpack serve --hot --mode development",
    "build": "webpack --mode production"
  }
```

Now you can run the app with `yarn start`

References

- [Creating your React project from scratch without create-react-app: The Complete Guide](https://dev.to/underscorecode/creating-your-react-project-from-scratch-without-create-react-app-the-complete-guide-4kbc)(dev.to)
- [Speeding up your development with Webpack 5 HMR and React Fast Refresh](https://dev.to/workingeeks/speeding-up-your-development-with-webpack-5-hmr-and-react-fast-refresh-of8)(dev.to)
- [Setup a React app with Webpack and Babel](https://dev.to/deadwing7x/setup-a-react-app-with-webpack-and-babel-4o3k)(dev.to)
- [Setup a React App using Webpack, Babel and TypeScript](https://dev.to/deadwing7x/setup-a-react-app-using-webpack-babel-and-typescript-5927)(dev.to)
- [Webpack style-loader vs css-loader](https://stackoverflow.com/questions/34039826/webpack-style-loader-vs-css-loader)(stackoverflow)
- [Webpack style-loader vs css-loader](https://stackoverflow.com/questions/34039826/webpack-style-loader-vs-css-loader)(stackoverflow)
- [Webpack 러닝 가이드(learning guide) - KR](https://yamoo9.gitbook.io/webpack/)(gitbook.io)
