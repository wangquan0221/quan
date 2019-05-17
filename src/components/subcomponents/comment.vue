<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要BB的内容" maxlength="120" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

            <div class="cmt-list">
                <div class="cmt-item" v-for="(item,i) in comments" :key="item.add_time">
                    <div class="cmt-title">
                        第{{ i+1 }}楼&nbsp;&nbsp;用户:{{ item.user_name}}&nbsp;&nbsp; 发表时间: {{item.add_time | dateFormat}}
                    </div>
                    <div class="cmt-body">
                        {{item.content === 'undefined' ? '此用户很懒,什么都没有留下':item.content}}
                    </div>

                </div>
            </div>

        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>

    </div>
</template>

<script>
import { Toast } from 'mint-ui';

export default {
    data(){
        return{
            pageIndex : 1, //默认展示第一页数据
            comments:[], // 所有的评论数据
            msg: "" //评论输入的内容
        }
    },
    created(){
        this.getComments()
    },
    methods:{
        // 获取评论
        getComments(){
            this.$http.get('http://www.liulongbin.top:3005/api/getcomments/'+this.id+'?pageindex='+this.pageIndex).then(result => {
                // console.log(result);
                if(result.data.status === 0){
                    // this.comments = result.data.message;
                    // 获取新评论
                    this.comments = this.comments.concat( result.data.message)
                }
            })
        },
        // 加载更多
        getMore(){
            this.pageIndex++;
            this.getComments();
        },
        // 发表评论
        postComment(){
            if(this.msg.trim().length ===0 ){
                return Toast("评论内容不能为空")
            }
            // console.log(this.msg);
            this.$http
            .post("http://www.liulongbin.top:3005/api/postcomment/" + this.$route.params.id ,{ content:this.msg.trim() })
            .then( result => {
                // console.log(result);                
                if(result.data.status === 0){
                    var cmt = { 
                    user_name: "金城武", 
                    add_time: Date.now(),
                    content:this.msg.trim()
                    }
                    this.comments.unshift(cmt);
                    this.msg = "";
                }
            })
        } 
    },
    props:["id"]
}
</script>

<style lang="less" scoped>
.cmt-container{
    h3{
        font-size: 18px;
    }
    textarea{
        font-size: 14px;
        height: 80px;
        margin-bottom: 0px;
    }
    .cmt-list{
        margin: 8px 0;
        .cmt-item{
            font-size: 13px;
            .cmt-title{
                line-height: 30px;
                background-color: #ccc;
            }
            .cmt-body{
                line-height: 30px;
                text-indent: 2em;
            }
        }
    }
}
</style>

