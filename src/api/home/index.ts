/*
 * @Description:
 * @Autor: Bg
 * @Date: 2022-12-12 11:09:17
 * @LastEditors: Bg
 * @LastEditTime: 2024-04-26 15:48:43
 */
import axios from "@/axios";
import { inf_selectPartInfo } from "@/store/home/home";

// 获取构成图各单位数据  查询本月/本季度/年度的指标组成情况
export const apiGetTreePartsData = (data: inf_selectPartInfo) => {
  return axios({
    url: "/business/api/busiManageV1/data/compose",
    method: "post",
    data,
  });
};
// 获取头部卡片数据  查询本季度或者本年度或某年某月经营情况数据(单位为百万级别)
export const apiGetCardData = (data: inf_selectPartInfo) => {
  return axios({
    url: `/business/api/busiManageV1/dashBoard`,
    method: "POST",
    data,
  });
};

// 获取柱状图数据  查询近期12个月经营情况（五个展示表指标分析）数据
export const apiGetBarLineData = (data: inf_selectPartInfo) => {
  return axios({
    url: `/business/api/busiManageV1/indicator`,
    method: "POST",
    data,
  });
};

export const apiLinearData = (data: inf_selectPartInfo) => {
  return axios({
    url: `/business/api/busiManageV1/linearData`,
    method: "POST",
    data,
  });
};

// 其他事业部获取数据

// 获取构成图各单位数据
export const apiGetTreePartsDataUnit = (data: inf_selectPartInfo) => {
  return axios({
    url: "/business/api/busiManage/unit/data/compose",
    method: "post",
    data,
  });
};
// 获取头部卡片数据
export const apiGetCardDataUnit = (data: inf_selectPartInfo) => {
  return axios({
    url: `/business/api/busiManage/unit/dashBoard`,
    method: "POST",
    data,
  });
};

// 获取
export const getLinearDataUnit = (data: inf_selectPartInfo) => {
  return axios({
    url: `/business/api/busiManage/unit/linearData`,
    method: "POST",
    data,
  });
};
