<!--
 * @Description: 顶部标题左侧的部门切换组件
 * @Autor: Bg
 * @Date: 2023-01-11 15:01:26
 * @LastEditors: Bg
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

import { COMP_TYPE, PART_TYPE, PART_TYPE_ARR } from "@/config/const";
import { useHomeConfig } from "@/store/home/index";

const store = useHomeConfig();
const currentPart = computed(() => {
  return store.currentPartInfo.code;
});
let showPopover: any = ref(false);
let list = ref(PART_TYPE_ARR);

const choose = (partItem: { label: string; value: string }) => {
  // 更新当前部门
  store.updateCurrentPartInfo({ name: partItem.value, code: partItem.label });

  let selectInfo =
    partItem.label == PART_TYPE["集团"]
      ? {
          organizationCode: partItem.label,
          organizationCodes: [
            COMP_TYPE["深康佳"],
            COMP_TYPE["华康创展"],
            COMP_TYPE["易平方"],
          ],
          organizationNames: ["深康佳", "华康创展", "易平方"],
        }
      : {
          organizationCode: partItem.label,
          organizationCodes: [],
          organizationNames: [],
        };
  // 更新请求参数
  store.updateSelectPartInfo(selectInfo);
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
  border-bottom: 1px solid rgb(229, 229, 229);
  &-active {
    color: #3c8bfe;
  }
}
</style>
