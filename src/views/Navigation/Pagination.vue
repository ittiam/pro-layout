/**
 * @DATE: 2019/12/17 17:04
 * @Version: 0.0.1
 * @Author: lmz
 * @Description: pagination 组件
 * @Update: 更新内容 by lmz 2019/12/17 17:04
 */
<template>
    <div>
        <a-row>基础分页:</a-row>
        <a-pagination v-model="current" :total="50"></a-pagination>
        <a-row>快速跳转至某页</a-row>
        <a-pagination showQuickJumper
                      :defaultCurrent="2"
                      :total="500"
                      showSizeChanger
                      v-model="current"
                      :showTotal="total => `${current} 页 / 共有 ${total} 页`" @change="onChange"
        ></a-pagination>
        <a-row>小版本分页</a-row>
        <a-pagination size="small" showSizeChanger :total="50" showQuickJumper></a-pagination>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                current: 2
            };
        },
        methods: {
            onChange(pageNumber) {
                console.log('Page: ', pageNumber);
            }
        }
    };
</script>

<style lang="less" scoped>
</style>
