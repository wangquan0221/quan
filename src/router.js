// 导入 vue-router 包
import VueRouter from 'vue-router' 

// 导入对应的路由组件
import Home from './components/tabbar/HomeContainer.vue'
import Menber from './components/tabbar/MenberContainer.vue'
import Search from './components/tabbar/SearchContainer.vue'
import Shopcar from './components/tabbar/ShopcarContainer.vue'
import NewsList from './components/news/NewsList.vue'
import Newsinfo from './components/news/Newsinfo.vue'
import PhotoList from './components/photos/PhotoList.vue' //图片列表
import Photoinfo from './components/photos/Photoinfo.vue'
import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'
import GoodsDesc from './components/goods/GoodsDesc.vue'
import GoodsComment from './components/goods/GoodsComment.vue'

// 3. 创建路由对象
var router = new VueRouter({
    routes:[
        { path: '/',redirect:'/home'},
        { path: '/home',component: Home},
        { path: '/menber',component: Menber},
        { path: '/search',component: Search},
        { path: '/shopcar',component: Shopcar},
        { path: '/home/newslist',component: NewsList},
        { path: '/home/newsinfo/:id',component: Newsinfo},
        { path: '/home/photolist', component: PhotoList},
        { path: '/home/photoinfo/:id',component: Photoinfo },
        { path: '/home/goodslist',component:GoodsList},
        { path: '/home/goodsinfo/:id',component:GoodsInfo, name:"goodsinfo"},
        { path: '/home/goodsdesc/:id',component:GoodsDesc, name:"goodsdesc"},
        { path: '/home/goodscomment/:id',component:GoodsComment, name:"goodscomment"},

    ],
    linkActiveClass:"mui-active" //覆盖默认的路由高亮的类
})

export default router