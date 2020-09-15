<template>
    <div class="checkbox-template">
        Checkbox / Radio
        <a-row>
            <a-col :span="6">
                <div>
                    <p>简单的checkbox</p>
                    <a-checkbox>Checkbox</a-checkbox><br/>
                    <a-checkbox checked="checked">Checkbox</a-checkbox>
                </div>
            </a-col>
            <a-col :span="6">
                <div>
                    <p>失效的checkbox</p>
                    <a-checkbox :defaultChecked="false" disabled>Checkbox</a-checkbox><br />
                    <a-checkbox :defaultChecked="true" disabled>Checkbox</a-checkbox>
                </div>
            </a-col>
            <a-col :span="6">
                <div>
                    <p>未选悬停的checkbox</p>
                    <a-checkbox>Checkbox</a-checkbox><br>
                </div>
            </a-col>
        </a-row>

        <a-row style="margin-top: 20px;">
            <a-col :span="6">
                <div>
                    <div>
                        <a-checkbox :indeterminate="indeterminate" @change="onCheckAllChange" :checked="checkAll">
                            Check all
                        </a-checkbox>
                    </div>
                    <br />
                    <a-checkbox-group :options="plainOptions" v-model="checkedList" @change="onChange" />
                </div>
            </a-col>
        </a-row>

        <a-row style="margin-top: 20px;">
            <a-col :span="5">
                <a-radio>未选悬停项</a-radio>
            </a-col>
            <a-col :span="4">
                <a-radio>未选中项</a-radio>
            </a-col>
            <a-col :span="5">
                <a-radio checked="checked">已选中项</a-radio>
            </a-col>
            <a-col :span="5">
                <a-radio :defaultChecked="false" :disabled="disabled">未选失效项</a-radio>
            </a-col>
            <a-col :span="5">
                <a-radio defaultChecked :disabled="disabled">已选失效项</a-radio>
            </a-col>
        </a-row>

        <a-row style="margin-top: 20px;">
            <a-col :span="10">
                <p>一组互斥的Radio配合使用</p>
                <a-radio-group v-model="value">
                    <a-radio :value="1">A</a-radio>
                    <a-radio :value="2">B</a-radio>
                    <a-radio :value="3">C</a-radio>
                    <a-radio :value="4">D</a-radio>
                </a-radio-group>
            </a-col>
            <a-col :span="10">
                <p>垂直的RadioGroup,配合更多输入框选项</p>
                <a-radio-group v-model="value">
                    <a-radio :style="radioStyle" :value="1">Option A</a-radio>
                    <a-radio :style="radioStyle" :value="2">Option B</a-radio>
                    <a-radio :style="radioStyle" :value="3">Option C</a-radio>
                    <a-radio :style="radioStyle" :value="4">
                        More...
                        <a-input v-if="value === 4" :style="{ width: 100, marginLeft: 10 }" />
                    </a-radio>
                </a-radio-group>
            </a-col>
        </a-row>

        <a-row style="margin-top: 20px;">
            <a-col :span="8">
                <a-radio-group @change="onChange" v-model="value">
                    <a-radio-button value="a">Hangzhou</a-radio-button>
                    <a-radio-button value="b">Shanghai</a-radio-button>
                    <a-radio-button value="c">Beijing</a-radio-button>
                    <a-radio-button value="d">Chengdu</a-radio-button>
                </a-radio-group>
            </a-col>
            <a-col :span="8">
                <a-radio-group @change="onChange" defaultValue="a">
                    <a-radio-button value="a">Hangzhou</a-radio-button>
                    <a-radio-button value="b" disabled>Shanghai</a-radio-button>
                    <a-radio-button value="c">Beijing</a-radio-button>
                    <a-radio-button value="d">Chengdu</a-radio-button>
                </a-radio-group>
            </a-col>
            <a-col :span="8">
                <a-radio-group disabled @change="onChange" defaultValue="a">
                    <a-radio-button value="a">Hangzhou</a-radio-button>
                    <a-radio-button value="b">Shanghai</a-radio-button>
                    <a-radio-button value="c">Beijing</a-radio-button>
                    <a-radio-button value="d">Chengdu</a-radio-button>
                </a-radio-group>
            </a-col>
        </a-row>
    </div>
</template>

<script>
    const plainOptions = ['Apple', 'Pear', 'Orange'];
    const defaultCheckedList = ['Apple', 'Orange'];
    export default {
        name: '',
        data() {
            return {
                value:1,
                disabled:true,
                checkedList:defaultCheckedList,
                indeterminate: true,
                checkAll: false,
                plainOptions,
                radioStyle: {
                    display: 'block',
                    height: '30px',
                    lineHeight: '30px'
                }
            };
        },
        components: {},
        methods:{
            onChange(checkedList) {
                this.indeterminate = !!checkedList.length && checkedList.length < plainOptions.length;
                this.checkAll = checkedList.length === plainOptions.length;
            },
            onCheckAllChange(e) {
                Object.assign(this, {
                    checkedList: e.target.checked ? plainOptions : [],
                    indeterminate: false,
                    checkAll: e.target.checked
                });
            }
        }
    };
</script>

<style lang="less" scoped>

</style>
