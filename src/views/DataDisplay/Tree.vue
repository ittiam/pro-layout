<!--
 * @Author: lfl
 * @Date: 2019-12-04 17:42:09
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2020-01-03 14:15:39
 * @Description: 树形控件模板
 -->
<template>
    <div>
        <p>树控件(a-tree)一节点前添加 Checkbox 复选框</p>
        <a-tree
            checkable
            :treeData="treeData"
            :defaultExpandedKeys="['0-0-0', '0-0-1']"
            :defaultCheckedKeys="['0-0-0', '0-0-1']"
            @select="this.onSelect"
            @check="this.onCheck"
            class="ant-tree-directory"
        >
            <template slot="custom" slot-scope="item">
                <span>{{ item.title }}</span>
                <span>插槽</span>
            </template>
        </a-tree>
        <p>树控件(a-tree)一节点前不添加 Checkbox 复选框</p>
        <a-tree
                :treeData="treeData"
                :defaultExpandedKeys="['0-0-0', '0-0-1']"
                :defaultCheckedKeys="['0-0-0', '0-0-1']"
                @select="this.onSelect"
                @check="this.onCheck"
                class="ant-tree-directory"
        >
            <template slot="custom" slot-scope="item">
                <span>{{ item.title }}</span>
                <span>插槽</span>
            </template>
        </a-tree>
        <p>树控件二(a-directory-tree目录型)——节点前添加 Checkbox 复选框</p>
        <a-input-search style="margin-bottom: 8px" placeholder="Search" />
        <a-directory-tree :treeData="treeData" multiple defaultExpandAll @select="onSelect" @expand="onExpand" :showIcon="false" checkable>
            <template slot="custom" slot-scope="item">
                <span>{{ item.title }}</span>
                <span>123</span>
            </template>
        </a-directory-tree>
        <p>树控件二(a-directory-tree目录型)——节点前不添加 Checkbox 复选框</p>
        <a-input-search style="margin-bottom: 8px" placeholder="Search" />
        <a-directory-tree :treeData="treeData" defaultExpandAll @select="onSelect" @expand="onExpand" :showIcon="false">
            <template slot="custom" slot-scope="item">
                <span>{{ item.title }}</span>
                <span>123</span>
            </template>
        </a-directory-tree>
        <p>树控件三(目录型控件---CTree)</p>
        <CTree :data="Cdata" show-checkbox :highlightCurrent="true"></CTree>
    </div>
</template>
<script>
    const treeData = [
        {
            title: 'parent 1',
            key: '0-0',
            scopedSlots: { title: 'custom' },
            children: [
                {
                    title: '张晨成',
                    key: '0-0-0',
                    scopedSlots: { title: 'custom' },
                    children: [{ title: 'leaf', key: '0-0-0-0', scopedSlots: { title: 'custom' } }, { title: 'leaf', key: '0-0-0-1', disabled: false, scopedSlots: { title: 'custom' } }]
                },
                {
                    title: 'parent 1-1',
                    key: '0-0-1',
                    scopedSlots: { title: 'custom' },
                    children: [{ key: '0-0-1-0', title: 'zcvc', scopedSlots: { title: 'custom' } }]
                }
            ]
        }
    ];
    export default {
        data() {
            return {
                treeData,
                // treeCData,
                Cdata: [
                    {
                        label: '一级 1',
                        children: [
                            {
                                label: '二级 1-1',
                                children: [
                                    {
                                        label: '三级 1-1-1'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        label: '一级 2',
                        children: [
                            {
                                label: '二级 2-1',
                                children: [
                                    {
                                        label: '三级 2-1-1'
                                    }
                                ]
                            },
                            {
                                label: '二级 2-2',
                                children: [
                                    {
                                        label: '三级 2-2-1'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        label: '一级 3',
                        children: [
                            {
                                label: '二级 3-1',
                                children: [
                                    {
                                        label: '三级 3-1-1'
                                    }
                                ]
                            },
                            {
                                label: '二级 3-2',
                                children: [
                                    {
                                        label: '三级 3-2-1'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };
        },
        methods: {
            onSelect(selectedKeys, info) {
                console.log('selected', selectedKeys, info);
            },
            onCheck(checkedKeys, info) {
                console.log('onCheck', checkedKeys, info);
            },
            onExpand() {
                console.log('Trigger Expand');
            }
        }
    };
</script>
<style lang="less" scoped>
</style>
