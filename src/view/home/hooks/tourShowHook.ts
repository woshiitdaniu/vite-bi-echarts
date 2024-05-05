import { ref } from "vue";

export const TourShowHook = ()=>{
    let timeOut = 600;
    // 引导步骤条列表
    let stepList = [
        {
          content: "可以筛选时间、季度等条件",
          target: "tour5-1",
          location: "bottom-end",
        },
        {
          content: "点击这里可以展开所有指标卡片",
          target: "tour5-2",
        },
        {
          content: "点击这里可以收起所有指标卡片",
          target: "tour5-3",
          location: "top-end",
        },
        {
          content: "点击这里可以将文字字号放大",
          target: "tour5-4",
          location: "top-end",
        },
        {
          content: "点击这里可以将文字字号缩小",
          target: "tour5-5",
          location: "top-end",
        },
      ]

    const tourShow = ref(false);
    const steps = ref(stepList);
    
    setTimeout(()=>{
      let istourShow = localStorage.getItem('hasTourShow');
      if(!istourShow){
        tourShow.value = true
      }
    },timeOut);
    const handleTourFinsh = ()=>{
      tourShow.value = false;
      localStorage.setItem('hasTourShow', 'true')
    }
    return {
        tourShow,
        steps,
        handleTourFinsh
    }
}
