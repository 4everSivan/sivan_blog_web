<template>
  <div v-show="topShow">
  <el-header class="me-area">
    <el-row class="me-header">

      <el-col :span="2" class="me-header-left">
        <router-link to="/" class="me-header-left-title">
          <p id="head_title">Sivan's Blog</p>
        </router-link>
      </el-col>

      <el-col v-if="!simple" :span="20" class="me-header-left-menu">
        <el-menu :router=true menu-trigger="click" active-text-color="#5FB878" :default-active="activeIndex"
                 mode="horizontal">
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/category/all">文章分类</el-menu-item>
          <el-menu-item index="/tag/all">标签</el-menu-item>
          <el-menu-item index="/archives">文章归档</el-menu-item>
          <el-menu-item index="/messageBoard">留言板</el-menu-item>
          <el-menu-item index="/log">关于我</el-menu-item>

<!--          <el-col :span="2" :offset="8">-->
<!--            <el-menu-item index="/write"><el-button type="primary" size="mini" round>写文章</el-button></el-menu-item>-->
<!--          </el-col>-->
          <el-menu-item index="/write" style="margin-left: 88%;position: absolute"><el-button type="primary" size="mini" round>写文章</el-button></el-menu-item>

          <el-menu-item style="float: left; margin-left: 65%;position: absolute;border-bottom: none">
            <a @click="searchArticle()"><img :src="searchImg" class="me-header-search-img"></a>
            <input class="me-header-search" placeholder="搜索.." v-model="articleTitle" @keyup.enter="searchArticle()"></input>
          </el-menu-item>

          <el-dialog title="查询结果：" :visible.sync="searchTable" :modal-append-to-body="false" @close="closeDialog()">
            <article-item v-for="a in articles" :key="a.id" v-bind="a" class="article_list"></article-item>
            <h1 v-if="this.articles.length == 0" style="margin: 0 42% 0;width:200px"><i class="el-icon-warning"></i>&nbsp;无内容</h1>
          </el-dialog>

        </el-menu>
      </el-col>

      <template v-else>
        <slot></slot>
      </template>

      <el-col :span="3" style="margin-left: 90%;position: absolute;border-bottom: none">
        <el-menu :router=true menu-trigger="click" mode="horizontal" active-text-color="#5FB878" >

          <template v-if="!user.login">
            <el-menu-item index="/login">
              <el-button type="text">登录</el-button>
            </el-menu-item>
            <el-menu-item index="/register">
              <el-button type="text">注册</el-button>
            </el-menu-item>
          </template>

          <template v-else>
            <el-submenu index>
              <template slot="title">
                <img class="me-header-picture" :src="user.avatar"/>
              </template>
              <el-row>
                <el-menu-item index="/updateMe"><i class="el-icon-star-off"></i>用户中心</el-menu-item>
              </el-row>
              <el-row>
                <el-menu-item  @click="logout"><i class="el-icon-back"></i>退出</el-menu-item>
              </el-row>
            </el-submenu>
          </template>
        </el-menu>
      </el-col>

    </el-row>
  </el-header>
  </div>
</template>

<script>
import search from '@/assets/img/search.png'
import {searchArticle} from "@/api/article";
import ArticleItem from "@/components/article/ArticleItem";

export default {
    name: 'BaseHeader',
    props: {
      activeIndex: String,
      searchTable: {
        type: Boolean,
        default: false
      },
      simple: {
        type: Boolean,
        default: false
      }
    },
    components: {
      'article-item': ArticleItem,
    },
    data() {
      return {
        topShow:true,
        searchImg:search,
        articleTitle:'',
        articles:[],
        loading: false,
        noData: false,
        innerPage: {
          pageSize: 5,
          pageNumber: 1,
          name: 'a.createDate',
          sort: 'desc'
        },

      }
    },
    computed: {
      user() {
        let login = this.$store.state.account.length != 0
        let avatar = this.$store.state.avatar
        return {
          login, avatar
        }
      }
    },
    methods: {
      logout() {
        let that = this
        this.$store.dispatch('logout').then(() => {
          this.$router.push({path: '/'})
        }).catch((error) => {
          if (error !== 'error') {
            that.$message({message: error, type: 'error', showClose: true});
          }
        })
      },

      searchArticle(){
        let that = this
        if (this.articleTitle == ''){
          this.$notify({
          title: '警告',
          message: '请输入标题',
          type: 'warning',
          duration: 1000,
          showClose: false,
          offset: 100
        });
        }else{
          let params = new FormData();
        params.append('title', this.articleTitle);
        searchArticle(params).then(data => {
            if (data.success){
              let newArticles = data.data
            if (newArticles && newArticles.length > 0) {
              that.innerPage.pageNumber += 1
              that.articles = that.articles.concat(newArticles)
            } else {
              that.noData = true
              this.articles = []
            }
            this.searchTable = true
          }
        })
        }
      },
      closeDialog(){
        this.articles = []
        this.articleTitle = ''
      }
    },
  }
</script>

<style>

  .el-header {
    position: fixed;
    z-index: 1024;
    min-width: 100%;
    box-shadow: 0 2px 3px hsla(0, 0%, 7%, .1), 0 0 0 1px hsla(0, 0%, 7%, .1);
  }

  .me-header-left {
    margin-top: 10px;
  }

  .me-header-left-title {
    font-size: 24px;
    float: left;
  }


  .me-header-picture {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    vertical-align: middle;
    background-color: #5fb878;
    margin-right: 10px;
    margin-left: 19px;
  }

  .me-header-search {
    width: 144px;
    height: 24px;
    border: 1px solid #5fb878;
    border-radius: 15px;
    padding: 3px 33px 0;
    outline: none;
    color: #2c5242;

  }

  .me-header-search-img {
    width: 15px;
    height: 15px;
    position: absolute;
    z-index: 0;
    margin-top: 23px;
    margin-left: 10px;
  }

  #head_title {
    padding-top: 5px;
    font-size: 20px;
    color: #5fb878;
  }

  .article_list {
    margin: 20px 10px 10px;
  }
</style>
