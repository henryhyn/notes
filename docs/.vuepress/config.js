const navConfig = require('./config/navConfig');
const pluginConfig = require('./config/pluginConfig');
const trans = require('transliteration');

module.exports = {
  title: '知源笔记',
  description: '通过 VuePress 静态站点记录一些文字',
  port: 8765,
  plugins: pluginConfig,
  markdown: {
    slugify: trans.slugify,
    lineNumbers: true
  },
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['link', { rel: 'shortcut icon', href: '//v2.vuepress.vuejs.org/images/hero.png' }],
    ['link', { rel: 'apple-touch-icon', href: '//v2.vuepress.vuejs.org/images/hero.png' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],
  themeConfig: {
    nav: navConfig,
    smoothScroll: true,
    lastUpdated: '上次更新'
  }
};
