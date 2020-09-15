/**
 * @DATE: 2019/12/17 16:45
 * @Version: 0.0.1
 * @Author: lmz
 * @Description: Dropdown 组件
 * @Update: 更新内容 by lmz 2019/12/17 16:45
 */
<template>
    <div>
        <div>Dropdown</div>
        <a-dropdown>
            <a class="ant-dropdown-link" href="#"> Hover me <a-icon type="down" /> </a>
            <a-menu slot="overlay">
                <a-menu-item>
                    <a href="javascript:;">1st menu item</a>
                </a-menu-item>
                <a-menu-item>
                    <a href="javascript:;">2nd menu item</a>
                </a-menu-item>
                <a-menu-item>
                    <a href="javascript:;">3rd menu item</a>
                </a-menu-item>
            </a-menu>
        </a-dropdown>

        <!------ 多层级 -------->
        <a-dropdown>
            <a class="ant-dropdown-link" href="#"> Cascading menu <a-icon type="down" /> </a>
            <a-menu slot="overlay">
                <a-menu-item>1st menu item</a-menu-item>
                <a-menu-item>2nd menu item</a-menu-item>
                <a-sub-menu title="sub menu" key="test">
                    <a-menu-item>3rd menu item</a-menu-item>
                    <a-menu-item>4th menu item</a-menu-item>
                </a-sub-menu>
                <a-sub-menu title="disabled sub menu" disabled>
                    <a-menu-item>5d menu item</a-menu-item>
                    <a-menu-item>6th menu item</a-menu-item>
                </a-sub-menu>
            </a-menu>
        </a-dropdown>
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
