<template>
  <div class="article-list">
    <van-list  v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad">
      <van-cell   v-for="(article,index) in list"
        :key="index"
        :title="article.title"
         @click="$router.push('/article/' + article.art_id)"
        ></van-cell>
    </van-list>
  </div>
</template>

<script>
import { getArticlesByChannel } from '@/api/article'
export default {
  data () {
    return {
      list: [],
      loading: false,
      // 完成状态
      finished: false
    }
  },
  name: 'ArticleList',
  finished: false,
  timestamp: null,
  props: {
    channel: {
    // 频道数据类型必须是对象
      type: Object,
      // 必须传递该数据
      required: true
    }
  },
  methods: {
    async onLoad () {
    // 请求获取数据
      const { data } = await getArticlesByChannel({
      //  频道id：
        channel_id: this.channel.id,
        // 事件戳
        timestamp: this.timestamp || Date.now(),
        // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        with_top: 1
      })
      console.log(data)

      //  把数据传到列表里
      const { results } = data.data
      this.list.push(...results)
      this.loading = false
      if (results.length) {
        this.timestamp = data.data.pre_timestamp
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style>

</style>
