<template>
  <ace-md :data="aceData" :md="mdData" button-title="生成布局" @change="handleAceData">
    <div class="ly-wrapper">
      <div class="ly-col" :style="{ flex: col }" v-for="(col, idx) in layout.cols" :key="idx">
        <template v-for="item in layout.list[idx]" v-if="layout.list[idx]">
          <tomato :data="item.dataType" v-if="item.componentType === 'tomato'" />
          <skyblue :data="item.dataType" v-else-if="item.componentType === 'skyblue'" />
          <brown :data="item.dataType" v-else-if="item.componentType === 'brown'" />
          <crimson :data="item.dataType" v-else-if="item.componentType === 'crimson'" />
          <dodgerblue :data="item.dataType" v-else-if="item.componentType === 'dodgerblue'" />
          <seagreen :data="item.dataType" v-else-if="item.componentType === 'seagreen'" />
        </template>
      </div>
    </div>
  </ace-md>
</template>

<script>
import AceMd from '../../components/AceMd';

const _customData = {
  layout: {
    cols: [2, 3],
    list: [
      [
        {
          componentType: 'tomato',
          dataType: 1
        },
        {
          componentType: 'seagreen'
        },
        {
          componentType: 'dodgerblue',
          dataType: 1
        },
        {
          componentType: 'brown',
          dataType: 1
        }
      ],
      [
        {
          componentType: 'crimson'
        },
        {
          componentType: 'dodgerblue',
          dataType: 2
        },
        {
          componentType: 'skyblue'
        },
        {
          componentType: 'tomato',
          dataType: 2
        }
      ]
    ]
  },
  genComponents() {
    const colors = ['tomato', 'skyblue', 'brown', 'crimson', 'dodgerblue', 'seagreen'];

    return colors.reduce((a, c) => {
      a[c] = {
        functional: true,
        render(h, ctx) {
          return h(
            'div',
            {
              style: {
                height: 100 + c.length * 10 + 'px',
                padding: '10px',
                fontSize: '40px',
                backgroundColor: c
              }
            },
            [
              c,
              h(
                'p',
                {
                  style: {
                    fontSize: '24px'
                  }
                },
                'dataType：' + (ctx.props.data || 'default')
              )
            ]
          );
        }
      };
      return a;
    }, {});
  },
  docData: `
    ### 配置说明
    ---
    \`\`\`
    {
        cols: [2, 3],                   // 列数以及每列宽度占比，实际宽度算法：2/(2+3)、3/(2+3)，分别为40%、60%
        list: [                         // 布局二维数组
          [{                            // 组件数组，依次放置于对应列展示
              componentType: 'tomato',  // 组件类型，由前端指定，如示例中的使用的 tomato、skyblue、brown、crimson、dodgerblue、seagreen 六个组件
              dataType: 1               // 数据类型，用于相同组件展示不同数据，可前后端协商指定
          }]
        ]
    }
    \`\`\`
    &nbsp;
    ### 注意
    ---
    1 组件类型和数据类型的值可任意约定，前端映射
    2 如果页面中未重复使用某组件，则可以不指定该组件的数据类型
    3 组件类型和数据类型共同确定最终显示结果
        `
};

export default {
  name: 'DynamicLayout',
  components: { AceMd, ..._customData.genComponents() },
  data() {
    return {
      layout: _customData.layout,
      aceData: _customData.layout,
      mdData: _customData.docData
    };
  },
  methods: {
    handleAceData(data) {
      this.layout = data;
    }
  }
};
</script>

<style scoped lang="less">
.ly {
  &-wrapper {
    display: flex;
    height: 100%;
    padding: 10px;
  }

  &-col {
    &:not(:first-of-type) {
      margin-left: 10px;
    }
  }
}
</style>
