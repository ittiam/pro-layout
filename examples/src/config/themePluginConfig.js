export default {
  theme: [
    {
      name: '深奥蓝',
      key: 'deep-blue',
      circular: 'images/theme/deep-blue/circular.png',
      preview: 'images/theme/deep-blue/preview.png',
      active: 'images/theme/deep-blue/preview-on.png',
      fileName: 'deep-blue.css',
      dark: true,
      mode: () => import('@/themes/dark/index.less'),
      theme: () => import('@/themes/deep-blue/index.less')
    },
    {
      name: '星空蓝',
      key: 'star-blue',
      circular: 'images/theme/star-blue/circular.png',
      fileName: 'star-blue.css',
      dark: true,
      mode: () => import('@/themes/dark/index.less'),
      theme: () => import('@/themes/star-blue/index.less')
    },
    {
      name: 'WPG红',
      key: 'wpg-red',
      circular: 'images/theme/wpg-red/circular.png',
      fileName: 'wpg-red.css',
      mode: () => import('@/themes/light/index.less'),
      theme: () => import('@/themes/wpg-red/index.less')
    },
    {
      name: '阳光橙',
      key: 'sunny-orange',
      circular: 'images/theme/sunny-orange/circular.png',
      fileName: 'sunny-orange.css',
      mode: () => import('@/themes/dark/index.less'),
      theme: () => import('@/themes/sunny-orange/index.less')
    },
    {
      name: '海洋蓝',
      key: 'sea-blue',
      circular: 'images/theme/sea-blue/circular.png',
      fileName: 'sea-blue.css',
      mode: () => import('@/themes/dark/index.less'),
      theme: () => import('@/themes/sea-blue/index.less')
    },
    {
      name: '骑士黑',
      key: 'knight-black',
      circular: 'images/theme/knight-black/circular.png',
      fileName: 'knight-black.css',
      dark: true,
      mode: () => import('@/themes/dark/index.less'),
      theme: () => import('@/themes/knight-black/index.less')
    },
    {
      name: '晴空蓝',
      key: 'sunny-blue',
      circular: 'images/theme/sunny-blue/circular.png',
      fileName: 'sunny-blue.css',
      mode: () => import('@/themes/dark/index.less'),
      theme: () => import('@/themes/sunny-blue/index.less')
    },
    {
      name: '玉石白',
      key: 'stone-white',
      circular: 'images/theme/stone-white/circular.png',
      fileName: 'stone-white.css',
      mode: () => import('@/themes/dark/index.less'),
      theme: () => import('@/themes/stone-white/index.less')
    },
    {
      name: '罗兰紫',
      key: 'roland-purple',
      circular: 'images/theme/roland-purple/circular.png',
      fileName: 'roland-purple.css',
      mode: () => import('@/themes/dark/index.less'),
      theme: () => import('@/themes/roland-purple/index.less')
    }
  ]
};
