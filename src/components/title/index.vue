<!--
 * @Description: 
 * @Autor: bg
 * @Date: 2023-01-11 15:01:26
 * @LastEditors: bg
 * @LastEditTime: 2023-01-11 15:10:48
-->
<template>
  <div class="card-title">
    <aside class="card-title-left">{{ title }}</aside>
    <aside class="card-title-right">
      <slot></slot>
    </aside>
  </div>
</template>
<script lang="ts">
export default {
  name: "Title",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  setup() {},
};
</script>
<style scoped lang="less">
.card-title {
  display: flex;
  padding: 0.44rem 0.24rem;
  align-items: center;
  font-size: 0.3rem;
  font-weight: bold;
  color: #333;
  justify-content: space-between;
  background: #f4f5f7;
  position: relative;
}
.card-title-left {
  position: relative;
  padding-left: 0.2rem;
}
.card-title-left::before {
  position: absolute;
  top: 0.08rem;
  left: 0;
  content: "";
  width: 0.08rem;
  height: 0.26rem;
  background: rgba(55, 127, 248);
  border-radius: 0.16rem;
}
.card-title-right {
  color: rgba(55, 127, 248);
}
</style>
