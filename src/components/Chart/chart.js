import echarts from 'echarts'
const install = function(Vue) {
  Object.defineProperties(Vue.prototype, {
    $chart: {
      get() {
        return {
          line1: function(id) {
            this.chart = echarts.init(document.getElementById(id))
            this.chart.clear()

            const optionData = {
              xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
              },
              yAxis: {
                type: 'value'
              },
              series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                smooth: true
              }]
            }

            this.chart.setOption(optionData)
          },
          round: function(id) {
            this.chart = echarts.init(document.getElementById(id))
            this.chart.clear()

            const option = {
              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
              },
              series: [
                {
                  name: '意向标签',
                  type: 'pie',
                  radius: ['50%', '70%'],
                  avoidLabelOverlap: false,
                  label: {
                    show: false,
                    position: 'center'
                  },
                  labelLine: {
                    show: false
                  },
                  data: [
                    { value: 335, name: '直接访问' },
                    { value: 310, name: '邮件营销' },
                    { value: 234, name: '联盟广告' },
                    { value: 135, name: '视频广告' },
                    { value: 1548, name: '搜索引擎' }
                  ]
                }
              ]
            }

            this.chart.setOption(option)
          },
          infeed: function(id) {
            this.chart = echarts.init(document.getElementById(id))
            this.chart.clear()

            const option = {
              tooltip: {
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
              },
              legend: {
                data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: {
                type: 'value'
              },
              yAxis: {
                type: 'category',
                data: ['周五', '周六']
              },
              series: [
                {
                  name: '直接访问',
                  type: 'bar',
                  stack: '总量',
                  label: {
                    show: true,
                    position: 'insideRight'
                  },
                  data: [330, 320]
                },
                {
                  name: '视频广告',
                  type: 'bar',
                  stack: '总量',
                  label: {
                    show: true,
                    position: 'insideRight'
                  },
                  data: [150, 212]
                },
                {
                  name: '搜索引擎',
                  type: 'bar',
                  stack: '总量',
                  label: {
                    show: true,
                    position: 'insideRight'
                  },
                  data: [820, 832]
                }
              ]
            }
            this.chart.setOption(option)
          }
        }
      }
    }
  })
}

export default {
  install
}
