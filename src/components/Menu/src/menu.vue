<template>
  <div class="menu">
    <div class="title">
      <img src="@/assets/img/logo.png" alt="" />
      <span v-show="!collapse">Admin</span>
    </div>
    <el-menu
      class="el-menu"
      :collapse="collapse"
      unique-opened
      :default-active="defaultActive"
      text-color="#fff"
      background-color="#001529"
      active-text-color="#409Eff"
    >
      <template v-for="item in menuStore" :key="item.id">
        <!-- type=1：有二级菜单 -->
        <template v-if="item.type === 1">
          <!-- 二级菜单的标题 -->
          <el-sub-menu :index="String(item.id)">
            <template #title>
              <el-icon v-if="item.icon" color="#409EFC" :size="20">
                <component :is="item.icon.split('-').slice(2).join('-')" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <!-- 二级菜单子目录 -->
            <template v-for="children in item.children" :key="children.id">
              <el-menu-item
                class="el-menu-item"
                :index="String(children.id)"
                @click="handleMenuSwitch(children)"
              >
                <el-icon v-if="children.icon" color="#409EFC" :size="20">
                  <component :is="children.icon.split('-').slice(2).join('-')" />
                </el-icon>
                <span>{{ children.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>

        <!-- 一级菜单 -->
        <template v-else>
          <el-menu-item :index="String(item.id)">
            <el-icon v-if="item.icon" color="#409EFC" :size="20">
              <component :is="item.icon.split('-').slice(2).join('-')" />
            </el-icon>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import { ref, computed, defineProps } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps({
  collapse: {
    type: Boolean,
    default: false
  }
});

const menuStore = ref();
const defaultActive = ref();

const handleMenuSwitch = (item) => {
  router.push({
    path: item.url ?? "/404" // 取不到值跳到404
  });
};

// const menuItem = ref([{ name: "Dashboard", path: "/dashboard" }]);

// 当前路由信息
const menuRoutes = computed(() => {
  return (
    router
      .getRoutes()
      .find((r) => r.name === "main")
      ?.children?.filter((r) => !r.meta?.hidden)
      ?.map((r) => ({
        path: r.path,
        title: r.meta?.title || r.name,
        icon: r.meta?.icon
      })) || []
  );
});

console.log("menuRoutes: ", menuRoutes);
</script>

<style scoped lang="less">
.menu {
  overflow-x: hidden;
  overflow-y: auto;
  text-align: left;
  height: 100%;
  cursor: pointer;
  background-color: #001529;
  color: #fff;
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  &::-webkit-scrollbar {
    display: none;
  }

  .title {
    padding: 13px 0;
    text-align: center;
    height: 50px;
    font-size: 20px;

    img {
      height: 100%;
    }

    span {
      margin: 0 10px;
      vertical-align: super; /* 文字基准线 */
    }
  }

  padding: 0 10px;
  .el-menu {
    border: none;
    transition: all 100ms; /* 加速菜单内文字隐藏 */
    // 目录
    .el-submenu {
      background-color: #001529 !important;
      // 二级菜单 ( 默认背景 )
      .el-menu-item {
        padding-left: 50px !important;
        background-color: #0c2135 !important;
      }
    }

    ::v-deep .el-submenu__title {
      background-color: #001529 !important;
    }

    // hover 高亮
    .el-menu-item:hover {
      color: #fff !important; // 菜单
    }

    .el-menu-item.is-active {
      color: #fff !important;
      background-color: #0a60bd !important;
    }
  }
}
</style>
