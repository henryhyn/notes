const dayjs = require('dayjs');
dayjs.locale(require('dayjs/locale/zh-cn'));
dayjs.extend(require('dayjs/plugin/relativeTime'));

module.exports = {
  '@vuepress/back-to-top': true,
  '@vuepress/medium-zoom': true,
  '@vuepress/last-updated': {
    transformer: val => `${dayjs(val).format('YYYY-MM-DD HH:mm:ss')} (${dayjs(val).fromNow()})`
  },
  '@maginapp/vuepress-plugin-katex': {
    delimiters: 'dollars'
  },
  'vuepress-plugin-code-copy': {
    staticIcon: true
  },
  'vuepress-plugin-flowchart': true,
  'vuepress-plugin-git-log': true,
  'vuepress-plugin-auto-sidebar': {
    sidebarDepth: 2,
    titleMode: 'uppercase',
    titleMap: {
      essay: '随笔'
    }
  }
};
