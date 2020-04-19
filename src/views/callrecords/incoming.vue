<template>
  <div class="container">
    <el-row type="flex" class="search" :gutter="10">
      <el-col :span="24">
        <el-col :span="3">
          <el-input v-model="input" size="small" suffix-icon="el-icon-date" placeholder="搜索任务名称" />
        </el-col>
        <el-col :span="3">
          <el-input v-model="input" size="small" suffix-icon="el-icon-date" placeholder="搜索任务名称" />
        </el-col>
        <el-col :span="3">
          <el-input v-model="input" size="small" suffix-icon="el-icon-date" placeholder="搜索任务名称" />
        </el-col>
        <el-col :span="3">
          <el-input v-model="input" size="small" suffix-icon="el-icon-date" placeholder="搜索任务名称" />
        </el-col>
        <el-col :span="3">
          <el-input v-model="input" size="small" suffix-icon="el-icon-date" placeholder="搜索任务名称" />
        </el-col>
        <el-col :span="3">
          <el-input v-model="input" size="small" suffix-icon="el-icon-date" placeholder="搜索任务名称" />
        </el-col>
        <el-col :span="3">
          <el-input v-model="input" size="small" suffix-icon="el-icon-date" placeholder="搜索任务名称" />
        </el-col>
        <el-col :span="3">
          <el-input v-model="input" size="small" suffix-icon="el-icon-date" placeholder="搜索任务名称" />
        </el-col>
        <el-col :span="3">
          <el-input v-model="input" size="small" suffix-icon="el-icon-date" placeholder="搜索任务名称" />
        </el-col>
      </el-col>
    </el-row>
    <div class="tool-board">
      <el-button size="small">导出</el-button>
      <el-button size="small" type="primary">转为客户</el-button>
      <el-button size="small">拉黑名单</el-button>
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
      <span>我来啦!</span>
    </el-drawer>

  </div>
</template>

<script>
export default {
  name: 'Incoming',
  data() {
    return {
      drawer: false,
      input: '',
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
  }
}
</script>

<style scoped>
  .search {
    margin: 5px 10px 0 0;
  }
  .search .el-col{
    margin-top: 10px;
  }
  .tool-board {
    text-align: right;
    padding-right: 10px;
    -ms-flex-pack: justify;
    justify-content: space-between;
    margin-bottom: 10px;
  }
</style>
