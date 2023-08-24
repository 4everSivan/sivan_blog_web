<template>
  <el-card>
<!--    <img class="me-author-head" :src="myHead">-->
    <h1 class="me-author-name">Sivan</h1>
    <div class="me-author-description">
      <span class="me-icon-location"><i class="el-icon-location-outline"></i>湖南&长沙</span>
      <span class="me-icon-job"><i class="iconfont icon-wode"></i>湖南财政经济学院</span>
    </div>
    <div class="me-author-tool">
      <a href="https://weibo.com/"> <i class="iconfont icon-weibo"></i></a>
      <a href="https://blog.csdn.net/qq_45445874"><i class="iconfont icon-csdn"></i></a>
      <a href="https://github.com/"> <i class="iconfont icon-github"></i></a>
      <a href="https://web.wechat.com/"><i class="iconfont icon-wechat"></i> </a>
    </div>
  </el-card>

</template>

<script>
 import myHead from '@/assets/img/logo.png'
  export default {
    name: 'CardMe',
    data() {
      return {
        myHead:myHead
      }
    },
    methods: {

    }
  }
</script>

<style scoped>
  .me-author-name {
    /*margin-top: -50px;*/
    /*padding-left: 20px;*/
    padding-bottom: 10px;
    text-align: center;
    font-size: 30px;
    border-bottom: 1px solid #5FB878;
  }

  .me-author-description {
    padding: 8px 0;
  }

  .me-icon-job {
    padding-left: 20px;
    float: right;
  }

  .me-author-tool {
    text-align: center;
    padding-top: 10px;
  }

  .me-author-tool i {
    cursor: pointer;
    padding: 4px 10px;
    font-size: 30px;
  }

  .me-author-head {
    z-index: 5;
    position: absolute;
    margin-left: 20px;
    width: 60px;
    height: 60px;
    vertical-align: middle;
    border-radius: 50%;
  }

  a {
    color: #2c5242;
  }

  a:hover {
    color: #5fb878;
  }

</style>
