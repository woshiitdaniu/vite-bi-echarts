import { UphEcharts } from "./type";
import * as echarts from "echarts";
// 各种趋势图 折线
const getLineChartOptions = (data: UphEcharts) => {
  let dataLen = 0;
  if (data?.xAxisData.length == 0) {
    dataLen = 0;
  } else {
    dataLen = data?.xAxisData.length;
  }
  let option: any = {
    dataZoom:
      dataLen > 7
        ? [
            {
              type: "slider", //slider表示有滑动块的，inside表示内置的
              show: true,
              height: 12,
              xAxisIndex: 0,
              bottom: 10,
              start: 60,
              end: 100, // 这个可以控制显示的范围
              minSpan: 8, //最小滑动距离
              zoomLock: true, // 设置 zoomLock 属性为 true 防止用户滑动滚动长度变化
            },
          ]
        : null,
    // 悬浮提示框设置
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999",
        },
      },
      // 格式化弹窗显示文字
      formatter(params: any) {
        var relVal = params[0].name;
        for (var i = 0, l = params.length; i < l; i++) {
          let rateVal = { rate: "亿", val: params[i].value };
          relVal +=
            "<br/>" +
            params[i].marker +
            params[i].seriesName +
            " : " +
            rateVal.val +
            `  ${params[i].seriesName.indexOf("率") > -1 ? "%" : rateVal.rate}`;
        }
        return relVal;
      },
    },
    // 调整xy轴与容器上下左右边距
    grid: {
      left: "2%",
      right: "0%",
      bottom: "0%",
      top: "15%",
      containLabel: true,
    },
    legend: {
      data: data.legendData || [],
    },
    xAxis: [
      {
        type: "category",
        data: data.xAxisData || [],
        axisPointer: {
          type: "shadow",
        },
        axisLabel: {
          color: "#888", // y轴刻度标签文字颜色
          formatter: "{value}",
        },
        axisLine: {
          show: false, // 不展示轴线条
        },
        axisTick: {
          show: false, // 不展示轴刻度
        },
      },
    ],
    yAxis: {
      name: "亿", //
      type: "value",
      nameTextStyle: {
        align: "right",
        verticalAlign: "middle",
        padding: [0, 8, 0, 0], // 调整名称与数值的间距
      },
      axisLabel: {
        color: "#888", // y轴刻度标签文字颜色
        formatter: "{value}",
      },
      axisLine: {
        show: false, // 不展示左y轴线条
      },
      axisTick: {
        show: false, // 不展示左y轴刻度
      },
    },
    series: [
      {
        name: data.legendData[0],
        type: "line",
        smooth: true,
        data: data?.seriesData[0]?.data || [],
        itemStyle: {
          color: "red",
        },
      },
      {
        name: data.legendData[1],
        type: "line",
        smooth: true,
        data: data?.seriesData[1]?.data || data?.seriesData[0]?.basisData|| [],
        // 设置单个柱状的样式
        itemStyle: {
          color: "#367FF9",
        },
      },
    ],
  };
  if (dataLen == 0) {
    option["title"] = {
      text: "暂无数据",
      x: "center",
      y: "center",
      textStyle: {
        fontSize: 14,
        fontWeight: "normal",
        color: "#888",
      },
    };
  }
  return option;
};
// 各种 折线柱状 图
// 经营质量趋势图
const getBarLineChartOptions = (data: UphEcharts) => {
  let dataLen = 0;
  if (data?.xAxisData.length == 0) {
    dataLen = 0;
  } else {
    dataLen = data?.xAxisData.length;
  }
  let option: any = {
    dataZoom:
      dataLen > 7
        ? [
            {
              type: "slider", //slider表示有滑动块的，inside表示内置的
              show: true,
              height: 12,
              xAxisIndex: 0,
              bottom: 10,
              start: 60,
              end: 100, // 这个可以控制显示的范围
              minSpan: 8, //最小滑动距离
              zoomLock: true, // 设置 zoomLock 属性为 true 防止用户滑动滚动长度变化
            },
          ]
        : null,
    // 悬浮提示框设置
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999",
        },
      },
      // 格式化弹窗显示文字
      formatter(params: any) {
        var relVal = params[0].name;
        for (var i = 0, l = params.length; i < l; i++) {
          let rateVal = { rate: "亿", val: params[i].value };
          relVal +=
            "<br/>" +
            params[i].marker +
            params[i].seriesName +
            " : " +
            rateVal.val +
            `  ${params[i].seriesName.indexOf("率") > -1 ? "%" : rateVal.rate}`;
        }
        return relVal;
      },
    },
    // 调整xy轴与容器上下左右边距
    grid: {
      left: "2%",
      right: "0%",
      bottom: "0%",
      top: "35%",
      containLabel: true,
    },
    legend: {
      data: data.legendData || [],
    },
    xAxis: [
      {
        type: "category",
        data: data.xAxisData || [],
        axisPointer: {
          type: "shadow",
        },
        axisLabel: {
          color: "#888", // y轴刻度标签文字颜色
          formatter: "{value}",
        },
        axisLine: {
          show: false, // 不展示轴线条
        },
        axisTick: {
          show: false, // 不展示轴刻度
        },
      },
    ],
    yAxis: [
      {
        name: "亿", // 左y轴刻度单位
        type: "value",
        nameTextStyle: {
          align: "right",
          verticalAlign: "middle",
          padding: [0, 8, 0, 0], // 调整名称与数值的间距
        },
        axisLabel: {
          color: "#888", // y轴刻度标签文字颜色
          formatter: "{value}",
        },
        axisLine: {
          show: false, // 不展示左y轴线条
        },
        axisTick: {
          show: false, // 不展示左y轴刻度
        },
      },
      {
        name: "%", // 右y轴刻度单位
        type: "value",
        nameTextStyle: {
          color: "#888",
          align: "right",
          padding: [0, -20, 0, 0],
        }, // 右y轴刻度单位样式
        axisLabel: {
          color: "#888", // y轴刻度标签文字颜色
          formatter: "{value}",
        },
        axisLine: {
          show: false, // 不展示左y轴线条
        },
        axisTick: {
          show: false, // 不展示左y轴刻度
        },
      },
    ],
    series: [
      {
        name: data?.legendData[0],
        type: "bar",
        color: "#7dabf9",
        data: data?.seriesData[0]?.data || [],
        smooth: true,
        barWidth: "12", // 柱条的宽度
        // 设置单个柱状的样式
        itemStyle: {
          color: "#7dabf9",
          barBorderRadius: [4, 4, 0, 0],
        },
      },
      {
        name: data?.legendData[1],
        type: "bar",
        color: "#367ff9",
        data: data?.seriesData[0]?.basisData || [],
        smooth: true,
        barWidth: "12", // 柱条的宽度
        // 设置单个柱状的样式
        itemStyle: {
          color: "#367ff9",
          barBorderRadius: [4, 4, 0, 0],
        },
      },
      {
        name: data?.legendData[2],
        type: "bar",
        color: "#a4afcd",
        data: data?.seriesData[1]?.data || [],
        smooth: true,
        barWidth: "12", // 柱条的宽度
        // 设置单个柱状的样式
        itemStyle: {
          color: "#a4afcd",
          barBorderRadius: [4, 4, 0, 0],
        },
      },
      {
        name: data?.legendData[3],
        type: "bar",
        color: "#646f8a",
        data: data?.seriesData[1]?.basisData || [],
        smooth: true,
        barWidth: "12", // 柱条的宽度
        // 设置单个柱状的样式
        itemStyle: {
          color: "#646f8a",
          barBorderRadius: [4, 4, 0, 0],
        },
      },
      {
        name: data?.legendData[4],
        type: "line",
        yAxisIndex: 1,
        color: "#fa9676",

        data: data?.seriesData[2]?.data || [],
      },
      {
        name: data?.legendData[5],
        type: "line",
        yAxisIndex: 1,
        color: "#a494f7",

        data: data?.seriesData[2]?.basisData || [],
      },
    ],
  };
  if (dataLen == 0) {
    option["title"] = {
      text: "暂无数据",
      x: "center",
      y: "center",
      textStyle: {
        fontSize: 14,
        fontWeight: "normal",
        color: "#888",
      },
    };
  }
  return option;
};
const getBarChartsOptions = (data: UphEcharts) => {
  let dataLen = 0;
  if (data?.xAxisData.length == 0) {
    dataLen = 0;
  } else {
    dataLen = data?.xAxisData.length;
  }
  let option: any = {
    dataZoom:
      dataLen > 7
        ? [
            {
              type: "slider", //slider表示有滑动块的，inside表示内置的
              show: true,
              height: 12,
              xAxisIndex: 0,
              bottom: 10,
              start: 60,
              end: 100, // 这个可以控制显示的范围
              minSpan: 8, //最小滑动距离
              zoomLock: true, // 设置 zoomLock 属性为 true 防止用户滑动滚动长度变化
            },
          ]
        : null,
    // 悬浮提示框设置
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999",
        },
      },
      // 格式化弹窗显示文字
      formatter(params: any) {
        var relVal = params[0].name;
        for (var i = 0, l = params.length; i < l; i++) {
          let rateVal = { rate: "亿", val: params[i].value };
          relVal +=
            "<br/>" +
            params[i].marker +
            params[i].seriesName +
            " : " +
            rateVal.val +
            `  ${params[i].seriesName.indexOf("率") > -1 ? "%" : rateVal.rate}`;
        }
        return relVal;
      },
    },
    // 调整xy轴与容器上下左右边距
    grid: {
      left: "2%",
      right: "0%",
      bottom: "0%",
      top: "35%",
      containLabel: true,
    },
    legend: {
      data: data.legendData || [],
    },
    xAxis: [
      {
        type: "category",
        data: data.xAxisData || [],
        axisPointer: {
          type: "shadow",
        },
        axisLabel: {
          color: "#888", // y轴刻度标签文字颜色
          formatter: "{value}",
        },
        axisLine: {
          show: false, // 不展示轴线条
        },
        axisTick: {
          show: false, // 不展示轴刻度
        },
      },
    ],
    yAxis: [
      {
        name: "亿", // 左y轴刻度单位
        type: "value",
        nameTextStyle: {
          align: "right",
          verticalAlign: "middle",
          padding: [0, 8, 0, 0], // 调整名称与数值的间距
        },
        axisLabel: {
          color: "#888", // y轴刻度标签文字颜色
          formatter: "{value}",
        },
        axisLine: {
          show: false, // 不展示左y轴线条
        },
        axisTick: {
          show: false, // 不展示左y轴刻度
        },
      },
    ],
    series: [
      {
        name: data?.legendData[0],
        type: "bar",
        data: data?.seriesData[0]?.data || [],
        smooth: true,
        barWidth: "12", // 柱条的宽度
        // 设置单个柱状的样式
        itemStyle: {
          color: "#7dabf9",
          barBorderRadius: [4, 4, 0, 0],
        },
      },
      {
        name: data?.legendData[1],
        type: "bar",
        color: "#367ff9",
        data: data?.seriesData[0]?.basisData || [],
        barWidth: "12", // 柱条的宽度
        smooth: true,
        // 设置单个柱状的样式
        itemStyle: {
          color: "#367ff9",
          barBorderRadius: [4, 4, 0, 0],
        },
      },
      {
        name: data?.legendData[2],
        type: "bar",
        color: "#a4afcd",
        data: data?.seriesData[1]?.data || [],
        smooth: true,
        barWidth: "12", // 柱条的宽度
        // 设置单个柱状的样式
        itemStyle: {
          color: "#a4afcd",
          barBorderRadius: [4, 4, 0, 0],
        },
      },
      {
        name: data?.legendData[3],
        type: "bar",
        color: "#646f8a",
        data: data?.seriesData[1]?.basisData || [],
        smooth: true,
        barWidth: "12", // 柱条的宽度
        // 设置单个柱状的样式
        itemStyle: {
          color: "#646f8a",
          barBorderRadius: [4, 4, 0, 0],
        },
      },
    ],
  };
  if (dataLen == 0) {
    option["title"] = {
      text: "暂无数据",
      x: "center",
      y: "center",
      textStyle: {
        fontSize: 14,
        fontWeight: "normal",
        color: "#888",
      },
    };
  }
  return option;
};

export { getLineChartOptions, getBarLineChartOptions,getBarChartsOptions };
