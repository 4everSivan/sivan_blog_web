<template>
<div v-title :data-title="title">
  <el-card>
        <el-row class="board_top">
          <h1>留言板</h1>
          <img class="board_head" :src="myMessageImg">
        </el-row>
        <el-row class="message-input">
          <el-input
            type="textarea"
            :rows="2"
            :placeholder="contentHolder"
            :autosize="{ minRows: 2, maxRows: 4}"
            resize="none"
            v-model="reply.content">
          </el-input>
          <span>关于你</span>
          <el-input
            placeholder="昵称.."
            v-model="reply.nickname"
            style="width: 150px;margin-top: 15px;margin-left: 10px"
            size="small">
          </el-input>
          <el-input
            placeholder="邮箱.."
            v-model="reply.email"
            style="width: 200px;margin-top: 15px;margin-left: 10px"
            size="small">
          </el-input>
          <el-button class="board_submit_button" @click="publishMessage()" type="text">留言</el-button>
        </el-row>
        <div class="message-title">
          <span> {{messages.length}}  条留言</span>
        </div>

        <div class="me-view-comment-item" v-for="(message) in messages">
          <div class="me-view-comment-author">
            <a>
              <img class="me-view-picture" :src="defaultAvatar" />
            </a>
            <div class="me-view-info">
              <span class="me-view-nickname">{{message.nickname}}</span>
              <div class="me-view-meta">
                <span> {{message.id}} 楼 &nbsp;&nbsp;</span>
                <span>{{message.createDate | formatDate}}</span>
              </div>
            </div>
          </div>
          <div>
            <p class="me-view-comment-content">{{message.content}}</p>
          </div>
        </div>
  </el-card>
</div>
</template>

<script>
import defaultAvatar from '@/assets/img/default_avatar.png'
import {listMessage,publishMessage} from '@/api/message'
import {formatDate} from '@/utils/filter'
  export default {
    name: 'MessageBoard',
    data() {
      return {
        contentHolder:"请输入你的留言...",
        myMessageImg:'http://img.sweetbabywow.club/messagImg.png',
        defaultAvatar:defaultAvatar,
        messages:[],
        reply: this.getEmptyReply()
      }
    },
    created() {
      this.getListMessage()
    },
    computed: {
      title (){
        return ' 留言板 '
      },
    },
    methods:{
      publishMessage() {
        let that = this
        if (!that.reply.content) {
          return;
        }
        publishMessage(that.reply).then(data => {
          if (data.success) {
            that.$message({type: 'success', message: '评论成功', showClose: true})
            this.getListMessage();
            this.reply.nickname = '';
            this.reply.email = '';
            this.reply.content = '';
          }else{
            that.$message({type: 'error', message: data.msg, showClose: true})
          }
        })
      },
      getEmptyReply() {
        return {
          nickname:'',
          content: '',
          email: ''
        }
      },
      getListMessage(){
        let that = this
        listMessage().then(data =>{
          if (data.success){
            that.messages = data.data
          }
        })
      }
    },
    // 过滤器
    filters:{
      // 日期转换器（毫秒值转年月日）
      formatDate(time){
        var data = new Date(time);
        return formatDate(data,'yyyy-MM-dd');
      }
    },
  }
</script>

<style scoped>
  .me-message {
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

  .me-view-info {
    display: inline-block;
    vertical-align: middle;
    margin-left: 8px;

  }

  .me-view-meta {
    font-size: 12px;
    color: #969696;
  }

  .me-view-nickname {
    font-size: 14px;
  }

  .me-view-picture {
    width: 40px;
    height: 40px;
    border: 1px solid #ddd;
    border-radius: 50%;
    vertical-align: middle;
    background-color: #5fb878;
    margin-top: 8px;
  }

  .me-view-comment-content {
    line-height: 2.5;

  }

  .me-view-comment-item {
    margin-top: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid #f0f0f0;
  }

  .message-input {
    margin-bottom: 30px;
  }

  .message-input span{
    font-size: 13px;
    margin-top: 15px;
    color: white;
    background-color: #5fb878;
    border-radius: 4px;
    border: 1px solid #5fb878;
    display: block;
    float: left;
    width: 80px;
    height: 23px;
    text-align: center;
    padding-top: 5px;


  }

  .message-input img {
    margin-bottom: 5px;
  }

  .board_top {
    margin-bottom: 10px;
  }

  .board_top h1 {
    color: white;
    position: absolute;
    z-index: 5;
    float: left;
    margin-top: 70px;
    margin-left: 42%;
    font-size: 40px;
    /*border-bottom: 1px solid white;*/
  }


  .board_head {
    float: left;
    width: 100%;
    height: 200px;
    border-radius: 5px;
    position: static;
    z-index: 1;
  }


  .board_submit_button {
    float: right;
    margin-top: 15px;
    padding-top: 8px;
    border: 1px solid #5fb878;
    width: 130px;
    height: 30px;
    font-size: 13px;
    text-align: center;
    background-color: #5fb878;
    color: white;

  }

  .message-title{
    font-weight: 600;
    border-bottom: 1px solid #f0f0f0;
    padding-bottom: 20px;
  }

</style>
