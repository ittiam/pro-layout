let path = require('path');
let webpack = require('webpack');
let GitRevisionPlugin = require('git-revision-webpack-plugin');
let gitRevisionPlugin = new GitRevisionPlugin();
const ThemeColorReplacer = require('webpack-theme-color-replacer');
const { getThemeColors, modifyVars } = require('./src/utils/theme');
const { resolveCss } = require('./scripts/theme-color-replacer-extend');

function resolve(dir) {
  return path.join(__dirname, dir);
}

function getBuildInfo() {
  let buildInfo = {
    branch: '',
    commitId: '',
    buildDate: new Date().toISOString()
  };
  try {
    buildInfo.branch = gitRevisionPlugin.branch();
    buildInfo.commitId = gitRevisionPlugin.commithash();
  } catch (e) {}

  return buildInfo;
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/pro-layout/' : '/',
  outputDir: 'release/pro-layout',
  assetsDir: 'static',
  productionSourceMap: false,
  lintOnSave: false,
  devServer: {
    // proxy: {
    //   '/api': { //此处要与 /api/api.js 中的 API_PROXY_PREFIX 值保持一致
    //     target: process.env.VUE_APP_API_BASE_URL,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [resolve('./src/theme/variable.less')]
    }
  },
  configureWebpack: {
    // webpack plugins
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.DefinePlugin({
        BUILD_INFO: JSON.stringify(getBuildInfo())
      }),
      new ThemeColorReplacer({
        fileName: 'css/theme-colors-[contenthash:8].css',
        matchColors: getThemeColors(),
        injectCss: true,
        resolveCss
      })
    ]
  },
  chainWebpack: config => {
    // 生产环境下关闭css压缩的 colormin 项，因为此项优化与主题色替换功能冲突
    if (process.env.NODE_ENV === 'production') {
      config.plugin('optimize-css').tap(args => {
        args[0].cssnanoOptions.preset[1].colormin = false;
        return args;
      });
    }
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: modifyVars(),
          javascriptEnabled: true
        }
      }
    }
  }
};
