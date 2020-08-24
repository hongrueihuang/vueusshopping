<template>

    <nav class="col-md-2 d-none d-md-block bg-light sidebar">
      <div class="sidebar-sticky">
        <ul class="nav flex-column">
          <li class="nav-item" @click="currentPage = 'Products'">
            <router-link class="nav-link" :class="{'active' : currentPage === 'Products'}" to="products">
              <span data-feather="home"></span>
              產品列表
              <span class="sr-only">(current)</span>
            </router-link>
          </li>
          <li class="nav-item" @click="currentPage = 'Orders'">
            <router-link class="nav-link" :class="{'active' : currentPage === 'Orders'}" to="orders">
              <span data-feather="file"></span>
              訂單管理
            </router-link>
          </li>
          <li class="nav-item" @click="currentPage = 'Coupons'">
            <router-link class="nav-link" :class="{'active' : currentPage === 'Coupons'}" to="coupon" @click.prevent="currentPage = 'coupons'">
              <span data-feather="file"></span>
              優惠券
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
</template>

<script>
export default {
  data() {
    return {
      currentPage: ''
    }
  },
  created() {
    this.currentPage = this.$route.name
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/helpers/dashboard";
</style>