// 入口文件
import Vue from 'vue'

// 导入 axios
import axios from 'axios'
Vue.prototype.$http = axios

// 1.1 导入路由的包
import VueRouter from 'vue-router'
// 1.2 安装路由
Vue.use(VueRouter)

// 注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)

// 每次进入网站，肯定会调用 main.js 在刚调用的时候，先从本地存储中，把购物车的数据读出来，放到 store中；
var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
    state:{ // this.$store.state.***
        car:car // 将购物车中的商品的数据，用一个数组存储起来，在car 数组中，存储一些商品的对象
        //{id:商品的id，count:要购买的数量，price：商品的单价，selected:false}
    },
    mutations:{ // this.$store.commit("方法名"，"按需传递唯一的参数")
        addToCar(state,goodsinfo){
            // 假设在购物车中，没有找到对应的商品
            var flag = false;

            // 点击加入购物车，把商品信息，保存到 store 中的 car里
            state.car.some(item => {
                if(item.id==goodsinfo.id){
                    item.count += parseInt(goodsinfo.count)
                    flag = true;
                    return true
                }
            })
            // 如果最终循环完毕， 得到的 flag 还是false，则把商品数据直接push到购物车中
            if(!flag){
                state.car.push(goodsinfo)
            }
            // 当更新 car 之后， 把car数组，存储到 本地的 localStorage中
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        // 修改购物车中商品的数量值
        updateGoodsInfo(state,goodsinfo){ 
            state.car.some( item => {
                if( item.id == goodsinfo.id){
                    item.count = parseInt(goodsinfo.count)
                    return true
                }
            })
            // 当修改完商品的数量，把最新的购物车数据保存到 本地存储中
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        // 根据id，从store中的购物车中删除对应的那条商品数据
        removeFormCar(state, id){
            state.car.some((item, i) => {
                if(item.id == id){
                    state.car.splice(i, 1)
                    return true
                }
            })
            // 将删除完毕后，把最新购物车里的数量，保存到 本地存储中
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        updataGoodsSelected(state, info){
            state.car.some(item => {
                if(item.id == info.id){
                    item.selected = info.selected
                }
            })
            // 把最新的 所有购物车商品的状态保存到 store中去
            localStorage.setItem('car',JSON.stringify(state.car))
        }

    },
    getters:{ // this.$store.getters.***
        // 相当于 计算属性，也相当于 filters
        getAllCount(state){
            var c = 0;
            state.car.forEach(item => {
                c += item.count
            })
            return c
        },
        getGOodsCount(state){
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.count
            })
            return o
        },
        getGoodsSelected(state){
            var o = {}
            state.car.forEach( item => {
                o[item.id] = item.selected
            })
            return o
        },
        getGoodsCountAndAmount(state){
            var o = {
                count:0, // 勾选的数量
                amount:0   // 勾选的总价
            }
            state.car.forEach( item =>{ 
                if(item.selected){
                    o.count += item.count
                    o.amount += item.prcie * item.count
                   
                }
            })
            return o
        }
    }
})

// 导入格式化时间的插件
import moment from 'moment'

// 定义全局的过滤器
Vue.filter('dateFormat',function(dataStr,pattern="YYYY-MM-DD HH:mm:ss"){
    return moment(dataStr).format(pattern)
})

// 导入mui样式表
import "./assets/mui/css/mui.css"
// 导入 mui 扩展图标css样式
import "./assets/mui/css/icons-extra.css"

// 按需导入Mint UI组件
// import { Header , Swipe , SwipeItem, Button ,Toast ,Lazyload} from 'mint-ui';
// Vue.component(Header.name, Header); // 头部组件
// Vue.component(Swipe.name, Swipe);   // 轮播图组件
// Vue.component(SwipeItem.name, SwipeItem); //轮播图组件
// Vue.component(Button.name, Button); //按钮组件
// Vue.component(Toast.name, Toast); //弹框组件
// Vue.use(Lazyload);    // 引入懒加载

// 完整引入Mint UI组件
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

// 安装 图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)
  
// 导入 App 根组件
import app from './App.vue'

// 导入自己的 router.js 路由模块
import router from './router.js'

var vm = new Vue({
    el:"#app",
    // render 会把 el指定的容器中, 所有的内容都清空覆盖, 所以不要把路由的 router-view 和 router-link 直接写到 el 所控制的元素中 ,也就是当前index.html里的app盒子里, 因为render会清空覆盖;
    render:  c => c(app),
    // 4. 将路由对象挂载到 vm 上
    router:router,
    store // 挂载 store 状态管理对象
})

// 注意: App 这个组件, 是通过vm 实例的render函数, 渲染出来的, render 函数如果要渲染组件, 渲染出来的组件, 只能放到el:"#app"所指定的元素中;
// Account 和 GoodsList 组件, 是通过路由匹配监听到的,所以这两个组件,只能展示到路由的<router-view></router-view> 中去;