import upImg from "@/assets/up.png";
import downImg from "@/assets/down.png";
export const handleImg = (rate: any) => {
  return (rate || "").indexOf("-") > -1 ? downImg : upImg;
};

export const getCurrentTime = () => {
  let time = new Date();
  let year = time.getFullYear();
  let month = time.getMonth() + 1;
  let day = time.getDate();
  let hour = time.getHours();
  let minute = time.getMinutes();
  let timeStr = `${year}-${month}-${day} ${hour}:${minute}`;
  return timeStr;
};
// 根据类名获取html元素
export const getElByclassName = (className: string): HTMLElement => {
  return document.getElementsByClassName(className)[0] as HTMLElement;
};
