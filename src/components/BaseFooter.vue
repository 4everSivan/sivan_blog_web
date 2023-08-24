<template>
  <el-footer class="me-area" height="100px">
    <div>
      <img class="foot-head" :src="myHead">
    </div>
    <div class="me-footer">
      <p>
        Designed by
        <strong>
          <router-link to="/" class="me-login-design-color">sivan_819</router-link>
        </strong>
      </p>
      <small><p>本网站已经运行：<strong class="me-login-design-color">{{days}}</strong>天</p></small>
    </div>

    <div class="me-message">
      <small>
        <a href="https://beian.miit.gov.cn">湘ICP备2022007011号</a>
      </small>
    </div>

  </el-footer>

</template>
<script>
import myHead from '@/assets/img/logo.png'
  export default {
    name: 'BaseFooter',
    data() {
      return {
        poemVerse:{},
        days:0,
        myHead:myHead,
      }
    },
    methods: {
      runDays(){
        var s1 = '2022-03-19';//设置为你的建站时间
        s1 = new Date(s1.replace(/-/g, "/"));
        var s2 = new Date();
        var days = s2.getTime() - s1.getTime();
        var number_of_days = parseInt(days / (1000 * 60 * 60 * 24));
        this.days = number_of_days;
      }
    },
    created() {
      this.runDays();
    }
  }
</script>
<style scoped>

  .el-footer {
    min-width: 100%;
    box-shadow: 0 -2px 3px hsla(0, 0%, 7%, .1), 0 0 0 1px hsla(0, 0%, 7%, .1);
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1024;
  }

  .me-footer {
    /*text-align: center;*/
    padding-top: 20px;
    line-height: 30px;
    font-family: 'Open Sans', sans-serif;
    font-size: 18px;
    float: left;
    margin-left: 30px;
  }

  .me-message{
    padding-top: 20px;
    line-height: 30px;
    font-family: 'Open Sans', sans-serif;
    font-size: 18px;
    float: right;
    margin-top: 35px;
    margin-right: 10px;
  }

  .me-message a {
    color: #5FB878;
    border-bottom: 2px solid;
  }

  .me-message a:hover {
    color: #579572;
  }

  .me-login-design-color {
    color: #5FB878 !important;
  }

  .foot-head {
    margin-left: 20px;
    margin-top: 20px;
    width: 60px;
    height: 60px;
    vertical-align: middle;
    border-radius: 50%;
    float: left;
  }
</style>
