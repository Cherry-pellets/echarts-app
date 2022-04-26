<template>
  <div class="timely-detected">
    <TitleBlock :title="'及时检人员管理'" :time="'4月16日 24:00:00'" />
    <div ref="myChart" class="myChart" />
  </div>
</template>
<script>
// import echarts from 'echarts'
import TitleBlock from './titleBlock.vue'
export default {
  name: 'TimelyDetected',
  components: {
    TitleBlock
  },
  data() {
    return {
      myChart: '',
      chartData: [
        {
          name: '市直',
          diagnosis: 10000,
          infected: 30000,
          fever: 15000,
          cold: 12000
        },
        {
          name: '东宝区',
          diagnosis: 8000,
          infected: 10000,
          fever: 50000,
          cold: 12000
        },
        {
          name: '掇刀区',
          diagnosis: 8000,
          infected: 10000,
          fever: 8000,
          cold: 12000
        },
        {
          name: '沙洋县',
          diagnosis: 50000,
          infected: 10000,
          fever: 8000,
          cold: 12000
        },
        {
          name: '钟祥市',
          diagnosis: 8000,
          infected: 10000,
          fever: 50000,
          cold: 12000
        },
        {
          name: '京山市',
          diagnosis: 80,
          infected: 100,
          fever: 8000,
          cold: 10200
        },
        {
          name: '屈家岭管理区',
          diagnosis: 8000,
          infected: 100,
          fever: 8000,
          cold: 19000
        },
        {
          name: '漳河新区',
          diagnosis: 8000,
          infected: 9000,
          fever: 32000,
          cold: 22000
        }
      ],
      xAxisData: [], // x轴数据
      // yAxis: [], // y轴数据
      diagnosiss: [], // 确诊或疑似病例
      infected: [], // 无症状感染者
      fever: [], // 发热患者
      cold: [] // 感冒无发热症状有流行病学史人员
    }
  },
  mounted() {
    this.initData()
    this.initChart()
    clearInterval(this.timePanel)
    this.timePanel = setInterval(() => {
      this.myChart && this.myChart.resize()
    }, 300)
  },
  beforeDestroy() {
    clearInterval(this.timePanel)
  },
  methods: {
    initChart() {
      this.myChart = this.$echarts.init(this.$refs.myChart)
      // 指定图表的配置项和数据
      const option = {
        legend: {
          show: true,
          type: 'plain',
          left: '38px',
          right: 0,
          bottom: 0,
          padding: 0,
          icon: 'circle',
          itemHeigth: 6,
          itemWidth: 6
        },
        grid: {
          top: '22px',
          bottom: '52px',
          left: '38px',
          right: 0
        },
        tooltip: {
          show: true
          // formatter: (params) => {
          //   console.log(params)
          // }
        },
        xAxis: [
          {
            name: '', // 行政区划
            type: 'category',
            axisLine: { // 坐标轴
              lineStyle: {
                color: '#E5E7E8'
              }
            },
            axisTick: { // 坐标刻度
              show: false
            },
            axisLabel: { // 坐标刻度标签
              interval: 0,
              margin: 4,
              color: '#999999'
            },
            data: this.xAxisData
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '', // 人数
            // min: 0,
            // max: 90000,
            aplitNumber: 5,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#C1C7D0',
              margin: 0
            },
            splitLine: { // 分割线
              // show: false // 隐藏分割线
              lineStyle: {
                type: 'dashed',
                color: ['#E5E7E8']
              }
            }
          }
        ],
        series: [
          {
            name: '确诊或疑似病例',
            type: 'bar',
            stack: '及时检人员管理', // 堆叠效果(字符需要统一)
            barWidth: '9px',
            itemStyle: {
              color: '#DE7D7D'
            },
            data: this.diagnosis
          },
          {
            name: '无症状感染者',
            type: 'bar',
            stack: '及时检人员管理',
            barWidth: '9px',
            itemStyle: {
              color: '#FFBF25'
            },
            data: this.infected
          },
          {
            name: '发热患者',
            type: 'bar',
            stack: '及时检人员管理',
            barWidth: '9px',
            itemStyle: {
              color: '#DDA1F1'
            },
            data: this.fever
          },
          {
            name: '感冒无发热症状有流行病学史人员',
            type: 'bar',
            stack: '及时检人员管理',
            barWidth: '9px',
            itemStyle: {
              color: '#7CE3B9'
            },
            data: this.cold
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(option)
      window.addEventListener('resize', () => {
        this.myChart.resize()
      })
    },
    initData() {
      this.xAxisData = []
      this.diagnosis = []
      this.infected = []
      this.fever = []
      this.cold = []
      this.chartData.forEach(item => {
        this.xAxisData.push(item.name)
        this.diagnosis.push(item.diagnosis)
        this.infected.push(item.infected)
        this.fever.push(item.fever)
        this.cold.push(item.cold)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.timely-detected {
  // width: 50%;
  height: 400px;
  padding: 13px;
  box-sizing: border-box;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.07);
  border-radius: 2px;
  .myChart {
    width: 100%;
    height: 352px;
  }
}
</style>
