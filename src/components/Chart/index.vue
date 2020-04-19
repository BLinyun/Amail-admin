<template>
  <div id="chart1" style="width: 400px;height:200px;" />
</template>
<script>
export default {
  name: 'Chart',
  mounted() {
    this.$chart.round('chart1')
  }
}
</script>

<style scoped>

</style>
