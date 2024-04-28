/*
 * @Description: 
 * @Autor: Bg
 * @Date: 2022-12-13 16:34:51
 * @LastEditors: Bg
 * @LastEditTime: 2022-12-13 17:35:17
 */
import {defineComponent}from 'vue'
import './index.less'
// 文件引入、类型声明、接口等都写在defineComponent 外面

const OverLayProps ={
    show: {
        type: Boolean,
        default:true
    },
}
export default defineComponent({
    name:"OverLay",
    // 这里显示声明有哪些emit
    emits:['close'],
    props:OverLayProps,
    setup(props, {emit}) {
        const close = ()=>emit('close')
        // 在这里拆分组件内容
        const renderOverLay = ()=>{
            return (
                <div class="overlay" style={props.show ? 'opacity:1;' : ''} onClick={close}></div>
            )
        }
        // 注意 这里一定要返回一个函数
        return ()=>(
            renderOverLay()
        )
        
    }
})