/**
* @DATE: 2019/11/1 11:10
* @Version: 0.0.1
* @Author: lmz
* @Description:
* @Update: 更新内容 by lmz 2019/11/1 11:10
*/
<template>
    <div class="search-bar">
        <slot name="search"></slot>
        <a-button class="btn-search" type="primary" icon="search" @click="search">查询</a-button>
    </div>
</template>

<script>
    export default {
        name: 'searchBar',
        data() {
            return {
                msg: ''
            };
        },
        methods: {
            /* 触发父组件的查询方法 */
            search () {
                this.$emit('searchInfo');
            }
        }
    };
</script>

<style lang="less">
    .search-bar {
        height: 70px;
        padding: 18px 0 0 31px;
        width: 100%;
        margin-bottom: 12px;
        .ant-input-group-wrapper,
        .ant-input-group-compact {
            width: 156px;
            height: 100%;
            display: inline-block;
            margin-right: 20px;
            &.long1 {
                width: 168px;
            }
            &.long2 {
                width: 180px;
            }
        }
        .btn-search.ant-btn.ant-btn-primary {
            font-size: 12px;
            height: 32px;
            width: 72px;
            padding: 0;
            line-height: 1;
        }
        .ant-calendar-picker {
            margin-right: 20px;
            width: 240px;
            .ant-input {
                line-height: 1;
                .ant-calendar-range-picker-separator {
                    line-height: 1.5;
                }
            }
        }
        .ant-input-disabled {
            color: @text-color;
            cursor: inherit;
            background-color: #fff;
        }
        .ant-input-group {
            width: 100%;
        }
        .ant-input-group-addon,
        .ant-input-affix-wrapper .ant-input,
        .ant-input-group .ant-input,
        .ant-calendar-picker-input.ant-input{
            font-size: 12px;
            min-height: unset;
            height: 32px;
        }
        .select-box.ant-input-group {
            display: inline-block;
            width: 168px;
            height: 100%;
            vertical-align: top;
            margin-right: 10px;
        }
        .select-box .ant-input.ant-input-disabled {
            max-width: 72px;
        }
        .ant-select {
            font-size: 12px;
            height: 32px;
            .ant-select-selection {
                /*height: 32px;*/
            }
            .ant-select-selection__rendered {
                /*height: 32px;*/
                /*line-height: 32px;*/
            }
        }
    }
</style>
