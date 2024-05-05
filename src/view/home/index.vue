<!--
 * @Description: 
 * @Autor: bg
 * @Date: 2023-05-11 09:44:13
 * @LastEditors: bg
 * @LastEditTime: 2024-04-29 16:04:46
-->
<template>
  <div style="width: 100vw" class="home-box">
    <LogoLoading v-show="loadData"></LogoLoading>
    <div v-if="!loadData">
      <!-- 顶部吸顶内容 -->
      <nut-sticky>
        <div class="home-top-sticky">
          <!-- title -->
          <Title :title="topTitle"></Title>
          <!-- 已选信息组件 -->
          <TopInfoCp @openFilterOverlay="openFilterOverlay"></TopInfoCp>
          <!-- 筛选组件 -->
          <FilterMdCp
            :showOverlay="showOverlay"
            @closeFilterMd="closeFilterMd"
          ></FilterMdCp>
        </div>
      </nut-sticky>
      <div class="data-content-box">
        <!-- 收入card -->
        <CardCp
          v-for="cardItem in cardListData"
          :key="cardItem.code"
          :cardItem="cardItem"
        ></CardCp>
      </div>
      <nut-backtop :bottom="90"></nut-backtop>
      <div class="btn-box">
        <div class="btn-item" id="tour5-2" @click="handleOpen(1)">全部展开</div>
        <div class="btn-item" id="tour5-3" @click="handleOpen(2)">全部收起</div>
        <div class="btn-item" id="tour5-4" @click="handleFontSize(1)">
          字体放大
        </div>
        <div class="btn-item" id="tour5-5" @click="handleFontSize(2)">
          字体缩小
        </div>
      </div>
    </div>
    <nut-watermark :z-index="999" content="经营数据,注意保密!"></nut-watermark>

    <!-- 引导 -->
    <nut-tour
      v-model="tourShow"
      class="nut-custom-tour"
      :steps="steps"
      location="top-start"
      :offset="[0, 0]"
      :mask-width="60"
      :mask-height="50"
      complete-txt="我知道了"
      @close="handleTourFinsh"
    >
    </nut-tour>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, computed, watch } from "vue";
import { useHomeConfig } from "@/store/home/index";
// 组件引入
import LogoLoading from "@/components/logoLoading";
import Title from "@/view/home/components/title/index.vue";
import TopInfoCp from "@/view/home/components/topInfoCp/index.vue";
import FilterMdCp from "@/view/home/components/filterMdCp/index.vue";
import CardCp from "@/view/home/components/cardCp/index.vue";

import { inf_selectPartInfo } from "@/store/home/home";
import {
  PART_TYPE,
  PART_TYPE_ARR,
  TARGET_TYPE,
  TARGET_TYPE_ARR,
} from "@/config/const";
// 接口引入
import {
  apiLinearData,
  apiGetTreePartsData,
  apiGetCardData,
  apiGetBarLineData,
  apiGetTreePartsDataUnit,
  apiGetCardDataUnit,
  getLinearDataUnit,
} from "@/mock/home";
import { getMenuByRight } from "@/api";
import { updataCurrentAndSelectPartInfoHook } from "./components/partSelectCp/partSelectHook";
import { TourShowHook } from "./hooks/tourShowHook";

// 接口定义
interface inf_allCardDataItem {
  code: string;
  xAxisData?: Array<string>;
  title: string;
  CardData: object;
  EchartsData?: object; // 普通折线图
  BarLineEchartsData?: object; // 折线柱状图
  BarEchartsData?: object; // 柱状图
  BarComposeData?: object;
}
// 引导步骤条 hooks
const { tourShow, steps, handleTourFinsh } = TourShowHook();
// 获取仓库实例
const store = useHomeConfig();

const showOverlay = ref(false);
const loadData = ref(true);
const cardListData = ref<Array<inf_allCardDataItem>>([]);

// 计算值
let topTitle: any = computed(() => {
  return store.currentPartInfo.name || "康佳集团";
});

// 打开筛选弹框
const openFilterOverlay = () => {
  showOverlay.value = true;
};

// 关闭筛选弹框
const closeFilterMd = (data: any) => {
  showOverlay.value = false;
};

