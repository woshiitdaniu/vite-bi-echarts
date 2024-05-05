<!--
 * @Description: 
 * @Autor: bg
 * @Date: 2024-04-23 09:40:50
 * @LastEditors: bg
 * @LastEditTime: 2024-04-29 11:18:31
-->
<!--
 * @Description: 顶部标题左侧的部门切换组件
 * @Autor: bg
 * @Date: 2023-01-11 15:01:26
 * @LastEditors: bg
 * @LastEditTime: 2024-04-26 15:40:45
-->
<template>
  <div class="partSelectCp-box">
    <nut-popover v-model:visible="showPopover" location="bottom-start">
      <template #content>
        <div
          class="partSelectCp-item"
          :class="partItem.label == currentPart && 'partSelectCp-item-active'"
          v-for="partItem in list"
          :key="partItem.label"
          @click="choose(partItem)"
        >
          {{ partItem.value }}
        </div>
      </template>
      <template #reference>
        <Add color="#3c8bfe" />
      </template>
    </nut-popover>
  </div>
</template>
<script lang="ts" setup>
import { Add } from "@nutui/icons-vue";
import { ref, computed } from "vue";

import { PART_TYPE_ARR } from "@/config/const";
import { useHomeConfig } from "@/store/home/index";
import { updataCurrentAndSelectPartInfoHook } from "./partSelectHook";

const store = useHomeConfig();
const currentPart = computed(() => {
  return store.currentPartInfo.code;
});
let showPopover: any = ref(false);
let list = computed(() => {
  return store.partList;
});

const choose = (partItem: { label: string; value: string }) => {
  updataCurrentAndSelectPartInfoHook(partItem);
  showPopover.value = false;
};
</script>
<style scoped lang="less">
.partSelectCp-box {
  padding: 0.24rem;
}
.partSelectCp-item {
  display: flex;
  align-items: center;
  padding: 0.16rem;
  font-size: 0.28rem;
  border-bottom: 1px solid rgb(229, 229, 229);
  &-active {
    color: #3c8bfe;
  }
}
</style>
