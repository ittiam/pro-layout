<template>
    <div class="cascader-template">
        Cascader级联选择

        <a-row type="flex">
            <a-col :span="6">
                <a-cascader :options="options" placeholder="Please select" />
            </a-col>
            <a-col :span="6">
                <a-cascader disabled :defaultValue="['zhejiang', 'hangzhou', 'xihu']" :options="options" placeholder="Please select" />
            </a-col>
        </a-row>
    </div>
</template>

<script>
    export default {
        name: '',
        data() {
            return {
                options: [
                    {
                        value: 'zhejiang',
                        label: 'Zhejiang',
                        children: [
                            {
                                value: 'hangzhou',
                                label: 'Hangzhou',
                                children: [
                                    {
                                        value: 'xihu',
                                        label: 'West Lake'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        value: 'jiangsu',
                        label: 'Jiangsu',
                        children: [
                            {
                                value: 'nanjing',
                                label: 'Nanjing',
                                children: [
                                    {
                                        value: 'zhonghuamen',
                                        label: 'Zhong Hua Men'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        value: 'shanxi',
                        label: 'Shanxi',
                        disabled: true,
                        children: [
                            {
                                value: 'xian',
                                label: 'Xian'
                            }
                        ]
                    }
                ]
            };
        },
        components: {}
    };
</script>

<style lang="less" scoped>

</style>
