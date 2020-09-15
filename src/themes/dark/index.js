/**
 * @DATE: 2019-12-06 14:52
 * @Version: 0.0.1
 * @Author: yunchangJia
 * @Description:  定义图表深色主题
 * @Update: 更新内容 by yunchangJia 2019-12-06 14:52
 */
/**
 * 忽略eslint检测全局变量，也可以直接加到eslintrc.js
 */
/* global define:false */

/**
 * 定义图表主题
 * darkCustomed     深色定制主题
 * blueFour1        饼图蓝主题
 * blueFive         饼图蓝主题
 * bGYPFour         饼图蓝绿黄配色
 * bluePurpleFive   饼图配色
 * blueFour2        柱状图配色
 * gRYBFour         柱状图叠加图
 * grYBThree        柱状图2
 * blueGreenEitht   饼图配色
 * maneyColorThirty 32颜色主题
 */
export const darkCustomed = {
  color: ['#4285f4', '#47efe1', '#f64357', '#ffd43b', '#8479ea', '#f687b4'],
  backgroundColor: 'rgba(18,22,29,1)',
  textStyle: {},
  title: {
    textStyle: {
      color: '#ffffff'
    },
    subtextStyle: {
      color: '#aaaaaa'
    }
  },
  line: {
    itemStyle: {
      normal: {
        borderWidth: '0'
      }
    },
    lineStyle: {
      normal: {
        width: '1.5'
      }
    },
    symbolSize: '2',
    symbol: 'circle',
    smooth: true
  },
  radar: {
    itemStyle: {
      normal: {
        borderWidth: '0'
      }
    },
    lineStyle: {
      normal: {
        width: '1.5'
      }
    },
    symbolSize: '2',
    symbol: 'circle',
    smooth: true
  },
  bar: {
    itemStyle: {
      normal: {
        barBorderWidth: '0',
        barBorderColor: '#ccc'
      },
      emphasis: {
        barBorderWidth: '0',
        barBorderColor: '#ccc'
      }
    }
  },
  pie: {
    itemStyle: {
      normal: {
        borderWidth: '0',
        borderColor: '#ccc'
      },
      emphasis: {
        borderWidth: '0',
        borderColor: '#ccc'
      }
    }
  },
  scatter: {
    itemStyle: {
      normal: {
        borderWidth: '0',
        borderColor: '#ccc'
      },
      emphasis: {
        borderWidth: '0',
        borderColor: '#ccc'
      }
    }
  },
  boxplot: {
    itemStyle: {
      normal: {
        borderWidth: '0',
        borderColor: '#ccc'
      },
      emphasis: {
        borderWidth: '0',
        borderColor: '#ccc'
      }
    }
  },
  parallel: {
    itemStyle: {
      normal: {
        borderWidth: '0',
        borderColor: '#ccc'
      },
      emphasis: {
        borderWidth: '0',
        borderColor: '#ccc'
      }
    }
  },
  sankey: {
    itemStyle: {
      normal: {
        borderWidth: '0',
        borderColor: '#ccc'
      },
      emphasis: {
        borderWidth: '0',
        borderColor: '#ccc'
      }
    }
  },
  funnel: {
    itemStyle: {
      normal: {
        borderWidth: '0',
        borderColor: '#ccc'
      },
      emphasis: {
        borderWidth: '0',
        borderColor: '#ccc'
      }
    }
  },
  gauge: {
    itemStyle: {
      normal: {
        borderWidth: '0',
        borderColor: '#ccc'
      },
      emphasis: {
        borderWidth: '0',
        borderColor: '#ccc'
      }
    }
  },
  candlestick: {
    itemStyle: {
      normal: {
        color: '#f64357',
        color0: '#47efe1',
        borderColor: '#f64357',
        borderColor0: '#47efe1',
        borderWidth: '-22'
      }
    }
  },
  graph: {
    itemStyle: {
      normal: {
        borderWidth: '0',
        borderColor: '#ccc'
      }
    },
    lineStyle: {
      normal: {
        width: '1',
        color: '#495057'
      }
    },
    symbolSize: '2',
    symbol: 'circle',
    smooth: true,
    color: ['#4285f4', '#47efe1', '#f64357', '#ffd43b', '#8479ea', '#f687b4'],
    label: {
      normal: {
        textStyle: {
          color: '#ffffff'
        }
      }
    }
  },
  map: {
    itemStyle: {
      normal: {
        areaColor: '#343d48',
        borderColor: '#20262f',
        borderWidth: '0.5'
      },
      emphasis: {
        areaColor: 'rgba(66,133,244,1)',
        borderColor: '#444444',
        borderWidth: 1
      }
    },
    label: {
      normal: {
        textStyle: {
          color: '#000000'
        }
      },
      emphasis: {
        textStyle: {
          color: 'rgb(255,255,255)'
        }
      }
    }
  },
  geo: {
    itemStyle: {
      normal: {
        areaColor: '#343d48',
        borderColor: '#20262f',
        borderWidth: '0.5'
      },
      emphasis: {
        areaColor: 'rgba(66,133,244,1)',
        borderColor: '#444444',
        borderWidth: 1
      }
    },
    label: {
      normal: {
        textStyle: {
          color: '#000000'
        }
      },
      emphasis: {
        textStyle: {
          color: 'rgb(255,255,255)'
        }
      }
    }
  },
  categoryAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#282e34'
      }
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: '#282e34'
      }
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: '#868e96'
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ['#282e34']
      }
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['#eeeeee']
      }
    }
  },
  valueAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#282e34'
      }
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: '#282e34'
      }
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: '#868e96'
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ['#282e34']
      }
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['#eeeeee']
      }
    }
  },
  logAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#282e34'
      }
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: '#282e34'
      }
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: '#868e96'
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ['#282e34']
      }
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['#eeeeee']
      }
    }
  },
  timeAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#282e34'
      }
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: '#282e34'
      }
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: '#868e96'
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ['#282e34']
      }
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['#eeeeee']
      }
    }
  },
  toolbox: {
    iconStyle: {
      normal: {
        borderColor: '#87909f'
      },
      emphasis: {
        borderColor: '#a2b0c6'
      }
    }
  },
  legend: {
    textStyle: {
      color: '#868e96'
    }
  },
  tooltip: {
    axisPointer: {
      lineStyle: {
        color: '#4285f4',
        width: '60'
      },
      crossStyle: {
        color: '#4285f4',
        width: '60'
      }
    }
  },
  timeline: {
    lineStyle: {
      color: '#eeeeee',
      width: 1
    },
    itemStyle: {
      normal: {
        color: '#dd6b66',
        borderWidth: 1
      },
      emphasis: {
        color: '#495057'
      }
    },
    controlStyle: {
      normal: {
        color: '#eeeeee',
        borderColor: '#eeeeee',
        borderWidth: 0.5
      },
      emphasis: {
        color: '#eeeeee',
        borderColor: '#eeeeee',
        borderWidth: 0.5
      }
    },
    checkpointStyle: {
      color: '#adb5bd',
      borderColor: 'rgba(194,53,49,0.5)'
    },
    label: {
      normal: {
        textStyle: {
          color: '#eeeeee'
        }
      },
      emphasis: {
        textStyle: {
          color: '#eeeeee'
        }
      }
    }
  },
  visualMap: {
    color: ['#f64357', '#ffd43b', '#ffffff', '#4285f4']
  },
  dataZoom: {
    backgroundColor: 'rgba(24,28,36,1)',
    dataBackgroundColor: 'rgba(45,51,58,1)',
    fillerColor: 'rgba(255,255,255,0.06)',
    handleColor: '#495057',
    handleSize: '120%',
    textStyle: {
      color: '#868e96'
    }
  },
  markPoint: {
    label: {
      normal: {
        textStyle: {
          color: '#ffffff'
        }
      },
      emphasis: {
        textStyle: {
          color: '#ffffff'
        }
      }
    }
  }
};
export const blueFour1 = { ...darkCustomed, color: ['#71A3F8', '#4285F4', '#254EDB', '#3366FF'] };
export const blueFive = {
  ...darkCustomed,
  color: ['#4285F4', '#1252B2', '#3875DA', '#71A3F8', '#ADC9FA']
};
export const bGYPFour = { ...darkCustomed, color: ['#0179F3', '#87CE40', '#FFD43B', '#1353B3'] };
export const bluePurpleFive = {
  ...darkCustomed,
  color: ['#4E40D5', '#0ACC9D', '#6154DA', '#3498FD', '#20262F']
};
export const blueFour2 = { ...darkCustomed, color: ['#4EA6FF', '#2588EC', '#0868C8', '#0054A7'] };
export const gRYBFour = { ...darkCustomed, color: ['#47EFE1', '#F64357', '#FFD43B', '#4285F4'] };
export const grYBThree = { ...darkCustomed, color: ['#47EFE1', '#FFD43B', '#F64357'] };
export const blueGreenEitht = {
  ...darkCustomed,
  color: ['#2F2A79', '#4D3FD5', '#6154DA', '#8479EA', '#AFA7FB', '#8F40FF', '#2D4A75', '#F64357']
};
export const maneyColorThirty = {
  ...darkCustomed,
  color: [
    '#35BCFF',
    '#818BFC',
    '#92FFE0',
    '#3572FF',
    '#8EAC00',
    '#1E729D',
    '#00B457',
    '#004DFB',
    '#B158FF',
    '#671FD3',
    '#6958FF',
    '#FD58FF',
    '#C5EA65',
    '#FFC16C',
    '#C36F44',
    '#2CEF8B',
    '#8EAC00',
    '#DDF63E',
    '#F59F00',
    '#E8590C',
    '#CC2B6C',
    '#3829CC',
    '#007558',
    '#6190DA',
    '#8479EA',
    '#E9669B',
    '#FF3379',
    '#A80B4A',
    '#9B92F3'
  ]
};

/* 引入 echarts */
import echarts from 'echarts';

/**
 * 初始化主题
 * @param root
 * @param factory
 */
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['exports', 'echarts'], factory);
  } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
    // CommonJS
    factory(exports, require('echarts'));
  } else {
    // Browser globals
    factory({}, echarts);
  }
})(this, function(exports, echarts) {
  let log = function(msg) {
    if (typeof console !== 'undefined') {
      console && console.error && console.error(msg);
    }
  };
  if (!echarts) {
    log('ECharts is not Loaded');
    return;
  }
  echarts.registerTheme('dark', darkCustomed);
  echarts.registerTheme('blueFour1', blueFour1);
  // echarts.registerTheme('blueFive', blueFive);
  // echarts.registerTheme('bGYPFour', bGYPFour);
  // echarts.registerTheme('bluePurpleFive', bluePurpleFive);
  // echarts.registerTheme('blueFour2', blueFour2);
  // echarts.registerTheme('gRYBFour', gRYBFour);
  // echarts.registerTheme('grYBThree', grYBThree);
  // echarts.registerTheme('blueGreenEitht', blueGreenEitht);
  // echarts.registerTheme('maneyColorThirty', maneyColorThirty);
});
