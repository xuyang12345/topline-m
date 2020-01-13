<template>
<!-- 编辑频道 -->
  <div class="channel-edit">
        <van-cell class="channel-header" title="我的频道" :border="false">
        <van-button size="mini" round type="danger" plain>编辑</van-button>
        </van-cell>
            <van-grid :gutter="10">
            <van-grid-item  v-for="channel in userChannels"
                    :key="channel.id"   :text="channel.name" />
            </van-grid>
        <van-cell class="channel-header" title="推荐频道" :border="false"/>

            <van-grid :gutter="10" clickable>
            <van-grid-item  v-for="channel in remainingChannels"
                    :key="channel.id" :text="channel.name"  />
            </van-grid>
  </div>
</template>

<script>
// import { getAllchannels } from '../../../api/channel'
export default {
  name: 'ChannelEdit',
  data () {
    return {
      allChannels: []
    }
  },
  props: {
    userChannels: {
      type: Array,
      required: true
    }
  },
  //   methods: {
  //     async loadAllChannels () {
  //       const { data } = await getAllchannels()
  //       this.allChannels = data.data.channels
  //       debugger
  //       console.log(this.allChannels)
  //     }
  //   },
  //   计算属性
  computed: {
    remainingChannels () {
      const channels = []
      const { allChannels, userChannels } = this
      allChannels.forEach(item => {
        //   当前遍历项是否属于我的频道，如果不是，那就收集到channels里
        // userChannels是否包含item
        // find会遍历数组，他会对每个元素执行c.id === item.id
        // 如果true，则返回该元素，如果知道最后都没有符合条件，那就返回underfined
        if (!userChannels.find(c => c.id === item.id)) {
          channels.push(item)
        }
      })
      return channels
    }
  }
  //   created () {
  //     this.loadAllChannels()
  //   }

}
</script>

<style scoped lang="less">
.channel-edit {
  padding-top: 40px;
   .channel-header {
    font-size: 16px;
    color: #333;
  }
  /deep/ .van-grid-item {
    width: 80px;
    height: 43px;
    .van-grid-item__content {
      background: #f4f5f6;
    }
    .van-grid-item__text {
      font-size: 14px;
      color: #222;
    }
  }
}
</style>
