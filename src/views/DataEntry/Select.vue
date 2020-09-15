<template>
    <div>
        Select
        <a-row style="margin-top: 20px;">
            <a-col :span="8">
                <a-select defaultValue="lucy" style="width: 120px">
                    <a-select-option value="jack">Jack</a-select-option>
                    <a-select-option value="lucy">Lucy</a-select-option>
                    <a-select-option value="disabled" disabled>Disabled</a-select-option>
                    <a-select-option value="Yiminghe">yiminghe</a-select-option>
                </a-select>
            </a-col>
            <a-col :span="8">
                <a-select defaultValue="lucy" style="width: 120px" disabled>
                    <a-select-option value="lucy">Lucy</a-select-option>
                </a-select>
            </a-col>
            <a-col :span="8">
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="12">
                <a-select mode="tags" style="width: 100%" :tokenSeparators="[',']">
                    <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i"
                    >{{(i + 9).toString(36) + i}}</a-select-option
                    >
                </a-select>
            </a-col>
        </a-row>
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

</style>
