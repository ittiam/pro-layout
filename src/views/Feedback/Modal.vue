/**
 * @DATE: 2019/12/16 16:54
 * @Version: 0.0.1
 * @Author: lmz
 * @Description: Modal / Progress 组件
 * @Update: 更新内容 by lmz 2019/12/16 16:54
 */
<template>
    <div>Modal / Progress
        <!---- Modal ---->
        <div>
            <a-row>Modal: </a-row>
            <div>
                <a-button @click="info">Info</a-button>
                <a-button @click="success">Success</a-button>
                <a-button @click="error">Error</a-button>
                <a-button @click="warning">Warning</a-button>
            </div>
            <div style="margin: 10px 0;">
                <a-button type="primary" @click="showModal">Open Modal</a-button>
                <a-modal title="Basic Modal" v-model="visible" @ok="handleOk">
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </a-modal>
            </div>
            <a-button @click="showConfirm">
                Confirm
            </a-button>
        </div>

        <!------ Progress ------>
        <div>
            <a-row>Progress: </a-row>
            <!-- 正常大小 -->
            <div>
                <a-progress :percent="30" />
                <a-progress :percent="50" status="active" />
                <a-progress :percent="70" status="exception" />
                <a-progress :percent="100" />
                <a-progress :percent="50" :showInfo="false" />
            </div>

            <!-- 小 -->
            <div style="width: 170px">
                <a-progress :percent="30" size="small" />
                <a-progress :percent="50" size="small" status="active" />
                <a-progress :percent="70" size="small" status="exception" />
                <a-progress :percent="100" size="small" />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                visible: false
            };
        },
        methods: {
            showModal() {
                this.visible = true;
            },
            handleOk(e) {
                console.log(e);
                this.visible = false;
            },
            showConfirm() {
                this.$confirm({
                    title: 'Do you want to delete these items?',
                    content: 'When clicked the OK button, this dialog will be closed after 1 second',
                    onOk() {
                        return new Promise((resolve, reject) => {
                            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                        }).catch(() => console.log('Oops errors!'));
                    },
                    onCancel() {}
                });
            },
            info() {
                const h = this.$createElement;
                this.$info({
                    title: 'This is a notification message',
                    content: h('div', {}, [
                        h('p', 'some messages...some messages...'),
                        h('p', 'some messages...some messages...')
                    ]),
                    onOk() {}
                });
            },

            success() {
                this.$success({
                    title: 'This is a success message',
                    content: 'some messages...some messages...'
                });
            },

            error() {
                this.$error({
                    title: 'This is an error message',
                    content: 'some messages...some messages...'
                });
            },

            warning() {
                this.$warning({
                    title: 'This is a warning message',
                    content: 'some messages...some messages...'
                });
            }
        }
    };
</script>

<style lang="less" scoped>

</style>
