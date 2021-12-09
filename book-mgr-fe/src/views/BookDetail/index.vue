<template>
  <div>
    <a-card>
      <space-between>
        <h2>{{ d.name }}</h2>
        <div>
          <a-button size="small" type="primary" @click="showUpdateModal = true"
            >编辑</a-button
          >
          &nbsp;
          <a-button size="small" type="danger" @click="remove">删除</a-button>
        </div>
      </space-between>
      <a-divider> </a-divider>
      <div class="base-info">
        <div class="items">
          <div class="item">
            <div class="title">价格</div>
            <div class="content">{{ d.price }}</div>
          </div>
          <div class="item">
            <div class="title">作者</div>
            <div class="content">{{ d.author }}</div>
          </div>
          <div class="item">
            <div class="title">分类</div>
            <div class="content">{{ d.classify }}</div>
          </div>
        </div>
        <div class="items">
          <div class="item">
            <div class="title">出版日期</div>
            <div class="content">{{ formatTimestamp(d.publishDate) }}</div>
          </div>
        </div>
      </div>
    </a-card>
    <div class="log">
      <a-card title="出入库日志">
        <template #extra>
          <span>
            <a href="javascript:;" @click="logFilter(1)"
              ><CheckOutlined v-if="curLogType === 1" />入库日志</a
            >
          </span>
          &nbsp;
          <span style="margin-left: 12px">
            <a href="javascript:;" @click="logFilter(2)">
              <CheckOutlined v-if="curLogType === 2" />出库日志</a
            >
          </span>
        </template>
        <div>
          <a-table
            :data-source="log"
            :columns="columns"
            bordered
            :pagination="false"
          >
            <template #createdAt="{ record }">
              {{ formatTimestamp(record.meta.createdAt) }}
            </template>
          </a-table>
        </div>

        <space-between style="margin-top: 24px">
          <div />
          <a-pagination
            v-model:current="logCurPage"
            :total="logTotal"
            :page-size="10"
            @change="setLogPage"
          ></a-pagination>
        </space-between>
      </a-card>
    </div>
    <Update v-model:show="showUpdateModal" :book="d" @updateCurBook="update" />
  </div>
</template>

<script>
import { book, inventoryLog } from "../../service/inedx";
import { useRoute, useRouter } from "vue-router";
import { result, formatTimestamp } from "../../helper/utils/index";
import { ref, onMounted } from "vue";
import { message } from "ant-design-vue";
import Update from "../Books/Update/index.vue";
import { CheckOutlined } from "@ant-design/icons-vue";

export default {
  components: {
    Update,
    CheckOutlined,
  },
  setup(props) {
    const columns = [
      {
        title: "数量",
        dataIndex: "num",
      },
      {
        title: "操作时间",
        slots: {
          customRender: "createdAt",
        },
      },
    ];

    const route = useRoute();
    const router = useRouter();
    const id = route.params.id;
    const detailInfo = ref({});
    const showUpdateModal = ref(false);
    const log = ref([]);
    const logTotal = ref(0);
    const logCurPage = ref(1);
    const curLogType = ref(1);

    //获取书籍数据
    const getDetail = async () => {
      const res = await book.detail(id);

      result(res).success(({ data }) => {
        detailInfo.value = data;
      });
    };

    //删除书籍
    const remove = async () => {
      const res = await book.remove(id);

      result(res).success(({ msg }) => {
        message.success(msg);

        router.replace("/books");
      });
    };

    //编辑书籍
    const update = async (book) => {
      Object.assign(detailInfo.value, book);
    };

    //获取出入库日志
    const getInventoryLog = async () => {
      const res = await inventoryLog.list(
        curLogType.value,
        logCurPage.value,
        10
      );

      result(res).success(({ data: { list, total } }) => {
        log.value = list;
        logTotal.value = total;
      });
    };

    //日志分页切换
    const setLogPage = async (page) => {
      logCurPage.value = page;

      getInventoryLog();
    };

    const logFilter = (type) => {
      curLogType.value = type;

      getInventoryLog();
    };

    onMounted(() => {
      getDetail();
      getInventoryLog();
    });

    return {
      d: detailInfo,
      formatTimestamp,
      remove,
      showUpdateModal,
      update,
      log,
      logTotal,
      setLogPage,
      columns,
      logFilter,
      curLogType,
      logCurPage,
    };
  },
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
