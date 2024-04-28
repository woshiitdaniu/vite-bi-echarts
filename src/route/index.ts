/*
 * @Description:
 * @Autor: Bg
 * @Date: 2022-12-12 10:30:42
 * @LastEditors: Bg
 * @LastEditTime: 2022-12-12 10:46:42
 */
import { createRouter, createWebHashHistory } from "vue-router";
import routes from "./routeList";
import routeSafe from "./routeSafe";
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.afterEach(() => {
  window.scrollTo(0, 0);
});
export default routeSafe(router);
