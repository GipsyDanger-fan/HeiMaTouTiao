<template>
  <div class="continer-publish">
    <div class="continer-comment">
      <el-card>
        <div slot="header">
          <my-bread v-if="typeof(id) != 'number'">发布文章</my-bread>
          <my-bread v-else>编辑文章</my-bread>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  name: "app-publish",
  data() {
    return {
      id: ""
    };
  },
  created() {
    if (this.$route.query.id) this.id = +this.$route.query.id;
    console.log(this.id);
    console.log(typeof this.id);
  }
};
</script>
<style lang="less" scoped>
</style>