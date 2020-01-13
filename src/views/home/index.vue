<template>
<!-- 首页 -->
 <div class="home-container">
     <van-nav-bar title="首页"></van-nav-bar>
     <van-tabs v-model="active">
  <van-tab :title="channel.name" v-for="channel in userChannels" :key="channel.id">{{channel.name}}</van-tab>

</van-tabs>
 </div>
</template>

<script>
import { getUserChannels } from '../../api/channel'
export default {
  data () {
    return {
      active: 0,
      userChannels: []
    }
  },
  created () {
    this.loadUserChannels()
  },
  methods: {
    async loadUserChannels () {
      try {
        const { data } = await getUserChannels()
        console.log(data)

        this.userChannels = data.data.channels
      } catch (error) {
        this.$toast('获取频道数据列表失败')
      }
    }
  }
}
</script>

<style>

</style>
