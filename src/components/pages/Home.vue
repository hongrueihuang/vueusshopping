<template>
  <div>
    <Navbar @delete-cart="removeCart"/>
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Navbar from "../Navbar";
import Footer from "@/components/Footer";
export default {
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      carts:[]
    };
  },
  methods: {
    getCarts () {
      const vm = this;
      const api = `${process.env.API_PATH}api/${process.env.CUSTOM_PATH}/cart`;
      vm.$http.get(api).then((response) => {
        console.log(response);
        vm.carts = response.data.data.carts;
      })
    },
    removeCart (item) {
      const vm = this;
      const api = `${process.env.API_PATH}api/${process.env.CUSTOM_PATH}/cart/${item.id}`;
      vm.$http.delete(api).then((response) => {
        console.log(response.data)
        vm.getCarts();
      })
    },
  },
  created() {
    this.getCarts();
  }
};
</script>