/*
 * @Description:
 * @Autor: Bg
 * @Date: 2022-12-12 09:48:36
 * @LastEditors: Bg
 * @LastEditTime: 2024-04-26 10:52:11
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// 按需加载组件库

// jsx插件
import vueJsx from "@vitejs/plugin-vue-jsx";
// 这里需要下载types/nodes 声明
import { resolve } from "path";
import legacyPlugin from "@vitejs/plugin-legacy";
// https://vitejs.dev/config/
export default defineConfig({
  // 开启热更新
  server: {
    open: true,
    port: 8086, // 将此处的3000替换为您所需的端口号
  },
  plugins: [
    vue(),
    vueJsx(),
    legacyPlugin({
      targets: ["chrome 52"], // 需要兼容的目标列表，可以设置多个
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"], // 面向IE11时需要此插件
    }),
  ],
  resolve: {
    // 配置别名
    alias: [{ find: "@", replacement: resolve(__dirname, "src") }],
  },
  build: {
    assetsDir: "assets", // 指定生成静态文件目录
    target: ["chrome52"],
    cssTarget: ["chrome52"],
  },
  experimental: {
    renderBuiltUrl(
      filename: string,
      {
        hostId,
        hostType,
        type,
      }: {
        hostId: string;
        hostType: "js" | "css" | "html";
        type: "public" | "asset";
      }
    ) {
      if (type === "public") {
        return { relative: true };
      } else {
        return "/biVite/" + filename;
      }
    },
  },
});
