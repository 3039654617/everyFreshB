<template>
  <div class="product-list">
    <search @mclick="submit" />
    <Table
      :data="tableData"
      :pagination="pagination"
      @changePage="changePage"
      @getTableAgain="getTable"
    />
  </div>
</template>

<script>
import Search from '@/views/layout/component/Search.vue';
import Table from '@/views/layout/component/Table.vue';
import api from '@/api/product';

export default {
  components: {
    Search,
    Table,
  },
  data() {
    return {
      search: {},
      tableData: [],
      pagination: {
        current: 1,
        pageSize: 9,
        showSizeChanger: true,
        total: 1,
      },
    };
  },
  created() {
    this.getTable();
  },
  methods: {
    submit(search) {
      this.search = search;
      this.getTable();
    },
    getTable() {
      api
        .list({
          page: this.pagination.current,
          size: this.pagination.pageSize,
          ...this.search,
        })
        .then((res) => {
          this.tableData = res.data;
          this.pagination.total = res.total;
        });
    },
    changePage(page) {
      this.pagination = page;
      this.getTable();
    },
  },
};
</script>

<style>
</style>
