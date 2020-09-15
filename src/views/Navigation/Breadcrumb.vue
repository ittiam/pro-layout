/**
 * @DATE: 2019/12/17 16:45
 * @Version: 0.0.1
 * @Author: lmz
 * @Description: Breadcrumb组件
 * @Update: 更新内容 by lmz 2019/12/17 16:45
 */
<template>
    <div>
        <a-row>Breadcrumb</a-row>
        <a-breadcrumb>
            <a-breadcrumb-item>Home</a-breadcrumb-item>
            <a-breadcrumb-item><a href="javascript:;">Application Center</a></a-breadcrumb-item>
            <a-breadcrumb-item><a href="javascript:;">Application List</a></a-breadcrumb-item>
            <a-breadcrumb-item>An Application</a-breadcrumb-item>
        </a-breadcrumb>

        <a-breadcrumb>
            <a-breadcrumb-item href="javascript:;">
                <a-icon type="home" />
            </a-breadcrumb-item>
            <a-breadcrumb-item href="javascript:;">
                <a-icon type="user" />
                <span>Application List</span>
            </a-breadcrumb-item>
            <a-breadcrumb-item>
                Application
            </a-breadcrumb-item>
        </a-breadcrumb>
    </div>
</template>

<script>
    export default {
        name: '',
        data() {
            return {};
        },
        components: {}
    };
</script>

<style lang="less" scoped>
    .ant-breadcrumb {
        margin-bottom: 20px;
    }
</style>
