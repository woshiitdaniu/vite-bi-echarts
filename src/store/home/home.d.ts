/*
 * @Description:
 * @Autor: Bingo
 * @Date: 2024-04-25 13:59:06
 * @LastEditors: Bingo
 * @LastEditTime: 2024-04-25 14:07:51
 */
export interface inf_currentPartInfo {
  name: string;
  code: string;
}

export interface inf_selectPartInfo {
  month: string | number;
  option: string;
  optionName: string;
  organizationCode?: string;
  year: string | number;
  optionName: string;
  organizationCodes: Array<string | number>;
  organizationNames: Array<string | number>;
  unit?: string;
}
