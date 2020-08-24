<template>
  <div>
    <Carousel />
    <div class="container my-2">
      <div class="row">
        <Sidebar :now="currentPage" />
        <div class="col-md-9">
          <Commodity :item="filterProducts" @addItem="addCart" @switchPagination="getProducts" :pageNum="filterPagination" />
          </div>
        </div>
        </div>
  </div>
</template>

<script>
import Sidebar from '../Sidebar';
import Carousel from '../Carousel';
import Commodity from '../pages/Commodity';
export default {
  components: {
    Carousel,
    Sidebar,
    Commodity
  },
  data() {
    return {
      products: [],
      currentPage: 'All',
      pagination: {},
    };
  },
  methods: {
    getProducts(page = 1) {
      const vm = this;
      let api = `${process.env.API_PATH}api/${process.env.CUSTOM_PATH}/products?page=${page}`;
      if(vm.currentPage === 'All') {
        vm.$http.get(api).then(response => {
          console.log(response);
          vm.products = response.data.products;
          vm.pagination = response.data.pagination;
        });
      } else {
        let api = `${process.env.API_PATH}api/${process.env.CUSTOM_PATH}/admin/products/all`;
        vm.$http.get(api).then(response => {
          console.log(response);
          vm.products = response.data.products;
          vm.pagination = {};
      });
      }
        
    },
    addCart(id, qty = 1) {
      const vm = this;
      const api = `${process.env.API_PATH}api/${process.env.CUSTOM_PATH}/cart`;
      const cart = {
        product_id: id,
        qty
      };
      vm.$http.post(api, { data: cart }).then(response => {
        console.log(response);
        vm.$bus.$emit('updateCart')
      });
    },
  },
  computed: {
    filterProducts() {
      const vm = this;
      if (vm.currentPage === "All") {
        return vm.products;
      } else if (vm.currentPage === "Leisure") {
        let newProducts = [];
        newProducts = vm.products.filter(function(item, i, arr) {
          return item.category === "休閒";
        });
        return newProducts;
      } else if (vm.currentPage === "Athlete") {
        let newProducts = [];
        newProducts = vm.products.filter(function(item, i, arr) {
          return item.category === "運動服";
        });
        return newProducts;
      } else if (vm.currentPage === "Accessory") {
        let newProducts = [];
        newProducts = vm.products.filter(function(item, i, arr) {
          return item.category === "配件";
        });
        return newProducts;
      }
    },
    filterPagination() {
      const vm = this;
      if(vm.currentPage === 'All') {
        return vm.pagination;
      } else {
        return {}
      }
    },
  },
  created() {
    const vm = this;
    vm.getProducts();
    vm.$bus.$on('switchCategory', (nowPage) => {
      vm.currentPage = nowPage
    });
    // console.log(this.$route.name)
  }
};
</script>

<style lang="scss" scoped>
.box-shadow {
  transition: all .3s;
  &:hover {
    box-shadow: 0 8px 8px #aaa!important;
  }
}
</style>