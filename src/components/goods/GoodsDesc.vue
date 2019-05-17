<template>
    <div class="goodsdesc-container">
        <h3>{{info.title}}</h3>

        <hr>

        <div class="content" v-html="info.content"></div>
    </div> 

</template>


<script>
export default {
    data(){
        return{
            // 图文数据
            info:{}
        }
    },
    created(){
        this.getGoodsDesc()
    },
    methods:{
        getGoodsDesc(){
            this.$http.get("http://www.liulongbin.top:3005/api/goods/getdesc/" + this.$route.params.id).then(result => {
                // console.log(result);
                if(result.data.status===0){
                    this.info = result.data.message[0]
                }
            })
        }
    }
}
</script>

<style lang="less" >
.goodsdesc-container{
        padding: 4px;

    h3{
        font-size: 16px;
        color: skyblue;
        text-align:center;
        padding: 15px ;
    }
    .content{
        img{
            width: 100%;
        }
    }
    
}
</style>
