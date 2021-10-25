<template>
  <!-- 横向柱状图-加分离图标 -->
  <div class="transverse">
    <div id="transverseChart" style="width: 600px; height: 400px"></div>
  </div>
</template>

<script>
// import echarts from 'echarts'
import base64Img from "../base64Img";
export default {
  name: "Transverse",
  data() {
    return {
      myChart: "",
    };
  },
  methods: {
    initChart() {
      let that = this;
      this.myChart = this.$echarts.init(document.getElementById("transverseChart"));
      // 指定图表的配置项和数据
      const option = {
        tooltip: {
            // show: false,
          trigger: "axis",
          // axisPointer: {
          // type: 'none',
          // label: {
          //   formatter: 'bbb'
          // }
          // },
          formatter: '{a0}：{c1}'
        //   formatter: (params) => {
        //       console.log(params)
        //   },
          // showContent: false
        },
        grid: {
          right: "20%",
        },
        xAxis: [
          {
            type: "value",
            // name: '隔离人数',
            min: 0,
            max: 10,
            axisLabel: {
              show: false, // 隐藏坐标刻度标签
            },
            splitLine: {
              show: false, // 隐藏坐标分割线
            },
          },
        ],
        yAxis: [
          {
            type: "category",
            position: "left",
            axisTick: {
              show: false, // 隐藏坐标刻度
            },
            axisLine: {
              show: false, // 隐藏坐标轴
            },
            axisLabel: {
              inside: true,
              padding: [14, 0, 0, 0],
            },
            data: ["", "", "", "", ""],
          },
          {
            type: "category",
            position: "left",
            axisTick: {
              show: false, // 隐藏坐标刻度标签
            },
            axisLine: {
              show: false, // 隐藏坐标轴
            },
            axisLabel: {
              inside: true,
              verticalAlign: "bottom",
              lineHeight: 25,
            },
            data: ["广东省", "湖南省", "湖北省", "黑龙江省", "其他"],
          },
          {
            type: "category",
            position: "right",
            axisTick: {
              show: false, // 隐藏坐标刻度标签
            },
            axisLine: {
              show: false, // 隐藏坐标轴
            },
            axisLabel: {
              inside: true,
              verticalAlign: "bottom",
              lineHeight: 25,
            },
            data: [1, 3, 5, 7, 9],
          },
        ],
        series: [
          {
            // 主柱体
            name: "隔离人数",
            type: "bar",
            showBackground: true, // 设置显示柱体的背景色
            backgroundStyle: {
              color: "#e6e6e6", // 设置柱体的背景颜色
            },
            barWidth: "3", // 设置柱体的宽度
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(1, 0, 0, 0, [ // 设置柱体的颜色
                { offset: 0.1, color: "#72E7FF" },
                { offset: 1, color: "rgba(7,101,148,.1)" },
              ]),
            },
            data: [1, 3, 5, 7, 9],
          },
          {
            name: "柱体右端圆点",
            type: "pictorialBar",
            symbol: base64Img.barRightIcon,
            symbolSize: [20, 20],
            symbolOffset: [10, 0],
            z: 12,
            itemStyle: {
              normal: {
                color: "#fff",
              },
            },
            data: that.getSymbolData([1, 3, 5, 7, 9], "end"),
          },
          {
            name: "柱体左端图标",
            type: "pictorialBar",
            symbol: base64Img.barLeftIcon,
            symbolSize: [20, 20],
            symbolOffset: [-13, 0],
            z: 12,
            itemStyle: {
              normal: {
                color: "#fff",
              },
            },
            data: that.getSymbolData([1, 3, 5, 7, 9], "start"),
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(option);
    },
    getSymbolData(data, position) {
      let arr = [];
      for (var i = 0; i < data.length; i++) {
        arr.push({
          value: data[i],
          // symbol: 'circle',
          symbolPosition: position,
        });
      }
      console.log(arr);
      return arr;
    },
  },
  mounted() {
    this.initChart();
  },
};
</script>

<style scoped lang="scss">
.transverse {
  background: #162e4e;
}
</style>