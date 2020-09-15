<template>
    <div>Popover / Tooltip
        <div style="margin: 80px 0;">
            Popover:
            <a-popover title="Title">
                <template slot="content">
                    <p>Content</p>
                    <p>Content</p>
                </template>
                <a-button type="primary">Hover me</a-button>
            </a-popover>
        </div>

        <div>
            Tooltip:
            <a-tooltip>
                <template slot="title">
                    prompt textprompt
                </template>
                Hover me
            </a-tooltip>
        </div>
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
