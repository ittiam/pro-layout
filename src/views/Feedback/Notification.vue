/**
 * @DATE: 2019/12/16 16:55
 * @Version: 0.0.1
 * @Author: lmz
 * @Description: Notification / Popconfirm 组件
 * @Update: 更新内容 by lmz 2019/12/16 16:55
 */
<template>
    <div>Notification / Popconfirm
        <div>
            <a-row>Notification</a-row>
            <a-button @click="() => openNotificationWithIcon('success')">Success</a-button>
            <a-button @click="() => openNotificationWithIcon('info')">Info</a-button>
            <a-button @click="() => openNotificationWithIcon('warning')">Warning</a-button>
            <a-button @click="() => openNotificationWithIcon('error')">Error</a-button>
            <a-button type="primary" @click="openNotification">Open the notification box</a-button>
        </div>
        <div>
            <a-row>Popconfirm</a-row>
            <a-popconfirm title="Are you sure？" okText="Yes" cancelText="No">
                <a href="#">Delete</a>
            </a-popconfirm>
        </div>
    </div>
</template>

<script>
    const close = () => {
        console.log(
            'Notification was closed. Either the close button was clicked or duration time elapsed.',
        );
    };
    export default {
        methods: {
            confirm(e) {
                console.log(e);
                this.$message.success('Click on Yes');
            },
            cancel(e) {
                console.log(e);
                this.$message.error('Click on No');
            },
            openNotificationWithIcon(type) {
                this.$notification[type]({
                    message: 'Notification Title',
                    description:
                        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
                    duration: 3    // 显示时长
                });
            },
            openNotification() {
                const key = `open${Date.now()}`;
                this.$notification.open({
                    message: 'Notification Title',
                    description:
                        'A function will be be called after the notification is closed (automatically after the "duration" time of manually).',
                    btn: h => {
                        return h(
                            'a-button',
                            {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                on: {
                                    click: () => this.$notification.close(key)
                                }
                            },
                            'Confirm',
                        );
                    },
                    key,
                    onClose: close
                });
            }
        }
    };
</script>

<style lang="less" scoped>

</style>
