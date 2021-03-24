<template>
  <a-form-model
    layout="inline"
    @submit="handleSubmit"
  >
    <a-form-model-item label="检索关键字">
      <a-input v-model="formInline.searchWord" placeholder="请输入关键字">
      </a-input>
    </a-form-model-item>
    <a-form-model-item label="商品类别">
      <a-select
        show-search
        placeholder="选择类别"
        style="width: 200px"
        @change="handleChange"
        allowClear
      >
        <a-select-option
          :value="option.id"
          v-for="option in categoryList"
          :key="option.id"
        >
          {{option.name}}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item>
      <a-button type="primary" html-type="submit"> 搜索 </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import api from '@/api/category';

export default {
  data() {
    return {
      categoryList: [],
      formInline: {
        searchWord: '',
        category: '',
      },
    };
  },
  created() {
    api.list().then((res) => {
      this.categoryList = res.data;
    });
  },
  methods: {
    handleSubmit() {
      this.$emit('mclick', this.formInline);
    },
    handleChange(value) {
      this.formInline.category = value;
    },
  },
};
</script>
