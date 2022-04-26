<template>
  <div class="title-block">
    <div class="title">
      <div class="circle" />
      {{ title }}
      <div class="triangle" />
    </div>
    <div class="time">统计时间：{{ time }}</div>
  </div>
</template>
<script>
export default {
  name: 'TitleBlock',
  components: {},
  props: {
    title: {
      type: String,
      default: ''
    },
    time: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
.title-block {
  width: 100%;
  height: 27px;
  display: flex;
  .title {
    width: 170px;
    height: 100%;
    margin-right: 10px;
    padding-left: 4px;
    background: linear-gradient(90deg, #91C3FF 0%, #E9F1FA 100%);
    color: #101728;
    font-size: 14px;
    display: flex;
    align-items: center;
    position: relative;
    .circle {
      width: 6px;
      height: 6px;
      margin-right: 7px;
      background: #FFFFFF;
      border-radius: 50%;
    }
    .triangle {
      position: absolute;
      right: 0;
      top: 0;
      width: 0;
      height: 0;
      border-color: transparent #fff transparent transparent;
      border-style: solid;
      border-width: 0 8px 27px  0;
    }
  }
  .time {
    height: 100%;
    font-size: 12px;
    color: #3399FF;
    display: flex;
    align-items: center;
  }
}
</style>
