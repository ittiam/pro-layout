<template>
  <div class="right-panel">
    <a-tabs v-model="currentTab" class="center-tabs">
      <a-tab-pane key="field" tab="组件属性">
        <div class="field-box" :style="scrollStyle">
          <vc-scrollbar class="right-scrollbar">
            <a-form-model v-show="showField">
              <a-form-model-item v-if="activeData.__config__.changeTag" label="组件类型">
                <a-select
                  v-model="activeData.__config__.tagIcon"
                  placeholder="请选择组件类型"
                  :style="{ width: '100%' }"
                  @change="tagChange"
                >
                  <a-select-opt-group
                    v-for="group in tagList"
                    :key="group.label"
                    :label="group.label"
                  >
                    <a-select-option
                      v-for="item in group.options"
                      :key="item.__config__.label"
                      :label="item.__config__.label"
                      :value="item.__config__.tagIcon"
                    >
                      <svg-icon class="node-icon" :icon-class="item.__config__.tagIcon" />
                      <span> {{ item.__config__.label }}</span>
                    </a-select-option>
                  </a-select-opt-group>
                </a-select>
              </a-form-model-item>
              <a-form-model-item
                v-if="activeData.__config__.componentName !== undefined"
                label="组件名"
              >
                <a-input
                  v-model="activeData.__config__.componentName"
                  placeholder="请输入组件名称"
                />
              </a-form-model-item>
              <a-form-model-item v-if="activeData.__vModel__ !== undefined" label="字段名">
                <a-input v-model="activeData.__vModel__" placeholder="请输入字段名（v-model）" />
              </a-form-model-item>
              <a-form-model-item v-if="activeData.__config__.label !== undefined" label="标题">
                <a-input
                  v-model="activeData.__config__.label"
                  placeholder="请输入标题"
                  @input="changeRenderKey"
                />
              </a-form-model-item>
              <a-form-model-item v-if="activeData.placeholder !== undefined" label="占位提示">
                <a-input
                  v-model="activeData.placeholder"
                  placeholder="请输入占位提示"
                  @input="changeRenderKey"
                />
              </a-form-model-item>
              <a-form-model-item
                v-if="activeData['start-placeholder'] !== undefined"
                label="开始占位"
              >
                <a-input v-model="activeData['start-placeholder']" placeholder="请输入占位提示" />
              </a-form-model-item>
              <a-form-model-item
                v-if="activeData['end-placeholder'] !== undefined"
                label="结束占位"
              >
                <a-input v-model="activeData['end-placeholder']" placeholder="请输入占位提示" />
              </a-form-model-item>
              <a-form-model-item v-if="activeData.__config__.span !== undefined" label="表单栅格">
                <a-slider
                  v-model="activeData.__config__.span"
                  :max="24"
                  :min="1"
                  :marks="{ 12: '' }"
                  @change="spanChange"
                />
              </a-form-model-item>
              <a-form-model-item
                v-if="
                  activeData.__config__.layout === 'rowFormItem' && activeData.gutter !== undefined
                "
                label="栅格间隔"
              >
                <a-input-number v-model="activeData.gutter" :min="0" placeholder="栅格间隔" />
              </a-form-model-item>
              <a-form-model-item
                v-if="
                  activeData.__config__.layout === 'rowFormItem' && activeData.type !== undefined
                "
                label="布局模式"
              >
                <a-radio-group v-model="activeData.type">
                  <a-radio-button value="default">默认</a-radio-button>
                  <a-radio-button value="flex">flex</a-radio-button>
                </a-radio-group>
              </a-form-model-item>
              <a-form-model-item
                v-if="activeData.justify !== undefined && activeData.type === 'flex'"
                label="水平排列"
              >
                <a-select
                  v-model="activeData.justify"
                  placeholder="请选择水平排列"
                  :style="{ width: '100%' }"
                >
                  <a-select-option
                    v-for="(item, index) in justifyOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
              <a-form-model-item
                v-if="activeData.align !== undefined && activeData.type === 'flex'"
                label="垂直排列"
              >
                <a-radio-group v-model="activeData.align">
                  <a-radio-button value="top">top</a-radio-button>
                  <a-radio-button value="middle">middle</a-radio-button>
                  <a-radio-button value="bottom">bottom</a-radio-button>
                </a-radio-group>
              </a-form-model-item>
              <a-form-model-item
                v-if="activeData.__config__.labelWidth !== undefined"
                label="标签宽度"
              >
                <a-input
                  v-model.number="activeData.__config__.labelWidth"
                  type="number"
                  placeholder="请输入标签宽度"
                />
              </a-form-model-item>
              <a-form-model-item
                v-if="activeData.style && activeData.style.width !== undefined"
                label="组件宽度"
              >
                <a-input v-model="activeData.style.width" placeholder="请输入组件宽度" clearable />
              </a-form-model-item>
              <a-form-model-item v-if="activeData.__vModel__ !== undefined" label="默认值">
                <a-input
                  :value="setDefaultValue(activeData.__config__.defaultValue)"
                  placeholder="请输入默认值"
                  @input="onDefaultValueInput"
                />
              </a-form-model-item>
              <a-form-model-item
                v-if="activeData.__config__.tag === 'el-checkbox-group'"
                label="至少应选"
              >
                <a-input-number
                  :value="activeData.min"
                  :min="0"
                  placeholder="至少应选"
                  @input="$set(activeData, 'min', $event ? $event : undefined)"
                />
              </a-form-model-item>
              <a-form-model-item
                v-if="activeData.__config__.tag === 'el-checkbox-group'"
                label="最多可选"
              >
                <a-input-number
                  :value="activeData.max"
                  :min="0"
                  placeholder="最多可选"
                  @input="$set(activeData, 'max', $event ? $event : undefined)"
                />
              </a-form-model-item>
              <a-form-model-item
                v-if="activeData.__slot__ && activeData.__slot__.prepend !== undefined"
                label="前缀"
              >
                <a-input v-model="activeData.__slot__.prepend" placeholder="请输入前缀" />
              </a-form-model-item>
              <a-form-model-item
                v-if="activeData.__slot__ && activeData.__slot__.append !== undefined"
                label="后缀"
              >
                <a-input v-model="activeData.__slot__.append" placeholder="请输入后缀" />
              </a-form-model-item>
              <a-form-model-item
                v-if="activeData.__slot__ && activeData.__slot__.suffix !== undefined"
                label="后缀文字"
              >
                <a-input v-model="activeData.__slot__.suffix" placeholder="请输入后缀文字" />
              </a-form-model-item>
              <a-form-model-item v-if="activeData['prefix-icon'] !== undefined" label="前图标">
                <a-input v-model="activeData['prefix-icon']" placeholder="请输入前图标名称">
                  <span
                    slot="addonAfter"
                    class="addon-after"
                    @click="openIconsDialog('prefix-icon')"
                  >
                    <a-icon type="eye" />
                    选择
                  </span>
                </a-input>
              </a-form-model-item>
              <a-form-model-item v-if="activeData['suffix-icon'] !== undefined" label="后图标">
                <a-input v-model="activeData['suffix-icon']" placeholder="请输入后图标名称">
                  <span
                    slot="addonAfter"
                    class="addon-after"
                    @click="openIconsDialog('suffix-icon')"
                  >
                    <a-icon type="eye" />
                    选择
                  </span>
                </a-input>
              </a-form-model-item>
              <a-form-model-item
                v-if="activeData['icon'] !== undefined && activeData.__config__.tag === 'el-button'"
                label="按钮图标"
              >
                <a-input v-model="activeData['icon']" placeholder="请输入按钮图标名称">
                  <span slot="addonAfter" class="addon-after" @click="openIconsDialog('icon')">
                    <a-icon type="eye" />
                    选择
                  </span>
                </a-input>
              </a-form-model-item>
              <a-form-model-item
                v-if="activeData.__config__.tag === 'el-cascader'"
                label="选项分隔符"
              >
                <a-input v-model="activeData.separator" placeholder="请输入选项分隔符" />
              </a-form-model-item>
              <a-form-model-item v-if="activeData.autosize !== undefined" label="最小行数">
                <a-input-number
                  v-model="activeData.autosize.minRows"
                  :min="1"
                  placeholder="最小行数"
                />
              </a-form-model-item>
              <a-form-model-item v-if="activeData.autosize !== undefined" label="最大行数">
                <a-input-number
                  v-model="activeData.autosize.maxRows"
                  :min="1"
                  placeholder="最大行数"
                />
              </a-form-model-item>
              <a-form-model-item v-if="isShowMin" label="最小值">
                <a-input-number v-model="activeData.min" placeholder="最小值" />
              </a-form-model-item>
              <a-form-model-item v-if="isShowMax" label="最大值">
                <a-input-number v-model="activeData.max" placeholder="最大值" />
              </a-form-model-item>
              <a-form-model-item v-if="activeData.height !== undefined" label="组件高度">
                <a-input-number
                  v-model="activeData.height"
                  placeholder="高度"
                  @input="changeRenderKey"
                />
              </a-form-model-item>
              <a-form-model-item v-if="isShowStep" label="步长">
                <a-input-number v-model="activeData.step" placeholder="步数" />
              </a-form-model-item>
              <a-form-model-item
                v-if="activeData.__config__.tag === 'el-input-number'"
                label="精度"
              >
                <a-input-number v-model="activeData.precision" :min="0" placeholder="精度" />
              </a-form-model-item>
              <a-form-model-item
                v-if="activeData.__config__.tag === 'el-input-number'"
                label="按钮位置"
              >
                <a-radio-group v-model="activeData['controls-position']">
                  <a-radio-button value="">
                    默认
                  </a-radio-button>
                  <a-radio-button value="right">
                    右侧
                  </a-radio-button>
                </a-radio-group>
              </a-form-model-item>
              <a-form-model-item v-if="activeData.maxlength !== undefined" label="最多输入">
                <a-input v-model="activeData.maxlength" placeholder="请输入字符长度">
                  <template slot="append">
                    个字符
                  </template>
                </a-input>
              </a-form-model-item>
              <a-form-model-item
                v-if="activeData.__readonly__ && activeData.__readonly__.span !== undefined"
                label="列的数量"
              >
                <a-input-number
                  v-model="activeData.__readonly__.span"
                  :min="1"
                  placeholder="包含列的数量"
                />
              </a-form-model-item>
              <a-form-model-item v-if="activeData['active-text'] !== undefined" label="开启提示">
                <a-input v-model="activeData['active-text']" placeholder="请输入开启提示" />
              </a-form-model-item>
              <a-form-model-item v-if="activeData['inactive-text'] !== undefined" label="关闭提示">
                <a-input v-model="activeData['inactive-text']" placeholder="请输入关闭提示" />
              </a-form-model-item>
              <a-form-model-item
                v-if="
                  activeData.type !== undefined && 'el-date-picker' === activeData.__config__.tag
                "
                label="时间类型"
              >
                <a-select
                  v-model="activeData.type"
                  placeholder="请选择时间类型"
                  :style="{ width: '100%' }"
                  @change="dateTypeChange"
                >
                  <a-select-option
                    v-for="(item, index) in dateOptions"
                    :key="index"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
              <a-form-model-item v-if="activeData.name !== undefined" label="文件字段名">
                <a-input v-model="activeData.name" placeholder="请输入上传文件字段名" />
              </a-form-model-item>
              <a-form-model-item v-if="activeData.accept !== undefined" label="文件类型">
                <a-select
                  v-model="activeData.accept"
                  placeholder="请选择文件类型"
                  :style="{ width: '100%' }"
                  clearable
                >
                  <a-select-option label="图片" value="image/*">图片</a-select-option>
                  <a-select-option label="视频" value="video/*">视频</a-select-option>
                  <a-select-option label="音频" value="audio/*">音频</a-select-option>
                  <a-select-option label="excel" value=".xls,.xlsx">excel</a-select-option>
                  <a-select-option label="word" value=".doc,.docx">word</a-select-option>
                  <a-select-option label="pdf" value=".pdf">pdf</a-select-option>
                  <a-select-option label="txt" value=".txt">txt</a-select-option>
                </a-select>
              </a-form-model-item>
              <a-form-model-item
                v-if="activeData.__config__.fileSize !== undefined"
                label="文件大小"
              >
                <a-input
                  v-model.number="activeData.__config__.fileSize"
                  placeholder="请输入文件大小"
                >
                  <a-select
                    slot="append"
                    v-model="activeData.__config__.sizeUnit"
                    :style="{ width: '66px' }"
                  >
                    <a-select-option label="KB" value="KB">KB</a-select-option>
                    <a-select-option label="MB" value="MB">MB</a-select-option>
                    <a-select-option label="GB" value="GB">GB</a-select-option>
                  </a-select>
                </a-input>
              </a-form-model-item>
              <a-form-model-item v-if="activeData.action !== undefined" label="上传地址">
                <a-input v-model="activeData.action" placeholder="请输入上传地址" clearable />
              </a-form-model-item>
              <a-form-model-item v-if="activeData.tip !== undefined" label="上传提示">
                <a-input v-model="activeData.tip" placeholder="请输入上传提示" clearable />
              </a-form-model-item>
              <a-form-model-item v-if="activeData.buttonText !== undefined" label="按钮文字">
                <a-input v-model="activeData.buttonText" placeholder="请输入按钮文字" clearable />
              </a-form-model-item>
              <a-form-model-item v-if="activeData['list-type'] !== undefined" label="列表类型">
                <a-radio-group v-model="activeData['list-type']">
                  <a-radio-button value="text">
                    按钮
                  </a-radio-button>
                  <a-radio-button value="picture">
                    图片列表
                  </a-radio-button>
                  <a-radio-button value="picture-card">
                    照片墙
                  </a-radio-button>
                </a-radio-group>
              </a-form-model-item>
              <a-form-model-item
                v-if="activeData.type !== undefined && activeData.__config__.tag === 'el-button'"
                label="按钮类型"
              >
                <a-select v-model="activeData.type" :style="{ width: '100%' }">
                  <a-select-option label="primary" value="primary">primary</a-select-option>
                  <a-select-option label="success" value="success">success</a-select-option>
                  <a-select-option label="warning" value="warning">warning</a-select-option>
                  <a-select-option label="danger" value="danger">danger</a-select-option>
                  <a-select-option label="info" value="info">info</a-select-option>
                  <a-select-option label="text" value="text">text</a-select-option>
                </a-select>
              </a-form-model-item>
              <a-form-model-item
                v-if="activeData.__config__.buttonText !== undefined"
                v-show="'picture-card' !== activeData['list-type']"
                label="按钮文字"
              >
                <a-input v-model="activeData.__config__.buttonText" placeholder="请输入按钮文字" />
              </a-form-model-item>
              <a-form-model-item v-if="activeData.__config__.tag === 'el-button'" label="按钮文字">
                <a-input v-model="activeData.__slot__.default" placeholder="请输入按钮文字" />
              </a-form-model-item>
              <a-form-model-item v-if="activeData['range-separator'] !== undefined" label="分隔符">
                <a-input v-model="activeData['range-separator']" placeholder="请输入分隔符" />
              </a-form-model-item>
              <a-form-model-item v-if="activeData['picker-options'] !== undefined" label="时间段">
                <a-input
                  v-model="activeData['picker-options'].selectableRange"
                  placeholder="请输入时间段"
                />
              </a-form-model-item>
              <a-form-model-item v-if="activeData['font-separator'] !== undefined" label="分隔符">
                <a-input v-model="activeData['range-separator']" placeholder="请输入分隔符" />
              </a-form-model-item>
              <a-form-model-item v-if="activeData.format !== undefined" label="时间格式">
                <a-input
                  :value="activeData.format"
                  placeholder="请输入时间格式"
                  @input="setTimeValue($event)"
                />
              </a-form-model-item>
              <template
                v-if="
                  ['el-checkbox-group', 'el-radio-group', 'el-select'].indexOf(
                    activeData.__config__.tag
                  ) > -1
                "
              >
                <a-divider>选项</a-divider>
                <a-form-model-item label="数据类型">
                  <a-radio-group v-model="activeData.__config__.dataType">
                    <a-radio-button value="dynamic">
                      动态数据
                    </a-radio-button>
                    <a-radio-button value="static">
                      静态数据
                    </a-radio-button>
                  </a-radio-group>
                </a-form-model-item>
                <template v-if="activeData.__config__.dataType === 'dynamic'">
                  <a-form-model-item label="接口地址">
                    <a-input
                      v-model="activeData.__config__.url"
                      :title="activeData.__config__.url"
                      placeholder="请输入接口地址"
                      clearable
                    >
                      <a-select
                        slot="prepend"
                        v-model="activeData.__config__.method"
                        :style="{ width: '85px' }"
                      >
                        <a-select-option label="get" value="get">get</a-select-option>
                        <a-select-option label="post" value="post">post</a-select-option>
                        <a-select-option label="put" value="put">put</a-select-option>
                        <a-select-option label="delete" value="delete">delete</a-select-option>
                      </a-select>
                    </a-input>
                  </a-form-model-item>
                  <a-form-model-item label="数据位置">
                    <a-input v-model="activeData.__config__.dataKey" placeholder="请输入标签键名" />
                  </a-form-model-item>
                  <a-form-model-item label="标签键名">
                    <a-input v-model="activeData.props.props.label" placeholder="请输入标签键名" />
                  </a-form-model-item>
                  <a-form-model-item label="值键名">
                    <a-input v-model="activeData.props.props.value" placeholder="请输入值键名" />
                  </a-form-model-item>
                  <a-form-model-item label="子级键名">
                    <a-input
                      v-model="activeData.props.props.children"
                      placeholder="请输入子级键名"
                    />
                  </a-form-model-item>
                </template>

                <draggable
                  v-if="activeData.__config__.dataType === 'static'"
                  :list="activeData.__slot__.options"
                  :animation="340"
                  group="selectItem"
                  handle=".option-drag"
                >
                  <div
                    v-for="(item, index) in activeData.__slot__.options"
                    :key="index"
                    class="select-item"
                  >
                    <div class="select-line-icon option-drag">
                      <a-icon type="drag" />
                    </div>
                    <a-input v-model="item.label" placeholder="选项名" />
                    <a-input
                      placeholder="选项值"
                      :value="item.value"
                      @input="setOptionValue(item, $event)"
                    />
                    <div
                      class="close-btn select-line-icon"
                      @click="activeData.__slot__.options.splice(index, 1)"
                    >
                      <a-icon type="delete" />
                    </div>
                  </div>
                </draggable>
                <div
                  v-if="activeData.__config__.dataType === 'static'"
                  style="margin-left: 30px; margin-top: 10px;"
                >
                  <a-button style="padding-bottom: 0" icon="plus-circle" @click="addSelectItem">
                    添加选项
                  </a-button>
                </div>
                <a-divider />
              </template>

              <template v-if="['el-cascader'].includes(activeData.__config__.tag)">
                <a-divider>选项</a-divider>
                <a-form-model-item label="数据类型">
                  <a-radio-group v-model="activeData.__config__.dataType">
                    <a-radio-button value="dynamic">
                      动态数据
                    </a-radio-button>
                    <a-radio-button value="static">
                      静态数据
                    </a-radio-button>
                  </a-radio-group>
                </a-form-model-item>

                <template v-if="activeData.__config__.dataType === 'dynamic'">
                  <a-form-model-item label="接口地址">
                    <a-input
                      v-model="activeData.__config__.url"
                      :title="activeData.__config__.url"
                      placeholder="请输入接口地址"
                      clearable
                    >
                      <a-select
                        slot="prepend"
                        v-model="activeData.__config__.method"
                        :style="{ width: '85px' }"
                      >
                        <a-select-option label="get" value="get">get</a-select-option>
                        <a-select-option label="post" value="post">post</a-select-option>
                        <a-select-option label="put" value="put">put</a-select-option>
                        <a-select-option label="delete" value="delete">delete</a-select-option>
                      </a-select>
                    </a-input>
                  </a-form-model-item>
                  <a-form-model-item label="数据位置">
                    <a-input v-model="activeData.__config__.dataKey" placeholder="请输入标签键名" />
                  </a-form-model-item>
                  <a-form-model-item label="标签键名">
                    <a-input v-model="activeData.props.props.label" placeholder="请输入标签键名" />
                  </a-form-model-item>
                  <a-form-model-item label="值键名">
                    <a-input v-model="activeData.props.props.value" placeholder="请输入值键名" />
                  </a-form-model-item>
                  <a-form-model-item label="子级键名">
                    <a-input
                      v-model="activeData.props.props.children"
                      placeholder="请输入子级键名"
                    />
                  </a-form-model-item>
                </template>

                <!-- 级联选择静态树 -->
                <vc-tree
                  v-if="activeData.__config__.dataType === 'static'"
                  draggable
                  :data="activeData.options"
                  node-key="id"
                  :render-content="renderContent"
                />
                <div
                  v-if="activeData.__config__.dataType === 'static'"
                  style="margin-left: 25px;margin-top: 10px;"
                >
                  <a-button
                    style="padding-bottom: 0"
                    icon="plus-circle"
                    size="small"
                    @click="addTreeItem"
                  >
                    添加父级
                  </a-button>
                </div>
                <a-divider />
              </template>

              <template v-if="['form-text'].indexOf(activeData.__config__.tag) > -1">
                <a-divider>字体选项</a-divider>
                <a-form-model-item label="字体颜色">
                  <vc-color-picker v-model="activeData['color']" />
                </a-form-model-item>
                <a-form-model-item label="字体大小">
                  <a-input-number v-model="activeData['font-size']" /> px
                </a-form-model-item>
                <a-form-model-item label="对齐方式">
                  <a-radio-group v-model="activeData.align">
                    <a-radio-button value="left">左对齐</a-radio-button>
                    <a-radio-button value="center">居中对齐</a-radio-button>
                    <a-radio-button value="right">右对齐</a-radio-button>
                  </a-radio-group>
                </a-form-model-item>
                <a-form-model-item label="字体样式">
                  <a-checkbox v-model="activeData.bold">加粗</a-checkbox>
                  <a-checkbox v-model="activeData.italic">斜体</a-checkbox>
                  <a-checkbox v-model="activeData.underline">下划线</a-checkbox>
                  <a-checkbox v-model="activeData.through">删除线</a-checkbox>
                </a-form-model-item>
              </template>

              <a-form-model-item
                v-if="activeData.__config__.optionType !== undefined"
                label="选项样式"
              >
                <a-radio-group v-model="activeData.__config__.optionType">
                  <a-radio-button value="default">
                    默认
                  </a-radio-button>
                  <a-radio-button value="button">
                    按钮
                  </a-radio-button>
                </a-radio-group>
              </a-form-model-item>
              <a-form-model-item v-if="activeData['active-color'] !== undefined" label="开启颜色">
                <vc-color-picker v-model="activeData['active-color']" />
              </a-form-model-item>
              <a-form-model-item v-if="activeData['inactive-color'] !== undefined" label="关闭颜色">
                <vc-color-picker v-model="activeData['inactive-color']" />
              </a-form-model-item>

              <a-form-model-item
                v-if="
                  activeData.__config__.showLabel !== undefined &&
                    activeData.__config__.labelWidth !== undefined
                "
                label="显示标签"
              >
                <a-switch v-model="activeData.__config__.showLabel" />
              </a-form-model-item>
              <a-form-model-item v-if="activeData.branding !== undefined" label="品牌烙印">
                <a-switch v-model="activeData.branding" @input="changeRenderKey" />
              </a-form-model-item>
              <a-form-model-item v-if="activeData['allow-half'] !== undefined" label="允许半选">
                <a-switch v-model="activeData['allow-half']" />
              </a-form-model-item>
              <a-form-model-item v-if="activeData['show-text'] !== undefined" label="辅助文字">
                <a-switch v-model="activeData['show-text']" @change="rateTextChange" />
              </a-form-model-item>
              <a-form-model-item v-if="activeData['show-score'] !== undefined" label="显示分数">
                <a-switch v-model="activeData['show-score']" @change="rateScoreChange" />
              </a-form-model-item>
              <a-form-model-item v-if="activeData['show-stops'] !== undefined" label="显示间断点">
                <a-switch v-model="activeData['show-stops']" />
              </a-form-model-item>
              <a-form-model-item v-if="activeData.range !== undefined" label="范围选择">
                <a-switch v-model="activeData.range" @change="rangeChange" />
              </a-form-model-item>
              <a-form-model-item
                v-if="
                  activeData.__config__.border !== undefined &&
                    activeData.__config__.optionType === 'default'
                "
                label="是否带边框"
              >
                <a-switch v-model="activeData.__config__.border" />
              </a-form-model-item>
              <a-form-model-item
                v-if="activeData.__config__.tag === 'el-color-picker'"
                label="颜色格式"
              >
                <a-select
                  v-model="activeData['color-format']"
                  placeholder="请选择颜色格式"
                  :style="{ width: '100%' }"
                  clearable
                  @change="colorFormatChange"
                >
                  <a-select-option
                    v-for="(item, index) in colorFormatOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
              <a-form-model-item
                v-if="
                  activeData.size !== undefined &&
                    (activeData.__config__.optionType === 'button' ||
                      activeData.__config__.border ||
                      activeData.__config__.tag === 'el-color-picker' ||
                      activeData.__config__.tag === 'el-button')
                "
                label="组件尺寸"
              >
                <a-radio-group v-model="activeData.size">
                  <a-radio-button value="medium">
                    中等
                  </a-radio-button>
                  <a-radio-button value="small">
                    较小
                  </a-radio-button>
                  <a-radio-button value="mini">
                    迷你
                  </a-radio-button>
                </a-radio-group>
              </a-form-model-item>
              <a-form-model-item
                v-if="activeData['show-word-limit'] !== undefined"
                label="输入统计"
              >
                <a-switch v-model="activeData['show-word-limit']" />
              </a-form-model-item>
              <a-form-model-item
                v-if="activeData.__config__.tag === 'el-input-number'"
                label="严格步数"
              >
                <a-switch v-model="activeData['step-strictly']" />
              </a-form-model-item>
              <a-form-model-item
                v-if="activeData.__config__.tag === 'el-cascader'"
                label="任选层级"
              >
                <a-switch v-model="activeData.props.props.checkStrictly" />
              </a-form-model-item>
              <a-form-model-item
                v-if="activeData.__config__.tag === 'el-cascader'"
                label="是否多选"
              >
                <a-switch v-model="activeData.props.props.multiple" />
              </a-form-model-item>
              <a-form-model-item
                v-if="activeData.__config__.tag === 'el-cascader'"
                label="展示全路径"
              >
                <a-switch v-model="activeData['show-all-levels']" />
              </a-form-model-item>
              <a-form-model-item
                v-if="activeData.__config__.tag === 'el-cascader'"
                label="可否筛选"
              >
                <a-switch v-model="activeData.filterable" />
              </a-form-model-item>
              <a-form-model-item v-if="activeData.clearable !== undefined" label="能否清空">
                <a-switch v-model="activeData.clearable" />
              </a-form-model-item>
              <a-form-model-item
                v-if="activeData.__config__.showTip !== undefined"
                label="显示提示"
              >
                <a-switch v-model="activeData.__config__.showTip" />
              </a-form-model-item>
              <a-form-model-item v-if="activeData.__config__.tag === 'el-upload'" label="多选文件">
                <a-switch v-model="activeData.multiple" />
              </a-form-model-item>
              <a-form-model-item v-if="activeData['auto-upload'] !== undefined" label="自动上传">
                <a-switch v-model="activeData['auto-upload']" />
              </a-form-model-item>
              <a-form-model-item v-if="activeData.readonly !== undefined" label="是否只读">
                <a-switch v-model="activeData.readonly" />
              </a-form-model-item>
              <a-form-model-item v-if="activeData.disabled !== undefined" label="是否禁用">
                <a-switch v-model="activeData.disabled" />
              </a-form-model-item>
              <a-form-model-item v-if="activeData.__config__.tag === 'el-select'" label="能否搜索">
                <a-switch v-model="activeData.filterable" />
              </a-form-model-item>
              <a-form-model-item v-if="activeData.__config__.tag === 'el-select'" label="是否多选">
                <a-switch v-model="activeData.multiple" @change="multipleChange" />
              </a-form-model-item>
              <a-form-model-item
                v-if="activeData.__config__.required !== undefined"
                label="是否必填"
              >
                <a-switch v-model="activeData.__config__.required" />
              </a-form-model-item>
              <a-form-model-item
                v-if="activeData.__config__.renderItem !== undefined"
                label="是否渲染"
              >
                <a-switch v-model="activeData.__config__.renderItem" />
              </a-form-model-item>
              <a-form-model-item
                v-if="activeData.__config__.showItem !== undefined"
                label="是否展示"
              >
                <a-switch v-model="activeData.__config__.showItem" />
              </a-form-model-item>

              <template v-if="['el-table'].includes(activeData.__config__.tag)">
                <a-form-model-item label="数据配置">
                  <a-button type="primary" @click="openTableDialog">数据配置</a-button>
                </a-form-model-item>
              </template>

              <template v-if="['el-button'].includes(activeData.__config__.tag)">
                <a-form-model-item label="操作配置">
                  <a-button type="primary" @click="openButtonDialog">操作配置</a-button>
                </a-form-model-item>
              </template>

              <template v-if="activeData.__config__.layoutTree">
                <a-divider>布局结构树</a-divider>
                <vc-tree
                  :data="[activeData.__config__]"
                  :props="layoutTreeProps"
                  node-key="renderKey"
                  default-expand-all
                  draggable
                >
                  <span slot-scope="{ node, data }">
                    <span class="node-label">
                      <svg-icon
                        class="node-icon"
                        :icon-class="data.__config__ ? data.__config__.tagIcon : data.tagIcon"
                      />
                      {{ node.label }}
                    </span>
                  </span>
                </vc-tree>
              </template>

              <template v-if="Array.isArray(activeData.__config__.regList)">
                <a-divider>正则校验</a-divider>
                <div
                  v-for="(item, index) in activeData.__config__.regList"
                  :key="index"
                  class="reg-item"
                >
                  <span class="close-btn" @click="activeData.__config__.regList.splice(index, 1)">
                    <i class="el-icon-close" />
                  </span>
                  <a-form-model-item label="表达式">
                    <a-input v-model="item.pattern" placeholder="请输入正则" />
                  </a-form-model-item>
                  <a-form-model-item label="错误提示" style="margin-bottom:0">
                    <a-input v-model="item.message" placeholder="请输入错误提示" />
                  </a-form-model-item>
                </div>
                <div style="margin-left: 80px; margin-top: 10px;">
                  <a-button icon="el-icon-circle-plus-outline" type="text" @click="addReg">
                    添加规则
                  </a-button>
                </div>
              </template>
            </a-form-model>
          </vc-scrollbar>
        </div>
      </a-tab-pane>
      <!-- 表单属性 -->
      <a-tab-pane key="form" tab="表单属性">
        <div class="form-box" :style="scrollStyle">
          <vc-scrollbar class="right-scrollbar">
            <a-form-model>
              <a-form-model-item label="表单名">
                <a-input v-model="formConf.formRef" placeholder="请输入表单名（ref）" />
              </a-form-model-item>
              <a-form-model-item label="表单模型">
                <a-input v-model="formConf.formModel" placeholder="请输入数据模型" />
              </a-form-model-item>
              <a-form-model-item label="校验模型">
                <a-input v-model="formConf.formRules" placeholder="请输入校验模型" />
              </a-form-model-item>
              <a-form-model-item label="表单尺寸">
                <a-radio-group v-model="formConf.size">
                  <a-radio-button value="medium">
                    中等
                  </a-radio-button>
                  <a-radio-button value="small">
                    较小
                  </a-radio-button>
                  <a-radio-button value="mini">
                    迷你
                  </a-radio-button>
                </a-radio-group>
              </a-form-model-item>
              <a-form-model-item label="标签对齐">
                <a-radio-group v-model="formConf.labelPosition">
                  <a-radio-button value="left">
                    左对齐
                  </a-radio-button>
                  <a-radio-button value="right">
                    右对齐
                  </a-radio-button>
                  <a-radio-button value="top">
                    顶部对齐
                  </a-radio-button>
                </a-radio-group>
              </a-form-model-item>
              <a-form-model-item label="标签宽度">
                <a-input
                  v-model.number="formConf.labelWidth"
                  type="number"
                  placeholder="请输入标签宽度"
                />
              </a-form-model-item>
              <a-form-model-item label="栅格间隔">
                <a-input-number v-model="formConf.gutter" :min="0" placeholder="栅格间隔" />
              </a-form-model-item>
              <a-form-model-item label="展示数量">
                <a-input-number v-model="formConf.column" :min="1" placeholder="栅格间隔" />
              </a-form-model-item>
              <a-form-model-item label="禁用表单">
                <a-switch v-model="formConf.disabled" />
              </a-form-model-item>
              <a-form-model-item label="表单按钮">
                <a-switch v-model="formConf.formBtns" />
              </a-form-model-item>
              <a-form-model-item label="显示未选中组件边框">
                <a-switch v-model="formConf.unFocusedComponentBorder" />
              </a-form-model-item>
              <a-form-model-item label="联动配置">
                <a-button type="primary" @click="openLinkageDialog">联动配置</a-button>
              </a-form-model-item>
            </a-form-model>
          </vc-scrollbar>
        </div>
      </a-tab-pane>
    </a-tabs>

    <treeNode-dialog :visible.sync="dialogVisible" title="添加选项" @commit="addNode" />
    <icons-dialog
      :visible.sync="iconsVisible"
      :current="activeData[currentIconModel]"
      @select="setIcon"
    />
    <button-dialog
      v-if="activeData.__events__"
      :visible.sync="buttonVisible"
      :events="activeData.__events__"
    />
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import { isNumberStr } from '../utils/index';
import { inputComponents, selectComponents, layoutComponents } from '../generator/config';
import { saveFormConf } from '../utils/db';

