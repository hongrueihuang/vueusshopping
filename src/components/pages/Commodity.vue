<template>
    <div>
        <div class="row">
            <div class="col-md-4 my-2" v-for="comm in item" :key="comm.id">
              <div class="card box-shadow border-0">
                <div :style="`background-image: url(${comm.imageUrl})`" class="card-image w-100"></div>
                <div class="card-body">
                  <div class="card-title text-center">{{comm.title}}</div>
                </div>
                <div class="btn-group w-100">
                  <router-link class="btn btn-light rounded-0" :to="`home/${comm.id}`"><i class="fas fa-search"></i>看更多資訊</router-link>
                  <button class="btn btn-primary rounded-0" @click="addToCart(comm.id)"><i class="fas fa-cart-plus"></i>加到購物車</button>
                </div>
              </div>
            </div>
        </div>
        <div class="row justify-content-end">
          <div class="col-md-4">
            <Pagination :page="pageNum" @changePageNum="changePage"  v-if="pageNum.total_pages"/>
          </div>
        </div>
    </div>
</template>

<script>
import Pagination from '../Pagination';
export default {
    props: ['item', 'pageNum'],
    components: {
      Pagination
    },
    data() {
        return {

        }
    },
    methods: {
        addToCart(item) {
            this.$emit('addItem', item);
        },
        changePage(item) {
          this.$emit('switchPagination', item);
        }
    }
}
</script>
<style lang="scss" scoped>
.box-shadow {
  transition: all .3s;
  &:hover {
    box-shadow: 0 8px 8px #aaa!important;
  }
}
</style>