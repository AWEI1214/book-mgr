<template>
  <div>
    <a-card>
      <h2>用户管理</h2>

      <a-divider></a-divider>
      <space-between>
        <div class="search">
          <a-input-search
            placeholder="根据用户名搜索"
            enter-button
            v-model:value="keyword"
            @search="onSearch"
          />
          <a v-if="isSearch" href="javascript:;" @click="backAll">返回</a>
        </div>

        <a-button @click="showAddModal = true">添加用户</a-button>
      </space-between>
      <a-divider></a-divider>

      <div>
        <a-table
          bordered
          :pagination="false"
          :columns="columns"
          :data-source="list"
        >
          <template #createdAt="{ record }">
            {{ formatTimestamp(record.meta.createdAt) }}
          </template>
          <template #actions="{ record }">
            <a href="javascript:;" @click="resetPassword(record)">重置密码</a>
            &nbsp;
            <a href="javascript:;" @click="remove(record)">删除</a>
          </template>
        </a-table>
      </div>
      <flex-end style="margin-top: 24px" v-if="!isSearch">
        <a-pagination
          v-model:current="curPage"
          :total="total"
          :page-size="10"
          @change="setPage"
        ></a-pagination>
      </flex-end>
    </a-card>
    <AddOne v-model:show="showAddModal" @getUser="getUser" />
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { onMounted } from "vue";
import { user } from "../../service/inedx";
import { result, formatTimestamp } from "../../helper/utils";
import { message } from "ant-design-vue";
import AddOne from "./AddOne/index.vue";
export default {
  components: {
    AddOne,
  },
  setup(props) {
    const list = ref([]);
    const curPage = ref(1);
    const total = ref(0);
    const showAddModal = ref(false);
    const columns = [
      {
        title: "账户",
        dataIndex: "account",
      },
      {
        title: "创建日期",
        slots: {
          customRender: "createdAt",
        },
      },
      {
        title: "操作",
        slots: {
          customRender: "actions",
        },
      },
    ];
    const keyword = ref("");
    const isSearch = ref(false);

    //获取用户列表
    const getUser = async () => {
      const res = await user.list(curPage.value, 10, keyword.value);

      result(res).success(({ data: { list: l, total: t } }) => {
        list.value = l;
        total.value = t;
      });
    };

    onMounted(() => {
      getUser();
    });

    //删除数据方法
    const remove = async ({ _id }) => {
      const res = await user.remove(_id);

      result(res).success(({ msg }) => {
        message.success(msg);
        getUser();
      });
    };

    const setPage = (page) => {
      curPage.value = page;

      getUser();
    };

    //重置密码
    const resetPassword = async ({ _id }) => {
      const res = await user.resetPassword(_id);

      result(res).success(({ msg }) => {
        message.success(msg);
      });
    };

    const onSearch = () => {
      getUser();
      isSearch.value = !!keyword.value;
    };

    const backAll = () => {
      isSearch.value = false;
      keyword.value = "";
      getUser();
    };

    return {
      list,
      curPage,
      total,
      getUser,
      columns,
      formatTimestamp,
      remove,
      showAddModal,
      setPage,
      resetPassword,
      keyword,
      onSearch,
      backAll,
      isSearch,
    };
  },
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
