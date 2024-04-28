<!--
 * @Description: echarts 折线
 * @Autor: Bg
 * @Date: 2023-01-11 15:01:26
 * @LastEditors: Bg
 * @LastEditTime: 2024-04-26 16:08:00
-->
<template>
  <div
    v-if="echartsType"
    class="lineEchartCp-box"
    :class="`lineEchartCp-${props.cardItem.code}-box`"
  ></div>
</template>
<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, markRaw, computed } from "vue";

import {
  getLineChartOptions,
  getBarChartsOptions,
  getBarLineChartOptions,
} from "./echartsOption";

const props = defineProps(["EchartsData", "BarLineEchartsData", "cardItem"]);
const enum ECHARTS_TYPE {
  "A" = "折线图",
  "B" = "折线柱状图",
  "C" = "柱状图",
}

const echartsType = computed(() => {
  if (props.EchartsData && JSON.stringify(props.EchartsData) !== "{}") {
    return ECHARTS_TYPE.A;
  } else if (
    props.BarLineEchartsData &&
    JSON.stringify(props.BarLineEchartsData) !== "{}"
  ) {
    return ECHARTS_TYPE.B;
  } else if (
    props.cardItem.BarEchartsData &&
    JSON.stringify(props.cardItem.BarEchartsData) !== "{}"
  ) {
    return ECHARTS_TYPE.C;
  }
});
onMounted(() => {
  // 获取数据

  // let Echarts_data = {
  //   [ECHARTS_TYPE.A]:props.EchartsData,
  //   [ECHARTS_TYPE.B]:props.BarLineEchartsData,
  //   [ECHARTS_TYPE.C]:props.cardItem.BarEchartsData,
  // }
  // let data = Echarts_data[echartsType.value]
  
  let data =
    echartsType.value === ECHARTS_TYPE.A
      ? props.EchartsData
      : echartsType.value === ECHARTS_TYPE.B
      ? props.BarLineEchartsData
      : echartsType.value === ECHARTS_TYPE.C
      ? props.cardItem.BarEchartsData
      : null;

  // 获取配置函数
  let getOptionFn =
    echartsType.value === ECHARTS_TYPE.A
      ? getLineChartOptions
      : echartsType.value === ECHARTS_TYPE.B
      ? getBarLineChartOptions
      : echartsType.value === ECHARTS_TYPE.C
      ? getBarChartsOptions
      : null;

  let echartsInstance: any = null;

  // 获取echarts dom 容器
  let dom = document.getElementsByClassName(
    `lineEchartCp-${props.cardItem.code}-box`
  )[0] as HTMLElement;
  // 初始化echarts
  dom && (echartsInstance = markRaw(echarts.init(dom)));
  props.cardItem?.xAxisData && (data.xAxisData = props.cardItem.xAxisData);
  getOptionFn && echartsInstance.setOption(getOptionFn(data));
});
</script>
<style scoped lang="less">
.lineEchartCp-box {
  height: 4.48rem;
  margin: 0.12rem 0;
}
</style>
