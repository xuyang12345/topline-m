<template>
<!-- 首页 -->
 <div class="home-container">
     <div class="nav-bar">
       <div class="logo"></div>
<van-button
class="search-btn"
     round
     type="info"
     size="small"
     icon="search"
    @click="$router.push('/search')"
>
  搜索
</van-button>
     </div>
     <van-tabs v-model="active">
       <van-icon
        class="wap-nav"
        slot="nav-right"
        name="wap-nav"
        @click="isChannelEditShow = true"
      />
  <van-tab :title="channel.name" v-for="channel in userChannels" :key="channel.id"> <article-list :channel="channel" />
   </van-tab>
</van-tabs>
<van-popup
  v-model="isChannelEditShow"
  position="bottom"
  :style="{ height: '100%' }"
  round
  closeable
  close-icon-position="top-left"
>
<channel-edit :userChannels='userChannels' @switch="onChannelSwitch" :active='active'/></van-popup>

 </div>
</template>
<script>
import { getUserChannels } from '../../api/channel'
import ChannelEdit from './components/channel-edit'
import ArticleList from './components/article-list'
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
    ChannelEdit,
    ArticleList
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
    },
    onChannelSwitch (index) {
      // 切换激活频道
      this.active = index
      // 关闭弹层
      this.isChannelEditShow = false
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  padding-top: 90px;
  padding-bottom: 50px;
}
.nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    height: 46px;
    background-color: #3196fa;
    z-index: 1;
}
   .search-btn {
      background-color: #5babfb;
      width: 50%;
    }
    .wap-nav {
    position: fixed;
    right: 0;
    line-height: 44px;
    background: #fff;
    opacity: .8;
  }
   .van-tabs__wrap {
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    z-index: 1;
  }
</style>
