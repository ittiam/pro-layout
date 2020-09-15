<template>
    <div>
        TreeSelect:
        <a-row style="margin-top: 20px;">
            <a-col :span="8">
                <a-tree-select
                        style="width: 300px"
                        :treeData="treeData"
                        :value="value"
                        @change="onChange"
                        treeCheckable
                        :showCheckedStrategy="SHOW_PARENT"
                        searchPlaceholder="Please select"
                />
            </a-col>
            <a-col :span="8">
                <a-tree-select
                        showSearch
                        style="width: 300px"
                        :value="value1"
                        :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
                        placeholder="Please select"
                        allowClear
                        treeDefaultExpandAll
                        @change="onChange1"
                >
                    <a-tree-select-node value="parent 1" title="parent 1" key="0-1">
                        <a-tree-select-node value="parent 1-0" title="parent 1-0" key="0-1-1">
                            <a-tree-select-node value="leaf1" title="my leaf" key="random" />
                            <a-tree-select-node value="leaf2" title="your leaf" key="random1" />
                        </a-tree-select-node>
                        <a-tree-select-node value="parent 1-1" title="parent 1-1" key="random2">
                            <a-tree-select-node value="sss" title="sss" key="random3" />
                        </a-tree-select-node>
                    </a-tree-select-node>
                </a-tree-select>
            </a-col>
            <a-col :span="8">
                <a-tree-select
                        style="width: 300px"
                        :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
                        :treeData="treeData2"
                        placeholder="Please select"
                        treeDefaultExpandAll
                        v-model="value2"
                >
                </a-tree-select>
            </a-col>
        </a-row>
    </div>
</template>

<script>
    import { TreeSelect } from 'ant-design-vue';
    const SHOW_PARENT = TreeSelect.SHOW_PARENT;

    const treeData = [
        {
            title: 'Node1',
            value: '0-0',
            key: '0-0',
            children: [
                {
                    title: 'Child Node1',
                    value: '0-0-0',
                    key: '0-0-0'
                }
            ]
        },
        {
            title: 'Node2',
            value: '0-1',
            key: '0-1',
            children: [
                {
                    title: 'Child Node3',
                    value: '0-1-0',
                    key: '0-1-0',
                    disabled: true
                },
                {
                    title: 'Child Node4',
                    value: '0-1-1',
                    key: '0-1-1'
                },
                {
                    title: 'Child Node5',
                    value: '0-1-2',
                    key: '0-1-2'
                }
            ]
        }
    ];
    const treeData2 = [
        {
            title: 'Node1',
            value: '0-0',
            key: '0-0',
            children: [
                {
                    value: '0-0-1',
                    key: '0-0-1',
                    title: 'Child Node1'
                },
                {
                    title: 'Child Node2',
                    value: '0-0-2',
                    key: '0-0-2'
                }
            ]
        },
        {
            title: 'Node2',
            value: '0-1',
            key: '0-1'
        }
    ];
    export default {
        name: '',
        data() {
            return {
                value: ['0-0-0'],
                treeData,
                SHOW_PARENT,
                value1: undefined,
                value2: undefined,
                treeData2
            };
        },
        components: {},
        methods:{
            onChange1(value) {
                this.value1 = value;
            },
            onChange(value) {
                this.value = value;
            }
        }
    };
</script>

<style lang="less" scoped>

</style>
