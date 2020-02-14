<template>
  <div class="container-image">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <!-- 按钮 -->
      <div class="btn-box">
        <el-radio-group @change="changeCollect" v-model="reqParams.collect" size="small">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button style="float:right" @click="addImages" type="success" size="small">添加素材</el-button>
      </div>
      <div class="img-list">
        <div class="img-item" v-for="item in images" :key="item.id">
          <img :src="item.url" />
          <div class="option">
            <span
              @click="toggleCollected(item)"
              class="el-icon-star-off"
              :class="{red:item.is_collected}"
            ></span>
            <span @click="deleted(item.id)" class="el-icon-delete"></span>
          </div>
        </div>
      </div>
      <el-pagination
        style="margin-left:35%"
        background
        layout="prev, pager, next"
        :total="sum"
        :page-size="reqParams.per_page"
        @current-change="pageChange"
        :current-page="reqParams.page"
      ></el-pagination>
    </el-card>
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :show-file-list="false"
        name="image"
        :headers="getToken"
        :on-success="handleAvatarSuccess"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-dialog>
  </div>
</template>
<script>
import auth from "@/utils/auth";
export default {
  name: "app-images",
  data() {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      images: [],
      sum: 0,
      dialogVisible: false,
      imageUrl: null,
      getToken: { Authorization: `Bearer ${auth.getUser().token}` }
    };
  },
  created() {
    this.getImagesList();
  },
  methods: {
    async getImagesList() {
      try {
        const res = await this.$http.get("/user/images", {
          params: this.reqParams
        });
        this.images = res.data.data.results;
        this.sum = res.data.data.total_count;
      } catch (e) {
        return;
      }
    },
    pageChange(newPage) {
      this.reqParams.page = newPage;
      this.getImagesList();
    },
    changeCollect() {
      this.reqParams.page = 1;
      this.getImagesList();
    },
    async toggleCollected(item) {
      try {
        const res = await this.$http.put(`/user/images/${item.id}`, {
          collect: !item.is_collected
        });
        item.is_collected = res.data.data.collect;
        item.is_collected
          ? this.$message.success("收藏成功!")
          : this.$message.success("取消成功!");
        // collect:
      } catch (e) {
        this.$message.error("操作失败!");
      }
    },
    deleted(id) {
      this.$confirm("此操作将永久删除该素材, 是否继续?", "温馨提示", {
        confirmButtonText: "狠心删除",
        cancelButtonText: "算了",
        type: "warning"
      })
        .then(async () => {
          try {
            await this.$http.delete(`/user/images/${id}`);
            this.$message.success("删除成功!");
            this.getImagesList();
          } catch (e) {
            this.$message.error("操作失败!");
          }
        })
        .catch(() => {});
    },
    addImages() {
      this.dialogVisible = true;
      this.imageUrl = null;
    },
    handleAvatarSuccess(res) {
      this.imageUrl = res.data.url;
      window.setTimeout(() => {
        this.getImagesList();
        this.dialogVisible = false;
      }, 3000);
    }
  }
};
</script>
<style lang="less" scoped>
.img-list {
  margin: 0 70px 15px;
  .img-item {
    width: 260px;
    height: 260px;
    border: 1px dashed #ddd;
    position: relative;
    margin-top: 20px;
    display: inline-block;
    margin-right: 30px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .option {
      width: 100%;
      height: 30px;
      line-height: 30px;
      background: rgba(0, 0, 0, 0.3);
      position: absolute;
      left: 0;
      bottom: 0;
      text-align: center;
      span {
        color: #fff;
        margin: 0 30px;
      }
      .red {
        color: red;
      }
    }
  }
}
</style>