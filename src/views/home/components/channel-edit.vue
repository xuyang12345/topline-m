<template>
<!-- 编辑频道 -->
  <div class="channel-edit">
        <van-cell class="channel-header" title="我的频道" :border="false">
        <van-button size="mini" round type="danger" plain @click="isEditShow=!isEditShow">{{isEditShow?'完成':'编辑'}}</van-button>
        </van-cell>
            <van-grid :gutter="10">
            <van-grid-item  v-for="(channel, index) in userChannels"
                    :key="channel.id"   @click="onUserChannelClick(index)" >
                    <span :class="{'active':index===active}" class="text" slot="text">{{channel.name}}</span>
                    <van-icon v-show="isEditShow && index !== 0" slot="icon" name="close" /></van-grid-item>
            </van-grid>
        <van-cell class="channel-header" title="推荐频道" :border="false"/>

            <van-grid :gutter="10" clickable>
            <van-grid-item  v-for="channel in remainingChannels"
                    :key="channel.id" :text="channel.name"  @click="onAdd(channel)"/>
            </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '../../../api/channel'
export default {
  name: 'ChannelEdit',
  data () {
    return {
      allChannels: [],
      isEditShow: false
    }
  },
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  methods: {
    async loadAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },
    onAdd (channel) {
      this.userChannels.push(channel)
    },
    onUserChannelClick (index) {
      if (this.isEditShow && index !== 0) {
        this.userChannels.splice(index, 1) // index当前下标，后面1是删除的个数
      } else {
        this.$emit('switch', index)
      }
    }
  },
  //   计算属性
  computed: {
    remainingChannels () {
      const channels = []
      this.allChannels.forEach(item => {
        //   当前遍历项是否属于我的频道，如果不是，那就收集到channels里
        // userChannels是否包含item
        // find会遍历数组，他会对每个元素执行c.id === item.id
        // 如果true，则返回该元素，如果知道最后都没有符合条件，那就返回underfined
        if (!this.userChannels.find(c => c.id === item.id)) {
          channels.push(item)
        }
      })
      return channels
    }
  },
  created () {
    this.loadAllChannels()
  }

}
</script>

<style scoped lang="less">
.channel-edit {
  padding-top: 40px;
   .channel-header {
    font-size: 16px;
    color: #333;
  }
.van-grid-item{
    font-size: 14px;
    color: #222;
    width: 80px;
    height: 43px;
        position: relative;
    .van-grid-item__icon-wrapper {
      position: absolute;
      top: -14px;
      right: -5px;
      .van-icon-close {
        font-size: 14px;
      }
    }
    .van-grid-item__content {
      background: #f4f5f6;
    }
    .van-grid-item__text .text{
      font-size: 14px;
      color: #222;
    }
    .active{
        color: red
      }
  }

}
</style>
