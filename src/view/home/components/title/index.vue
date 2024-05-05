<!--
 * @Description: 
 * @Autor: Bingo
 * @Date: 2023-01-11 15:01:26
 * @LastEditors: Bingo
 * @LastEditTime: 2024-04-29 11:42:38
-->
<template>
  <div class="page-title">
    <aside class="page-title-left" v-if="showPartSelet"><PartSelectCp></PartSelectCp></aside>
    <div class="page-title-content">{{ props.title }}</div>
  </div>
</template>

<script lang="ts" setup>
import PartSelectCp from "@/view/home/components/partSelectCp/index.vue";
import { useHomeConfig } from "@/store/home/index";
import { computed } from 'vue';

const props = defineProps(['title'])
const store = useHomeConfig();

const showPartSelet = computed(()=>{
   return store.partList.length > 1
})

</script>
<style scoped lang="less">
.page-title {
  font-size: 0.36rem;
  position: relative;
  padding: 0.2rem;
}
.page-title-left {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 88;
}
.page-title-content {
  text-align: center;
  color: #333;
  font-weight: bold;
}
</style>
