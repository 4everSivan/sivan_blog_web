<template>
  <el-card class="updateMe-border">
    <el-row class="updateMe-border-avatar">
      <img :src="user.avatar">
      <span class="updateMe-border-avatar-name"> {{user.nickname}} </span>
      <span class="updateMe-border-avatar-info">邮箱: &nbsp;{{ user.email }}<p>电话: &nbsp;{{user.mobilePhoneNumber}}</p></span>
      <el-button
        type="success"
        class="updateMe-border-avatar-button-update"
        size="mini"
        @click="openUpdateDialog()"
        round icon="el-icon-edit" >修改
      </el-button>
      <el-button type="success"
                 class="updateMe-border-avatar-button-upload"
                 size="mini"
                 @click="openUploadDialog()"
                 round icon="el-icon-upload2" >上传
      </el-button>
    </el-row>

    <el-dialog
      title="修改账号"
      :visible.sync="dialogVisible"
      width="45%"
      :modal-append-to-body="false"
      :before-close="handleClose">
      <el-form ref="dataAddForm" :model="formData" :rules="rules" label-position="right" label-width="100px">
        <el-row>
          <el-col >
            <el-form-item label="账号" prop="account">
              <el-input :disabled="true" v-model="formData.account"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col >
            <el-form-item label="昵称" prop="nickname">
              <el-input  v-model="formData.nickname"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col >
            <el-form-item label="密码" prop="password">
              <el-input v-model="formData.password"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col >
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="formData.email"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col >
            <el-form-item label="电话" prop="mobilePhoneNumber">
              <el-input v-model="formData.mobilePhoneNumber"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">取 消</el-button>
        <el-button type="primary" @click="updateUserInfo()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="上传头像"
      :visible="dialogVisibleUpload"
      width="45%"
      :modal-append-to-body="false"
      :close-on-press-escape="true"
      :close-on-click-modal="true"
      :before-close="handleCloseUpload">
        <el-upload
        class="avatar-uploader"
        action="http://localhost:8888/"
        :show-file-list="false"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleUpload = false">取 消</el-button>
          <el-button type="primary" @click="closeUpload()">确 定</el-button>
        </span>
    </el-dialog>
    <el-row>
      <h3>统计</h3>
    </el-row>
    <el-row class="updateMe-border-statistical">
      <el-row>
        <img :src="bookPic">
        <span>文章数: {{statistical.articleCount}} 篇</span>
        <img :src="cameraPic">
        <span>浏览数: {{statistical.viewCount}} 次</span>
      </el-row>
      <el-row>
        <img :src="commentPic">
      <span>留言数: {{statistical.messageCount}} 条</span>
      <img :src="daysPic">
      <span>注册天数: {{statistical.registerDays}} 天</span>
      </el-row>
    </el-row>

    <el-row>
      <h3>文章管理</h3>
    </el-row>
    <el-row class="updateMe-article-management">
      <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="标题"
      prop="title">
    </el-table-column>
    <el-table-column
      label="简介"
      prop="summary">
    </el-table-column>
    <el-table-column
      label="状态"
      >
      <template slot-scope="scope">
        <el-tag
            v-if="scope.row.weight == 1"
            key="置顶"
            type="success"
            style="margin-left: 10px"
            size="small"
            effect="plain">
            已置顶
        </el-tag>
        <el-tag
            v-if="scope.row.primaryId == 1"
            key="置顶"
            style="margin-left: 10px"
            type="danger"
            size="small"
            effect="plain">
            已私密
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column
      align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="queryString"
          size="mini"
          style="width: 200px;padding-right: 0;"
          @change="searchArticle"
          placeholder="搜索"/>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          style="background-color:#5fb878;border: 1px solid #5fb878"
          type="success"
          round
          @click="editArticle(scope.$index)">详情</el-button>
        <el-button
          size="mini"
          type="danger"
          round
          @click="deleteArticle(scope.$index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    </el-row>
    <el-row>
      <div class="updateMe-article-paging">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="pagination.currentPage"
          :page-size="pagination.pageSize"
          page-count="5"
          layout="total, prev, pager, next, jumper"
          :total="pagination.total">
        </el-pagination>
      </div>
    </el-row>
  </el-card>
</template>

<script>
import picDif from '@/assets/img/logo.png'
import bookPic from '@/assets/img/book.png'
import cameraPic from '@/assets/img/camera.png'
import commentPic from '@/assets/img/comment.png'
import daysPic from '@/assets/img/days.png'
import {getUser,findUserArticle,updateUserInfo,getStatistical,searchArticle} from "@/api/user";
import {upload} from '@/api/upload'
import {deleteArticle} from "@/api/article";