// 获取所有数据的卡片List数组
const getAllCardDataList = () => {
  // [
  //     {
  //       code:'110',
  //       title:'收入',
  //       CardData:{},
  //       EchartsData:{},
  //       BarLineEchartsData:{},
  //       BarComposeData:{}
  //     }
  //   ]
  // 有card line 和 构成图的code 收入、利润总额、毛利、费用、经营性利润
  let hasAllDataCodeList = [
    TARGET_TYPE["营业收入"],
    TARGET_TYPE["考核利润"],
    TARGET_TYPE["毛利总额"],
    TARGET_TYPE["期间费用"],
    TARGET_TYPE["经营性利润"],
  ];

  // 有card line 的code 总资产、经营性现金流、两金
  let hasCardAndLineDataCodeList = [
    TARGET_TYPE["总资产"],
    TARGET_TYPE["经营性现金流"],
    TARGET_TYPE["两金"],
  ];

  // 只有 card 的code 毛利率
  let onleOneCardCode = [TARGET_TYPE["毛利率"]];

  let allCardDataList: Array<inf_allCardDataItem> = [];
  TARGET_TYPE_ARR.forEach((item) => {
    if (hasAllDataCodeList.includes(item.code)) {
      allCardDataList.push({
        code: item.code,
        title: item.name,
        CardData: {},
        EchartsData: {},
        BarComposeData: {},
      });
    } else if (hasCardAndLineDataCodeList.includes(item.code)) {
      allCardDataList.push({
        code: item.code,
        title: item.name,
        CardData: {},
        BarLineEchartsData: {},
      });
    } else if (onleOneCardCode.includes(item.code)) {
      allCardDataList.push({
        code: item.code,
        title: item.name,
        CardData: {},
      });
    }
  });

  return allCardDataList;
};

// card卡片数据组装
const handleCompCardData = (
  container: Array<inf_allCardDataItem>,
  CardData: Array<any>
) => {
  let res: any[] = [];
  container.forEach((c) => {
    CardData.forEach((d) => {
      if (c.code == d.targetCode) {
        res.push({
          ...c,
          CardData: d,
        });
      }
    });
  });
  return res;
};

// 组装 折线图数据
const handleCompEchartsData = (
  afterCompCardData: Array<inf_allCardDataItem>,
  EchartsData: any
) => {
  afterCompCardData.forEach((d: inf_allCardDataItem) => {
    switch (d.code) {
      // 收入
      case TARGET_TYPE["营业收入"]:
        d.EchartsData = EchartsData["INCOME"];
        d.xAxisData = EchartsData["xAxisData"];
        break;
      // 利润总额
      case TARGET_TYPE["考核利润"]:
        d.EchartsData = EchartsData["INVENTORY_STOCK"];
        d.xAxisData = EchartsData["xAxisData"];
        break;
      // 毛利
      case TARGET_TYPE["毛利总额"]:
        d.EchartsData = EchartsData["GROSS_MARGIN"];
        d.xAxisData = EchartsData["xAxisData"];
        break;
      // 费用
      case TARGET_TYPE["期间费用"]:
        d.EchartsData = EchartsData["ACCOUNTS_RECEIVABLE"];
        d.xAxisData = EchartsData["xAxisData"];
        break;
      // 经营利润
      case TARGET_TYPE["经营性利润"]:
        d.EchartsData = EchartsData["COST_SITUATION"];
        d.xAxisData = EchartsData["xAxisData"];
        break;
      default:
        break;
    }
  });
  return afterCompCardData;
};

// 组装 构成图 数据
const handleBarComposeData = (
  afterCompEchartsData: Array<inf_allCardDataItem>,
  BarComposeData: Array<any>
) => {
  // 小 驱动 大
  BarComposeData.forEach((d) => {
    afterCompEchartsData.forEach((e) => {
      if (d.name.includes(e.title)) {
        e.BarComposeData = d.children;
      }
    });
  });
  return afterCompEchartsData;
};

// 组装柱状图
const handleBarLineEchartsData = (
  afterBarComposeData: Array<inf_allCardDataItem>,
  BarLineEchartsData: any
) => {
  afterBarComposeData.forEach((d: inf_allCardDataItem) => {
    switch (d.code) {
      // 总资产
      case TARGET_TYPE["总资产"]:
        d.BarLineEchartsData =
          BarLineEchartsData["MANAGEMENT_QUALITY_CHANGE_TREND"];
        d.xAxisData = BarLineEchartsData["xAxisData"];
        break;
      // 经营性现金流
      case TARGET_TYPE["经营性现金流"]:
        d.EchartsData = BarLineEchartsData["ANALYZE_TREND_OF_CORE_INDICATORS"];
        d.xAxisData = BarLineEchartsData["xAxisData"];
        break;
      // 两金
      case TARGET_TYPE["两金"]:
        d.BarEchartsData = BarLineEchartsData["ACCOUNTS_RECEIVABLE"];
        d.xAxisData = BarLineEchartsData["xAxisData"];
        break;
      default:
        break;
    }
  });
  return afterBarComposeData;
};

// 组装数据
const handleComposeData = (
  CardData: any,
  EchartsData: any,
  BarLineEchartsData: any,
  BarComposeData: any
) => {
  try {
    let addCardDataArr = getAllCardDataList();
    // 先组装card数据
    let afterCompCardData = handleCompCardData(addCardDataArr, CardData);
    // 组装 折线图 数据
    let afterCompEchartsData = handleCompEchartsData(
      afterCompCardData,
      EchartsData
    );
    // 组装 构成图 数据
    let afterBarComposeData = handleBarComposeData(
      afterCompEchartsData,
      BarComposeData
    );

    let afterBarLineEchartsData: any = null;
    if (topTitle.value == "康佳集团") {
      // 组装 柱状图 数据
      afterBarLineEchartsData = handleBarLineEchartsData(
        afterBarComposeData,
        BarLineEchartsData
      );
      cardListData.value = afterBarLineEchartsData;
    } else {
      cardListData.value = afterBarComposeData;
    }
  } catch (err) {
    console.error("handleComposeData", err);
  }
};
// 重新组装数据
const handleParams = (data: any) => {
  // 注意 如果这里直接改data 会导致store里的值也被改了  因为pinia的state是可以直接修改的
  let params = JSON.parse(JSON.stringify(data));
  delete params.organizationNames;
  delete params.optionName;
  if (params.organizationCode !== PART_TYPE["康佳集团"]) {
    delete params.organizationCodes;
  }
  return params;
};

