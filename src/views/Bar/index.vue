<template>
<!-- 柱状图 -->
  <div class="barChart">
    <Transverse></Transverse>
    <Stacking></Stacking>
  </div>
</template>

<script>
// import echarts from 'echarts'
import Transverse from './components/transverse.vue'
import Stacking from './components/stacking.vue'
export default {
  name: 'barChart',
  components: {
    Transverse,
    Stacking
  },
  methods: {
  },
  mounted() {
  }
}
</script>

<style scoped lang="scss">
.barChart{
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(2, 50%);
//   grid-template-rows: repeat(3, 33.33%);
}
</style>