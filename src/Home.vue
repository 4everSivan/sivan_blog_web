<template>
  <div id="home">
    <base-header :activeIndex="activeIndex" :searchTable="searchTable"></base-header>
    <div class="home_div" v-show="showImg">
      <img class="home_div_head" :src="myAvatar"/>
      <h1>Welcome to Sivan's Blog</h1>
      <div class="home_div_box">
        <vue-typed-js
          v-if="myContent.length > 0"
          class="home_div_box_type"
          :strings="myContent"
          :loop="true"
          :loop-count="5"
          :startDelay="300"
          :typeSpeed="150"
          :backSpeed="50"
          :cursorChar="'_'"
        >
          <span class="typing"></span>
        </vue-typed-js>

      </div>
<!--      <span class="home_div_box_poemAuthor">[ {{this.poemAuthor}} ]</span>-->
<!--      <div class="home_div_bottom" @click="toIndex"><i class="el-icon-caret-bottom"></i></div>-->
      <img class="home_pic" :src="background">
    </div>
    <el-container>

		  <router-view class="me-container"/>

			<base-footer v-show="footerShow"></base-footer>

		</el-container>
  </div>
</template>

<script>
import BaseFooter from '@/components/BaseFooter'
import BaseHeader from '@/views/BaseHeader'
import myAvatar from '@/assets/img/logo.png'
import {searchArticle} from "./api/article";

export default {
  name: 'Home',
  data (){
  	return {
        poem:{},
        poemAuthor: " ",
  			activeIndex: '/',
        searchTable: false,
  			footerShow:true,
        background:'http://img.sweetbabywow.club/wallhaven-dpdjlg_1920x1080.png',
        myAvatar:myAvatar,
        showImg:true,
        myContent:[
          // "春江潮水连海平，海上明月共潮生。",
          // "滟滟随波千万里，何处春江无月明。",
          // "江流宛转绕芳甸，月照花林皆似霰。",
          // "空里流霜不觉飞，汀上白沙看不见。",
          // "江天一色无纤尘，皎皎空中孤月轮。",
          // "江畔何人初见月，江月何年初照人。",
          // "人生代代无穷已，江月年年望相似。"
          // "朝辞白帝彩云间，千里江陵一日还。",
          // "两岸猿声啼不住，轻舟已过万重山。"
        ]

  	}
  },
  components:{
  	'base-header':BaseHeader,
  	'base-footer':BaseFooter,
  },
  beforeMount() {
    const jinrishici = require('jinrishici');
      jinrishici.load(result => {
        this.poem = result.data.content
        this.myContent = [result.data.content];
        this.poemAuthor = result.data.origin.author
      },(err) => {
        console.error(err);
      });
  },
  methods: {
    toIndex() {
      document.body.scrollTop = 800;
      document.documentElement.scrollTop = 800;
    },
  },
  beforeRouteEnter (to, from, next){
  	 next(vm => {
    	vm.activeIndex = to.path
  	})
  },
  beforeRouteUpdate (to, from, next) {
	  if(to.path == '/'){
	  	this.footerShow = true
      this.showImg = true
	  }else{
	  	// this.footerShow = false
      this.showImg = false
	  }
	  this.activeIndex = to.path
	  next()
	},
}
</script>

<style scoped>

.me-container{
  z-index: 10;
  margin: 100px auto 160px;
}

.home_div {
  width: 100%;
  height: 800px;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  position: relative;
}

.home_pic {
  z-index: 1;
  width: 100%;
  height: 100%;
}

.home_div_box {
  position: absolute;
  z-index: 2;
  text-align: center;
  background: inherit;
  overflow: hidden;
  margin-top: 360px;
  float: left;
  margin-left: 27%;
  height: 80px;
  width: 60%;
  /*border-bottom: 1px solid white;*/
}

.home_div_box_poemAuthor {
  position: absolute;
  z-index: 3;
  margin-top: 450px;
  float: left;
  margin-left: 47%;
  color: white;
  font-size: 15px;
  font-weight: bolder;
}


.home_div h1{
  position: absolute;
  z-index: 3;
  margin-top: 310px;
  float: left;
  margin-left: 33%;
  color: white;
  font-size: 28px;
  border-bottom: 2px white dashed;
}

.home_div_box_type {
  color: white;
  font-size: 45px;
}

.home_div_head {
  position: absolute;
  z-index: 3;
  width: 80px;
  height: 80px;
  margin-top: 275px;
  float: left;
  margin-left: 27%;
  border-radius: 8px;
  /*box-shadow:0 0 15px gray;*/
}

.home_div_bottom {
  position: absolute;
  z-index: 2;
  margin-top: 670px;
  margin-left: 49%;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background-color: white;
  box-shadow: 0 0 6px rgba(0, 0, 0, .12);
}

.home_div_bottom i {
  color: #00d1b2;
  display: block;
  line-height: 40px;
  text-align: center;
  font-size: 18px;
}

</style>
