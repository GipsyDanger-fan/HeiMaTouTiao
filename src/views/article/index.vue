<template>
  <div class="continer-arctive">article</div>
</template>
<script>
export default {
  name: "app-arctive",
  data() {
    return {};
  },
  created() {
    this.$http({
      url: "/search",
      method: "get",
      params: {
        q: "a"
      }
    }).then(res => {
      console.log(res.data.data);
    });
  }
};
</script>
<style lang="less" scoped>
</style>