export default {
  name: "BlogUpdateMe",
  data(){
    return {
      isTop: false,
      isPrimary: false,
      picDif:picDif,
      bookPic:bookPic,
      cameraPic:cameraPic,
      commentPic:commentPic,
      daysPic:daysPic,
      pagination: {//分页相关模型数据
        id: this.$store.state.id,
        currentPage: 1,//当前页码
        pageSize:5,//每页显示的记录数
        total:0,//总记录数
        queryString:null//查询条件
      },
      user:{},                    // 用户信息
      tableData: [],              // 用户文章列表
      dialogVisible: false,       // 控制用户修改弹窗
      dialogVisibleUpload: false, // 控制上传弹窗显示
      formData:{},    // 用户表单
      rules:[],       // 上传规则
      imageUrl:'',    // 上传头像回显浏览器的地址
      statistical:{}, // 统计字段
      queryString:''  // 模糊查询
    }
  },
  methods:{
      searchArticle(){
        if (this.queryString != ''){
          let params = new FormData()
          params.append('title',this.queryString)
          searchArticle(params).then( data => {
            if (data.success){
              this.tableData = data.data.list
              this.pagination.total = data.data.total
            }else{
              this.$message.error("搜索文章异常")
            }
          })
        }else{
          this.tableData = []
          this.pagination.id = this.$store.state.id
          this.findUserArticle()
        }
      },
      deleteArticle(index){
        this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteArticle(this.tableData[index].id).then( data => {
            if (data.success){
              this.findUserArticle()
              this.$notify({
              title: '成功',
              message: '已删除文章！',
              type: 'success',
              offset: 100,
              duration: 2000,
              showClose: false,
              });
            }
          })
        }).catch(() => {
          this.$notify.info({
              title: '消息',
              message: '已撤销删除！',
              offset: 100,
              duration: 2000,
              showClose: false,
              });
        });
      },
      editArticle(index) {
        this.$router.push({path: `/view/${this.tableData[index].id}`})
      },
      getStatistical(){
        let params = new FormData()
        params.append('id',this.$store.state.id)
        getStatistical(params).then( data => {
          if (data.success){
            this.statistical= data.data
          }else{
            this.$message.error("用户统计数据异常")
          }
        })
      },
      openUploadDialog(){
          this.dialogVisibleUpload = true
      },
      updateUserInfo(){
        updateUserInfo(this.formData).then( data => {
          if (data.success){
            this.findUserArticle()
              this.$notify({
              title: '成功',
              message: '修改成功！',
              type: 'success',
              offset: 100,
              duration: 2000,
              showClose: false,
              });
            this.dialogVisible = false
          }else{
            this.$message.error("修改失败")
          }
        })
      },
      closeUpload(){
        this.dialogVisibleUpload = false;
        this.findUserInfo();
      },
      handleCloseUpload(){
        this.dialogVisibleUpload = false;
      },
      handleClose(){
        this.formData = {}
        this.dialogVisible = false
      },
      openUpdateDialog(){
        this.dialogVisible = true
        this.findUserInfo()
      },
      findUserInfo(){
        let params = new FormData()
        params.append('id',this.$store.state.id)
        getUser(params).then( data =>{
          if (data.success){
              this.user = data.data
              this.formData = this.user
          }else{
            this.$message.error("获取用户信息异常")
          }
        })
      },
      findUserArticle(){
          findUserArticle(this.pagination).then( data => {
            if (data.success){
              this.tableData = data.data.list
              this.pagination.total = data.data.total

            }else{
              this.$message.error("获取用户文章信息异常")
            }
          })
      },
      handleCurrentChange(currentPage) {
      this.pagination.currentPage = currentPage;
      this.findUserArticle();
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        else{
          let params = new FormData();
          params.append('image', file);
          upload(params).then(data => {
            if (data.success) {
              this.imageUrl = data.data
              this.findUserInfo()
              this.formData.avatar = this.imageUrl
              updateUserInfo(this.formData).then( data => {
              if (data.error){
                this.$message.error("修改失败")
              }
            })
              this.user.avatar = this.imageUrl
              this.$message.success("上传成功")
            } else {
              this.$message.error("上传失败")
            }
          })
        }
        return isLt2M;
      }
  },
  created() {
    this.findUserInfo()
    this.findUserArticle()
    this.getStatistical()
    console.log(this.$store.state.id)
  }
}
</script>

<style scoped>
  .updateMe-border {
    width: 70%;
    margin-top: 290px;
  }
  .updateMe-border-avatar {
    z-index: 5;
    position: absolute;
    margin-top: -210px;
    margin-left: 21%;

  }
  .updateMe-border-avatar img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .updateMe-border-avatar-name {
    z-index: 5;
    position: absolute;
    font-size: 30px;
    margin-top: 5px;
    margin-left: 40px;
    font-weight: bold;
    width: 200px;
  }

  .updateMe-border-avatar-info {
    z-index: 5;
    position: absolute;
    margin-top: 60px;
    margin-left: 40px;
    width: 200px;
    font-weight: lighter;
    font-size: 10px;
  }

  .updateMe-border-avatar-button-update {
    z-index: 5;
    position: absolute;
    margin-top: 120px;
    margin-left: 40px;
    background-color: #5fb878;
    border: 1px solid #5fb878;
  }

  .updateMe-border-avatar-button-upload {
    z-index: 5;
    position: absolute;
    margin-top: 120px;
    margin-left: 130px;
    background-color: #12a182;
    border: #12a182 1px solid;
  }

  h3 {
    margin-left: 20px;
    margin-bottom: 10px;
    border-bottom: 3px #12a182 solid;
    width: 96%;
    font-size: 20px;
  }

  .updateMe-article-management {
    width: 95%;
    margin: 0 auto 0;
  }
  .updateMe-border-statistical{
    margin: 0 auto 0;
    width: 96%;
    height: 240px;
    padding-top: 20px;
    padding-left: 40px;
  }
  .updateMe-border-statistical span{
    z-index: 1;
    position: absolute;
    margin-top:10px;
    margin-left: -225px;
    padding-left: 30px;
    height: 53px;
    padding-top: 27px;
    background-color: #f0f5e5;
    width: 150px;
    font-weight: bold;
    color: #12a182;
  }
  .updateMe-border-statistical img {
    width: 250px;
    height: 80px;
    border-radius: 15px;
    margin-top: 10px;
    margin-right: 210px;
  }
  .updateMe-article-paging{
    float: right;
    padding-right: 20px;
    margin-top: 15px;
  }

  .avatar-uploader {
    border: 2px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 178px;
    margin-left: 30px;
  }
  .avatar-uploader:hover {
    border-color: #12a182;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
