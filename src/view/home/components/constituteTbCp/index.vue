<!--
 * @Description: 收入构成tablet
 * @Autor: Bingo
 * @Date: 2023-01-11 15:01:26
 * @LastEditors: Bingo
 * @LastEditTime: 2024-04-29 11:07:45
-->
<template>
  <div class="constituteTbCp-box" v-if="showConstituteTbCp">
    <header class="constituteTbCp-header">{{ constituteType }}构成(亿)</header>
    <!-- 标题 -->
    <div class="constituteTbCp-data constituteTbCp-data-title">
      <span class="constituteTbCp-data-parts">部门</span>
      <span class="constituteTbCp-data-current">当前数值</span>
      <span class="constituteTbCp-data-last">对比数值</span>
      <span class="constituteTbCp-data-rate">比率</span>
    </div>
    <div
      class="constituteTbCp-data"
      v-for="item in props.BarComposeData"
      :key="item.organizationCode"
    >
      <span class="constituteTbCp-data-parts">{{ item.organizationName }}</span
      ><span class="constituteTbCp-data-current">{{
        item.showCumulativeAchieve
      }}</span
      ><span class="constituteTbCp-data-last"
        >同比 {{ item.showYearOnYearBasis }}</span
      ><span class="constituteTbCp-data-rate" :class="oration(item.showChain)?'down-color':'up-color'">
        {{ item.showChain }}
        <img
          :src="handleImg(item.showChain)"
          class="constituteTbCp-data-icon"
        />
      </span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { handleImg,oration } from "@/utils/common";
const props = defineProps(["BarComposeData", "cardItem"]);

const constituteType = computed(() => {
  return props.cardItem.title;
});

const showConstituteTbCp = computed(() => {
  return props.BarComposeData && Array.isArray(props.BarComposeData);
});

</script>
<style scoped lang="less">
@import "../../index.less";
.constituteTbCp-header {
  font-size: 0.24rem;
  color: #696666;
  padding: 0.12rem;
  border-bottom: 0.02rem solid @var-border-color;
}
.constituteTbCp-data {
  display: flex;
  justify-content: space-between;
  padding: 0.12rem;
  font-weight: bold;
  align-items: center;
  span:not(:first-child) {
    // text-align: right;
  }
  &-parts {
    width: 30%;
    padding-left: 0.08rem;
  }
  &-current {
    width: 25%;
  }
  &-last {
    width: 30%;
  }
  &-rate {
    width: 25%;
    display: flex;
    justify-content: end;
    align-items: center;
  }
}
.constituteTbCp-data-icon {
  width: .28rem;
  height: 0.24rem;
  margin-left: 0.12rem;
}

.constituteTbCp-data-title {
  font-size: .26rem;
  font-weight: 400;
  color: #696666;
}
</style>
