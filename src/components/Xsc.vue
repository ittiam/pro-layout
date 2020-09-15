/**
* 组件说明：多选搜索树选择器，antdv多选搜索树选择器中选框与搜索框在一起，与当前设计不符，应产品与开发经理要求开发此组件。
* 难点说明：
*   难点一：选择器选项父子关联，如果某父节点所有子项选中，则选框只展示该父节点key，不展示该节点下子节点key，所以选中项需要确定父子关系之后对当前选中项进行删减；
*   难点二：筛选后的树，可能不包含当前所有选中项，如果选中项不包含在当前树中会导致warning警告并丢失该选中项，所以需要注意当前树的选中项和不包含在当前树的选中项以及选框中需要显示的所有选中项三者的协调处理；
*   难点三：筛选后的树，某个父节点下只有一个子节点，但完整树中有多个子节点，此时选中这一个子节点后，该父节点会转为选中状态，但其实应该是半选中态，需要处理筛选树与完整树的状态差异；
*/

<template>
    <div class="xsc" @click.stop>
        <div class="xsc-main" :class="{'focus':selectFocus}" @click="handleSelectFocus">
            <div class="xsc-select">
                <ul class="xsc-choice" v-if="filterCheckedNodes.length">
                    <li class="xsc-choice-item" v-for="(node,idx) in filterCheckedNodes" :key="idx">
                        <span>{{node.data.title}}</span>
                        <a-icon type="close" @click.stop="handleUnchecked(node.data.key)"/>
                    </li>
                </ul>
                <span class="xsc-placeholder" v-else>{{placeholder}}</span>
            </div>
            <p class="xsc-icon" :class="{'focus':selectFocus}">
                <a-icon type="down"></a-icon>
            </p>
        </div>
        <transition name="drop">
            <div class="xsc-dropdown" v-if="selectFocus">
                <a-input v-model="keyword" placeholder="请输入关键词"/>
                <div class="xsc-tree">
                    <!-- 实际操作树 -->
                    <a-tree
                            :checked-keys="checkedKeys"
                            checkable
                            default-expand-all
                            auto-expand-parent
                            :selectable="false"
                            :tree-data="filterData"
                            @check="handleChecked"
                            v-if="filterData&&filterData.length"
                    />
                    <a-empty :image="simpleImage" v-else/>
                </div>
            </div>
        </transition>
        <!-- 备份完整树 -->
        <a-tree
                class="xsc-fulltree"
                :checked-keys="fullCheckedKeys"
                checkable
                default-expand-all
                auto-expand-parent
                :selectable="false"
                :tree-data="treeData"
                ref="tree"
        />
    </div>
</template>

