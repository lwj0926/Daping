<template>
  <div class="navbar">
    <div class="navbar-left">
      <div class="nav-item" :class="{ active: path === '/screen/home' }" @click="$router.push('/screen/home')"><i class="el-icon-s-home" /> 首页</div>
    </div>
    <div class="navbar-mid">
        <h1>湖北分公司运营管理系统</h1>
    </div>
    <div class="navbar-right">
      <span class="time">{{ time }}</span>
    </div>
  </div>
</template>

<script>
import { parseTime } from '@/utils'

export default {
  components: {},
  props: {},
  data() {
    return {
      time: parseTime(new Date())
    }
  },
  computed: {
    path() {
      return this.$route.path
    }
  },
  watch: {},
  created() {
    setInterval(() => {
      this.time = parseTime(new Date())
    }, 1000)
  },
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="scss">
.navbar {
  background-image: url(~@/assets/img/screen/header-mid.png);
  background-position:center;
  height: 60px;
  margin-bottom: 15px;
  display: flex;
  font-size: 20px;
  .navbar-left {
    text-align: left;
    padding-left: 20px;
    width: 280px;
    line-height: 60px;
  }
  .navbar-right {
    text-align: right;
    width: 280px;
    line-height: 60px;
    .time {
      color: #01fafe;
      margin-right: 15px;
    }
   
  }
  .navbar-mid {
    flex-grow: 1;
    
    h1 {
      color:#ffffff;
      text-align:center;
      font-size: 38px;
      line-height: 60px;
      margin: 0;
      font-weight: 400;
    }
  }
  .nav-item {
    cursor: pointer;

    &.active,
    &:hover {
      color: #ffffff;
    }
  }
}
</style>
