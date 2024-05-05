<!--
 * @Description: 顶部吸顶的简易信息栏
 * @Autor: Bingo
 * @Date: 2023-01-11 15:01:26
 * @LastEditors: Bingo
 * @LastEditTime: 2024-04-29 15:05:11
-->
<template>
  <div class="topInfoCp-box">
    <aside class="topInfoCp-left">
      <span class="topInfoCp-item" v-if="isShowParts">{{ partStr }}</span>
      <span class="topInfoCp-item topInfoCp-item-time">{{ time }}</span>
      <span class="topInfoCp-item topInfoCp-item-radio">{{ optionName }}</span>
    </aside>
    <aside class="topInfoCp-right" @click="openFilterOverlay" id="tour5-1">筛选</aside>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useHomeConfig } from "@/store/home/index";

import { PART_TYPE } from "@/config/const";
import { computed } from "vue";

const store = storeToRefs(useHomeConfig());
// 注意 这里不能将store.selectPartInfo.value 抽成一个变量 否则会导致响应式失效
let partStr = computed(() => {
  return store.selectPartInfo.value.organizationNames.join(",");
});
let time = computed(
  () => `${store.selectPartInfo.value.year}-${store.selectPartInfo.value.month}`
);
let optionName = computed(() => store.selectPartInfo.value.optionName);

const isShowParts = computed(
  () => store.currentPartInfo.value.code == PART_TYPE["o集团"]
);

const emit = defineEmits(["openFilterOverlay"]);
const openFilterOverlay = () => {
  emit("openFilterOverlay");
};
</script>

<style scoped lang="less">
@import "../../index.less";
.topInfoCp-box {
  display: flex;
  justify-content: space-around;
  font-size: 0.3rem;
  border-bottom: 0.02rem solid #c2c2c278;
  height: 0.6rem;
  padding: 0.16rem 0.16rem;
  align-items: center;
  .topInfoCp-left {
    flex: 1;
  }
  .topInfoCp-item {
    padding: 0 0.16rem;
    &:not(:last-child) {
      border-right: 0.02rem solid @var-border-color;
    }
  }
  .topInfoCp-right {
    color: @var-color;
    padding: 0.2rem;
  }
}
</style>
