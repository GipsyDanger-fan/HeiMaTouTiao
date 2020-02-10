<template>
  <div class="continer-arctive">article</div>
</template>
<script>
export default {
  name: "app-arctive",
  data() {
    return {};
  },
  async created() {
    const res = await this.$http({
      url: "/search",
      method: "get",
      params: {
        q: "a"
      }
    });
    console.log(res.data.data);
  }
};
</script>
<style lang="less" scoped>
</style>