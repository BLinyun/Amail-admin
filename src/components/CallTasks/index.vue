<template>
  <div v-if="!taskList[0]" style="margin: 80px;text-align: center">没有数据</div>
  <div v-else class="main">
    <el-container>
      <el-aside width="240px">
        <div class="left">
          <div v-for="item in taskList" :id="item.id" :key="item.index" class="task" @click="controlTask(item.id)">
            <div class="task_header">
              <span class="h4">{{ item.jobName }}</span>
              <el-tag size="mini">已完成</el-tag>
            </div>
            <el-progress style="margin: 8px 0;" :format="format" :percentage="20" />
            <div class="info">
              <p>备注： {{ item.remark }}</p>
              <p>ID： {{ item.id }}</p>
            </div>
          </div>
        </div>
      </el-aside>
      <el-main>
        <el-tabs v-model="activeName">
          <el-tab-pane label="实时状态" name="first">
            <div class="header">
              {{ taskList[0].jobName }} <el-tag size="mini" style="margin-left: 5px;">已完成</el-tag>
            </div>
            <div class="status">
              <ul class="status_item">
                <li>
                  <span class="status-label">测试</span> <i class="el-icon-info" />
                  <span class="percent">100%</span>
                </li>
              </ul>
            </div>
            <ul class="double-chart">
              <li>
                <h5>意向标签</h5>
                <div class="sms-chart">
                  <div style="position:relative;">
                    <Chart />
                  </div>
                </div>
              </li>
              <div class="vertical-line" />
              <li>
                <h5>意向标签</h5>
                <div class="sms-chart">
                  <div style="position:relative;">
                    <Chart />
                  </div>
                </div>
              </li>
              <div class="vertical-line" />
              <li>
                <h5>短信发送</h5>
                <div class="sms-chart">
                  <div style="position:relative;">
                    <Chart>无数据</Chart>
                  </div>
                </div>
              </li>
            </ul>
            <ul class="detail-statics">
              <li style="flex: 1 1;">
                <call-col />
              </li>
              <div class="vertical-line" />
              <li style="flex: 1 1;">
                <h5>关注点</h5>
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="进行中" name="second">
            <el-table
              :data="startData"
              border
              style="width: 100%"
            >
              <el-table-column
                prop="name"
                label="客户名称"
              />
              <el-table-column
                prop="tel"
                label="联系方式"
              />
              <el-table-column
                prop="time"
                label="通话时间"
              />
              <el-table-column
                prop="state"
                label="通话状态"
              />
              <el-table-column
                prop="Caller"
                label="主叫号码"
              />
              <el-table-column
                prop="record"
                label="呼叫次数"
              />
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="已完成" name="third">已完成</el-tab-pane>
          <el-tab-pane label="任务设置" name="fourth">任务设置</el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Chart from '../../components/Chart/'
