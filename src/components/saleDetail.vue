<template>
  <div class="basic-detail">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item ref="price" label="商品售价" prop="price">
        <a-input v-model="form.price" />
      </a-form-model-item>
      <a-form-model-item ref="price_off" label="折扣价格" prop="price_off">
        <a-input v-model="form.price_off" />
      </a-form-model-item>
      <a-form-model-item ref="inventory" label="商品库存" prop="inventory">
        <a-input v-model="form.inventory" />
      </a-form-model-item>
      <a-form-model-item ref="unit" label="计量单位" prop="unit">
        <a-input v-model="form.unit" />
      </a-form-model-item>
      <a-form-model-item ref="images" label="商品相册" prop="images">
        <a-upload
          :action="'http://mallapi.duyiedu.com/upload/images?appkey=' + $store.state.userInfo.appkey"
          list-type="picture-card"
          :file-list="fileList"
          @preview="handlePreview"
          @change="handleChange"
          name='avatar'
        >
          <div v-if="fileList.length < 3">
            <a-icon type="plus" />
            <div class="ant-upload-text">
              上传
            </div>
          </div>
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </a-upload>
      </a-form-model-item>
      <div class="button">
        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="prev"> 回退 </a-button>
        </a-form-model-item>' '
        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onSubmit"> 提交 </a-button>
        </a-form-model-item>
      </div>
    </a-form-model>
  </div>
</template>

<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  props: ['form'],
  created() {
    if (this.form.images.length !== 0) {
      this.fileList = this.form.images.map((item, index) => ({
        uid: index,
        name: `${item}.png`,
        status: 'done',
        url: item,
      }));
    }
  },
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: '',
      fileList: [],
      rules: {
        price: [
          {
            required: true,
            message: '请填写价格',
            trigger: 'blur',
          },
          {
            min: -1,
            max: 9,
            message: '长度为0到9',
            trigger: 'blur',
          },
        ],
        price_off: [
          {
            required: true,
            message: '请填写折扣价格',
            trigger: 'blur',
          },
          {
            min: -1,
            max: 9,
            message: '长度为0到9',
            trigger: 'blur',
          },
        ],
        inventory: [
          { required: true, message: '请填写库存量', trigger: 'change' },
        ],
      },
    };
  },
  methods: {
    prev() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('prev', this.form);
          return true;
        }
        return false;
      });
    },
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('next', this.form);
          return true;
        }
        return false;
      });
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      const obj = file;
      if (!file.url && !file.preview) {
        obj.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ file, fileList }) {
      this.fileList = fileList;
      if (file.status === 'done') {
        this.form.images.push(file.response.data.url);
      } else if (file.status === 'removed') {
        this.form.images = this.form.images.filter((item) => item !== file.response.data.url);
      }
    },
  },
};
</script>

<style scoped>
.button{
  display: flex;
  width: 160px;
  margin: 0 auto;
  padding-right: 250px;
}
</style>
