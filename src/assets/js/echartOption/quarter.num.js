export const quarterNumOption = {
  color: ["#2FC25B"],
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(0,0,0,0.75)',
    padding: [10, 16],
    formatter: value => {
      return `${value[0].name}<br/>${value[0].data}件`;
    },
  },
  xAxis: {
    type: 'category',
    data: [],
    axisTick: {
      alignWithLabel: true
    },
  },
  yAxis: {
    type: 'value',
    name: "件",
    minInterval: 1,
    nameTextStyle: {
      align: "right"
    },
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#E8E8E8',
        width: 1,
        type: 'dashed'
      }
    }
  },
  series: [{
    data: [],
    type: 'bar',
    barWidth: 20,
    itemStyle: {
      normal: {
        barBorderRadius: [10, 10, 0, 0],
      }
    }
  }],
}