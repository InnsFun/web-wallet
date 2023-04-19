<template>
    <div ref="chart"  class="w-96 pt-40" style="height: 500px;"></div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import * as echarts from 'echarts';
  
  export default defineComponent({
    name: 'StockChart',
  
    props: {
      data: {
        type: Array<any>,
        required: true,
      },
    },
  
    mounted() {
      const chart = echarts.init(this.$refs.chart as HTMLDivElement);
      chart.setOption({
        xAxis: {
          type: 'category',
          data: this.data.map(item => item.date),
        },
        yAxis: {
          type: 'value',
        },
        series: [{
          data: this.data.map(item => item.price),
          type: 'line',
        }],
      });
    },
  });
  </script>
  