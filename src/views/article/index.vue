<template>
  <div class="continer-arctive">
    <el-card>
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <el-form label-width="80px" size="small">
        <el-form-item label="状态">
          <el-radio-group v-model="filterData.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select
            @change="changeOption"
            v-model="filterData.channel_id"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="pubDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            clearable
            value-format="yyyy-MM-dd"
            @change="changed"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="commit" type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top:20px">
      <div slot="header">根据筛选查询到{{total_count}}条数据</div>
      <el-table :data="tableData">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" style="width:150px;height:100px">
              <div slot="error">
                <img src="../../assets/error.gif" style="width:150px;height:100px" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="Edit(scope.row.id)" plain type="primary" icon="el-icon-edit" circle></el-button>
            <el-button
              @click="deleted(scope.row.id)"
              plain
              type="danger"
              icon="el-icon-delete"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top:20px;margin-left:27%"
        background
        layout="prev, pager, next"
        :total="total_count"
        :page-size="filterData.per_page"
        @current-change="pageChange"
        :current-page="filterData.page"
      ></el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "app-arctive",
  data() {
    return {
      filterData: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      channelOptions: [{ name: "全部频道", id: null }],
      pubDate: [],
      tableData: [],
      total_count: 0
    };
  },
  methods: {
    Edit(id) {
      this.$router.push(`/publish?id=${id}`);
    },
    deleted(id) {
      this.$confirm("此操作将永久删除该文章, 是否继续?", "温馨提示", {
        confirmButtonText: "狠心删除",
        cancelButtonText: "算了",
        type: "warning"
      })
        .then(async () => {
          try {
            await this.$http({ url: `/articles/${id}`, method: "delete" });
            this.$message.success("删除成功!");
            this.getArticleList();
          } catch (e) {
            this.$message.error("删除失败!");
          }
        })
        .catch(() => {});
    },
    changed(dateArr) {
      if (dateArr) {
        this.filterData.begin_pubdate = dateArr[0];
        this.filterData.end_pubdate = dateArr[1];
      } else {
        this.filterData.begin_pubdate = null;
        this.filterData.end_pubdate = null;
      }
    },
    changeOption() {
      if (this.filterData.channel_id == "")
        return (this.filterData.channel_id = null);
    },
    commit() {
      this.filterData.page = 1;
      this.getArticleList();
    },
    async getArticleList() {
      const res = await this.$http.get("/articles", {
        params: this.filterData
      });
      this.tableData = res.data.data.results;
      this.total_count = res.data.data.total_count;
    },
    async getOptionsList() {
      const res = await this.$http.get("/channels");
      this.channelOptions = this.channelOptions.concat(res.data.data.channels);
    },
    pageChange(page) {
      this.filterData.page = page;
      this.commit();
    }
  },
  created() {
    this.getArticleList();
    this.getOptionsList();
  }
};
</script>
<style lang="less" scoped>
</style>