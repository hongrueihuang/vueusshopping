<template>
  <div>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <router-link class="navbar-brand col-sm-3 col-md-2 mr-0" to="/">管理後臺</router-link>
      
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#" @click.prevent="logout">Sign out</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      const vm = this;
      const api = `${process.env.API_PATH}logout`;
      vm.$http.post(api).then(response => {
        console.log(response);
        if (response.data.success) {
          vm.$router.push("/");
        } else {
          console.log("登出失敗");
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/helpers/dashboard";
</style>