import TreeNodeDialog from './TreeNodeDialog';
import IconsDialog from './IconsDialog';
import ButtonDialog from './ButtonDialog';

const dateTimeFormat = {
  date: 'yyyy-MM-dd',
  week: 'yyyy 第 WW 周',
  month: 'yyyy-MM',
  year: 'yyyy',
  datetime: 'yyyy-MM-dd HH:mm:ss',
  daterange: 'yyyy-MM-dd',
  monthrange: 'yyyy-MM',
  datetimerange: 'yyyy-MM-dd HH:mm:ss'
};

// 使changeRenderKey在目标组件改变时可用
const needRerenderList = ['tinymce'];

export default {
  components: {
    draggable,
    TreeNodeDialog,
    IconsDialog,
    ButtonDialog
  },
  props: ['showField', 'activeData', 'centerHeight', 'formConf'],

  data() {
    return {
      currentTab: 'field',
      currentNode: null,
      dialogVisible: false,
      iconsVisible: false,
      tableVisible: false,
      linkageVisible: false,
      buttonVisible: false,
      currentIconModel: null,
      dateTypeOptions: [
        {
          label: '日(date)',
          value: 'date'
        },
        {
          label: '周(week)',
          value: 'week'
        },
        {
          label: '月(month)',
          value: 'month'
        },
        {
          label: '年(year)',
          value: 'year'
        },
        {
          label: '日期时间(datetime)',
          value: 'datetime'
        }
      ],
      dateRangeTypeOptions: [
        {
          label: '日期范围(daterange)',
          value: 'daterange'
        },
        // {
        //   label: '月范围(monthrange)',
        //   value: 'monthrange'
        // },
        {
          label: '日期时间范围(datetimerange)',
          value: 'datetimerange'
        }
      ],
      colorFormatOptions: [
        {
          label: 'hex',
          value: 'hex'
        },
        {
          label: 'rgb',
          value: 'rgb'
        },
        {
          label: 'rgba',
          value: 'rgba'
        },
        {
          label: 'hsv',
          value: 'hsv'
        },
        {
          label: 'hsl',
          value: 'hsl'
        }
      ],
      justifyOptions: [
        {
          label: 'start',
          value: 'start'
        },
        {
          label: 'end',
          value: 'end'
        },
        {
          label: 'center',
          value: 'center'
        },
        {
          label: 'space-around',
          value: 'space-around'
        },
        {
          label: 'space-between',
          value: 'space-between'
        }
      ],
      layoutTreeProps: {
        label(data, node) {
          const config = data.__config__;
          return data.componentName || `${config.label}: ${data.__vModel__}`;
        }
      }
    };
  },

  computed: {
    documentLink() {
      return (
        this.activeData.__config__.document ||
        'https://element.eleme.cn/#/zh-CN/component/installation'
      );
    },

    scrollStyle() {
      return {
        height: `${this.centerHeight - 16}px`
      };
    },

    dateOptions() {
      if (
        this.activeData.type !== undefined &&
        this.activeData.__config__.tag === 'el-date-picker'
      ) {
        if (this.activeData['start-placeholder'] === undefined) {
          return this.dateTypeOptions;
        }
        return this.dateRangeTypeOptions;
      }
      return [];
    },
    tagList() {
      return [
        {
          label: '输入型组件',
          options: inputComponents
        },
        {
          label: '选择型组件',
          options: selectComponents
        },
        {
          label: '布局型组件',
          options: layoutComponents
        }
      ];
    },
    activeTag() {
      return this.activeData.__config__.tag;
    },
    isShowMin() {
      return ['el-input-number', 'el-slider'].indexOf(this.activeTag) > -1;
    },
    isShowMax() {
      return (
        ['el-input-number', 'el-slider', 'el-rate', 'punp-switch'].indexOf(this.activeTag) > -1
      );
    },
    isShowStep() {
      return ['el-input-number', 'el-slider'].indexOf(this.activeTag) > -1;
    }
  },

  watch: {
    formConf: {
      handler(val) {
        saveFormConf(val);
      },
      deep: true
    }
  },

  created() {},

  methods: {
    addReg() {
      this.activeData.__config__.regList.push({
        pattern: '',
        message: ''
      });
    },

    addSelectItem() {
      this.activeData.__slot__.options.push({
        label: '',
        value: ''
      });
    },

    addTreeItem() {
      ++this.idGlobal;
      this.dialogVisible = true;
      this.currentNode = this.activeData.options;
    },

    renderContent(h, { node, data, store }) {
      return (
        <div class="custom-tree-node">
          <span>{node.label}</span>
          <span class="node-operation">
            <a-icon on-click={() => this.append(data)} type="plus" />
            <a-icon on-click={() => this.remove(node, data)} type="delete" />
          </span>
        </div>
      );
    },

    append(data) {
      if (!data.children) {
        this.$set(data, 'children', []);
      }
      this.dialogVisible = true;
      this.currentNode = data.children;
    },

    remove(node, data) {
      this.activeData.__config__.defaultValue = []; // 避免删除时报错
      const { parent } = node;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    addNode(data) {
      this.currentNode.push(data);
    },

    onSwitchValueInput(val, name) {
      if (['true', 'false'].indexOf(val) > -1) {
        this.$set(this.activeData, name, JSON.parse(val));
      } else {
        this.$set(this.activeData, name, isNumberStr(val) ? Number(val) : val);
      }
    },

    setTimeValue(val, type) {
      const valueFormat = type === 'week' ? dateTimeFormat.date : val;
      this.$set(this.activeData.__config__, 'defaultValue', null);
      this.$set(this.activeData, 'value-format', valueFormat);
      this.$set(this.activeData, 'format', val);
    },

    spanChange(val) {
      this.formConf.span = val;
    },

    multipleChange(val) {
      this.$set(this.activeData.__config__, 'defaultValue', val ? [] : '');
    },

    dateTypeChange(val) {
      this.setTimeValue(dateTimeFormat[val], val);
    },

    tagChange(tagIcon) {
      let target = inputComponents.find(item => item.__config__.tagIcon === tagIcon);
      if (!target) target = selectComponents.find(item => item.__config__.tagIcon === tagIcon);
      this.$emit('tag-change', target);
    },

    rangeChange(val) {
      this.$set(
        this.activeData.__config__,
        'defaultValue',
        val ? [this.activeData.min, this.activeData.max] : this.activeData.min
      );
    },

    rateTextChange(val) {
      if (val) this.activeData['show-score'] = false;
    },

    rateScoreChange(val) {
      if (val) this.activeData['show-text'] = false;
    },

    colorFormatChange(val) {
      this.activeData.__config__.defaultValue = null;
      this.activeData['show-alpha'] = val.indexOf('a') > -1;
      this.activeData.__config__.renderKey = Number(new Date()); // 更新renderKey,重新渲染该组件
    },

    openIconsDialog(model) {
      this.iconsVisible = true;
      this.currentIconModel = model;
    },

    openTableDialog() {
      this.tableVisible = true;
    },

    openButtonDialog() {
      this.buttonVisible = true;
    },

    openLinkageDialog() {
      this.linkageVisible = true;
    },

    changeRenderKey() {
      if (needRerenderList.includes(this.activeData.__config__.tag)) {
        this.activeData.__config__.renderKey = Number(new Date());
      }
    },

    setIcon(val) {
      this.activeData[this.currentIconModel] = val;
    },

    setOptionValue(item, val) {
      item.value = isNumberStr(val) ? Number(val) : val;
    },

    setDefaultValue(val) {
      if (Array.isArray(val)) {
        return val.join(',');
      }
      // if (['string', 'number'].indexOf(typeof val) > -1) {
      //   return val
      // }
      if (typeof val === 'boolean') {
        return `${val}`;
      }
      return val;
    },

    onDefaultValueInput(str) {
      if (Array.isArray(this.activeData.__config__.defaultValue)) {
        // 数组
        this.$set(
          this.activeData.__config__,
          'defaultValue',
          str.split(',').map(val => (isNumberStr(val) ? Number(val) : val))
        );
      } else if (['true', 'false'].indexOf(str) > -1) {
        // 布尔
        this.$set(this.activeData.__config__, 'defaultValue', JSON.parse(str));
      } else {
        // 字符串和数字
        this.$set(this.activeData.__config__, 'defaultValue', isNumberStr(str) ? Number(str) : str);
      }
    },

    onSwitchValueInput(val, name) {
      if (['true', 'false'].indexOf(val) > -1) {
        this.$set(this.activeData, name, JSON.parse(val));
      } else {
        this.$set(this.activeData, name, isNumberStr(val) ? Number(val) : val);
      }
    },

    openLinkageDialog() {
      this.linkageVisible = true;
    }
  }
};
</script>
