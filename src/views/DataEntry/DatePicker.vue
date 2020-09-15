<template>
    <div>
        DatePicker<br/>

        <a-row style="margin-top: 20px;">
            <a-col :span="12">
                <a-time-picker use12Hours />
            </a-col>
            <a-col :span="12">
                <a-time-picker :defaultValue="moment('12:08:23', 'HH:mm:ss')" disabled />
            </a-col>
        </a-row>

        <a-row style="margin-top: 20px;">
            <a-col :span="12">
                <a-date-picker :disabledDate="disabledDate" placeholder="Select month" /> Date<br/><br/>
                <a-date-picker disabled /> 日期失效 <br/><br/>
                <a-date-picker :defaultValue="moment('2015-06-06', dateFormat)" disabled /> 日期失效并有默认值<br/>
            </a-col>
            <a-col :span="12">
                <a-month-picker placeholder="Select month" /> month<br/><br/>
                <a-month-picker disabled placeholder="Select month" /> 月份失效<br/><br/>
                <a-month-picker :defaultValue="moment('2015-06', 'YYYY-MM')" disabled placeholder="Select month" /> 月份失效并有默认值
            </a-col>
        </a-row>
        <a-row style="margin-top: 20px;">
        <a-col :span="12">
            时间段选择<br>
            <a-range-picker/>
        </a-col>
        <a-col :span="12">
            失效时间段选择<br>
            <a-range-picker
                    :defaultValue="[moment('2015-06-06', dateFormat), moment('2015-06-06', dateFormat)]"
                    disabled
            />
        </a-col>
    </a-row>

    <a-row style="margin-top: 20px;">
        <a-col :span="12">
            日期时间选择<br>
            <a-date-picker showTime placeholder="Select Time"/>
        </a-col>
        <a-col :span="12">
            日期时间段选择<br>
            <a-range-picker
                    :showTime="{ format: 'HH:mm:ss' }"
                    format="YYYY-MM-DD HH:mm:ss"
                    :placeholder="['Start Time', 'End Time']"
            />
        </a-col>
    </a-row>
    </div>
</template>

<script>
    import moment from 'moment';
    export default {
        name: '',
        data() {
            this.dateFormat = 'YYYY-MM-DD';
            return {

            };
        },
        components: {},
        methods:{
            moment,
            disabledDate(current) {
                return current && current < moment().endOf('day');
            }

        }
    };
</script>

<style lang="less" scoped>

</style>
