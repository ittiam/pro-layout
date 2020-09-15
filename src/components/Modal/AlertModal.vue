<template>
    <div :class="['alert-modal', closable ? 'man-close-wrap' : 'auto-close-wrap wbsc']" :style="{width: closable ? '' : width + 'px', transform: closable ? '' : 'translateX(' + -width/2 + 'px)'}">
        <a-alert class="wbsc" :style="{width: width + 'px', transform: 'translateX(' + -width/2 + 'px)'}" :message="message" :description="description" :type="type" :showIcon="showIcon" :closable="closable" @close="modalVisible=false">
            <i v-if="showIcon" slot="icon" :class="icon"> </i>
            <i v-if="closable" slot="closeText" class="icon-ic_clear"></i>
        </a-alert>
    </div>
</template>

<script>

    export default {
        name: "alertModal",
        props: {
            /**
             * visible      是否可见 Modal
             * closable     是否可关闭
             * centered     是否垂直居中展示 Modal
             * width        宽度
             * message      主要信息
             * description  描述信息
             * type         类型
             * showIcon     是否显示icon
             * duration     自动关闭时间
             */
            visible: {
                type: Boolean,
                required: false,
                default: false
            },
            closable: {
                type: Boolean,
                required: false,
                default: false
            },
            centered: {
                type: Boolean,
                required: false,
                default: false
            },
            message: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: false,
                default: ''
            },
            type: {
                type: String,
                required: true
            },
            showIcon: {
                type: Boolean,
                required: false,
                default: true
            },
            duration: {
                type: Number,
                required: false,
                default: 2
            }
        },
        data() {
            return {};
        },
        computed: {
            modalVisible: {
                get() {
                    return this.visible;
                },
                set(val) {
                    this.$emit('close');
                }
            },
            icon() {
                let iconClass = 'icon-ic_error';
                switch (this.type) {
                case 'success': iconClass = 'icon-ic_check_circle'; break;
                case 'info': iconClass = 'icon-ic_error'; break;
                case 'warning': iconClass = 'icon-ic_error'; break;
                case 'error': iconClass = 'icon-ic_cancel'; break;
                default: return 'icon-ic_error';
                }
                return iconClass;
            },
            width() {
                if (this.closable) return 1000;
                else if (this.description) return 300;
                else return 260;
            }
        },
        mounted() {
            if (!this.closable) this.countDown();
        },
        methods: {
            countDown() {
                let secondsToGo = this.duration;
                const interval = setInterval(() => {
                    secondsToGo -= 1;
                }, 1000);
                setTimeout(() => {
                    clearInterval(interval);
                    this.$emit('close');
                }, secondsToGo * 1000);
            },
            close() {
                this.$destroy();
            }
        }
    };
</script>

<style lang="less">
    @keyframes mySlideDown
    {
        0%   { top: 0;}
        100%  { top: 100px;}
    }
    .alert-modal {
        position: fixed;
        z-index: 1011;
        background: rgba(0, 0, 0, .3);
        .ant-alert {
            position: relative;
            left: 50%;
            top: 100px;
        }
        &.man-close-wrap { // 为手动关闭的modal设置外层容器大小
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            .ant-alert {
                animation: mySlideDown .3s ease;
            }
        }
        &.auto-close-wrap { // 为自动关闭的modal设置外层容器大小
            position: relative;
            top: 100px;
            left: 50%;
            margin-bottom: 10px;
            overflow: hidden;
            animation: mySlideDown .3s ease;
            border-radius: 4px;
            .ant-alert {
                top: 0;
            }
        }

    }
</style>
