<!--
 * @Author: lfl
 * @Date: 2019-12-04 17:42:09
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-07-21 16:40:27
 * @Description: 常见表格模板
 -->

<template>
  <div>
    <p>筛选、排序、滚动条表格</p>
    <a-table :rowSelection="rowSelection" :columns="columns" :dataSource="data" :scroll="{ x: 1550, y: 300 }">
      <a slot="action" slot-scope="text" href="javascript:;">action</a>
    </a-table>
    <p>可展开表格一</p>
    <a-table :columns="columns2" :dataSource="data2">
      <a slot="action" slot-scope="text" href="javascript:;">DeleteDeleteDeleteDeleteDelete</a>
      <p slot="expandedRowRender" slot-scope="record" style="margin: 0">{{ record.description }}</p>
    </a-table>
    <p>可展开表格二</p>
    <a-table :columns="columns4" :dataSource="data4" :rowSelection="Selection" />
    <p>紧凑型表格</p>
    <div id="components-table-demo-size">
      <h4 style="color:white">Middle size table with border</h4>
      <a-table :columns="columns3" :dataSource="data3" size="middle" bordered />
      <h4 style="color:white">Small size table</h4>
      <a-table :columns="columns3" :dataSource="data3" size="small" />
    </div>
    <p>嵌套表格</p>
    <a-table :columns="columns5" :dataSource="data5" class="components-table-demo-nested">
      <a slot="operation" slot-scope="text" href="javascript:;">Publish</a>
      <a-table
        slot="expandedRowRender"
        slot-scope="text"
        :columns="innerColumns"
        :dataSource="innerData"
        :pagination="false"
      >
        <span slot="status" slot-scope="text"> <a-badge status="success" />Finished </span>
        <span slot="operation" slot-scope="text" class="table-operation">
          <a href="javascript:;">Pause</a>
          <a href="javascript:;">Stop</a>
          <a-dropdown>
            <a-menu slot="overlay">
              <a-menu-item>Action 1</a-menu-item>
              <a-menu-item>Action 2</a-menu-item>
            </a-menu>
            <a href="javascript:;">
              More
              <a-icon type="down" />
            </a>
          </a-dropdown>
        </span>
      </a-table>
    </a-table>
  </div>
</template>
<script>
const columns5 = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Platform', dataIndex: 'platform', key: 'platform' },
  { title: 'Version', dataIndex: 'version', key: 'version' },
  { title: 'Upgraded', dataIndex: 'upgradeNum', key: 'upgradeNum' },
  { title: 'Creator', dataIndex: 'creator', key: 'creator' },
  { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
  { title: 'Action', key: 'operation', scopedSlots: { customRender: 'operation' } }
];

const data5 = [];
for (let i = 0; i < 3; ++i) {
  data5.push({
    key: i,
    name: 'Screem',
    platform: 'iOS',
    version: '10.3.4.5654',
    upgradeNum: 500,
    creator: 'Jack',
    createdAt: '2014-12-24 23:12:00'
  });
}

const innerColumns = [
  { title: 'Date', dataIndex: 'date', key: 'date' },
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Status', key: 'state', scopedSlots: { customRender: 'status' } },
  { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
  {
    title: 'Action',
    dataIndex: 'operation',
    key: 'operation',
    scopedSlots: { customRender: 'operation' }
  }
];

const innerData = [];
for (let i = 0; i < 3; ++i) {
  innerData.push({
    key: i,
    date: '2014-12-24 23:12:00',
    name: 'This is production name',
    upgradeNum: 'Upgraded: 56'
  });
}
const columns4 = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: '12%'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    width: '30%',
    key: 'address'
  }
];

const data4 = [
  {
    key: 1,
    name: 'John Brown sr.',
    age: 60,
    address: 'New York No. 1 Lake Park',
    children: [
      {
        key: 11,
        name: 'John Brown',
        age: 42,
        address: 'New York No. 2 Lake Park'
      },
      {
        key: 12,
        name: 'John Brown jr.',
        age: 30,
        address: 'New York No. 3 Lake Park',
        children: [
          {
            key: 121,
            name: 'Jimmy Brown',
            age: 16,
            address: 'New York No. 3 Lake Park'
          }
        ]
      },
      {
        key: 13,
        name: 'Jim Green sr.',
        age: 72,
        address: 'London No. 1 Lake Park',
        children: [
          {
            key: 131,
            name: 'Jim Green',
            age: 42,
            address: 'London No. 2 Lake Park',
            children: [
              {
                key: 1311,
                name: 'Jim Green jr.',
                age: 25,
                address: 'London No. 3 Lake Park'
              },
              {
                key: 1312,
                name: 'Jimmy Green sr.',
                age: 18,
                address: 'London No. 4 Lake Park'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  }
];

const Selection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  }
};
const columns3 = [
  {
    title: 'Name',
    dataIndex: 'name'
  },
  {
    title: 'Age',
    dataIndex: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address'
  }
];
const data3 = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park'
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park'
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  }
];
const columns2 = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
  { title: 'Action', dataIndex: '', key: 'x', scopedSlots: { customRender: 'action' } }
];

const data2 = [
  {
    key: 1,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.'
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.'
  },
  {
    key: 3,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.'
  }
];
const columns = [
  { title: 'Full Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
  { title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
  {
    title: 'Column 1',
    dataIndex: 'address',
    key: '1',
    width: 150,
    filters: [
      {
        text: 'Joe',
        value: 'Joe'
      },
      {
        text: 'Je',
        value: 'Je'
      },
      {
        text: 'Submenu',
        value: 'Submenu',
        children: [
          {
            text: 'Green',
            value: 'Green'
          },
          {
            text: 'Black',
            value: 'Black'
          }
        ]
      }
    ]
  },
  { title: 'Column 2', dataIndex: 'address', key: '2', width: 150 },
  { title: 'Column 3', dataIndex: 'address', key: '3', width: 150 },
  { title: 'Column 4', dataIndex: 'address', key: '4', width: 150 },
  { title: 'Column 5', dataIndex: 'address', key: '5', width: 150 },
  { title: 'Column 6', dataIndex: 'address', key: '6', width: 150 },
  { title: 'Column 7', dataIndex: 'address', key: '7', width: 150 },
  { title: 'Column 8', dataIndex: 'address', key: '8', sorter: true },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    scopedSlots: { customRender: 'action' }
  }
];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`
  });
}

export default {
  data() {
    return {
      data,
      columns,
      data2,
      columns2,
      data3,
      columns3,
      data4,
      columns4,
      Selection,
      data5,
      columns5,
      innerColumns,
      innerData
    };
  },
  computed: {
    rowSelection() {
      return {
        // type: 'radio',  // 多选/单选，checkbox or radio
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
          props: {
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name
          }
        })
      };
    }
  },
  methods: {}
};
</script>
<style lang="less" scoped></style>
