/*
 * @Description:
 * @Autor: Bingo
 * @Date: 2022-12-12 10:43:49
 * @LastEditors: Bingo
 * @LastEditTime: 2024-04-29 16:05:18
 */
import { Router } from "vue-router";
import { useLogin } from "@/store/login";
const routeSafe = (router: Router) => {
  /* 
    路由守卫  每次切换url都会触发 哪怕是本身
    这里仅做了登录处理
  */
  router.beforeEach((to, from, next) => {
    const lgStore = useLogin();
    lgStore.login(() => {
      next();
    });
    // next();
  });
  return router;
};

export default routeSafe;
