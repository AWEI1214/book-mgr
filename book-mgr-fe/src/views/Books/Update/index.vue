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
          <a-input v-model:value="editForm.name" />
        </a-form-item>
        <a-form-item label="价格">
          <a-input-number
            :min="0"
            :max="99999"
            v-model:value="editForm.price"
          />
        </a-form-item>
        <a-form-item label="作者">
          <a-input v-model:value="editForm.author" />
        </a-form-item>
        <a-form-item label="出版日期">
          <a-date-picker v-model:value="editForm.publishDate" />
        </a-form-item>
        <a-form-item label="分类">
          <a-input v-model:value="editForm.classify" />
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
import { watch } from "@vue/runtime-core";
import moment from "moment";

export default {
  components: {},
  props: {
    show: Boolean,
    book: Object,
  },
  setup(props, context) {
    const editForm = reactive({
      name: "",
      price: "",
      author: "",
      publishDate: 0,
      classify: "",
    });

    const close = () => {
      context.emit("update:show", false);
      context.emit("getList");
    };

    //在编辑框中展示当前书籍的信息
    watch(
      () => props.book,
      (current) => {
        Object.assign(editForm, current);
        editForm.publishDate = moment(Number(editForm.publishDate));
      }
    );

    const submit = async () => {
      const res = await book.update({
        id: props.book._id,
        name: editForm.name,
        price: editForm.price,
        author: editForm.author,
        publishDate: editForm.publishDate.valueOf(),
        classify: editForm.classify,
      });
      // console.log(res);
      result(res).success(({ data, msg }) => {
        context.emit("updateCurBook", data);
        // 更新页面数据

        message.success(msg);
      });

      close();
    };

    return {
      editForm,
      submit,
      props,
      close,
    };
  },
};
</script>

<style scoped lang="scss">
</style>
