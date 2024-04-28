/*
 * @Description:
 * @Autor: Bg
 * @Date: 2024-04-25 10:37:26
 * @LastEditors: Bg
 * @LastEditTime: 2024-04-25 17:14:48
 */
export const OPTION_TYPE = {
  本月度: "M",
  本季度: "Q",
  本年度: "Y",
};

// 部门
export const PART_TYPE = {
  集团: "020",
  多媒体产业: "2000",
  白色家电: "4000",
  "移动互联-电子": "7000",
  "移动互联-材料": "5000",
  "半导体-光电": "6000",
  "半导体-存储": "3000",
  PCB产业: "8000",
  科技产业园: "1000",
  创投公司: "9000",
  易平方: "0202",
  华康创展: "0203",
};

// 集团及下属子公司
export const COMP_TYPE = {
  深康佳: "0201",
  华康创展: "0203",
  易平方: "0202",
};

// 各个指标对应的code name

export const TARGET_TYPE_ARR = [
  {
    code: "110",
    name: "营业收入",
  },
  // 也叫利润总额
  {
    code: "150",
    name: "考核利润",
  },
  {
    code: "501",
    name: "毛利率",
  },
  {
    code: "120",
    name: "毛利总额",
  },
  {
    code: "130",
    name: "期间费用",
  },
  {
    code: "140",
    name: "经营性利润",
  },
  {
    code: "220",
    name: "总资产",
  },
  {
    code: "210",
    name: "经营性现金流",
  },
  {
    code: "500",
    name: "两金",
  },
];
export const TARGET_TYPE = {
  营业收入: "110",
  考核利润: "150",
  毛利率: "501",
  毛利总额: "120",
  期间费用: "130",
  经营性利润: "140",
  总资产: "220",
  经营性现金流: "210",
  两金: "500",
};

// 获取他们的key value 形式
const emunToKeyArr = (obj: any) => {
  let arr: { label: any; value: string }[] = [];
  Object.keys(obj).forEach((key) => {
    arr.push({
      label: obj[key] + "",
      value: key,
    });
  });
  return arr;
};

export const OPTION_TYPE_ARR = emunToKeyArr(OPTION_TYPE);
export const PART_TYPE_ARR = emunToKeyArr(PART_TYPE);
export const COMP_TYPE_ARR = emunToKeyArr(COMP_TYPE);
