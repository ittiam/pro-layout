/**
* @DATE: 2019/12/26 10:42
* @Version: 0.0.1
* @Author: huhaiou
* @Description: Drawer 组件
* @Update: 自定义位置、多层级抽屉 by huhaiou 2019/12/26 10:42
*/
<template>
    <div>Drawer
        <!---- Drawer ---->
        <div>
            <a-row>自定义位置:</a-row>
            <div style="margin: 10px 0;">
                <a-radio-group style="margin-right: 8px" :defaultValue="placement" @change="onChange">
                    <a-radio value="top">top</a-radio>
                    <a-radio value="right">right</a-radio>
                    <a-radio value="bottom">bottom</a-radio>
                    <a-radio value="left">left</a-radio>
                </a-radio-group>
                <a-button type="primary" @click="showDrawer">
                    Open
                </a-button>
                <a-drawer
                        title="Basic Drawer"
                        :placement="placement"
                        @close="onClose"
                        :visible="visible"
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </a-drawer>
            </div>

            <a-row>多层抽屉:</a-row>
            <a-button type="primary" @click="showDrawer2">
                Open
            </a-button>
            <a-drawer
                    title="Multi-level drawer"
                    width="520"
                    :closable="false"
                    @close="onClose2"
                    :visible="parentvisible"
            >
                <a-button type="primary" @click="showChildrenDrawer">
                    Two-level drawer
                </a-button>
                <a-drawer
                        title="Two-level Drawer"
                        width="320"
                        :closable="false"
                        @close="onChildrenDrawerClose"
                        :visible="childrenDrawer"
                >
                    <a-button type="primary" @click="showChildrenDrawer">
                        This is two-level drawer
                    </a-button>
                </a-drawer>
                <div class="wbgc-card wbdc"
                     :style="{
                      position: 'absolute',
                      bottom: 0,
                      width: '100%',
                      borderTopWidth: '1px',
                      borderTopStyle: 'solid',
                      padding: '10px 16px',
                      textAlign: 'right',
                      left: 0,
                      borderRadius: '0 0 4px 4px',
                    }"
                >
                    <a-button style="marginRight: 8px" @click="onClose2">
                        Cancel
                    </a-button>
                    <a-button @click="onClose2" type="primary">
                        Submit
                    </a-button>
                </div>
            </a-drawer>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                /* 自定义位置抽屉 */
                visible: false,
                placement: 'left',
                /* 多级抽屉 */
                parentvisible: false,
                childrenDrawer: false
            };
        },
        methods: {
            /* 自定义位置抽屉 */
            showDrawer() {
                this.visible = true;
            },
            onClose() {
                this.visible = false;
            },
            onChange(e) {
                this.placement = e.target.value;
            },
            /* 多级抽屉 */
            showDrawer2() {
                this.parentvisible = true;
            },
            onClose2() {
                this.parentvisible = false;
            },
            showChildrenDrawer() {
                this.childrenDrawer = true;
            },
            onChildrenDrawerClose() {
                this.childrenDrawer = false;
            }
        }
    };
</script>

<style lang="less" scoped>

</style>
