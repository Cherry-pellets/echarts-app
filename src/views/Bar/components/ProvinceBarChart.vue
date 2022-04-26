<template>
  <div :class="['ProvinceBarChart', size]" style="height: 400px">
    <div class="header">
      <div
        :class="['tab', 'china-block', currentTab === 1 ? 'active' : '']"
        @click="changeTab(1)"
      >
        国内隔离人员籍贯
      </div>
      <div
        :class="['tab', 'other-block', currentTab === 2 ? 'active' : '']"
        @click="changeTab(2)"
      >
        外籍隔离人员国籍
      </div>
    </div>
    <div ref="myChart" class="myChart"></div>
  </div>
</template>

<script>
export default {
  props: {
    // inlandData: Array,
    // foreignData: Array,
    // size: String
  },
  data() {
    return {
      inlandData: [
      {
        name: '广西',
        value: 10
      },
      {
        name: '河北',
        value: 60
      },
      {
        name: '天津',
        value: 100
      },
      {
        name: '新疆',
        value: 120
      }
    ],
    foreignData: [
      {
        name: '广东',
        value: 1
      },
      {
        name: '河南',
        value: 6
      },
      {
        name: '北京',
        value: 10
      },
      {
        name: '新疆',
        value: 12
      }
    ],
      maxPersonNum: 60, // 隔离人数最大值
      hotelNames: [],
      personNums: [],
      currentTab: 1,
      leftSymbol: []
    }
  },
  watch: {
    currentTab(newVal) {
      if (newVal === 1) {
        this.initData(this.inlandData);
        this.$nextTick(() => {
          this.drawChart();
        });
      } else {
        this.initData(this.foreignData);
        this.$nextTick(() => {
          this.drawChart();
        });
      }
    }
  //   inlandData(newVal) {
  //     if (this.currentTab === 1) {
  //       this.initData(newVal);
  //       this.$nextTick(() => {
  //         this.drawChart();
  //       });
  //     }
  //   },
  //   foreignData(newVal) {
  //     if (this.currentTab === 2) {
  //       this.initData(newVal);
  //       this.$nextTick(() => {
  //         this.drawChart();
  //       });
  //     }
  //   }
  },
  created() {
    this.initData(this.inlandData);
    this.$nextTick(() => {
      this.drawChart();
    })
  },
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
      this.maxPersonNum = Math.max(...this.personNums) + 10;
    },
    drawChart() {
      const element = this.$refs.myChart;
      const normalColor = new this.$echarts.graphic.LinearGradient(
        0,
        0,
        1,
        0,
        [
          { offset: 0, color: "rgba(2, 205, 238, 0)" },
          { offset: 1, color: "#02CDEE" },
        ]
      );
      const topColor = new this.$echarts.graphic.LinearGradient(
        0,
        0,
        1,
        0,
        [
          { offset: 0, color: "rgba(255, 94, 207, 0)" },
          { offset: 1, color: " #FFC730" },
        ]
      );
      const lowestColor = new this.$echarts.graphic.LinearGradient(
        0,
        0,
        1,
        0,
        [
          { offset: 0, color: "rgba(64, 131, 255, 0)" },
          { offset: 1, color: " #4083FF" },
        ]
      );
      const option = {
        grid: {
          top: this.fontSize(7),
          left: this.fontSize(6),
          bottom: 0,
          right: 0,
          containLabel: false,
        },
        tooltip: {
          show: false,
        },
        xAxis: {
          type: "value",
          name: "人数",
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
                color: "#02CDEE",
                fontSize: this.fontSize(14),
                fontWeight: "bold",
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
                color: "#fff",
                fontSize: this.fontSize(14),
                align: "left",
                verticalAlign: "bottom",
                lineHeight: this.fontSize(28),
              },
              formatter: (value, index) => {
                if (
                  this.hotelNames.length &&
                  index === this.hotelNames.length - 1
                ) {
                  return value;
                }
                return `No.${index + 1}  ${value}`;
              },
            },
            data: this.hotelNames, // 左侧各省份名和排名
          },
        ],
        aria: {
          enabled: true,
          decal: {
            show: true,
          },
        },
        series: [
          {
            // 柱体左侧图标
            name: "人数",
            type: "pictorialBar",
            symbol:
              "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAMCAYAAABBV8wuAAAAb0lEQVQoU2NkOP9egIGBAYSRwQdGprPv6xkY/ucz/Gf4AJZhYmRg+McwESrBwPDPWLARWQsZEgzn3uuDjTASvIhiFJpr4FxGhjNvAsA8E5ENFFoO8SCDwD8mholIRn1gZDrzPp+BiSEfxRH/GCYCANIbLQFcwkKvAAAAAElFTkSuQmCC",
            symbolSize: [this.fontSize(5), this.fontSize(11)],
            symbolOffset: [-4, 0],
            z: 2,
            data: this.leftSymbol,
          },
          {
            // 柱体右侧圆圈
            name: "人数",
            type: "pictorialBar",
            symbol: "circle",
            symbolSize: [this.fontSize(10), this.fontSize(10)],
            symbolPosition: "end",
            symbolOffset: [0, 0],
            z: 3,
            itemStyle: {
              color: (params) => {
                if (params.dataIndex === 0) {
                  return topColor;
                } else if (params.dataIndex === this.personNums.length - 1) {
                  return lowestColor;
                }
                return normalColor;
              },
            },
            data: this.personNums,
          },
          {
            // 柱体数值
            name: "人数",
            type: "bar",
            stack: "1",
            z: 1,
            barWidth: 2,
            barGap: 1,
            data: this.personNums, // 各省份入住人数
            itemStyle: {
              color: (params) => {
                if (params.dataIndex === 0) {
                  return topColor;
                } else if (params.dataIndex === this.personNums.length - 1) {
                  return lowestColor;
                }
                return normalColor;
              },
            },
            showBackground: true,
            backgroundStyle: {
              color: "rgba(255, 255, 255, 0.2)",
            },
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
    },
    changeTab(tab) {
      this.currentTab = tab;
      if (tab === 1) {
        this.initData(this.inlandData);
        this.$nextTick(() => {
          this.drawChart();
        });
      } else {
        this.initData(this.foreignData);
        this.$nextTick(() => {
          this.drawChart();
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.ProvinceBarChart {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  // background: #101c33;
  background: #162e4e;
  padding: 10px 16px 0 16px;
  .header {
    height: 46px;
    width: 100%;
    box-sizing: border-box;
    padding: 5px 4px;
    background: url("../../../assets/images/bar/img_dianzhuizuo.png") no-repeat 0 0,
      url("../../../assets/images/bar/img_dianzhuiyou.png") no-repeat 100% 0;
    background-size: auto 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.55);
    & > div {
      height: 36px;
      width: 50%;
      box-sizing: border-box;
      line-height: 36px;
      cursor: pointer;
      border: 1px solid rgba(255, 255, 255, 0.14);
      &.active {
        border: 1px solid #02cdee;
        color: #02cdee;
      }
    }
    .tab {
      background: #0f1a2f;
    }
    .china-block {
      border-right: none;
      border-radius: 2px 0 0 2px;
    }
    .other-block {
      border-radius: 0 2px 2px 0;
    }
  }
  .myChart {
    width: 100%;
    height: 200px;
    padding: 5px 0 5px 0;
    box-sizing: border-box;
  }
  &.large {
    padding: 0;
    padding-top: 11px;
    background: none;
    .myChart {
      height: 316px;
      padding: 14px 0 27px 0;
      box-sizing: border-box;
    }
  }
}
</style>
