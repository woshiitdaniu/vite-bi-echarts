import { COMP_TYPE, PART_TYPE } from "@/config/const";
import { useHomeConfig } from "@/store/home/index";

const store = useHomeConfig();


export const updataCurrentAndSelectPartInfoHook = (partItem:{label:string,value:any})=>{
    // 更新当前部门
  store.updateCurrentPartInfo({ name: partItem.value, code: partItem.label });

  let selectInfo =
    partItem.label == PART_TYPE["o集团"]
      ? {
          organizationCode: partItem.label,
          organizationCodes: [
            COMP_TYPE["深o"],
            COMP_TYPE["华o创展"],
            COMP_TYPE["or"],
          ],
          organizationNames: ["深o", "华o创展", "or"],
        }
      : {
          organizationCode: partItem.label,
          organizationCodes: [],
          organizationNames: [],
        };
  // 更新请求参数
  store.updateSelectPartInfo(selectInfo);

}