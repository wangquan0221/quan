<template>
    <!-- 轮播图 -->
        <div>
            <mt-swipe :auto="4000">
                <mt-swipe-item v-for="item in lunboList" :key="item.id">
                    <img :src="item.img" alt="" :class="{'full':isfull}">
                </mt-swipe-item>
            </mt-swipe>
        </div>
    <!-- 解决轮播图宽度问题 -->
    <!-- 首页中的图片，它的宽和高，使用了 100% 的尺寸  -->
    <!-- 在商品详情页面中，轮播图的图片，如果也使用宽高 为100%的化，页面不好看 -->
    <!-- 既然这两个轮播图，其他方面是没有冲突的，只是宽度有分歧，那么我们可以定义一个属性，让使用轮播图的调用者，手动指定是否为 100% 的宽度 -->

</template>

<script>
export default {
    props:["lunboList","isfull"]
}
</script>

<style lang="less" scoped>
.mint-swipe{
    height: 200px;
    .mint-swipe-item{
        text-align: center;
        >img{
            // display: inline-block;
            height: 100%;
            // width: 100%;
        }
    }
}
.full{
    width: 100%;

}
</style>

