<!--
 * @Description: 筛选条件 自顶往下滑出的自定义弹框
 * @Autor: Bg
 * @Date: 2023-01-11 15:01:26
 * @LastEditors: Bg
 * @LastEditTime: 2024-04-26 15:19:13
-->
<template>
  <div class="filterMdCp-box">
    <nut-overlay
      v-model:visible="showOverlay_compt"
      :close-on-click-overlay="false"
    >
      <div class="overlay-body">
        <!-- 多选 -->
        <div class="checkbox" v-if="showPartSelect">
          <span
            class="checkbox-all"
            :class="hasAll ? 'hasAll' : ''"
            @click="handleCheckAll"
          >
            全选
          </span>
          <span
            v-for="item in checkboxList"
            :key="item.label"
            class="checkbox-item"
            @click="handleCheckItem(item)"
            :class="organizationCodes.includes(item.label) ? 'hasSelect' : ''"
          >
            {{ item.value }}
          </span>
        </div>
        <!-- 时间选择 -->
        <div class="overlay-content-time" @click="handleOpenTimeSelect">
          {{ overLayTime }}
        </div>
        <!-- 单选 -->
        <div class="radiobox">
          <span
            v-for="item in radioboxList"
            :key="item.label"
            class="radiobox-item"
            @click="handleRadioItem(item)"
            :class="optionCode == item.label ? 'optionCode' : ''"
          >
            {{ item.value }}
          </span>
        </div>
        <footer class="btn-box">
          <div class="btn-cancel" @click="handleCloseMd">关闭</div>
          <div class="btn-confirm" @click="handleConfirm">确定</div>
        </footer>
      </div>
    </nut-overlay>
    <nut-popup
      v-model:visible="showPopup"
      position="bottom"
      round
      :style="{ height: '30%' }"
    >
      <nut-date-picker
        type="year-month"
        v-model="val"
        :three-dimensional="false"
        @confirm="datePickerConfirm"
        @cancel="datePickerCancel"
      ></nut-date-picker>
    </nut-popup>
  </div>
</template>
<script setup lang="ts">
import { useHomeConfig } from "@/store/home";
import { inf_currentPartInfo, inf_selectPartInfo } from "@/store/home/home";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";

// 引入常量
import { COMP_TYPE_ARR, OPTION_TYPE_ARR, PART_TYPE } from "@/config/const";

const props = defineProps(["showOverlay"]);
const emit = defineEmits(["closeFilterMd"]);
// pinia 相关
const useHomeStore = useHomeConfig();
const store = storeToRefs(useHomeStore);
let selectPartInfo: inf_selectPartInfo = store.selectPartInfo.value;
let currentPartInfo: inf_currentPartInfo = store.currentPartInfo.value;
let showPartSelect = computed(() => {
  return store.currentPartInfo.value.code == PART_TYPE["集团"];
});

const showPopup = ref(false);
// 时间初始化
const val = ref(
  new Date(
    store.selectPartInfo.value.year as number,
    (store.selectPartInfo.value.month as number) - 1
  )
);

// ----------------- 多选逻辑 -----------------------
const checkAll = ref(false);
// 多选变量
const checkboxList = ref(COMP_TYPE_ARR);

// 选择的分公司
const organizationCodes = ref(selectPartInfo.organizationCodes);
const organizationNames = ref(selectPartInfo.organizationNames);

const confirm = (selectedValue: any) => {
  console.log(selectedValue);
};
// 选择部分
const handleCheckItem = (checkItem: { label: string; value: string }) => {
  if (organizationCodes.value.includes(checkItem.label)) {
    organizationCodes.value = organizationCodes.value.filter(
      (item) => item !== checkItem.label
    );
    organizationNames.value = organizationNames.value.filter(
      (item) => item !== checkItem.value
    );
  } else {
    organizationCodes.value.push(checkItem.label);
    organizationNames.value.push(checkItem.value);
  }
};
// 全选计算
const hasAll = computed(() => {
  return (
    checkAll.value ||
    organizationCodes.value.length == checkboxList.value.length
  );
});
// 全选
const handleCheckAll = () => {
  // 反选
  if (hasAll.value) {
    organizationCodes.value = [];
    organizationNames.value = [];
  } else {
    organizationCodes.value = checkboxList.value.map((item) => item.label);
    organizationNames.value = checkboxList.value.map((item) => item.value);
  }
};

// ----------------- 多选逻辑 -----------------------

