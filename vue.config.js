module.exports = {
  filenameHashing: false,
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true
  },
  publicPath: process.env.NODE_ENV === 'production' ? 'https://alan-cole.github.io/qld-bsc/': '/'
}
