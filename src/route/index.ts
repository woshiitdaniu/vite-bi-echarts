/*
 * @Description:
 * @Autor: bg
 * @Date: 2022-12-12 10:30:42
 * @LastEditors: bg
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
