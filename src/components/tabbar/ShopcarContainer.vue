<template>
    <div class="shopcar-container">
        <!-- 商品列表区域  -->
        <div class="goods-list">
            <div class="mui-card" v-for="(item, i) in goodlist" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch 
                        v-model="$store.getters.getGoodsSelected[item.id]"
                        @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])">
                        </mt-switch>
                        <img :src="item.thumb_path" alt="">
                        <div class="info">
                            <h1>{{item.title}}</h1>
                            <p>
                                <span class="price">￥{{item.sell_price}}</span>
                                <numbox :initcount="$store.getters.getGOodsCount[item.id]" :goodsid="item.id"></numbox>
                                <!-- 得从购物车中获取商品的数量 -->
                                <!-- 1.我们可以创建一个空对象，然后循环购物车中所有商品的数据，把当前循环这条商品的 Id,作为对象的属性名，count值作为对象的属性值，当把所有的商品循环一遍，就会得到一个对象：{ 88:2,89:1} -->
                                <a href="#" @click.prevent="remove(item.id, i)">删除</a>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <!-- 结算区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan">
                    <div class="left">
                        <p>总计（不含运费）</p>
                        <p>已勾选商品 <span class="red">{{ $store.getters.getGoodsCountAndAmount.count}}</span> 件，总价 <span class="red">￥{{ $store.getters.getGoodsCountAndAmount.amount}}</span></p>
                    </div>
                <mt-button type="danger">去结算</mt-button>

                </div>
            </div>
        </div>

        <p>{{ $store.getters.getGoodsSelected}}</p>

    </div>
</template>

<script>
import numbox from "../subcomponents/shopcar_numbox.vue"
import { log } from 'util';
export default {
    data(){
        return{
            goodlist: [] // 购物车中所有商品的数据
        }
    },
    created(){
        this.getGoodsList()
    },
    methods:{
        getGoodsList(){
            var idArr=[]
            this.$store.state.car.forEach(item =>idArr.push(item.id));
            // 如果购物车中没有商品，则直接返回，不需要请求数据接口，否则会报错
            if(idArr.length <= 0){
                return;
            }
            // 获取购物车商品列表
            this.$http.get("http://www.liulongbin.top:3005/api/goods/getshopcarlist/"+idArr.join(",")).then(result => {
                if(result.data.status === 0){
                    this.goodlist = result.data.message;
                }
            }); 
        }, 
        remove(id,index){
            // 点击删除，把商品从 store中根据传递的 ID 删除，同时把当前组件中的goodslist中对应要删除的那个商品，使用index来删除
            this.goodlist.splice(index,1)
            this.$store.commit("removeFormCar", id)
        },
        selectedChanged(id,val){
            // 每当点击开关， 把最新的 开关状态， 同步到 store中
            this.$store.commit('updataGoodsSelected',{id , selected : val})
        },
    },
    
    components:{
        numbox 
    }
}
</script>

<style lang="less" scoped>
.shopcar-container{
    background-color: #eee;
    overflow: hidden;
    .goods-list{
        .mui-card-content-inner{
            display: flex;
            align-items: center;
        }
        img{
            width: 60px;
            height: 60px;
        }
        h1{
            font-size: 13px;
        }
        .info{
            // display: flex;
            // flex-direction: column;
            // justify-content: space-between;
            .price{
                color: red;
                font-weight: bold;
            }
        }
        
    }
    .jiesuan{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .red{
            color: red;
            font-weight: bold;
            font-size: 16px;
        }
    }
}
</style>


