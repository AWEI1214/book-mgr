<template>
  <div>
    <a-modal
      :visible="props.show"
      title="添加用户"
      @ok="submit"
      @cancel="close"
    >
      <a-form
        :model="formState"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 10 }"
      >
        <a-form-item label="账号">
          <a-input v-model:value="addForm.account" />
        </a-form-item>
        <a-form-item label="密码">
          <a-input v-model:value="addForm.password" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import { user } from "../../../service/inedx";
import { result, clone } from "../../../helper/utils/index";
import { message } from "ant-design-vue";

const defaultFormData = {
  account: "",
  password: "",
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
      const res = await user.add(form.account, form.password);

      result(res).success((d, { data }) => {
        Object.assign(addForm, defaultFormData);
        message.success(data.msg);
      });
    };

    const close = () => {
      context.emit("update:show", false);
      context.emit("getUser");
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
