/*
 * @Description: 
 * @Autor: bg
 * @Date: 2022-12-12 10:20:56
 * @LastEditors: bg
 * @LastEditTime: 2023-05-11 15:20:44
 */
import {RouteRecordRaw} from 'vue-router'
const routes:Array<RouteRecordRaw>=[
    {
        path:'/',
        name:'home',
        meta: {
			title: '经营分析'
		},
        component:()=>import('@/view/home/index.vue')
    },
]

export default routes