// 单选变量
// ----------------- 单选逻辑 -----------------------
const optionCode = ref(selectPartInfo.option);
const optionName = ref(selectPartInfo.optionName);
const radioboxList = ref(OPTION_TYPE_ARR);

// 单选操作
const handleRadioItem = (item: any) => {
  optionCode.value = item.label;
  optionName.value = item.value;
};
// ----------------- 单选逻辑 -----------------------

// 选择的时间
const overLayTime = ref(`${selectPartInfo.year} - ${selectPartInfo.month}`);

// 筛选开关
const showOverlay_compt = computed(() => {
  return props.showOverlay;
});

// --------------筛选弹框 -----------------------------
const handleCloseMd = () => {
  emit("closeFilterMd");
};
const handleConfirm = () => {
  let time = overLayTime.value.split("-");
  let data = {
    // 选择的部门信息
    organizationCodes: organizationCodes.value,
    organizationNames: organizationNames.value,
    year: Number(time[0]),
    month: Number(time[1]),
    option: optionCode.value,
    optionName: optionName.value,
  };

  /* 
        month: M,
        option: OPTION_TYPE["本月度"],
        optionName: "本月度",
        year: new Date().getFullYear(),
        organizationCodes: [
          COMP_TYPE["深康佳"],
          COMP_TYPE["华康创展"],
          COMP_TYPE["易平方"],
        ],
        organizationNames: ["深康佳", "华康创展", "易平方"],
  
  */
  console.log("data", data);
  useHomeStore.updateSelectPartInfo(data);
  emit("closeFilterMd", data);
};
// --------------筛选弹框 -----------------------------

// --------------时间弹框 -----------------------------
// 打开时间选择器
const handleOpenTimeSelect = () => {
  showPopup.value = true;
};
const datePickerConfirm = (val: any) => {
  let selectedValue = val.selectedValue;
  let year = selectedValue[0];
  let month = selectedValue[1];

  overLayTime.value = `${year}-${month}`;
  datePickerCancel();
};
const datePickerCancel = () => {
  showPopup.value = false;
};
// --------------时间弹框 -----------------------------
</script>
<style scoped lang="less">
@import "../../index.less";
.overlay-body {
  position: absolute;
  top: 50%;
  left: 50%;
  background: white;
  transform: translate(-50%, -50%);
  border-radius: 0.24rem;
  padding: 0.4rem 0.3rem 0.3rem 0.3rem;
  width: 86vw;
}
.checkbox,
.radiobox {
  font-size: 0.34rem;
  color: #333;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .checkbox-all,
  .checkbox-item {
    display: inline-block;
    padding-left: 0.5rem;
    position: relative;
    margin: 0 0.4rem 0.2rem 0;
    &:before {
      position: absolute;
      top: 0.02rem;
      left: 0;
      content: "";
      width: 0.4rem;
      height: 0.4rem;
      border: 0.02rem solid;
      border-radius: 0.12rem;
    }
  }

  .radiobox-item {
    display: inline-block;
    padding-left: 0.5rem;
    position: relative;
    margin: 0 0.4rem 0.2rem 0;
    &:before {
      position: absolute;
      top: 0.02rem;
      left: 0;
      content: "";
      width: 0.4rem;
      height: 0.4rem;
      border: 0.02rem solid;
      border-radius: 1rem;
    }
  }
  .hasSelect,
  .hasAll {
    &:before {
      border-color: @var-color;
    }
    &:after {
      position: absolute;
      top: 0.06rem;
      left: 0.04rem;
      content: "";
      width: 0.36rem;
      height: 0.36rem;
      border-radius: 0.12rem;
      background: @var-color;
    }
  }
  .optionCode {
    &:before {
      border-color: @var-color;
    }
    &:after {
      position: absolute;
      top: 0.06rem;
      left: 0.04rem;
      content: "";
      width: 0.36rem;
      height: 0.36rem;
      border-radius: 1rem;
      background: @var-color;
    }
  }
}

.overlay-content-time {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.48rem;
  padding: 0.12rem;
  border: 0.02rem solid @var-border-color;
  border-radius: 0.1rem;
  margin-bottom: 0.46rem;
  margin-top: 0.28rem;
}

.btn-box {
  display: flex;
  justify-content: end;
  font-size: 0.4rem;
}
.btn-cancel,
.btn-confirm {
  padding: 0.12rem 0.5rem;
  border-radius: 0.2rem;
  color: @var-color;
}
.btn-cancel {
  color: @var-close-color;
}
</style>
<style lang="less">
@import "../../index.less";
.nut-picker__right {
  color: @var-color;
}
</style>
