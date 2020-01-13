<template>
<!-- 个人用户列表 -->
  <div class="user-container">
    <!-- 导航栏 -->
    <!-- 页面跳转$router('路径') -->
    <van-nav-bar title="黑马头条号" left-arrow  @click-left="$router.back()"/>
    <!-- /导航栏 -->

    <!-- 用户信息 -->
    <div class="user-info-container">
      <div class="row1">
        <van-image
          class="col1"
          fit="cover"
          round
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <div class="col2">
          <div class="row1">
            <div class="item">
              <div class="count">123</div>
              <div class="text">发布</div>
            </div>
            <div class="item">
              <div class="count">123</div>
              <div class="text">关注</div>
            </div>
            <div class="item">
              <div class="count">123</div>
              <div class="text">粉丝</div>
            </div>
            <div class="item">
              <div class="count">123</div>
              <div class="text">获赞</div>
            </div>
          </div>
          <div class="action">
            <van-button
              type="primary"
              size="small"
            >私信</van-button>
            <van-button
              type="default"
              size="small"
            >编辑资料</van-button>
          </div>
        </div>
      </div>
      <div class="intro-wrap">
        <div>
          <span>认证：</span>
          <span>用户的认证信息</span>
        </div>
        <div>
          <span>简介：</span>
          <span>用户的简介信息</span>
        </div>
      </div>
    </div>
    <!-- /用户信息 -->

    <!-- 文章列表 -->
    <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
  <van-cell
    v-for="(article,index) in list"
    :key="index"
    :title="article.title"
  />
</van-list>

  </div>
</template>

<script>
import { getUserById } from '@/api/user'
import { getArticlesByUser } from '@/api/article'
export default {
  name: 'UserPage',
  data () {
    return {
      user: {},
      list: [],
      loading: false,
      finished: false,
      page: 1
    }
  },
  created () {
    this.loadUser()
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      // 把指定用户信息传到列表上
      const { data } = await getArticlesByUser(this.$route.params.userId, {
        page: this.page,
        per_pge: 20
      })
      console.log(data)

      // // 加载状态结束
      this.loading = false
      const { results } = data.data
      this.list.push(...results)
      // 数据全部加载完成
      if (results.length) {
        this.page++
      } else {
        this.finished = true
      }
    },
    async loadUser () {
      try {
        const { data } = await getUserById(this.$route.params.userId)
        this.user = data.data
      } catch (error) {
        console.log(error)
        this.$toast('获取用户数据失败')
      }
    }
  }
}

</script>

<style scoped lang="less">
.user-container {
  font-size: 14px;
  .user-info-container {
    padding: 12px;
    background-color: #fff;
    margin-bottom: 10px;
    >.row1 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      .item {
        text-align: center;
        .text {
          font-size: 12px;
        }
      }
      >.col1 {
        width: 80px;
        height: 80px;
      }
      >.col2 {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        width: 70%;
        height: 80px;
        padding: 0 12px;
        >.row1 {
          display: flex;
          justify-content: space-between;
        }
        .action {
          display: flex;
          justify-content: space-between;
          .van-button {
            width: 45%;
          }
        }
      }
    }
  }
}
</style>
