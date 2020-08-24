<template>
    <div> 
    <nav class="navbar navbar-expand-lg navbar-light bg-primary">
    <router-link to="/" class="navbar-brand">
        <div class="bg-cover" style="backgroundImage: url('https://i.imgur.com/jN5frCW.png');
        width: 120px;
        height: 80px;"></div>
    </router-link>
    </nav>
    <h1 class="text-center py-3">{{currentProcess}}</h1>
    <Process />
    <router-view></router-view>
    <Footer />
    </div>
</template>

<script>
import Process from '../Process';
import Footer from '../Footer';
export default {
    data() {
        return {
            
        }
    },
    components: {
        Process,
        Footer
    },
    computed: {
        currentProcess() {
            let process = ''
            if(this.$route.name === 'CustomInfo') {
                process = '結帳'
            } else if (this.$route.name === 'ShoppingDetail') {
                process = '結帳完成'
            } else if (this.$route.name === 'Pay') {
                process = '付款'
            }
            return process
        }
    },
    created() {
        
    }
};
</script>