<template>
  <div class="layout">
    <el-menu
      :default-active="activeMenu"
      :router="true"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="/chart/bar">柱状图</el-menu-item>
      <el-menu-item index="/chart/line">折线图</el-menu-item>
      <el-menu-item index="/chart/pie">饼状图</el-menu-item>
      <el-menu-item index="/chart/mixCharts">混合图</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'layout',
  data() {
    return {
      activeMenu: this.$route.path ? this.$route.path : '/chart/mixCharts',
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  mounted() {
    // console.log(this.$route.path)
  }
}
</script>

<style scoped lang="scss">
.layout{
  width: 100%;
  height: 100%;
}
</style>