<script>
    import {Empty} from 'ant-design-vue';

    const _customData = {
        sameArray(srcArr, distArr) {
            if (!Array.isArray(srcArr) || !Array.isArray(distArr)) return false;
            const _arr1 = srcArr.sort(), _arr2 = distArr.sort();
            return _arr1.length === _arr2.length && _arr1.every((v, i) => v === _arr2[i]);
        }
    };

    export default {
        name: "xsc",
        props: {
            placeholder: {
                type: String,
                default: ''
            },
            treeData: {
                type: Array,
                default: () => []
            },
            value: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                selectFocus: false,
                keyword: '',
                checkedKeys: [],    // 当前树的选中key（可能是过滤后的树）
                fullCheckedKeys: [],    // 完整树的选中key（所有选中项）
                filterCheckedKeys: [],    // 过滤后的选中key
                filterCheckedNodes: [],     // 过滤后的选中节点（用于选框展示）
                simpleImage: Empty.PRESENTED_IMAGE_SIMPLE
            };
        },
        computed: {
            filterData() {
                // 数据过滤
                const _filterFn = arr => {
                    let _arr = [];
                    arr.forEach(v => {
                        let _children = [];
                        if (v.children && v.children.length) {
                            _children = _filterFn(v.children);
                        }
                        if (~v.title.indexOf(this.keyword) || _children.length) {
                            _arr.push({
                                ...v,
                                children: _children
                            });
                        }
                    });
                    return _arr;
                };

                return _filterFn(this.treeData);
            }
        },
        watch: {
            value: {
                immediate: true,
                handler() {
                    this.filterCheckedKeys = [...this.value];
                    this.parseFullTreeCheckedMap(false);
                }
            },
            keyword() {
                this.sortCheckedKeys();
            }
        },
        mounted() {
            document.body.addEventListener('click', this.handleSelectBlur, false);
        },
        beforeDestroy() {
            document.body.removeEventListener('click', this.handleSelectBlur, false);
        },
        methods: {
            // 焦点事件
            handleSelectFocus() {
                this.selectFocus = true;
            },
            handleSelectBlur() {
                this.selectFocus = false;
            },
            // 树的选中与取消选中事件，针对checkedKeys数据
            handleChecked(checkedKeys, {node}) {
                const prevCheckedKeys = [...this.checkedKeys];
                this.checkedKeys = [...checkedKeys];
                this.$nextTick(() => {
                    this.parseFullTreeCheckedMap(true, node, checkedKeys, prevCheckedKeys);
                });
            },
            // 解析完整树选中状态映射
            parseFullTreeCheckedMap(fromTree, node, checkedKeys, prevCheckedKeys) {
                const _fullCheckedKeys = [...this.fullCheckedKeys];
                // 如果操作来自用户操作树，则针对操作节点处理；如果来自于选框，则使用过滤树覆盖处理；
                if (fromTree) {
                    // 当前操作节点状态转移，用来更新完整树状态
                    if (node.checked) {
                        this.fullCheckedKeys.push(node.eventKey);
                    } else {
                        const rmKeys = prevCheckedKeys.filter(v => !~checkedKeys.indexOf(v));
                        this.fullCheckedKeys = this.fullCheckedKeys.filter(v => !~rmKeys.indexOf(v));
                    }
                } else {
                    this.fullCheckedKeys = this.filterCheckedKeys;
                }

                // 解析完整树状态
                const parseTree = nodes => nodes.map(node => {
                    if (node.checked !== void 0) {
                        return {
                            valid: true,
                            title: node.dataRef.title,
                            checked: node.checked,
                            halfChecked: node.halfChecked,
                            data: node.dataRef,
                            children: parseTree(node.$children)
                        };
                    } else {
                        return {
                            valid: false,
                            children: parseTree(node.$children)
                        };
                    }
                });
                // 获取选中节点
                const traversalCheckedNodes = (nodes, isFilter, fullCheckedKeys, filterCheckedKeys, filterCheckedNodes) => {
                    let _fullArr = fullCheckedKeys || [],
                        _filterArr = filterCheckedKeys || [],
                        _filterNodes = filterCheckedNodes || [];

                    nodes.forEach(node => {
                        if (node.checked) {
                            // 选中直接添加，过滤列表无需遍历子节点
                            _fullArr.push(node.data.key);
                            if (!isFilter) {
                                _filterArr.push(node.data.key);
                                _filterNodes.push(node);
                            }
                            traversalCheckedNodes(node.children, true, _fullArr, _filterArr, _filterNodes);
                        } else if (!node.valid || node.halfChecked) {
                            // 无效节点或者半选节点，继续遍历子节点
                            traversalCheckedNodes(node.children, false, _fullArr, _filterArr, _filterNodes);
                        }
                    });
                    return {
                        fullCheckedKeys: _fullArr,
                        filterCheckedKeys: _filterArr,
                        filterCheckedNodes: _filterNodes
                    };
                };
                this.$nextTick(() => {
                    const treeMap = parseTree(this.$refs.tree.$children);
                    const checkedObj = traversalCheckedNodes(treeMap, false);

                    this.fullCheckedKeys = checkedObj.fullCheckedKeys;
                    this.filterCheckedKeys = checkedObj.filterCheckedKeys;
                    this.filterCheckedNodes = checkedObj.filterCheckedNodes;
                    if (!fromTree) {
                        // 选框操作需同步更新操作树状态
                        this.sortCheckedKeys();
                    }

                    // 检查改变并派发事件
                    if (!_customData.sameArray(this.fullCheckedKeys, _fullCheckedKeys)) {
                        this.$emit('change', [...this.fullCheckedKeys]);
                    }
                });
            },
            // 选中态整理（过滤树）
            sortCheckedKeys() {
                const traversalTree = (data, keys) => {
                    let _arr = keys || [];
                    data.forEach(v => {
                        if (~this.fullCheckedKeys.indexOf(v.key)) {
                            _arr.push(v.key);
                        }
                        if (v.children) {
                            traversalTree(v.children, _arr);
                        }
                    });
                    return _arr;
                };
                this.checkedKeys = traversalTree(this.filterData);
            },
            // 选框中取消选中
            handleUnchecked(key) {
                this.filterCheckedKeys = this.filterCheckedKeys.filter(v => v !== key);
                this.filterCheckedNodes = this.filterCheckedNodes.filter(v => v.data.key !== key);
                this.parseFullTreeCheckedMap(false);
            }
        }
    };
