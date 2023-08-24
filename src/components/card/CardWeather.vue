<template>
  <el-card>
    <div slot="header" class="me-weather-header">
      <span><i class="iconfont icon-penzai01" style="color: #2c5242"></i>&nbsp;今日天气</span>
      <a @click="getWeather()" class="me-pull-right me-weather-more">刷新</a>
    </div>
    <h1>{{weather.city}} {{weather.wea}}&nbsp;&nbsp;{{weather.tem_day}}°C {{weather.win}}{{weather.win_speed}}</h1>
  </el-card>
</template>

<script>
import axios from 'axios'

export default {
  name: "CarWeather",
  data() {
    return {
      weather:{},
    }
  },
  methods: {
    getWeather(){
      axios.get("https://yiketianqi.com/free/day?appid=99727835&appsecret=yer4WUFJ&unescape=1").then((res)=>{
        this.weather = res.data;
      })
    },
  },
  created() {
    this.getWeather();
  }
}
</script>

<style scoped>
.me-weather-header {
  font-weight: 600;
}
.me-weather-more {
  font-size: 14px;
  color: #2c5242;
}
</style>
