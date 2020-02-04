<template>
  <div class="search-container">
      <!-- 搜索栏 -->
      <form class="search-form" action="/">
      <!-- background="#32966fa"高亮 -->
        <van-search
          v-model="searchContent"
          placeholder="请输入搜索关键词"
          show-action
          @search="onSearch"
          @cancel="onCancel"
          @focus="isSearchResultShow=false"
          @input="onSearchInput"
        />
      </form>
<!-- 搜索结果 -->
<search-result v-if="isSearchResultShow" :q="searchContent"/>
<!-- 联想建议 -->
<van-cell-group v-else-if="searchContent">
   <!--v-for="(item, index) in suggestions" 渲染到页面 -->
    <van-cell icon="search"
        v-for="(item, index) in suggestions"
        :key="index"
        @click="onSearch(item)"
        >
        <div slot="title" v-html="highlight(item)"></div>
        </van-cell>
</van-cell-group>
<!-- 历史记录 -->
<van-cell-group v-else>
<van-cell title="历史记录">
  <template v-if="isDeleteShow">
    <span @click="searchHistories=[]">全部删除</span>
    &nbsp;&nbsp;
    <span @click="isDeleteShow=false">完成</span>
    </template>
    <van-icon v-else  name="delete" @click="isDeleteShow=true"></van-icon>
</van-cell>
<van-cell :title="item"
v-for="(item,index) in searchHistories"
:key="index"
@click="onHistoryClick(item, index)"
>
<van-icon name="close" v-show="isDeleteShow"></van-icon>
</van-cell>
</van-cell-group>
<!-- 搜索结果 -->
<!-- <van-list v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad">
  <van-cell v-for="item in list" :key="item" :title="item">
  </van-cell>
</van-list> -->
  </div>
</template>

<script>
import { getSuggestions } from '@/api/search'
import SearchResult from './components/search-result'
import { getItem, setItem } from '@/utils/storage'
export default {
  components: {
    SearchResult
  },
  data () {
    return {
      // 搜索内容
      searchContent: '',
      isSearchResultShow: false,
      suggestions: [], // 联想建议
      isDeleteShow: false, // 删除的小图标显示状态
      searchHistories: getItem('serach-histories') || []// 搜索历史记录
    }
  },
  watch: {
    searchHistories (val) {
      setItem('search-histories', val)
    }
  },
  methods: {
    onHistoryClick (item, index) {
      // 如果是删除状态，则执行删除操作
      if (this.isDeleteShow) {
        this.searchHistories.splice(index, 1)
      } else {
        this.onSearch(item)
      }
    },
    onSearch (q) {
      // 1.点击联想建议里关键词，将关键词传到搜索框里，跳转到搜索框里
      this.searchContent = q
      // 2记录搜索历史记录
      const searchHistories = this.searchHistories
      // 判断，查找历史记录里是否存在当前搜索的内容，如果有，就删除当前要添加到历史记录的数据
      const index = searchHistories.indexOf(q) // indexof(q)是查找搜索关键词q
      // 如果q在搜索记录里空的 则index=-1
      if (index !== -1) {
        searchHistories.splice(index)// 删除
      }
      searchHistories.unshift(q)// 添加
      // 3展示搜索结果
      this.isSearchResultShow = true
    },
    onCancel () {
      console.log('onCancel')
    },
    // 搜索框里的
    async onSearchInput () {
      const searchContent = this.searchContent
      // 如果搜索框里没有内容，就停止
      if (!searchContent) {
        return
      }
      // 请求获取数据
      // 原始res.then(data) data解构出来
      const { data } = await getSuggestions(searchContent)
      // 将组件传到suggestions: []中
      this.suggestions = data.data.options
    },
    highlight (str) {
      const searchContent = this.searchContent
      // /searchContent/ 正则表达式中的一切内容都会当做字符串使用
      // 这里可以 new RegExp 方式根据字符串创建一个正则表达式
      // RegExp 是原生 JavaScript 的内置构造函数
      // 参数1：字符串，注意，这里不要加 //
      // 参数2：匹配模式，g 全局，i 忽略大小写
      const reg = new RegExp(searchContent, 'gi')
      return str.replace(reg, `<span style="color:#3296fa">${searchContent}</span>`)
    }
  }

}
</script>

<style scoped lang="less">
.search-container {
  padding-top: 54px;
  // 让搜索栏固定在顶部
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .van-search__action {
    color: #fff;
  }
}
</style>
