<template>
    <div>
        <!-- 顶部滑动条区 -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item',item.id == 0 ? 'mui-active' : '']" v-for="item in cates" :key="item.id" @tap="getPhotoListByCateId(item.id)"> 
                        {{item.title}}
                    </a>
                </div>
            </div>
        </div>

        <!-- 图片列表区域 -->
        <ul class="photo-list">
            <router-link :to="'/home/photoinfo/' + item.id"  v-for="item in list" :key="item.id" tag="li">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="title">{{item.title}} </h1>
                    <div class="body">{{item.zhaiyao}}</div>
                </div>
            </router-link>
        </ul>
    </div>    
</template>

<script>
// 1.导入mui 的js文件
import mui from '../../assets/mui/js/mui.min.js'


export default {
    data(){
        return{
            cates: [], // 所有分类的列表数组
            list: [] // 图片列表的数据
        }
    },
    mounted(){
        // 2. 初始化scroll控件
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    created(){
        this.getAllCategory();
        this.getPhotoListByCateId(0);
    },
    methods:{
        getAllCategory(){
            // 获取所有的图片分类
            this.$http.get("http://www.liulongbin.top:3005/api/getimgcategory").then(result => {
                // console.log(result);         
                if(result.data.status === 0){
                    // 手动拼接出一个最完整的分类列表
                    result.data.message.unshift({ title: "全部", id: 0})
                    this.cates = result.data.message
                }
                
            })
        },
        getPhotoListByCateId(cateId){
            // 根据分类 Id , 获取图片列表
            this.$http.get("http://www.liulongbin.top:3005/api/getimages/" + cateId).then(result => {
                // console.log(result);
                if(result.data.status===0){
                    this.list = result.data.message
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
    *{
        touch-action: pan-y;
    }

    .photo-list{
        list-style: none;
        padding: 10px;
        margin: 0;
        padding-bottom: 0;
        li{
            background-color: #ccc;
            text-align: center;
            margin-bottom: 10px;
            box-shadow: 0 0 6px #999;
            position: relative;
            img{
                width: 100%;
                display: block;
            }
            img[lazy=loading] {
                    width: 40px;
                    height: 300px;
                    margin: auto;
                }
            .info{
                color: white;
                text-align: left;
                position:absolute;
                bottom: 0;
                background-color:rgba(0 , 0, 0 ,.4);
                max-height: 84px;
                .title{
                    font-size: 14px;
                }
                .body{
                    font-size: 13px;
                }
            }
        }
    }

    
</style>


