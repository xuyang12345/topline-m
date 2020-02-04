<template>
  <div class="post-comment">
      <van-field  class="post-field"
     :value="value"
     @input="$emit('input',$event)"
      rows="2"
      autosize
      type="textarea"

      placeholder="优质评论将会被优先展示"
      show-word-limit></van-field>
      <van-button
      type="primary"
      @click="$emit('click-post')"
      size="small">发布</van-button>
  </div>
</template>

<script>
export default {
  name: 'PostComment',
  components: {},
  props: {
    value: {
      type: {
        type: String,
        required: true
      }
    }
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onInput (value) {
      this.$emit('input', value)
    }
  }
}

</script>

<style scoped lang="less">
.post-comment {
  display: flex;
  padding: 15px;
  align-items: flex-end;
  .post-field {
    background: #f5f7f9;
 margin-right: 15px;
  }
}
</style>
