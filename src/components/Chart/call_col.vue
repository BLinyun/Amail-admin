<template>
  <div id="chart" style="width: 400px;height:200px;" />
</template>
<script>
export default {
  name: 'CallCol',
  mounted() {
    this.$chart.infeed('chart')
  }
}
</script>

<style scoped>

</style>
