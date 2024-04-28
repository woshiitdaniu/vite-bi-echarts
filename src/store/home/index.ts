/*
 * @Description:
 * @Autor: Bg
 * @Date: 2022-12-12 11:19:55
 * @LastEditors: Bg
 * @LastEditTime: 2024-04-25 19:04:07
 */
import { defineStore } from "pinia";
import { PART_TYPE, COMP_TYPE, OPTION_TYPE } from "@/config/const";
import { inf_currentPartInfo, inf_selectPartInfo } from "@/store/home/home";

// 定义多个接口

// AuthStore
export const useHomeConfig = defineStore("HomeConfig", {
  state: (): any => {
    let M: string | number = new Date().getMonth();
    let stateRes: {
      allOpen: number | null; //  1表示开启  2表示关闭
      currentPartInfo: inf_currentPartInfo;
      selectPartInfo: inf_selectPartInfo;
    } = {
      // 一键控制全展开或收起
      allOpen: null,
      // 当前部门
      currentPartInfo: { name: "集团", code: PART_TYPE["集团"] },
      // 选择的部门list
      selectPartInfo: {
        month: M,
        option: OPTION_TYPE["本月度"],
        optionName: "本月度",
        organizationCode: PART_TYPE["集团"],
        year: new Date().getFullYear(),
        organizationCodes: [
          COMP_TYPE["深康佳"],
          COMP_TYPE["华康创展"],
          COMP_TYPE["易平方"],
        ],
        organizationNames: ["深康佳", "华康创展", "易平方"],
        unit: "亿",
      },
    };

    return stateRes;
  },
  //   这个getters就相当于computed 当我们修改了相关的state时 会再次进行运算
  getters: {},
  actions: {
    // 更新当前部门
    updateCurrentPartInfo(newVal: inf_currentPartInfo) {
      this.currentPartInfo = newVal;
    },
    // 更新筛选条件
    updateSelectPartInfo(newVal: inf_selectPartInfo) {
      this.selectPartInfo = { ...this.selectPartInfo, ...newVal };
    },
    // 更新展开
    updateAllOpen(newVal: boolean) {
      this.allOpen = newVal;
    },
  },
});
