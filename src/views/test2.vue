<template>
  <div class="cart">
    <div class="cart-musics">
      <ul class="cart-musics-ul">
        <li class="last-page text-tblr-center" v-show="page > last_page&&!dataShow">没有更多了</li>
        <li class="last-page text-tblr-center" v-show="dataShow">加载中</li>
        <li class="musics-ul-li" v-for="(item, index) in cartMusics" :key="index">
          {{item}}
        </li>
        
      </ul>
    </div>
  </div>
</template>
 
<script>
export default {
  data () {
    return {
      cartMusics: [],
      page: 1,
      last_page: 10,
      scrollBottom: null,
      dataShow:false,
    }
  },
  watch: {
    // 这里监听 scrollBottom 等于0 触发获取数据的方法 否则不触发
    scrollBottom (val) {
      // console.log('我是watch监听的距离底部的距离', val)
      // if (val !== 0) return false
      // this.page++
      // // 判断当前页数大于最后一页 return false 加载完毕
      // if (this.page > this.last_page)  return false
      // console.log(this.page)
      // this.getCartMusics()
      console.log(val)
      if(val == 0){
        this.page++
        if (this.page <= this.last_page){
          this.getCartMusics()
          document.querySelector('.cart-musics-ul').scrollTop = 480
        }
        
      }else{
        return false
      }
      
    }
  },
  created(){
    this.getCartMusics()
  },
  mounted () {
    // this.getCartMusics()
    // 首次加载页面的时候给列表元素添加 滚动的事件监听
    document.querySelector('.cart-musics-ul').addEventListener('scroll', this.hanleScroll, true)
    if(this.page==1){
      document.querySelector('.cart-musics-ul').scrollTop=document.querySelector('.cart-musics-ul').scrollHeight
    }
  },
  methods: {
    hanleScroll () {
      console.log('滚动条距离顶部的距离', document.querySelector('.cart-musics-ul').scrollTop)
      console.log('监听的元素的高度', document.querySelector('.cart-musics-ul').clientHeight)
      console.log('监听元素的滚动条的高度', document.querySelector('.cart-musics-ul').scrollHeight)
      this.scrollBottom = document.querySelector('.cart-musics-ul').scrollTop
      //this.scrollBottom = (document.querySelector('.cart-musics-ul').scrollHeight - document.querySelector('.cart-musics-ul').clientHeight) - document.querySelector('.cart-musics-ul').scrollTop
    },
    getCartMusics () {
      this.dataShow =true
      this.cartMusics = []
      // 这里获取数据可以自行添加loading
      // 获取数据的时候body超出隐藏 不会此时屏目禁止滑动
      // document.body.style.overflow = 'hidden'
      for(var i=0;i<(this.page*10);i++){
        this.cartMusics.push(i)
      }
      this.cartMusics.sort(function(a,b){return b-a})
      setTimeout(()=>{
        this.dataShow =false
      },2000)
      
      // 获取数据成功后设置body overflow为auto
      // document.body.style.overflow = 'auto'
    }
  },
  beforeDestroy () {
    // document.querySelector('.cart-musics-ul').removeEventListener('scroll', this.hanleScroll, true)
  }
}
</script>
 
<style  scoped>
.cart{
  padding-top: 50px;
  font-size: 12px;
}
.cart-musics{
  height: 500px;
}
.cart-musics-ul{
  overflow-y: scroll;
  height: 500px;
  
}
.musics-ul-li{
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  height: 80px;
}
</style>