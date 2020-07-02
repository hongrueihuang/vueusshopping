<template>
  <div>
    <Alert />
    <DashboardNav />

    <div class="container-fluid">
      <div class="row">
        <DashboardSidebar />

        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardNav from "../DashboardNav";
import DashboardSidebar from "../DashboardSidebar";
import Alert from "../AlertMessage";
export default {
  components: {
    DashboardNav,
    DashboardSidebar,
    Alert
  },
  
};
</script>
<style lang="scss" scoped>
@import "../../assets/helpers/dashboard";
</style>
