<template>
  <div>
    <a-card>
      <h2>图书列表</h2>
      <a-divider />
      <space-between>
        <div class="search">
          <a-input-search
            placeholder="根据书名搜索"
            enter-button
            v-model:value="keyword"
            @search="onSearch"
          />
          <a v-if="isSearch" href="javascript:;" @click="backAll">返回</a>
        </div>
        <a-button @click="show = true">添加一条</a-button>
      </space-between>

      <a-divider />
      <a-table :columns="columns" :data-source="list" :pagination="false">
        <template #publishDate="data">
          {{ formatTimestamp(data.record.publishDate) }}
        </template>

        <template #count="data">
          <a href="javascript:;" @click="updateCount(1, data.record)">入库</a>
          {{ data.record.count }}
          <a href="javascript:;" @click="updateCount(2, data.record)">出库</a>
        </template>

        <template #actions="record">
          <a href="javascript:;" @click="update(record)">编辑</a>
          &nbsp;<span style="color: rgb(168, 168, 168)">|</span>&nbsp;
          <a href="javascript:;" @click="remove(record)">删除</a>
        </template>
      </a-table>
      <space-between style="margin-top: 24px">
        <div></div>
        <a-pagination
          v-model:current="curpage"
          :total="total"
          :page-size="10"
          @change="setPage"
        />
      </space-between>
    </a-card>
    <add-one v-model:show="show" @getList="getList" />
    <update
      v-model:show="showUpdateModal"
      :book="curEditBook"
      @updateCurBook="updateCurBook"
    />
  </div>
</template>

<script>
import AddOne from "./AddOne/index.vue";
import Update from "./Update/index.vue";
import { ref, onMounted } from "vue";
import { book } from "../../service/inedx";
import { result, formatTimestamp } from "../../helper/utils/index";
import { Input, message, Modal } from "ant-design-vue";

export default {
  components: {
    AddOne,
    Update,
  },
  setup() {
    const columns = [
      {
        title: "书名",
        dataIndex: "name",
      },
      {
        title: "作者",
        dataIndex: "author",
      },
      {
        title: "出版日期",
        dataIndex: "publishDate",
        slots: {
          customRender: "publishDate",
        },
      },
      {
        title: "分类",
        dataIndex: "classify",
      },
      {
        title: "价格",
        dataIndex: "price",
      },
      {
        title: "库存",
        slots: {
          customRender: "count",
        },
      },
      {
        title: "操作",
        slots: {
          customRender: "actions",
        },
      },
    ];

    const show = ref(false);
    const showUpdateModal = ref(false);

    const list = ref([]); //展示数据
    const total = ref(0); //数据总条数
    const curpage = ref(1); //当前页数
    const keyword = ref(""); //搜索关键词
    const isSearch = ref(false);
    const curEditBook = ref({});

    //请求数据
    const getList = async () => {
      const res = await book.list({
        //页数
        page: curpage.value,
        //请求的条数
        size: 10,
        //关键词
        keyword: keyword.value,
      });

      result(res).success(({ data: { list: l, total: t } }) => {
        //请求到的数据
        list.value = l;
        //数据总条数
        total.value = t;
      });
    };

    onMounted(async () => {
      getList();
    });

    //页数改变后重新请求数据
    const setPage = (page) => {
      curpage.value = page;
      getList();
    };

    //关键词搜索
    const onSearch = () => {
      getList();

      isSearch.value = Boole(keyword.value);
    };

    //清空搜索框
    const backAll = () => {
      keyword.value = "";
      getList();
      isSearch.value = false;
    };

    //删除数据
    const remove = async ({ text: record }) => {
      const { _id } = record;

      const res = await book.remove(_id);

      result(res).success(({ msg }) => {
        message.success(msg);

        getList();
      });
    };

    //修改库存
    const updateCount = (type, record) => {
      let word = "增加";

      if (type === 2) {
        word = "减少";
      }

      Modal.confirm({
        title: `要${word}多少库存`,
        content: (
          <div>
            <Input class="_book_input_count" />
          </div>
        ),
        async onOk() {
          const el = document.querySelector("._book_input_count");
          const res = await book.updateCount({
            id: record._id,
            num: el.value,
            type,
          });
          // console.log(res);
          result(res).success(({ msg }) => {
            message.success(msg);
          });
          getList();
        },
      });
    };

    const update = ({ record }) => {
      showUpdateModal.value = true;
      curEditBook.value = record;
      // console.log(record);
    };

    const updateCurBook = (newData) => {
      Object.assign(curEditBook.value, newData);
    };

    return {
      columns,
      show,
      list,
      total,
      formatTimestamp, //将时间戳改为时间方法
      curpage,
      setPage,
      keyword,
      getList,
      onSearch,
      backAll,
      isSearch,
      remove,
      updateCount,
      showUpdateModal,
      update,
      curEditBook,
      updateCurBook,
    };
  },
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
