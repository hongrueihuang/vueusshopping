<template>
    <div>
        <div class="container d-flex justify-content-center my-5">
            <button class="btn btn-primary btn-pay" @click="payMoney">點我付款</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            orderId: ''
        }
    },
    methods: {
        payMoney() {
            const vm = this;
            const api = `${process.env.API_PATH}api/${process.env.CUSTOM_PATH}/pay/${vm.orderId}`;
            vm.$http.post(api).then((response) => {
                console.log(response);
                if(response.data.success){
                    vm.$router.push(`/checkout/shoppingdetail/${vm.orderId}`)
                } else {
                    console.log('付款失敗')
                }
            })
        }
    },
    created() {
        this.orderId = this.$route.params.id
    }
}
</script>

<style lang="scss" scoped>
    .btn-pay {
        font-size: 1.5rem;
        height: 200px !important;
        width: 200px !important;
        border-radius: 50%!important;
    }
</style>