<template>
  <div class="container">
    <el-row class="search" :gutter="10">
      <el-col style="margin-left: 20px;" :span="24">
        <el-col :span="4">
          <el-input v-model="input" size="small" suffix-icon="el-icon-date" placeholder="设备ID" />
        </el-col>
        <el-col :span="4">
          <el-select v-model="state" size="small" clearable placeholder="设备状态">
            <el-option
              v-for="item in states"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-input v-model="input" size="small" suffix-icon="el-icon-date" placeholder="搜索任务名称" />
        </el-col>
        <el-col :span="4">
          <el-input v-model="input" size="small" suffix-icon="el-icon-date" placeholder="搜索任务名称" />
        </el-col>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" class="item" v-for="index in 18">
        <span class="title">设备名：Call_1 <el-tag style="float: right;" type="success" size="mini">运行中</el-tag></span>
        <span class="text">状态：开机</span>
        <span class="text">开机时间： 200H</span>
        <span class="text">占位占位</span>
      </el-col>
    </el-row>
    <el-pagination
      style="margin-top: 10px;"
      background
      layout="prev, pager, next"
      :total="1000">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Equipment',
  data() {
    return {
      input: '',
      currentDate: new Date(),
      state: {},
      states: [
        { value: '运行中',
          lable: '运行中' },
        { value: '暂停',
          lable: '暂停' }
      ]
    }
  }
}
</script>

<style scoped>
.search {
  margin: 20px 10px 0 0;
}
.item {
  text-align: left;
  width:200px;
  height: 180px;
  cursor: pointer;
  color: rgba(0,0,0,.65);
  background-color: #f5f5f5;
  margin: 20px 0px 0 20px;
  border-radius: 3px;
  }
.container {
  text-align: center;
}
.title {
  color: rgba(0,0,0,.65);
  font-size: 15px;
  display: block;
  padding: 5px;
  margin: 3px;
  border-bottom:1px solid #b2b2b2;
}
.text {
  color: rgba(0,0,0,.65);
  font-size: 15px;
  display: block;
  padding: 5px;
  margin: 8px 0 0 3px;
}
</style>