const handleInitDataV1 = async (params: any) => {
  // 获取 各个指标的月度、季度、年度数据
  let CardData = await apiGetCardData(params);
  // 获取 各个echarts 的数据
  let EchartsData = await apiLinearData(params);
  // 获取 经营质量、现金流、两金 echarts 的数据
  let BarLineEchartsData = await apiGetBarLineData(params);
  // 获取构成 数据
  let BarComposeData = await apiGetTreePartsData(params);

  // 所有数据按UI进行组装
  handleComposeData(
    CardData.data,
    EchartsData.data,
    BarLineEchartsData.data,
    BarComposeData.data
  );
  loadData.value = false;
};
const handleInitDataUnit = async (params: any) => {
  // 获取 各个指标的月度、季度、年度数据
  let CardData = await apiGetCardDataUnit(params);
  // 获取 各个echarts 的数据
  let EchartsData = await getLinearDataUnit(params);
  // 获取构成 数据
  let BarComposeData = await apiGetTreePartsDataUnit(params);

  // 所有数据按UI进行组装
  handleComposeData(CardData.data, EchartsData.data, null, BarComposeData.data);
  loadData.value = false;
};
// 顶部组件做数据管理
const initData = async (data: inf_selectPartInfo) => {
  loadData.value = true;
  try {
    let params = handleParams(data);
    if (params.organizationCode == PART_TYPE["康佳集团"]) {
      handleInitDataV1(params);
    } else {
      handleInitDataUnit(params);
    }
  } catch (err) {
    console.error("initData", err);
    loadData.value = false;
  }
};

// 字体大小处理
const handleFontSize = (type: number) => {
  // 边界值设置
  let max_size = 60;
  let min_size = 45;
  let step = 5;
  // 获取当前字体大小

  let domNode = document.getElementsByTagName("html")[0];
  let htmlFontSize: any = domNode.style.fontSize;

  htmlFontSize = Number(htmlFontSize.replace("px", ""));
  // 放大
  if (type == 1) {
    if (htmlFontSize < max_size) {
      htmlFontSize += step;
    }
  } else {
    if (htmlFontSize > min_size) {
      htmlFontSize -= step;
    }
  }
  // console.log('htmlFontSize',htmlFontSize)
  // 重新赋值
  domNode.style.fontSize = htmlFontSize + "px";
};

// 一键收起所有的card
const handleOpen = (type: number) => {
  store.updateAllOpen(type);
};
// 一键收起所有的card
const handlePartsList = (res: any) => {
  // 数据格式化  过滤数组
  let partCodeList = Object.keys(res);
  let partsList = PART_TYPE_ARR.filter((item: any) => {
    return partCodeList.includes(item.label);
  });
  store.updatePartList(partsList);
  return partsList;
};

// 根据用户tk获取对应的部门列表 并取第一个值作为当前默认部门
const handleGetMenuByRight = async () => {
  try {
    let res: any = await getMenuByRight({});
    // 更新当前部门列表
    let partList = handlePartsList(res.data);
    if (partList.length > 0) {
      // 更新当前部门信息
      updataCurrentAndSelectPartInfoHook({
        label: partList[0].label,
        value: partList[0].value,
      });
    }
  } catch (e) {}
};
// 监听筛选条件变化 变化就重新获取数据
watch(
  () => store.selectPartInfo,
  (newValue, oldValue) => {
    initData(newValue);
  },
  { deep: true }
);
// 初始化
onMounted(() => {
  handleGetMenuByRight();
  // initData(store.selectPartInfo);
});
</script>
<style scoped lang="less">
.home-box {
  background: #cccccc54;
  padding-bottom: 10rem;
}
.home-top-sticky {
  background: white;
}

.btn-box {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 0.96rem;
  background: white;
  z-index: 77;
  display: flex;
  font-size: 0.32rem;
  justify-content: space-around;
  align-items: center;
  border-top: 0.02rem solid #c2c2c278;
  .btn-item {
    background: white;
    color: #3c8bfe;
    flex: 1;
    text-align: center;
    line-height: 0.96rem;
    font-weight: bold;
  }
}
</style>
<style lang="less">
  .nut-tour-content-inner{
    font-size: .34rem;
  }
  .nut-tour-content-bottom-operate-btn{
    font-size: 0.32rem;
  }
</style>