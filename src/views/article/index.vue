<template>
  <div class="article-container">
<van-nav-bar title="文章详情" left-arrow fixed @click-left="$router.back()"></van-nav-bar>
<van-loading class="loading"
v-if="loading"
color="#1989fa"
 vertical>
<slot>加载中...</slot>
</van-loading>
<!-- 文章详情 -->
<div v-else-if="article.title" class="detail">
<h3 class="title">{{article.title}}</h3>
<div class="author-wrap">
  <div class="base-info">
    <van-imag class="avatar"
    round
    fit="cover"
    src="article.aut_photo"
    >
<div class="text">
<p class="name">{{article.aut_name}}</p>
<p class="time">{{article.pubdate|relativeTime}}</p>
</div>
    </van-imag>
  </div>
  <van-button v-if="!user||article.aut_id!==user.id"
   class="follow-btn" :type="article.is_followed?'default' :'info'"
   :loading="isFollowLoading"
   @click="onFollow"
   size="small" round>
   {{article.is_followed?'已关注' :'+关注'}}</van-button>
</div>
<!-- 文章内容 -->
<div class="markdown-body" v-html="article.content"></div>
<!-- 文章评论 -->
<article-comment :article-id="articleId"/>
</div>
<!-- 文章详情结束 -->
<!-- 加载失败提示 -->
<div v-else class="error">
<img src="../my/u=2113531245,2556218577&fm=26&gp=0.jpg" alt="">
<p class="text">亲，网络不给力哦~</p>
      <van-button
        class="btn"
        type="default"
        size="small"
        @click="loadArticle"
      >点击重试</van-button>
</div>
<!-- 加载失败提示结束 -->
<div class="footer">
<van-button class="write-btn" type="default" round size="small" @click="isPostShow=true">
写评论
</van-button>
<van-icon class="comment-icon" name="comment-o" info="7"/>
<van-icon class="orange"  :name="article.is_collected ? 'star' : 'star-o'"
        @click="onCollect"/>
<van-icon  color="#e5645f"    :name="article.attitude === 1 ? 'good-job' : 'good-job-o'" @click="onLike"/>
<van-icon name="share" class="share-icon"/>
</div>
<!-- 发布文章评论 -->
<van-popup
   v-model="isPostShow"
      position="bottom"
>
 <!--
        在组件上使用 v-model
          :value="postMessage"
          @input="postMessage = 事件参数"
        本质还是父子通信
       -->
      <post-comment v-model="postMessage" @click-post="onPost" />
</van-popup>
  </div>
</template>

<script>
// vuex 模块提供了一些辅助方法，专门用来让我们更方便的获取容器中的数据
// mapState：映射获取 state 数据
// mapMutation：映射获取 mutation 数据
// maoAction：映射获取 action 数据
import { mapState } from 'vuex'
import { addFollow, deleteFollow } from '../../api/user'
import ArticleComment from '../home/components/article-comment'
import PostComment from './../home/components/post-comment'
import { getArticleById, addCollect, deleteCollect, addLike, deleteLike } from '../../api/article'
export default {
  name: 'ArticlePage',
  components: {
    ArticleComment,
    PostComment
  },
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      article: {},
      loading: true,
      isFollowLoading: false, // 关注按钮的loading状态
      isPostShow: false, // 发布评论的弹层显示状态
      postMessage: ''// 发布评论内容
      // 文章详情
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.loadArticle()
  },
  methods: {
    async loadArticle () {
      // 获取数据之前,loading开启，数据获取完之后，loading关闭
      this.loading = true
      try {
        const { data } = await getArticleById(this.articleId)
        this.article = data.data
      } catch (err) {
        console.log(err)
      }
      this.loading = false
    },
    async onCollect () {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '操作中...',
        forbidClick: true // 是否禁止背景点击
      })

      try {
        // 如果已收藏，则取消收藏
        if (this.article.is_collected) {
          await deleteCollect(this.articleId)
          this.article.is_collected = false
          this.$toast.success('取消收藏')
        } else {
        // 添加收藏
          await addCollect(this.articleId)
          this.article.is_collected = true
          this.$toast.success('收藏成功')
        }
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败')
      }
    },
    async onLike () {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '操作中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        // 如果已收藏，则取消收藏
        if (this.article.attitude === 1) {
          await deleteLike(this.articleId)
          this.article.attitude = -1
          this.$toast.success('取消点赞')
        } else {
        // 点赞
          await addLike(this.articleId)
          this.article.attitude = -1
          this.$toast.success('点赞成功')
        }
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败')
      }
    },
    async onFollow () {
      this.isFollowLoading = true
      try {
        const authorId = this.article.aut_id
        // 如果已关注，则取消关注
        if (this.article.is_followed) {
          await deleteFollow(authorId)
        } else {
        // 添加关注
          await addFollow(authorId)
        }
        this.article.is_followed = !this.article.is_followed
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败')
      }
      this.isFollowLoading = false
    },
    onPost () {
      console.log('发布...')
    }
  }
}
</script>

<style scoped lang="less">
@import "./github-markdown.css";
.article-container {
  padding: 46px 20px 100px;
  background: #fff;
  .loading {
    padding-top: 100px;
    text-align: center;
  }
  .detail {
    .title {
      margin: 0;
      padding-top: 24px;
      font-size: 20px;
      color: #3A3A3A;
    }
    .author-wrap {
      padding: 20px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .base-info {
        display: flex;
        align-items: center;
        .avatar {
          width: 35px;
          height: 35px;
          margin-right: 5px;
        }
        .text {
          .name {
            margin: 0;
            font-size: 12px;
          }
          .time {
            margin: 0;
            font-size: 10px;
            color: #999;
          }
        }
      }
      .follow-btn {
        width: 85px;
      }
    }
  }
  .error {
    padding-top: 100px;
    text-align: center;
    .text {
      font-size: 15px;
    }
    .btn {
      width: 30%;
    }
  }
  .footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .write-btn {
      width: 160px;
    }
    .van-icon {
      font-size: 20px;
    }
    .comment-icon {
      bottom: -2px;
    }
    .share-icon {
      bottom: -2px;
    }
  }
}
</style>
