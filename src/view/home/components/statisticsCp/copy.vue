<!--
 * @Description: 月度 季度 年度 同比数据
 * @Autor: bg
 * @Date: 2023-01-11 15:01:26
 * @LastEditors: bg
 * @LastEditTime: 2024-04-25 18:46:19
-->
<template>
    <div class="statisticsCp-box">
      <!-- 月度 -->
      <div
        class="statistics-item"
        v-if="
          ![
            TARGET_TYPE['总资产'],
            TARGET_TYPE['经营性现金流'],
            TARGET_TYPE['两金'],
          ].includes(props.cardData.targetCode)
        "
      >
        <span class="statistics-item-lg">月度</span>
        <span class="statistics-item-current">{{
          props.cardData.monthAchieve || "---"
        }}</span>
        <span class="statistics-item-next"
          >同比 {{ props.cardData.monthYearOnYearBasis || "---" }}</span
        >
        <span class="statistics-item-rate"
          >{{ props.cardData.monthChain || "---" }}
          <img
            :src="handleImg(props.cardData.monthChain)"
            class="statistics-item-icon"
        /></span>
      </div>
      <div class="statistics-item-hasHb" v-else>
        <span class="statistics-item-lg">月度</span>
        <div class="statistics-item-hasHb-right">
          <div class="statistics-item-hasHb-top">
            <span class="statistics-item-current">{{
              props.cardData.monthAchieve || "---"
            }}</span>
            <span class="statistics-item-next"
              >同比 {{ props.cardData.monthYearOnYearBasis || "---" }}</span
            >
            <span class="statistics-item-rate"
              >{{ props.cardData.monthChain || "---" }}
              <img
                :src="handleImg(props.cardData.monthChain)"
                class="statistics-item-icon"
            /></span>
          </div>
          <div class="statistics-item-hasHb-bottom">
            <span class="statistics-item-current"></span>
            <span class="statistics-item-next"
              >环比 {{ props.cardData.monthYearOnYearBasis || "---" }}</span
            >
            <span class="statistics-item-rate"
              >{{ props.cardData.monthChain || "---" }}
              <img
                :src="handleImg(props.cardData.monthChain)"
                class="statistics-item-icon"
            /></span>
          </div>
        </div>
      </div>
  
      <!-- 季度 -->
      <div
        class="statistics-item"
        v-if="
          ![
            TARGET_TYPE['总资产'],
            TARGET_TYPE['经营性现金流'],
            TARGET_TYPE['两金'],
          ].includes(props.cardData.targetCode)
        "
      >
        <span class="statistics-item-lg">季度</span>
        <span class="statistics-item-current">{{
          props.cardData.quarterCumulativeAchieve || "---"
        }}</span>
        <span class="statistics-item-next"
          >同比 {{ props.cardData.quarterYearOnYearBasis || "---" }}</span
        >
        <span class="statistics-item-rate"
          >{{ props.cardData.quarterChain || "---" }}
          <img
            :src="handleImg(props.cardData.quarterChain)"
            class="statistics-item-icon"
        /></span>
      </div>
      <!-- 年度 -->
      <div
        class="statistics-item"
        v-if="
          ![
            TARGET_TYPE['总资产'],
            TARGET_TYPE['经营性现金流'],
            TARGET_TYPE['两金'],
          ].includes(props.cardData.targetCode)
        "
      >
        <span class="statistics-item-lg">年度</span>
        <span class="statistics-item-current">{{
          props.cardData.yearCumulativeAchieve || "---"
        }}</span>
        <span class="statistics-item-next"
          >同比 {{ props.cardData.yearOnYearBasis || "---" }}</span
        >
        <span class="statistics-item-rate"
          >{{ props.cardData.yearChain || "---" }}
          <img
            :src="handleImg(props.cardData.yearChain)"
            class="statistics-item-icon"
        /></span>
      </div>
    </div>
  </template>
  <script setup>
  import { ref } from "vue";
  import { handleImg } from "@/utils/common.ts";
  import { TARGET_TYPE } from "@/config/const";
  
  const props = defineProps(["cardData"]);
  
  console.log(props.cardData);
  </script>
  <style scoped lang="less">
  .statisticsCp-box {
    font-weight: bold;
  }
  .statistics-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .1rem;
    span:not(:first-child) {
      text-align: right;
    }
  
    &-lg {
      width: 30%;
      padding-left: .08rem;
    }
    &-current {
      width: 25%;
    }
    &-next {
      width: 30%;
    }
    &-rate {
      width: 25%;
      display: flex;
      justify-content: end;
      align-items: center;
    }
    &-icon {
      width: .16rem;
      height: .24rem;
      margin-left: .12rem;
    }
  }
  
  .statistics-item-hasHb {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .1rem;
  }
  .statistics-item-hasHb-right {
    display: flex;
    flex: 1;
    flex-direction: column;
    .statistics-item-next {
      width: 35%;
    }
  }
  .statistics-item-hasHb-top,
  .statistics-item-hasHb-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .statistics-item-current {
      text-align: right;
    }
  }
  </style>
  