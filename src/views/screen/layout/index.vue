<template>
  <div class="app-wrapper">
    <div class="app-wrapper-con">
      <navbar />
      <!-- <transition name="fade-transform" mode="out-in"> -->
      <router-view :key="key" />
      <!-- </transition> -->
    </div>
    <div class="app-wrapper-p">
      <panel />
      <!-- <transition name="fade-transform" mode="out-in"> -->
      <router-view :key="key" />
      <!-- </transition> -->
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Panel from './components/Panel'
export default {
  name: 'ScreenLayout',
  components: { Navbar,Panel },
  props: {},
  data() {
    return {}
  },
  computed: {
    key() {
      return this.$route.path
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="scss">
.app-wrapper {
  width: 1920px;
  height: 1080px;
  background-image: url(~@/assets/img/screen/bg.png);
 
  padding: 15px;
}


</style>
