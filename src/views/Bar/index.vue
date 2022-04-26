<template>
<!-- 柱状图 -->
  <div class="barChart">
    <Transverse></Transverse>
    <HoriziontalBarChart
      :chartData="chartData"
      :maxNum="maxNum"
      :unit="'辆'"
    ></HoriziontalBarChart>
    <!-- <ProvinceBarChart></ProvinceBarChart> -->
    <Stacking></Stacking>
    <Stacking2></Stacking2>
  </div>
</template>

<script>
// import echarts from 'echarts'
import Transverse from './components/transverse.vue'
import Stacking from './components/stacking.vue'
// import ProvinceBarChart from './components/ProvinceBarChart.vue'
import HoriziontalBarChart from './components/HoriziontalBarChart.vue'
import Stacking2 from '@/views/Bar/components/Stacking2.vue'

export default {
  name: 'barChart',
  components: {
    Transverse,
    Stacking,
    // ProvinceBarChart,
    HoriziontalBarChart,
    Stacking2
  },
  data() {
    return {
      chartData: [],
      maxNum: 10,
    }
  },
  methods: {
  },
  created() {
    // this.fetchCarCount()
    setTimeout(() => {
      this.chartData = [
        {
          name: '场所1',
          value: 50
        },
        {
          name: '场所2',
          value: 45
        },
        {
          name: '场所3',
          value: 34
        },
        {
          name: '场所4',
          value: 28
        },
        {
          name: '场所5',
          value: 25
        },
        {
          name: '场所6',
          value: 22
        }
      ]
      this.chartData.sort((a, b) => b.value - a.value)
      this.maxNum = this.chartData[0].value
    }, 100);
  }
}
</script>

<style scoped lang="scss">
.barChart{
    width: 100%;
    height: 100%;
    // display: grid;
    // grid-template-col·umns: repeat(2, 50%);
    // grid-template-rows: repeat(3, 33.33%);
    display: flex;
    flex-wrap: wrap;
    &>div {
      width: 50%;
    }
}
</style>