<template>
    <div> 
        
        <swiper :lunboList="lunboList" :isfull="true"></swiper>
        
        <!-- 六宫格 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
                    <img src="../../images/menu1.png" alt="">
                    <div class="mui-media-body">新闻资讯</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
                    <img src="../../images/menu2.png" alt="">                    
                    <div class="mui-media-body">图片分享</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
                    <img src="../../images/menu3.png" alt="">
                    <div class="mui-media-body">商品购买</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/menu4.png" alt="">
                    <div class="mui-media-body">留言反馈</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/menu5.png" alt="">
                    <div class="mui-media-body">视频专区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../images/menu6.png" alt="">                    
                    <div class="mui-media-body">联系我们</div></a>
            </li>
        </ul> 
    </div>
</template>

<script>
// 导入轮播图组件
import swiper from '../subcomponents/swiper.vue'

export default {
    data(){
        return{
            lunboList:[]
        }
    },
    created(){
        this.getLunbo()
    },
    methods:{
        getLunbo(){
            this.$http.get("http://www.liulongbin.top:3005/api/getlunbo").then((result)=>{
                // console.log(result);
                if(result.status===200 && result.data.status===0){
                    this.lunboList = result.data.message
                }
            })
        }
    },
    components:{
        swiper:swiper
    }
}
</script>

<style lang="less" scoped>
    body{
        
        .mui-grid-view.mui-grid-9{          
            background-color: #fff;
            .mui-table-view-cell{
                border: none;
            }
            img{
                width: 60px;
                height: 50%;
            }
            .mui-media-body{
                font-size: 13px;
            }          
        }
    }
</style>

