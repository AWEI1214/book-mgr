<template>
  <div>
    <a-modal
      :visible="props.show"
      title="添加书籍"
      @ok="submit"
      @cancel="close"
    >
      <a-form
        :model="formState"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 10 }"
      >
        <a-form-item label="书名">
          <a-input v-model:value="addForm.name" />
        </a-form-item>
        <a-form-item label="价格">
          <a-input-number :min="0" :max="99999" v-model:value="addForm.price" />
        </a-form-item>
        <a-form-item label="作者">
          <a-input v-model:value="addForm.author" />
        </a-form-item>
        <a-form-item label="出版日期">
          <a-date-picker v-model:value="addForm.publishDate" />
        </a-form-item>
        <a-form-item label="分类">
          <a-input v-model:value="addForm.classify" />
        </a-form-item>
        <a-form-item label="库存">
          <a-input v-model:value="addForm.count" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import { book } from "../../../service/inedx";
import { result, clone } from "../../../helper/utils/index";
import { message } from "ant-design-vue";

const defaultFormData = {
  name: "",
  price: "",
  author: "",
  publishDate: 0,
  classify: "",
  count: "",
};
export default {
  components: {},
  props: {
    show: Boolean,
  },
  setup(props, context) {
    const addForm = reactive(clone(defaultFormData));

    const submit = async () => {
      const form = clone(addForm);
      form.publishDate = addForm.publishDate.valueOf();
      const res = await book.add(form);

      result(res).success((d, { data }) => {
        Object.assign(addForm, defaultFormData);
        message.success(data.msg);
      });
    };

    const close = () => {
      context.emit("update:show", false);
      context.emit("getList");
    };

    return {
      addForm,
      submit,
      props,
      close,
    };
  },
};
</script>

<style scoped lang="scss">
</style>
