<template>
  <div class="content">
    <el-row :gutter="10" style="padding: 8px; height:50px;">
      <el-col :span="16">
        <el-col :span="4">
          <el-select v-model="task" size="mini" clearable placeholder="请选择">
            <el-option
              v-for="item in tasks"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-input v-model="input" size="mini" suffix-icon="el-icon-date" placeholder="搜索任务名称" />
        </el-col>
        <el-col :span="4">
          <el-date-picker
            v-model="creatTime"
            class="input-class"
            size="mini"
            type="date"
            placeholder="任务创建日期"
          />
        </el-col>
        <el-col :span="4">
          <el-select v-model="task" size="mini" clearable placeholder="选择任务状态">
            <el-option
              v-for="item in tasks"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="task" size="mini" clearable placeholder="选择线路">
            <el-option
              v-for="item in tasks"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
      </el-col>
      <el-col :span="8">
        <el-col :span="5">
          <el-dropdown style="line-height: 28px;" @command="handleCommand">
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="import">导入</el-dropdown-item>
              <el-dropdown-item command="del">删除</el-dropdown-item>
              <el-dropdown-item command="d" disabled>导出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col :span="5">
          <el-button v-if="clickAll" size="mini" type="primary" plain @click="clearCheck">取消</el-button>
          <el-button v-else size="mini" type="primary" @click="checkAll">全选</el-button>
        </el-col>
        <el-col :span="6">
          <el-button size="mini" type="primary" @click="dialogFormVisible = true">新建任务</el-button>
        </el-col>
        <el-col :span="6">
          <el-button size="mini" type="primary">暂停所有任务</el-button>
        </el-col>
      </el-col>
    </el-row>
    <el-dialog style="text-align: center" title="导入文件" top="20px" :visible.sync="uploadShow">
      <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
      <span v-if="number.tels" style="margin: 10px;display: inline-block">导入成功： {{ number.tels.length }}</span>
      <span v-if="number.screen" style="margin: 10px;display: inline-block">无效号码： {{ number.screen.length }}</span>
    </el-dialog>
    <call-task ref="callTask" />
    <el-dialog title="新建任务" top="20px" :visible.sync="dialogFormVisible">
      <el-form ref="newTask" :model="newTask" label-width="120px">
        <el-form-item label="任务名称">
          <el-input v-model="newTask.jobName" placeholder="输入任务名称" />
        </el-form-item>
        <el-form-item label="启动方式">
          <el-radio-group v-model="newTask.start" size="medium">
            <el-radio-button label="人工启动" />
            <el-radio-button label="定时启动" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="newTask.remark" type="textarea" placeholder="周一至周日 09:00 - 21:00" />
        </el-form-item>
        <el-form-item label="AI话术">
          <el-input v-model="newTask.words" placeholder="请选择AI话术" />
        </el-form-item>
        <el-form-item label="弹性坐席">
          <el-switch v-model="newTask.elastic" />
        </el-form-item>
        <el-form-item label="开启任务">
          <el-switch v-model="newTask.state" />
        </el-form-item>
        <el-form-item label="发送挂机短信">
          <el-radio-group v-model="newTask.sms" size="medium">
            <el-radio-button label="是" />
            <el-radio-button label="否" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="外呼方式">
          <el-radio-group v-model="newTask.mode" size="medium">
            <el-radio-button label="线路" />
            <el-radio-button label="手机号" />
            <el-radio-button label="固话" />
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="createTask">立即创建</el-button>
          <el-button @click="dialogFormVisible = !dialogFormVisible">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import UploadExcelComponent from '../../components/Import/index'
import CallTask from '../../components/CallTasks/index'
import { addCallTasks } from '../../api/call_tasks'

const taskInfo = {
  jobName: '',
  remark: '',
  words: '',
  start: '',
  elastic: '',
  state: '',
  mode: '',
  sms: '',
  concurrency: ''

}

export default {
  name: 'SmartCall',
  components: {
    CallTask,
    UploadExcelComponent
  },
  data() {
    return {
      uploadShow: false,
      creatTime: '',
      task: {},
      input: '',
      clickAll: false,
      tableData: [],
      tableHeader: [],
      number: {},
      newTask: Object.assign({}, taskInfo),
      dialogFormVisible: false,
      tasks: [
        {
          value: '全公司任务',
          lable: '全公司任务'
        },
        {
          value: '我负责的任务',
          lable: '全公司任务'
        },
        {
          value: '所属部门',
          lable: '全公司任务'
        }
      ]
    }
  },
  methods: {
    async createTask() {
      const param = {
        jobState: this.newTask.state,
        jobName: this.newTask.jobName,
        remark: this.newTask.remark
      }
      const create = await addCallTasks(param)
      if (create === 1) {
        Message({
          message: '创建成功！',
          type: 'success',
          duration: 5 * 1000
        })
        this.$refs.callTask.init()
        this.dialogFormVisible = false
      }
    },
    checkAll() {
      this.clickAll = true
      this.$refs.callTask.checkAll()
    },
    clearCheck() {
      this.clickAll = false
      this.$refs.callTask.clearCheck()
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 10
      if (isLt1M) {
        return true
      }
      this.$message({
        message: '文件最大为10M',
        type: 'warning'
      })
      return false
    },
    async handleSuccess(data) {
      const state = await this.$refs.callTask.importPhone(data.tels)
      this.number = data
      console.log('状态' + state)
      console.log(data)
    },
    async handleCommand(command) {
      if (command === 'import') {
        if (this.$refs.callTask.selection.length === 1) {
          this.uploadShow = !this.uploadShow
        } else {
          Message({
            message: '请选择一个任务！',
            type: 'warning',
            duration: 5 * 1000
          })
        }
      }
      if (command === 'del') {
        const state = await this.$refs.callTask.delCallTasks()
        console.log(state)
        if (state) {
          Message({
            message: '删除成功！',
            type: 'success',
            duration: 5 * 1000
          })
          this.$refs.callTask.init()
        } else {
          Message({
            message: '请选择一个任务！',
            type: 'warning',
            duration: 5 * 1000
          })
        }
      }
    }
  }
}
</script>

<style scoped>
  .content{
    margin-top: 20px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .input-class{
    width: 142px;
  }
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
