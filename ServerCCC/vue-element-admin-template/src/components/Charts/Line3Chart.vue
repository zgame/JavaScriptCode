<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from '@/components/Charts/mixins/resize' //  引入缩放

export default {
  mixins: [resize],
  props: {
    className: { type: String, default: 'chart' },
    width: { type: String, default: '88%' },
    height: { type: String, default: '250px' },
    // autoResize: { type: Boolean, default: true },
    chartData: { type: Object }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }

    this.chart.dispose()
    this.chart = null
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  methods: {
    setOptions({ Data1, Data2, Data3, chartTitle, chartXaxis } = {}) {
      this.chart.setOption({
        // backgroundColor: '#394056',
        xAxis: {
          data: chartXaxis,
          boundaryGap: false,
          axisTick: { show: true }
        },
        grid: { left: 10, right: 10, bottom: 20, top: 30, containLabel: true },
        tooltip: { trigger: 'axis', axisPointer: { type: 'cross' }, padding: [5, 10] },
        yAxis: { axisTick: { show: false }},
        // legend: { data: ['预期', '实际'] },
        legend: {
          // top: 20,
          // icon: 'rect',
          // itemWidth: 14,
          // itemHeight: 5,
          // itemGap: 13,
          // data: ['CMCC', 'CTCC', 'CUCC'],
          // right: '4%',
          // textStyle: {
          //   fontSize: 12,
          //   color: '#F1F1F3'
          // }
          data: chartTitle
        },
        series: [
          {// --------------红色线--------------
            name: chartTitle[0], itemStyle: {
              normal: {
                color: '#FF005A',
                lineStyle: {
                  color: '#FF005A',
                  width: 2
                }
              }
            },
            smooth: true,
            type: 'line',
            data: Data1,
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          },
          {// --------------蓝色线--------------
            name: chartTitle[1],
            smooth: true,
            type: 'line',
            itemStyle: {
              normal: {
                color: '#3888fa',
                lineStyle: {
                  color: '#3888fa',
                  width: 2
                },
                areaStyle: {
                  color: '#f3f8ff'
                }
              }
            },
            data: Data2,
            animationDuration: 2800,
            animationEasing: 'quadraticOut'
          },
          {// --------------绿色线--------------
            name: chartTitle[2],
            smooth: true,
            type: 'line',
            itemStyle: {
              normal: {
                color: '#009c1c',
                lineStyle: {
                  color: '#009c1c',
                  width: 2
                },
                areaStyle: {
                  color: '#f3f8ff'
                }
              }
            },
            data: Data3,
            animationDuration: 2900,
            animationEasing: 'quadraticOut'
          }
        ]
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    }
  }
}
</script>
