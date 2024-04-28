<!--
 * @Description: 
 * @Autor: Bg
 * @Date: 2023-01-11 15:01:26
 * @LastEditors: Bg
 * @LastEditTime: 2024-04-25 18:48:21
-->
<template>
  <div class="page-title">
    <aside class="page-title-left"><PartSelectCp></PartSelectCp></aside>
    <div class="page-title-content">{{ title }}</div>
  </div>
</template>

<script lang="ts">
import PartSelectCp from "@/view/home/components/partSelectCp/index.vue";
export default {
  name: "Title",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  components: { PartSelectCp },
  setup() {},
};
</script>
<style scoped lang="less">
.page-title {
  font-size: .36rem;
  position: relative;
  padding: .2rem;
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
