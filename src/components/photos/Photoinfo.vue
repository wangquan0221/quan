<template>
    <div class="photoinfo-container">
        <h3>{{photoinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间: {{photoinfo.add_time | dateFormat}}</span>
            <span>点击: {{photoinfo.click}}次</span>
        </p>
        <hr>

        <!-- 缩略图区域 -->
        <vue-preview :slides="list" @close="getThumbs"></vue-preview>
        <!-- 图片内容区域 -->
        <div class="content" v-html="photoinfo.content"></div>

        <!-- 放置一个现成的 评论子组件 -->
        <cmt-box :id=id></cmt-box>
    </div>
</template>

<script>
// 1.导入评论子组件
import comment from '../subcomponents/comment.vue'

export default {
    data(){
        return{
          id:this.$route.params.id,
          photoinfo:{},  // 图片详情
          list: [] // 缩略图的数组
        }
    },
    created(){
        this.getPhotoInfo();
        this.getThumbs();
    },
    methods:{
        getPhotoInfo(){
            this.$http.get("http://www.liulongbin.top:3005/api/getimageInfo/" + this.id).then(result => {
                // console.log(result);
                if(result.data.status === 0){
                    this.photoinfo = result.data.message[0]
                }
            })
        },
        getThumbs(){
            // 获取缩略图
            this.$http.get("http://www.liulongbin.top:3005/api/getthumimages/" +this.id).then(result => {
                // console.log(result);
                result.data.message.forEach(item => {
                    item.msrc = item.src;
                    item.w = 600;
                    item.h = 400;
                });
                this.list =  result.data.message;
            })
        },
    },
    components:{
        // 注册评论子组件
        'cmt-box' : comment
    }
}
</script>

<style lang="less">
.photoinfo-container{
    padding: 3px;
    h3{
        color: #26A2ff;
        font-size: 15px;
        text-align: center;
        margin: 15px 0 ;
    }
    .subtitle{
        display: flex;
        justify-content: space-between;
        font-size:13px; 
    }
    .content{
        font-size: 13px;
        line-height: 30px;
    }
    .my-gallery{
        img{
            width: 150px;
            height: 150px;
            margin: 0;
            display: block;
            margin: 3px;
            box-shadow: 0 0 3px #999;

        }
        figure{
            display: inline-block;
        margin: 0;

        }
    }
}
</style>

