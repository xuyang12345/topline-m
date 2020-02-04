<template>
  <div class="search-result">
<van-list  v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad">
</van-list>
<van-cell   v-for="article in list"
    :key="article.aut_id"
    :title="article.title"
    @click="$router.push(`/article/${article.art_id}`)"
    ></van-cell>
  </div>
</template>
<script>
import { getSearch } from '@/api/search'
export default {
  name: 'SearchResult',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perpage: 10
    }
  },
  props: {
    q: {
      type: String,
      required: true
    }
  },
  methods: {
    async onLoad () {
      // 1请求数据
      const { data } = await getSearch({
        page: this.page, // 页码
        per_page: this.perpage, // 每页大小
        q: this.q // 查询参数
      })
      // 2将数据添加到列表
      const { results } = data.data
      this.list.push(...results)
      // 3关闭本次的加载loading
      this.loading = false
      // 4判断是否还有数据
      if (results.length) {
        this.page++ // 更新获取下一页的页码
      } else {
        this.finished = true // 没有数据了，结束关闭加载更多
      }
    }
  }
}
</script>

<style>

</style>
