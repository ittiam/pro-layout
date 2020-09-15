/**
 * @DATE:  2019/7/25 4:45 PM
 * @Version: 0.0.1
 * @Author: huhaiou
 * @Description:
 * @Update: 更新内容 by huhaiou 2019/7/25 4:45 PM
 */

// const ak = 'uC5txC5bpV91ALbxaH0FLhVpRDPp8SEN';

/* 引入配置的百度应用ak */
export const ak = process.env.VUE_APP_AK;

/**
 * 异步加载百度地图
 * @returns {Promise}
 * @constructor
 */
function loadBaiDuMap() {
  return new Promise(function(resolve, reject) {
    try {
      resolve(BMap);
    } catch (e) {
      window.init = function() {
        resolve(BMap);
      };
      let script1 = document.createElement('script');
      script1.type = 'text/javascript';
      script1.src = 'http://api.map.baidu.com/api?v=3.0&ak=' + ak + '&callback=init';
      script1.onerror = reject;
      document.body.appendChild(script1);
    }
  });
}

/**
 * 异步加载百度地图绘制工具和热力图工具
 * @returns {Promise}
 * @constructor
 */
function loadBaiDuDrawMap() {
  return loadBaiDuMap().then(BMap => {
    let loaded = false;
    try {
      loaded = BMapLib && BMapLib.DrawingManager;
    } catch (e) {
      loaded = false;
    }
    if (!loaded) {
      console.log('BMapLib.DrawingManager loading!');
      let link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'http://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.css';
      document.body.appendChild(link);
      let script2 = document.createElement('script');
      script2.type = 'text/javascript';
      script2.src = 'http://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.js';
      document.body.appendChild(script2);
      let script3 = document.createElement('script');
      script3.type = 'text/javascript';
      script3.src = 'http://api.map.baidu.com/library/Heatmap/2.0/src/Heatmap_min.js';
      document.body.appendChild(script3);
    } else {
      console.log('BMapLib.DrawingManager is loaded!');
    }
    return BMap;
  });
}
export { loadBaiDuMap, loadBaiDuDrawMap };
