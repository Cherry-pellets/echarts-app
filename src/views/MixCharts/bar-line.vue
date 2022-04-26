<template>
<!-- 柱状图&折线图 -->
  <div class="bar-line">
    <div id="myChart" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
export default {
  name: 'barLine',
  data() {
    return {
      myChart: '',
    }
  },
  methods: {
    initChart() {
      this.myChart = this.$echarts.init(document.getElementById('myChart'))
      // 指定图表的配置项和数据
      const colors = ['#5470C6', '#91CC75', '#EE6666'];
      const option = {
          color: colors,
          tooltip: {
              trigger: 'item',
              position: 'inside',
              axisPointer: {
                //   type: 'line',
                  // label: {
                  //   formatter: 'bbb'
                  // }
              },
              // formatter: 'aaaa',
              // showContent: false
          },
          grid: {
              right: '20%'
          },
          toolbox: {
              feature: {
                  dataView: {show: true, readOnly: false},
                  restore: {show: true},
                  saveAsImage: {show: true}
              }
          },
          legend: {
              data: ['蒸发量', '降水量', '平均温度']
          },
          xAxis: [
              {
                  type: 'category',
                  axisTick: {
                      alignWithLabel: true
                  },
                  data: ['1月', '2月', '3月']
              }
          ],
          yAxis: [
              {
                  type: 'value',
                  name: '蒸发量',
                  min: 0,
                  max: 250,
                  position: 'right',
                  axisLine: {
                      show: true,
                      lineStyle: {
                          color: colors[0]
                      }
                  },
                  axisLabel: {
                      formatter: '{value} ml'
                  }
              },
              {
                  type: 'value',
                  name: '降水量',
                  min: 0,
                  max: 250,
                  position: 'right',
                  offset: 80,
                  axisLine: {
                      show: true,
                      lineStyle: {
                          color: colors[1]
                      }
                  },
                  axisLabel: {
                      formatter: '{value} ml'
                  }
              },
              {
                  type: 'value',
                  name: '温度',
                  min: 0,
                  max: 25,
                  position: 'left',
                  axisLine: {
                      show: true,
                      lineStyle: {
                          color: colors[2]
                      }
                  },
                  axisLabel: {
                      formatter: '{value} °C'
                  }
              }
          ],
          series: [
              {
                  name: '蒸发量',
                  type: 'bar',
                  data: [200.0, 140.9, 170.0]
                //   tooltip: {
                //       show: true,
                //       trigger: 'axis',
                //       position: ['50%', '50%'],
                //       axisPointer: {
                //           type: 'line',
                //         },
                //         // formatter: 'aaaa',
                //         // showContent: false
                //   },
              },
              {
                  name: '降水量',
                  type: 'bar',
                  yAxisIndex: 1,
                  data: [2.6, 5.9, 9.0]
              },
              {
                  name: '平均温度',
                  type: 'line',
                  yAxisIndex: 2,
                  data: [2.0, 2.2, 3.3]
              }
          ]
      };
      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(option);
    }
  },
  mounted() {
    this.initChart()
  }
}
</script>

<style scoped lang="scss">
</style>