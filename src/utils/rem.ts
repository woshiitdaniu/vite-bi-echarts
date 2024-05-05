/*
 * @Description:
 * @Autor: Bingo
 * @Date: 2022-12-13 09:25:59
 * @LastEditors: Bingo
 * @LastEditTime: 2022-12-13 09:31:11
 */
// 750设计稿  量到多少就除于50 就转成了rem
export const remSize = () => {
  let screenWidth =
    window.document.documentElement.clientWidth || window.innerWidth;
  if (screenWidth > 750) {
    screenWidth = 750;
  }
  if (screenWidth < 320) {
    screenWidth = 320;
  }
  document.documentElement.style.fontSize = screenWidth / 7.5 + "px";
};
remSize();
