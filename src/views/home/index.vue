<template>
<!-- 首页 -->
 <div class="home-container">
     <van-nav-bar title="首页"></van-nav-bar>
     <van-tabs v-model="active">
       <van-icon
        class="wap-nav"
        slot="nav-right"
        name="wap-nav"
        @click="isChannelEditShow = true"
      />
  <van-tab :title="channel.name" v-for="channel in userChannels" :key="channel.id">{{channel.name}}</van-tab>
</van-tabs>
<van-popup
  v-model="isChannelEditShow"
  position="bottom"
  :style="{ height: '100%' }"
  round
  closeable
  close-icon-position="top-left"
>
<channel-edit :userChannels='userChannels' /></van-popup>

 </div>
</template>

<script>
import { getUserChannels } from '../../api/channel'
import ChannelEdit from './components/channel-edit'
export default {
  data () {
    return {
      active: 0,
      userChannels: [],
      isChannelEditShow: false
    }
  },
  created () {
    this.loadUserChannels()
  },
  components: {
    ChannelEdit
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

<style scoped lang="less">
.wap-nav {
  position: fixed;
  right: 0;
  line-height: 44px;
  background: #fff;
  opacity: .8;
}
</style>
