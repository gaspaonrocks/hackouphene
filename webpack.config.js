const fs = require("fs");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CircularDependencyPlugin = require("circular-dependency-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const rxPaths = require("rxjs/_esm5/path-mapping");
const autoprefixer = require("autoprefixer");

const {
  NoEmitOnErrorsPlugin,
  SourceMapDevToolPlugin,
  NamedModulesPlugin
} = require("webpack");
const {
  NamedLazyChunksWebpackPlugin,
  BaseHrefWebpackPlugin,
  PostcssCliResources
} = require("@angular/cli/plugins/webpack");
const { CommonsChunkPlugin } = require("webpack").optimize;
const { AngularCompilerPlugin } = require("@ngtools/webpack");

const nodeModules = path.join(process.cwd(), "node_modules");
const realNodeModules = fs.realpathSync(nodeModules);
const genDirNodeModules = path.join(
  process.cwd(),
  "src",
  "$$_gendir",
  "node_modules"
);
const entryPoints = [
  "inline",
  "polyfills",
  "sw-register",
  "styles",
  "vendor",
  "main"
];
const hashFormat = { chunk: "", extract: "", file: ".[hash:20]", script: "" };
const baseHref = "";
const deployUrl = "";
const projectRoot = process.cwd();
const maximumInlineSize = 10;

module.exports = {
  resolve: {
    extensions: [".ts", ".js"],
    symlinks: true,
    modules: ["./src", "./node_modules"],
    alias: rxPaths(),
    mainFields: ["browser", "module", "main"]
  },
  resolveLoader: {
    modules: ["./node_modules"],
    alias: rxPaths()
  },
  entry: {
    main: ["./src\\main.ts"],
    polyfills: ["./src\\polyfills.ts"],
    styles: ["./src\\styles.scss"]
  },
  output: {
    path: path.join(process.cwd(), "dist"),
    filename: "[name].bundle.js",
    chunkFilename: "[id].chunk.js",
    crossOriginLoading: false
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "raw-loader"
      },
      {
        test: /\.(eot|svg|cur)$/,
        loader: "file-loader",
        options: {
          name: "[name].[hash:20].[ext]",
          limit: 10000
        }
      },
      {
        test: /\.(jpg|png|webp|gif|otf|ttf|woff|woff2|ani)$/,
        loader: "url-loader",
        options: {
          name: "[name].[hash:20].[ext]",
          limit: 10000
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              precision: 8,
              includePaths: []
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["to-string-loader", "css-loader"]
      },
      {
        test: /\.ts$/,
        loader: "@ngtools/webpack"
      }
    ]
  },
  plugins: [
    new NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin(
      [
        {
          context: "src",
          to: "",
          from: {
            glob: "assets\\**\\*",
            dot: true
          }
        },
        {
          context: "src",
          to: "",
          from: {
            glob: "favicon.ico",
            dot: true
          }
        }
      ],
      {
        ignore: [".gitkeep", "**/.DS_Store", "**/Thumbs.db"],
        debug: "warning"
      }
    ),
    new CircularDependencyPlugin({
      exclude: /(\\|\/)node_modules(\\|\/)/,
      failOnError: false,
      onDetected: false,
      cwd: projectRoot
    }),
    new NamedLazyChunksWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src\\index.html",
      filename: "./index.html",
      hash: false,
      inject: true,
      compile: true,
      favicon: false,
      minify: false,
      cache: true,
      showErrors: true,
      chunks: "all",
      excludeChunks: [],
      title: "Webpack App",
      xhtml: true,
      chunksSortMode: function sort(left, right) {
        let leftIndex = entryPoints.indexOf(left.names[0]);
        let rightindex = entryPoints.indexOf(right.names[0]);
        if (leftIndex > rightindex) {
          return 1;
        } else if (leftIndex < rightindex) {
          return -1;
        } else {
          return 0;
        }
      }
    }),
    new BaseHrefWebpackPlugin({}),
    new CommonsChunkPlugin({
      name: ["inline"],
      minChunks: null
    }),
    new CommonsChunkPlugin({
      name: ["vendor"],
      minChunks: module => {
        return (
          module.resource &&
          (module.resource.startsWith(nodeModules) ||
            module.resource.startsWith(genDirNodeModules) ||
            module.resource.startsWith(realNodeModules))
        );
      },
      chunks: ["main"]
    }),
    new SourceMapDevToolPlugin({
      filename: "[file].map[query]",
      moduleFilenameTemplate: "[resource-path]",
      fallbackModuleFilenameTemplate: "[resource-path]?[hash]",
      sourceRoot: "webpack:///"
    }),
    new CommonsChunkPlugin({
      name: ["main"],
      minChunks: 2,
      async: "common"
    }),
    new NamedModulesPlugin({}),
    new AngularCompilerPlugin({
      mainPath: "main.ts",
      platform: 0,
      hostReplacementPaths: {
        "environments\\environment.ts": "environments\\environment.ts"
      },
      sourceMap: true,
      tsConfigPath: "src\\tsconfig.app.json",
      skipCodeGeneration: true,
      compilerOptions: {}
    })
  ],
  node: {
    fs: "empty",
    global: true,
    crypto: "empty",
    tls: "empty",
    net: "empty",
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  },
  devServer: {
    historyApiFallback: true
  }
};