import CallCol from '../../components/Chart/call_col'
import { getCallTasks, delCallTasks, importPhone } from '../../api/call_tasks'
export default {
  name: 'CallTasks',
  components: {
    CallCol,
    Chart
  },
  data() {
    return {
      format(percentage) {
        return percentage === 100 ? '满' : `${percentage}%`
      },
      selection: [],
      taskList: [],
      activeName: 'first',
      startData: [
        { name: '孙', tel: 18275125666, time: '2020-01-09 18:16:05', state: '未开始', Caller: '钱湖专线', record: 2 },
        { name: '孙', tel: 18275125666, time: '2020-01-09 18:16:05', state: '未开始', Caller: '钱湖专线', record: 2 }
      ]
    }
  },
  watch: {
    selection: function(newVal) {
      console.log('变化了: ' + newVal)
      this.selection.forEach((item) => {
        document.getElementById(item).style = 'border: 2px solid #20a0ff;'
      })
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      this.selection = []
      this.taskList = []
      const task = await getCallTasks()
      task.forEach((item) => {
        this.taskList.push(item)
      })
      console.log(this.taskList)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    async importPhone(data) {
      const param = {
        id: this.selection[0],
        data: data
      }
      const state = await importPhone(param.id, param.data)
      return state
    },
    async delCallTasks() {
      if (this.selection.length === 1) {
        const state = await delCallTasks(this.selection[0])
        return state
      } else {
        return false
      }
    },
    controlTask(id) {
      const border = this.selection.find((item) => item === id)
      if (border) {
        const index = this.selection.indexOf(border)
        if (index > -1) {
          this.selection.splice(index, 1)
          console.log(this.selection)
          this.controlBorder(border)
        }
      } else {
        console.log('没有边框: ' + id)
        this.selection.push(id)
        console.log(this.selection)
        this.controlBorder()
      }
    },
    controlBorder(del) {
      if (del) {
        document.getElementById(del).style = 'none'
      }
      this.selection.forEach((item) => {
        document.getElementById(item).style = 'border: 2px solid #20a0ff;'
      })
    },
    clearCheck() {
      this.selection.forEach((item) => {
        document.getElementById(item).style = 'none'
      })
      this.selection = []
    },
    checkAll() {
      this.selection = []
      this.taskList.forEach((item) => {
        this.selection.push(item.id)
      })
    }
  }
}
</script>

<style scoped>
  .main {
    width:100%;
    display: flex;
  }
  .left {
    text-align: center;
    width: 246px;
    background: #fff;
    padding: 8px;
    border-radius: 3px;
    height: 660px;
  }
  .task_header {
    text-align: left;
    color: rgba(0,0,0,.65);
    font-size: 14px;
  }
  .h4 {
    width: 134px;
    display: inline-block;
    padding-right: 4px;
    margin: 0px 8px;
  }
  .info p {
    color: rgba(0,0,0,.65);
    font-size: 12px;
    margin-bottom: 5px;
    text-align: left;
  }
  .header {
    background-color: #fff;
    padding-bottom: 16px;
    color: rgba(0,0,0,.65);
    font-size: 14px;
    border-bottom: 1px solid #e0e0e0;
  }
  .status {
    padding-bottom: 24px;
    border-bottom: 1px solid #e0e0e0;
    width: 100%;
  }
  .status_item {
    display: flex;
    justify-content: space-around;
    padding-right: 16px;
  }
  .status_item li{
    list-style: none;
    flex: 1 1;
    text-align: center;
    margin-top: 24px;
    border-right: 1px solid #e8e8e8;
  }
  .status-label {
    margin-top: 12px;
    color: rgba(0,0,0,.65);
    text-align: center;
  }
  .percent {
    margin-top: 20px;
    font-size: 24px;
    display: block;
    color: rgba(0,0,0,.75);
  }
  .double-chart {
    margin-top: 24px;
    border-bottom: 1px solid #e0e0e0;
    display: -ms-flexbox;
    display: flex;
    list-style: none;
    -ms-flex-pack: justify;
    justify-content: space-between;
  }
  .double-chart li {
    width: 49%;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    margin-bottom: -40px;
  }
  .double-chart h5{
    font-size: 14px;
    color: rgba(0,0,0,.85);
  }
  .sms-chart {
    top: -70px;
    position: relative;
  }
  .vertical-line {
    align-self: start;
    max-width: 1px;
    min-width: 1px;
    height: 290px;
    margin: 0 16px;
    background: rgba(0,0,0,.09);
  }
  .detail-statics {
    list-style: none;
    border-bottom: 1px solid #e0e0e0;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: 24px 0;
    margin-bottom: 24px;
  }
  .task {
    width: 218px;
    height: 135px;
    cursor: pointer;
    color: rgba(0,0,0,.65);
    background-color: #f5f5f5;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    position: relative;
    padding: 8px;
    border-radius: 3px;
    margin-bottom: 8px;
  }
  body > .el-container {
    margin-bottom: 40px;
  }
</style>
