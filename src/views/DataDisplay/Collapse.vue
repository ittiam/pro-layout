<!--
 * @Author: lfl
 * @Date: 2019-12-04 17:42:09
 * @LastEditors: chenky
 * @LastEditTime: 2019-12-12 08:55:47
 * @Description: 折叠面板模板
 -->
<template>
    <div>
        <p>风琴样式的折叠面板</p><br>
        <div>
            <a-collapse v-model="activeKey">
                <a-collapse-panel header="This is panel header 1" key="1">
                    <p>{{text}}</p>
                </a-collapse-panel>
                <a-collapse-panel header="This is panel header 2" key="2" :disabled="false">
                    <p>{{text}}</p>
                </a-collapse-panel>
                <a-collapse-panel header="This is panel header 3" key="3" disabled>
                    <p>{{text}}</p>
                </a-collapse-panel>
            </a-collapse>
        </div><br>
        <p>简洁风格的折叠面板</p><br>
        <div>
            <a-collapse defaultActiveKey="1" :bordered="false">
                <a-collapse-panel header="This is panel header 1" key="1">
                    <p>{{text}}</p>
                </a-collapse-panel>
                <a-collapse-panel header="This is panel header 2" key="2" :disabled="false">
                    <p>{{text}}</p>
                </a-collapse-panel>
                <a-collapse-panel header="This is panel header 3" key="3">
                    <p>{{text}}</p>
                </a-collapse-panel>
            </a-collapse>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                text: `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`,
                activeKey: ['1']
            };
        },
        watch: {
            activeKey(key) {
                console.log(key);
            }
        }
    };
</script>

<style lang="less" scoped>
</style>
