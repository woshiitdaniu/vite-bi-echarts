/*
 * @Description: 
 * @Autor: bg
 * @Date: 2022-12-12 11:09:17
 * @LastEditors: bg
 * @LastEditTime: 2024-04-29 10:00:47
 */
import axios from '@/axios'


export const PageAccessRecord=(data:any)=>{
    return axios({
        url:'mes/mock/PageAccessRecord/info',
        method:'POST',
        data
    })
}
export const getMenuByRight=(data:any)=>{
    return axios({
        url:'organization/mock/user/bi/menu',
        method:'POST',
        data:{}
    })
}
