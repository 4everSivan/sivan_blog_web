<template>
  <div v-title :data-title="title">
    <el-card>
      <el-row>
        <el-col :span="68" class="log_head">
          <el-card :body-style="{ padding: '10px' }">
            <img :src="head" class="image">
            <div style="padding: 14px;">
              <h1 style="text-align: center">sivan</h1>
            </div>
          </el-card>
        </el-col>
        <div class="log_me">
          <h1 class="log_me_h1">关于我</h1>
          <P>“ 陆上的人喜欢寻根问底，虚度了大好光阴。冬天忧虑夏天的姗姗</P>
          <P> 姗姗来迟，夏天则担心冬天的`将至。所以他们不停四处游走，追</P>
          <p> 求一个遥不可及、四季如夏的地方—我并不羡慕。”</p>
          <br>
          <br>
          <hr>
        </div>
      </el-row>
      <img :src="code" class="log_pic">
      <div class="log_article">
        <br>
        <P>我是Sivan,一名从服务器运维转Java开发的新人，会的不多但一直在路上，人生</P>
        <p>也本应如此，这是我的第一个项目，在这个项目中遇到的问题也是前所未有的多，</p>
        <p>断断续续也做到了现在这个样子。尽管仍有很多不足，好歹还是能够看的样子啦。</p>
        <P>我也会不断对我的博客进行更新维护，至少现在还不是我最满意的结果，我会不</P>
        <P>断努力，加快那一天的到来。</P>
        <br>
        <br>
        <br>
      </div>
    </el-card>
  </div>
</template>

<script>
import head from '@/assets/img/logo.png'
import code from '@/assets/img/code.png'
  export default {
    name: 'Log',
    data() {
      return {
        currentDate: new Date(),
        head:head,
        code:code,
      }
    },
    computed: {
      title (){
        return '关于我'
      }
    },
  }
</script>

<style scoped>

  .log_me{
    float: left;
    margin-left: 20px;
  }
  .log_me_h1 {
    font-size: 20px;
    border-bottom: 3px solid #5fb878;
    width: 66px;
    margin-bottom: 30px;
    text-align: center;
  }
  .log_head {
    float: left;
  }
  .image{
    width: 100px;
    height: 100px;
    border-radius: 3px;
  }

  .log_pic {
    margin-top: 30px;
    width: 560px;
    border-radius: 5px;
    margin-left: 45px;
  }

  .log_article {
    margin-left: 47px;
  }
  .el-container {
    width: 700px;
  }

  .me-main {
    overflow: hidden;
  }

  .me-log-box {
    margin-left: 30%;
    margin-top: 20px;
  }

</style>
