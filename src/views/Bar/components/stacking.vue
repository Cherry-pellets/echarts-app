<template>
  <!-- 纵向柱状图-柱体堆叠 -->
  <div class="stacking">
    <div ref="stackingChart" class="myChart"></div>
  </div>
</template>

<script>
// import echarts from 'echarts'
// import base64Img from "../base64Img";
export default {
  name: "Stacking",
  data() {
    return {
      myChart: "",
    };
  },
  methods: {
    initChart() {
    //   let that = this;
      this.myChart = this.$echarts.init(this.$refs.stackingChart);
      // 指定图表的配置项和数据
      const option = {
        grid: {
          right: "20%",
        },
        xAxis: [
            {
                name: '省份',
                type: 'category',
                axisTick: {
                    show: false, // 隐藏坐标刻度
                },
                data: ['广东省', '湖南省', '江西省', '湖北省', '其他']
            }
        ],
        yAxis: [
            {
                type: "value",
                name: '隔离人数',
                min: 0,
                max: 400,
                axisLine: {
                    show: true, // 坐标轴
                },
                splitLine: {
                    show: false, // 隐藏坐标分割线
                },
          },
        ],
        // 方法1
        series: [
            {
                name: '1月',
                type: 'bar',
                stack: 'overlap', //堆叠效果(字符需要统一)
                data: [120, 132, 101, 134, 90]
            },
            {
                name: '2月',
                type: 'bar',
                stack: 'overlap',
                data: [220, 182, 191, 234, 290]
            },
            {
                name: '3月',
                type: 'bar',
                stack: 'overlap',
                data: [150, 232, 201, 154, 190]
            }
        ]
        // 方法2(似乎有点问题)
        // series: [
        //     {
        //         name: '直接访问',
        //         type: 'bar',
        //         barGap:'-100%',//重叠效果(可放在任意一个组中)
        //         data: [320, 332, 301, 334, 390]
        //     },
        //     {
        //         name: '1月',
        //         type: 'bar',
        //         data: [120, 132, 101, 134, 90]
        //     },
        //     {
        //         name: '2月',
        //         type: 'bar',
        //         data: [220, 182, 191, 234, 290]
        //     },
        //     {
        //         name: '3月',
        //         type: 'bar',
        //         data: [150, 232, 201, 154, 190]
        //     }
        // ]
      };
      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(option);
    },
  },
  mounted() {
    this.initChart();
  },
};
</script>

<style scoped lang="scss">
.stacking {
  box-sizing: border-box;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.07);
  border-radius: 2px;
  .myChart {
    width: 100%;
    height: 400px;
  }
}
</style>