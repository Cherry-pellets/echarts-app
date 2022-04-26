<template>
  <div :class="['HorizontalBarChart', size]">
    <div ref="myChart" class="myChart"></div>
  </div>
</template>

<script>
export default {
  props: {
    chartData: Array,
    size: String,
    isSecond: Boolean,
    maxNum: {
      type: Number,
      default: 10
    },
    unit: {
      type: String,
      default: '人'
    }
  },
  data() {
    return {
      // chartData: [],
      // size: 'small',
      // isSecond: false,
      // maxNum: 50,
      // unit: '人',
      maxPersonNum: 10,
      hotelNames: [],
      personNums: [],
      // currentTab: 1,
      leftSymbol:[],
      circlePointList: [],
      topLight: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAZVJREFUKFNlkc1KI0EUhc+t6k6rlQkM6YU6RB1nxh8IuBBR40p9BRvzEvMOvoPvMETzCoK7IIgLITD+4ehE0UWLGC2dTnffGrqbBH/O6taFU3z3HMIrmav1CURc7K0sAIG4o29bJ90dJYPZ9iSW5Dw4PoIOQuQwoKHw0tHPrnJsxHIKo1N7RBucGa6rFQyf7qP1fQRGDEFQAYgAlm0Q36B09heXP+ZorNagFMOwDyM+g8wko78srMHp5COObn8LhE2Y+BjE9yDhkrnwFvEvaKKgZhDnKsivVpFfmUiZ9e4JP+7UBHca/os+dPNOOTOwdQ6bZmGVPLg/PVhfVGqIrjX8zTqiP3WE8gAiGk8Nmq1zJeJZOF8/GNjfrIuoVdfh04ESzjiZK2/Rfwqabr8zwyJfEZ9WqlDLb5Fkp4G2PkRfgvTmaDnJsMsiNzjNnCC9Oxp2MYv1olrBaGEfrYcsVhMXIC1Amjaid7GmBgOBy7UFSDrydRC6OTWgoaE6eEavuNoeEbLiukrxwMWks56k7VPp12n3/R/OB8WGfRDLrwAAAABJRU5ErkJggg==',
      normalLight: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAV1JREFUKFNtkt1KAkEYhp8Z/8IFZXFPgujAA9sVxQORyvsQvIDwnoo6l7wPCURIlCwDDyLoZMUK1lDXmRh/QqHvaHjhmfne9x3B/gx1DsgcaDDBE6OdJtaHex3B4xzJM1OWpElCAF8/M2wnhsTF5QEh1Abo6ypzOiQ4RXCMJEUISL7RfDDnDYsKnmgLzBoKH4WN5sySqpA9kp65Z7xQwyCUAwQvyPXbjgEuEQwIKVmSasOmfmVjvHA3ZXQ9Uc0A2ebT75FxChsgZEyEcjFOrXlCLZ/AMsDTnKD+Tqs/o4Wgiya7BYIx2ioXk/8BqtVfyBaroIu2toDwB4ROyZKq2rDl30q3U0Y3U9UMlFmJHinWKx2ajqpCNm5MK8YLDk0LMptYh7qKS4fBNlZFaq3vx5qgQtHEakZrU9kFyhTnL0k7m+Ji1owVMRQuhf3idr0/6hwJMiz3PkcUn7x43Sm/BWKeKVzaAowAAAAASUVORK5CYII='
    }
  },
  watch: {
    chartData(newVal) {
      this.initData(newVal);
      this.$nextTick(() => {
        this.drawChart();
      })
    }
  },
  created() {},
  methods: {
    initData(data) {
      this.hotelNames = [];
      this.personNums = [];
      this.leftSymbol = [];
      data.forEach((item) => {
        this.hotelNames.push(item.name);
        this.personNums.push(item.value);
        this.leftSymbol.push(1);
      });
      // this.maxPersonNum = Math.max(...this.personNums) + 10;
      this.maxPersonNum = this.maxNum ? this.maxNum + 5 : 10
      this.circlePointList = []
      this.personNums.forEach((item, index) => {
        this.circlePointList.push({
          // name: item,
          value: item,
          symbol: index === 0 && !this.isSecond ? this.topLight : this.normalLight
        })
      })
    },
    drawChart() {
      const element = this.$refs.myChart;
      let topColor = new this.$echarts.graphic.LinearGradient(1, 0, 0, 0, [
        { offset: 0, color: "#FFE359" },
        { offset: 1, color: "rgba(255, 200, 89, 0)" },
      ]);
      const normalColor = new this.$echarts.graphic.LinearGradient(1, 0, 0, 0, [
        { offset: 0, color: "#00D4FF" },
        { offset: 1, color: " rgba(0, 106, 255, 0)" },
      ]);
      if (this.isSecond) {
        topColor = normalColor
      }
      const option = {
        grid: {
          top: this.fontSize(12),
          left: 0,
          bottom: this.fontSize(-12),
          right: 0,
          containLabel: false,
        },
        tooltip: {
          // show: false,
        },
        xAxis: {
          type: "value",
          name: this.unit ? this.unit : '人',
          show: false,
          // boundaryGap: [0, 1000],
          min: 0,
          max: this.maxPersonNum,
        },
        yAxis: [
          {
            type: "category",
            inverse: true,
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
          },
          {
            type: "category",
            offset: -10,
            inverse: true,
            axisTick: "none",
            axisLine: "none",
            show: true,
            axisLabel: {
              textStyle: {
                color: "rgba(255, 255, 255, 0.85)",
                fontSize: this.fontSize(14),
                // fontWeight: "bold",
                align: "right",
                verticalAlign: "bottom",
                lineHeight: this.fontSize(28),
              },
            },
            data: this.personNums, // 右侧各省份入住人数
          },
          {
            type: "category",
            offset: -10,
            position: "left",
            inverse: true,
            axisLine: "none",
            axisTick: "none",
            show: true,
            axisLabel: {
              textStyle: {
                color: "rgba(255, 255, 255, 0.85)",
                fontSize: this.fontSize(14),
                align: "left",
                verticalAlign: "bottom",
                lineHeight: this.fontSize(28),
              },
              // formatter: (value: any, index: number) => {
              //   if (
              //     this.hotelNames.length &&
              //     index === this.hotelNames.length - 1
              //   ) {
              //     return value;
              //   }
              //   return `No.${index + 1}  ${value}`;
              // },
            },
            data: this.hotelNames, // 左侧各省份名和排名
          },
        ],
        // aria: {
        //   enabled: true,
        //   decal: {
        //     show: true,
        //   },
        // },
        series: [
          // {
          //   // 柱体左侧图标
          //   name: this.unit ? this.unit : '人',
          //   type: "pictorialBar",
          //   symbol:
          //     "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAMCAYAAABBV8wuAAAAb0lEQVQoU2NkOP9egIGBAYSRwQdGprPv6xkY/ucz/Gf4AJZhYmRg+McwESrBwPDPWLARWQsZEgzn3uuDjTASvIhiFJpr4FxGhjNvAsA8E5ENFFoO8SCDwD8mholIRn1gZDrzPp+BiSEfxRH/GCYCANIbLQFcwkKvAAAAAElFTkSuQmCC",
          //   symbolSize: [this.fontSize(5), this.fontSize(11)],
          //   symbolOffset: [-4, 0],
          //   z: 2,
          //   data: this.leftSymbol,
          // },
          {
            // 柱体右侧圆圈
            name: this.unit ? this.unit : '人',
            type: "pictorialBar",
            // symbol: "circle",
            symbol: this.normalLight,
            symbolSize: [this.fontSize(14), this.fontSize(14)],
            symbolPosition: "end",
            symbolOffset: [7, 0],
            z: 3,
            // itemStyle: {
            //   color: (params) => {
            //     if (params.dataIndex === 0) {
            //       return topColor;
            //     }
            //     return normalColor;
            //   },
            // },
            // data: this.personNums,
            data: this.circlePointList,
            tooltip: {
              formatter: (point, params) => {
                const index = params.split('_')[2]
                const name = this.hotelNames[index]
                const count = this.personNums[index]
                return `${name}：${count}${this.unit}`
              }
            }
          },
          {
            // 柱体数值
            name: this.unit ? this.unit : '人',
            type: "bar",
            stack: "1",
            z: 1,
            barWidth: 4,
            barGap: 1,
            data: this.personNums, // 各省份入住人数
            itemStyle: {
              color: (params) => {
                if (params.dataIndex === 0) {
                  return topColor;
                }
                return normalColor;
              },
            },
            showBackground: true,
            backgroundStyle: {
              // color: "rgba(255, 255, 255, 0.2)",
              color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: "transparent" },
                { offset: 1, color: "rgba(255, 255, 255, 0.2)" },
              ])
            },
            tooltip: {
              formatter: (point, params) => {
                const index = params.split('_')[2]
                const name = this.hotelNames[index]
                const count = this.personNums[index]
                return `${name}：${count}${this.unit}`
              }
            }
          },
        ],
      };
      const myChart = this.$echarts.init(element);
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    fontSize(res) {
      let clientWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      if (!clientWidth) return;
      let fontSize = clientWidth / 1920;
      return res * fontSize;
    }
  }
}
</script>

<style lang="scss" scoped>
.HorizontalBarChart {
  // width: 50%;
  padding: 24px;
  box-sizing: border-box;
  background: #162e4e;
  .myChart {
    width: 100%;
    // height: px2rem(138px);
    height: 312px;
  }
  &.large {
    .myChart {
      // height: px2rem(162px);
      height: 351px;
    }
  }
}
</style>
