/*
 * @Description: 
 * @Autor: Bg
 * @Date: 2022-12-12 11:09:17
 * @LastEditors: Bg
 * @LastEditTime: 2023-02-02 11:05:59
 */
import axios from '@/axios'


export const PageAccessRecord=(data:any)=>{
    return axios({
        url:'mes/api/PageAccessRecord/info',
        method:'POST',
        data
    })
}