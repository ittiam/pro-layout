<template>
    <div class="input-template">
        Input / InputNumber / rate
        <a-row style="margin-top: 20px;">
            <a-col :span="8">
                <a-rate v-model="value1"/>
            </a-col>
            <a-col :span="8">
                <a-rate v-model="value2"/>
            </a-col>
            <a-col :span="8">
                <a-rate v-model="value3"/>
            </a-col>
        </a-row>

        <a-row style="margin-top: 20px;">
            <a-col :span="8">
                <a-input-number :min="1" :max="100000" :defaultValue="3"/>
            </a-col>
            <a-col :span="8">
                <a-input-number :min="1" :max="10" :disabled="true" :defaultValue="3"/>
            </a-col>
            <a-col :span="8">
                <a-input-search placeholder="input search text" style="width: 200px"/>
            </a-col>
        </a-row>

        <a-row style="margin-top: 20px;">
            <a-col :span="12">
                <h3>input 默认输入框</h3>
                <a-input style="width: 50%;margin-bottom:20px" placeholder="Basic usage"/>
                默认输入框
                <a-input style="width: 50%;margin-bottom:20px" placeholder="Basic usage"/>
                输入框报错
                <a-input style="width: 50%;margin-bottom:20px" placeholder="Basic usage"/>
                输入框必填
                <a-input type="password" style="width: 50%;margin-bottom:20px" placeholder="input password"/>
                密码输入框
                <a-form-item
                        has-feedback
                        validate-status="success"
                >
                    <a-input id="success" placeholder="I'm the content"/>
                </a-form-item>
                输入成功
            </a-col>
            <a-col :span="12">
                <h3>input 前置文案输入框</h3>
                <a-form :form="form">
                    <a-form-item label="Note" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                        <a-input
                                v-decorator="['note1', { rules: [{ required: true, message: 'Please input your note!' }] }]"
                        />
                    </a-form-item>

                    <a-form-item label="Note" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                        <a-input
                                v-decorator="['note2', { rules: [{ required: true, message: 'Please input your note!' }] }]"
                        />
                    </a-form-item>

                    <a-form-item label="Note123" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                        <a-input
                                v-decorator="['note3', { rules: [{ required: true,validator: checkPrice, message: 'Please input your note!' }] }]"
                        />
                    </a-form-item>

                    <a-form-item label="Note" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                        <a-input disabled
                                 v-decorator="['note4', { rules: [{ required: true, message: 'Please input your note!' }] }]"
                        />
                    </a-form-item>

                    <a-form-item label="Note" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                        <a-input
                                v-decorator="['note', { rules: [{ required: true, message: 'Please input your note!' }] }]"
                        />
                    </a-form-item>
                </a-form>

            </a-col>
        </a-row>

        <a-row style="margin-top: 20px;">
            <a-col :span="12">
                input描述文案输入框
                <a-textarea placeholder="Basic usage" :rows="5"/>
            </a-col>
        </a-row>

        <a-row style="margin-top: 20px;">
            <a-form :form="form" @submit="handleSubmit">
                <a-form-item label="Note" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                    <a-input
                            v-decorator="['note', { rules: [{ required: true, message: 'Please input your note!' }] }]"
                    />
                </a-form-item>
                <a-form-item label="Gender" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                    <a-select
                            v-decorator="[
                              'gender',
                              { rules: [{ required: true, message: 'Please select your gender!' }] },
                            ]"
                            placeholder="Select a option and change input text above"
                            @change="handleSelectChange"
                    >
                        <a-select-option value="">
                            123
                        </a-select-option>
                        <a-select-option value="male">
                            male
                        </a-select-option>
                        <a-select-option value="female">
                            female
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                    <a-button type="primary" html-type="submit">
                        Submit
                    </a-button>
                </a-form-item>
            </a-form>
        </a-row>
    </div>
</template>

<script>
    export default {
        name: '',
        data() {
            return {
                value1: 0,
                value2: 5,
                value3: 3,
                formLayout: 'horizontal',
                form: this.$form.createForm(this, {name: 'coordinated'})
            };
        },
        components: {},
        methods: {
            checkPrice(rule, value, callback) {
                if (value.number > 0) {
                    callback();
                    return;
                }
                callback('Price must greater than zero!');
            },
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        console.log('Received values of form: ', values);
                    }
                });
            },
            handleSelectChange(value) {
                console.log(value);
                this.form.setFieldsValue({
                    note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`
                });
            }
        }
    };
</script>

<style lang="less" scoped>

</style>
