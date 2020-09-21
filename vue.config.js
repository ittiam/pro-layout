let path = require('path');
let webpack = require('webpack');
let GitRevisionPlugin = require('git-revision-webpack-plugin');
let gitRevisionPlugin = new GitRevisionPlugin();

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

const publicPath = process.env.NODE_ENV === 'production' ? '' : '/';

module.exports = {
  publicPath: publicPath,
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
      patterns: [resolve('./src/assets/style/public.less')]
    },
    'wpg-server-config': {
      publicPath: publicPath
    }
  },
  configureWebpack: {
    // webpack plugins
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.DefinePlugin({
        BUILD_INFO: JSON.stringify(getBuildInfo())
      })
    ]
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      });

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
          modifyVars: {},
          javascriptEnabled: true
        }
      }
    }
  }
};
