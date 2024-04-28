<!--
 * @Description: 
 * @Autor: Bg
 * @Date: 2022-12-12 09:48:36
 * @LastEditors: Bg
 * @LastEditTime: 2022-12-14 11:13:44
-->
# tsconfig.json 要想能跳入指定页 必须要配置

"baseUrl": ".",
"paths": {
"@/_":["src/_"],
"comp":["src/components/*"],
"pinia/_":["src/pinia/_"]
}


#.cssrem文件 是配合px2rem 拓展使用  用于rem适配