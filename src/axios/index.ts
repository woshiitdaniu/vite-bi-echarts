/*
 * @Description:
 * @Autor: Bg
 * @Date: 2022-12-12 10:56:39
 * @LastEditors: Bg
 * @LastEditTime: 2024-04-26 16:09:23
 */
import axios from "axios";
import { showToast } from "@nutui/nutui";
import { AXIOS_DEFALUT_CONF } from "./config";
import { useLogin } from "@/store/login";
const instance = axios.create({
  baseURL: AXIOS_DEFALUT_CONF.baseURL,
  timeout: AXIOS_DEFALUT_CONF.timeout,
  headers: { "X-Custom-Header": "foobar" },
  // proxy: {
  //     protocol: 'https',
  //     host: '127.0.0.1',
  //     port: 9000
  //   },
});
// 添加请求拦截器
instance.interceptors.request.use(
  function (config: any) {
    // 在发送请求之前做些什么
    try {
      const token = JSON.parse(localStorage.getItem("tk") || "{}");
      // 只有非登录接口才需要拿token
      if (
        token &&
        JSON.stringify(token) !== "{}" &&
        config.url.indexOf("authenticate") === -1
      ) {
        config.headers["Authorization"] = "Bearer " + token.jwt; // 让每个请求携带自定义 token 请根据实际情况自行修改
      }
      return config;
    } catch (error) {
      return config;
    }
  },
  function (error) {
    // 对请求错误做些什么
    alert("请求失败:" + error.message);
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (error.response.status == 401) {
      localStorage.clear();
      // alert("您登录已过期,请重新进入系统!");
      const lgStore = useLogin();
      lgStore.login(() => {
        location.reload();
      });
      return;
    } else {
      alert("请求失败:" + error.response.data.detail);
    }
    
    return Promise.reject(error);
  }
);

// 导出实例 提供给api使用
export default instance;
