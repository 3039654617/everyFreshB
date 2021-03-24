<template>
  <div>
    <a-steps :current="current" class="nav">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <BasicDetail v-if="current === 0" @next='next' :form='form'/>
      <SaleDetail v-if="current === 1" @prev='prev' @next='next' :form='form'/>
    </div>
  </div>
</template>

<script>
import BasicDetail from '@/components/basicDetail.vue';
import SaleDetail from '@/components/saleDetail.vue';
import api from '@/api/product';

export default {
  components: {
    BasicDetail,
    SaleDetail,
  },
  data() {
    return {
      current: 0,
      steps: [
        {
          title: '填写商品基本信息',
        },
        {
          title: '填写商品销售信息',
        },
      ],
      form: {
        desc: '',
        title: '',
        category: undefined,
        childrenCategory: undefined,
        arrCategory: [],
        arrChildrenCategory: [],
        price: 0,
        tags: [],
        price_off: 0,
        unit: '',
        inventory: 0,
        images: [],
      },
      requestForm: {},
    };
  },
  created() {
    if (this.$route.name === 'ProductEdit') {
      api.detail(this.$route.params.id).then((res) => {
        console.log(res);
        this.form = res;
      });
    }
  },
  methods: {
    next(form) {
      this.form = form;
      if (this.current === 1) {
        if (this.$route.name === 'ProductEdit') {
          api.edit(this.form).then((res) => {
            console.log(res);
            this.$message.success('修改成功');
          });
        } else {
          api.add(this.form).then((res) => {
            console.log(res);
            this.$message.success('新增成功');
          });
          return true;
        }
      }
      this.current += 1;
      return true;
    },
    prev() {
      this.current -= 1;
    },
  },
};
</script>

<style scoped>
.nav{
  width: 500px;
  margin: 0 auto;
  padding: 20px 0;
}
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding: 30px 150px;
}

.steps-action {
  width: 100px;
  margin: 24px auto;
}
</style>
