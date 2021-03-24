<template>
  <div class="basic-detail">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 14 }"
    >
      <a-form-model-item ref="title" label="标题" prop="title">
        <a-input v-model="form.title" />
      </a-form-model-item>
      <a-form-model-item ref="desc" label="商品描述" prop="desc">
        <a-input v-model="form.desc" />
      </a-form-model-item>
      <a-form-model-item label="商品类目" prop="category">
        <a-select v-model="form.category" placeholder="请选择一级类目"
          @change='getChildrenCategory'>
          <a-select-option :value="item.id" v-for="item in form.arrCategory"
          :key="item.id"> {{item.name}} </a-select-option>
        </a-select>
        <a-select v-model="form.childrenCategory"
          placeholder="请选择二级类目"
          >
          <a-select-option :value="data"
          v-for="data in form.arrChildrenCategory"
          :key="data"
          > {{data}} </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="商品标签" prop="desc">
        <a-select
          mode="tags"
          :default-value="['包邮，最晚次日达']"
          placeholder="下拉选择"
          v-model="form.tags"
        >
          <a-select-option value="包邮，最晚次日达">
              包邮，次日达
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">
          下一步
        </a-button>
      </a-form-model-item>
      </a-form-model>
  </div>
</template>

<script>
import axios from '@/api/category';

export default {
  props: ['form'],
  data() {
    return {
      rules: {
        name: [
          {
            required: true,
            message: '请填写对应信息',
            trigger: 'blur',
          },
          {
            min: 3,
            max: 5,
            message: 'Length should be 3 to 5',
            trigger: 'blur',
          },
        ],
        region: [
          {
            required: true,
            message: 'Please select Activity zone',
            trigger: 'change',
          },
        ],
        date1: [
          { required: true, message: 'Please pick a date', trigger: 'change' },
        ],
        type: [
          {
            type: 'array',
            required: true,
            message: 'Please select at least one activity type',
            trigger: 'change',
          },
        ],
        resource: [
          {
            required: true,
            message: 'Please select activity resource',
            trigger: 'change',
          },
        ],
        desc: [
          {
            required: true,
            message: 'Please input activity form',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  created() {
    axios.list().then((res) => {
      this.form.arrCategory = res.data;
    });
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('next', this.form);
          return true;
        }
        return false;
      });
    },
    getChildrenCategory(id) {
      const arrChildrenCategory = this.form.arrCategory.filter((item) => {
        if (item.id === id) {
          return true;
        }
        return false;
      });
      this.form.arrChildrenCategory = arrChildrenCategory[0].c_items;
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
  },
};
</script>
