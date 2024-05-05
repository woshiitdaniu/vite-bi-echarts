/*
 * @Description: 
 * @Autor: Bingo
 * @Date: 2022-12-12 11:09:17
 * @LastEditors: Bingo
 * @LastEditTime: 2023-09-01 11:31:24
 */
import axios from '@/axios'

// 这个接口会自带cookier到后台进行校验
export const toLogin=()=>{
    return axios({
        url:'/organization/api/authenticate',
    })
}