</script>

<style scoped lang="less">
    .xsc {
        z-index: 3;
        position: relative;
        display: inline-block;
        width: 100%;

        &-main {
            position: relative;
            display: flex;
            height: 32px;
            border: 1px solid #D6D6D6;
            border-radius: 4px;
            background-color: #fff;
            overflow: hidden;
            cursor: pointer;
            transition: all .3s cubic-bezier(.645, .045, .355, 1);

            &:hover {
                border-color: #40a9ff;
            }

            &:focus, &.focus {
                border-color: #40a9ff;
                outline: none;
                box-shadow: 0 0 0 2px rgba(24, 144, 255, .2);
            }
        }

        &-select {
            width: 100%;
            height: 100%;
            padding: 5px 30px 5px 12px;
            line-height: 20px;
            overflow: auto;
        }

        &-placeholder {
            font-size: 14px;
            line-height: 20px;
            color: #bfbfbf;
        }

        &-icon {
            position: absolute;
            top: 50%;
            right: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            font-size: 12px;
            color: #999;
            transform: translateY(-50%);

            i {
                transition: all .3s;
            }

            &.focus i {
                transform: rotate(180deg);
            }
        }

        &-choice {
            display: flex;
            flex-wrap: wrap;
            margin-top: -8px;
            margin-left: -8px;

            &-item {
                display: flex;
                align-items: center;
                height: 20px;
                margin-top: 8px;
                margin-left: 8px;
                padding: 0 8px;
                font-size: 14px;
                line-height: 1;
                color: #333;
                background-color: #EDF1F7;

                i {
                    margin-left: 15px;
                    font-size: 12px;
                    color: #87909F;
                    cursor: pointer;

                    &:hover {
                        color: #333;
                    }
                }
            }
        }

        &-dropdown {
            position: absolute;
            top: 40px;
            left: 0;
            min-width: 200px;
            padding: 16px 20px;
            border-radius: 4px;
            box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
            background-color: #fff;
            transform-origin: top center;

            input {
                display: block;
                height: 28px;
            }
        }

        &-tree {
            margin: 7px -20px 0;
            padding: 0 20px;
            max-height: 300px;
            overflow: auto;
        }

        &-fulltree {
            position: absolute;
            height: 0;
            visibility: hidden;
        }
    }

    ::v-deep .ant-tree {
        & > li > .ant-tree-switcher-noop {
            display: none;
        }

        // 项高度由24->28
        &-switcher {
            height: 28px !important;
            margin-right: 8px !important;
            line-height: 28px !important;
        }

        &-node-content-wrapper {
            height: 28px !important;
            line-height: 28px !important;
        }

        // checkbox的间距调整
        &-checkbox {
            height: 16px !important;
            padding: 0 !important;
            margin-top: 6px !important;
            margin-left: 0 !important;
            margin-right: 8.5px !important;

            &-indeterminate & {
                &-inner {
                    background-color: #4285F4 !important;

                    &:after {
                        width: 10px !important;
                        background-color: #fff !important;
                    }
                }
            }
        }

        // 子项选框与父项文本左对齐
        &-child-tree {
            padding-left: 29.5px;
        }

        &-node-content-wrapper {
        }

        // 文本字体大小14->12
        &-title {
            font-size: 12px;
        }

        // 文本默认颜色#666，选中颜色#333
        &-treenode-checkbox-checked & {
            &-title {
                color: #333 !important;
            }
        }
    }

    .drop {
        &-enter-active, &-leave-active {
            transition: all .15s;
        }

        &-enter, &-leave-to {
            opacity: 0;
            transform: scaleY(0);
        }
    }
</style>
