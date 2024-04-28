/*
 * @Description:
 * @Autor: Bg
 * @Date: 2022-12-12 10:43:49
 * @LastEditors: Bg
 * @LastEditTime: 2024-04-23 09:36:51
 */
import { Router } from "vue-router";
import { useLogin } from "@/store/login";
const routeSafe = (router: Router) => {
  /* 
    路由守卫  每次切换url都会触发 哪怕是本身
    这里仅做了登录处理
  */
  router.beforeEach((to, from, next) => {
    // 增加埋点接口 切换
    // 判断是否登录过 通过jwt是否为null
    // const tkJosn = JSON.parse(localStorage.getItem("tk") || "{}");
    // const haveJwt = "jwt" in tkJosn;
    // if (!haveJwt) {
      // const lgStore = useLogin();
      // lgStore.login(() => {
      //   next();
      // });
    // } else {
    //   next();
    // }
    next();
  });
  return router;
};

export default routeSafe;
