<template>
  <div class="container">
    <el-row type="flex" :gutter="10" justify="center">
      <el-col :span="24" class="search">
        <el-col :span="24">
          <el-col :span="3">
            <el-select v-model="task" size="small" clearable placeholder="全公司的客户">
              <el-option
                v-for="item in tasks"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col :span="8">
            <el-input ref="searchInput" v-model="input" size="small" placeholder="按下回车键搜索" @keyup.13.native="sreachPrs">
              <el-select slot="prepend" v-model="select" style="width: 100px;" placeholder="客户名称">
                <el-option label="客户名称" value="name" />
                <el-option label="联系电话" value="tel" />
                <el-option label="来源" value="from" />
              </el-select>
              <el-button slot="append" size="small" type="primary">搜索</el-button>
            </el-input>
          </el-col>
        </el-col>
        <el-col class="screen" :span="24">
          <el-col :span="24">
            <el-col :span="3"><span>跟进阶段</span></el-col>
            <el-col :span="21">
              <el-checkbox v-model="checked">全选</el-checkbox>
              <el-checkbox v-model="checked">线索</el-checkbox>
              <el-checkbox v-model="checked">AI初访</el-checkbox>
              <el-checkbox v-model="checked">人工初访</el-checkbox>
              <el-checkbox v-model="checked">意向</el-checkbox>
              <el-checkbox v-model="checked">报价</el-checkbox>
              <el-checkbox v-model="checked">成交</el-checkbox>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="3"><span>客户标签</span></el-col>
            <el-col :span="21" style="border: 1px solid  rgb(217, 217, 217);padding: 8px 100px 8px 8px;">
              <span style="margin-right: 30px;">意向标签</span>
              <el-checkbox v-model="checked">全选</el-checkbox>
              <el-checkbox v-model="checked">A明确有意向</el-checkbox>
              <el-checkbox v-model="checked">B可能有意向</el-checkbox>
              <el-checkbox v-model="checked">C明确拒绝</el-checkbox>
              <el-checkbox v-model="checked">D用户忙</el-checkbox>
              <el-checkbox v-model="checked">E拨打失败</el-checkbox>
              <el-checkbox v-model="checked">F级(无效客户)</el-checkbox>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="3"><span>最后通话状态</span></el-col>
            <el-col :span="21">
              <el-checkbox v-model="checked">全选</el-checkbox>
              <el-checkbox v-model="checked">线索</el-checkbox>
              <el-checkbox v-model="checked">AI初访</el-checkbox>
              <el-checkbox v-model="checked">人工初访</el-checkbox>
              <el-checkbox v-model="checked">意向</el-checkbox>
              <el-checkbox v-model="checked">报价</el-checkbox>
              <el-checkbox v-model="checked">成交</el-checkbox>
            </el-col>
          </el-col>
        </el-col>
      </el-col>
    </el-row>
    <div class="tool-board">
      <el-button size="small">导入</el-button>
      <el-button size="small">导出</el-button>
      <el-button size="small" type="primary">转给他人</el-button>
      <el-button size="small">退回公海</el-button>
      <el-button size="small" type="primary">转给他人</el-button>
      <el-button size="small" type="primary">删除</el-button>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @cell-click="control"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        label="通话记录id"
        prop="id"
        width="120"
      />
      <el-table-column
        prop="name"
        label="客户名称"
        width="120"
      />
      <el-table-column
        prop="state"
        label="处理状态"
      />
      <el-table-column
        prop="tel"
        label="联系方式"
        width="120px"
      />
      <el-table-column
        prop="talking"
        label="话术名称"
        width="120px"
      />
      <el-table-column
        prop="task"
        label="任务名称"
      />
      <el-table-column
        prop="time"
        label="通话时间"
        width="200px;"
      />
      <el-table-column
        prop="CallState"
        label="通话状态"
      />
      <el-table-column
        prop="duration"
        label="通话时长"
      />
      <el-table-column
        prop="tag"
        label="意向标签"
      />
      <el-table-column
        fixed="right"
        width="100"
      >
        <template>
          <el-tag>未读</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :with-header="false"
    >
      <span>客户详情</span>
      <div class="top" style="width:200px;height:200px;background-color: red;" />
    </el-drawer>

  </div>
</template>

<script>
export default {
  name: 'Customer',
  data() {
    return {
      drawer: false,
      input: '',
      task: '',
      tasks: [{ value: '测试', lable: 'test' }, { value: '测试', lable: 'test' }, { value: '测试', lable: 'test' }],
      select: [
        { value: 'from', lable: '来源' },
        { value: 'tel', lable: '联系电话' },
        { value: 'name', lable: '客户名称' }
      ],
      tableData: [
        { id: '12315', name: '毛', state: '已转客户',
          tel: '14785814256',
          talking: '贵阳钱湖话术',
          task: 'ai_feixxx',
          time: '2020.03.28 14:30:00',
          duration: '26s',
          CallState: '已接通',
          tag: '明确意向'
        }
      ]
    }
  },
  methods: {
    handleSelectionChange(val) {
      console.log(val)
    },
    control(val) {
      console.log(val)
      this.drawer = true
    }
  },
  sreachPrs() {
    console.log('按下了回车')
  }
}
</script>

<style scoped>
  .search {
    box-sizing: border-box;
    margin: 10px 20px 10px 20px;
    padding: 0;
    color: rgba(0,0,0,.65);
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5;
    list-style: none;
    -webkit-font-feature-settings: "tnum";
    font-feature-settings: "tnum","tnum";
  }
  .search .el-col{
    margin-top: 10px;
  }
  .screen {
    border-width: 1px;
    border-style: solid;
    border-color: rgb(217, 217, 217);
    border-image: initial;
    padding: 8px 16px;
  }
  .tool-board {
    text-align: right;
    padding-right: 10px;
    -ms-flex-pack: justify;
    justify-content: space-between;
    margin-bottom: 10px;
  }
</style>
