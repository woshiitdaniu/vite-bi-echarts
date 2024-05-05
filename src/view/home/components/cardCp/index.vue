<!--
 * @Description: 内容卡片  包括title 总体数据  折线图 收入构成表格等
 * @Autor: Bingo
 * @Date: 2023-01-11 15:01:26
 * @LastEditors: Bingo
 * @LastEditTime: 2024-04-26 10:48:36
-->
<template>
  <div class="cardCp-box" :class="showCard ? '' : 'cardCp-close'">
    <!-- 卡片头部 -->
    <header class="cardCp-header" @click="handleShowCard">
      <aside class="cardCp-aside-left">
        <img src="" />
        {{ cardTitle }}
        (亿)
      </aside>
      <aside class="cardCp-aside-right" @click="handleShowCard">
        {{ showCard ? "收起" : "展开" }}
      </aside>
    </header>
    <!-- 统计同比数据 -->
    <StatisticsCp :cardData="cardData"></StatisticsCp>
    <!-- 折线图、柱状图 -->
    <LineEchartCp
      :EchartsData="EchartsData"
      :BarLineEchartsData="BarLineEchartsData"
      :cardItem="props.cardItem"
    ></LineEchartCp>
    <!-- 构成图 -->
    <ConstituteTbCp :BarComposeData="BarComposeData" :cardItem="props.cardItem"></ConstituteTbCp>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, watch } from "vue";
import StatisticsCp from "@/view/home/components/statisticsCp/index.vue";
import LineEchartCp from "@/view/home/components/lineEchartCp/index.vue";
import ConstituteTbCp from "@/view/home/components/constituteTbCp/index.vue";
import { useHomeConfig } from "@/store/home/index";
import { storeToRefs } from "pinia";
const props = defineProps(["cardItem"]);
const useH = useHomeConfig()
const store = storeToRefs(useH);
// 标题
let cardTitle = computed(() => props.cardItem.title);
// 统计card数据
let cardData = computed(() => props.cardItem.CardData);
// 折线图 数据
let EchartsData = computed(() => props.cardItem.EchartsData);
// 柱状图 数据
let BarLineEchartsData = computed(() => props.cardItem.BarLineEchartsData);
// 构成图 数据
let BarComposeData = computed(() => props.cardItem.BarComposeData);

// 伸缩开关
const showCard = ref(true);
// 监听全局开关
watch(
  () => store.allOpen.value,
  (val) => {
    if (val) {
      showCard.value = val == 1 ? true : false;
    }
  }
);
const handleShowCard = () => {
  useH.updateAllOpen(null);
  showCard.value = !showCard.value;
};
</script>
<style scoped lang="less">
@import "../../index.less";
.cardCp-box {
  font-size: 0.28rem;
  margin: 0.24rem 0.16rem;
  border-radius: 0.2rem;
  background: white;
  overflow: hidden;
  transition: all 0.5s;
}
.cardCp-close {
  transition: all 0.5s;
  height: .8rem;
}
.cardCp-header {
  padding: .2rem .1rem;
  border-bottom: 0.02rem solid @var-border-color;
  font-size: 0.3rem;
  color: #333;
  display: flex;
  justify-content: space-between;
}
.cardCp-aside-left {
  font-weight: bold;
}
.cardCp-aside-right {
  padding: 0 0 0 0.2rem;
  color: @var-color;
}
</style>
