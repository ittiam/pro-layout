<template>
    <div>
        Transfer
        <a-row style="margin-top: 20px;">
            <a-transfer
                    :dataSource="mockData"
                    :titles="['Source', 'Target']"
                    :targetKeys="targetKeys"
                    :selectedKeys="selectedKeys"
                    @change="handleChange"
                    @selectChange="handleSelectChange"
                    @scroll="handleScroll"
                    :render="item=>item.title"
                    :disabled="disabled">
            </a-transfer>
        </a-row>
    </div>
</template>

<script>
    export default {
        name: '',
        data() {
            const mockData = [];
            for (let i = 0; i < 20; i++) {
                mockData.push({
                    key: i.toString(),
                    title: `content${i + 1}`,
                    description: `description of content${i + 1}`,
                    disabled: i % 3 < 1
                });
            }

            const oriTargetKeys = mockData.filter(item => +item.key % 3 > 1).map(item => item.key);
            return {
                mockData,
                targetKeys: oriTargetKeys,
                selectedKeys: ['1', '4'],
                disabled: false
            };
        },
        methods: {
            handleChange(nextTargetKeys, direction, moveKeys) {
                this.targetKeys = nextTargetKeys;

                // console.log('targetKeys: ', nextTargetKeys);
                // console.log('direction: ', direction);
                // console.log('moveKeys: ', moveKeys);
            },
            handleSelectChange(sourceSelectedKeys, targetSelectedKeys) {
                this.selectedKeys = [...sourceSelectedKeys, ...targetSelectedKeys];

                // console.log('sourceSelectedKeys: ', sourceSelectedKeys);
                // console.log('targetSelectedKeys: ', targetSelectedKeys);
            },
            handleScroll(direction, e) {
                // console.log('direction:', direction);
                // console.log('target:', e.target);
            },
            handleDisable(disabled) {
                this.disabled = disabled;
            }
        },
        components: {}
    };
</script>

<style lang="less" scoped>

</style>
