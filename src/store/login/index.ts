/*
 * @Description:
 * @Autor: Bg
 * @Date: 2022-12-12 11:19:55
 * @LastEditors: Bg
 * @LastEditTime: 2024-04-22 17:34:10
 */
import { defineStore } from "pinia";
import { toLogin } from "@/api/login";
import { showToast } from "@nutui/nutui";
// AuthStore
export const useLogin = defineStore("Login", {
  state: (): any => {
    return {
      isLogin: false,
    };
  },
  //   这个getters就相当于computed 当我们修改了相关的state时 会再次进行运算
  getters: {},
  actions: {
    async login(callback: any) {
      toLogin()
        .then((res) => {
          // 登录成功后将登录信息存储在本地
          localStorage.setItem(
            "tk",
            JSON.stringify({
              jwt: res?.data?.jwt,
              recordTime: new Date().getTime(),
            })
          );
          this.isLogin = true;
          callback();
        })
        .catch((err) => {
          showToast.fail(err);
        });
    },
  },
});
