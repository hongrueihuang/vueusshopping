<template>
    <div class="col-md-3">
          <div class="list-group sticky-top">
            <a href="#" class="list-group-item list-group-item-action" @click.prevent="goCategory('All')" :class="{'active': now === 'All'}">
                金牌專賣店
            </a>
            <a href="#" class="list-group-item list-group-item-action" @click.prevent="goCategory('Leisure')" :class="{'active': now === 'Leisure'}">
                休閒服飾
            </a>
            <a href="#" class="list-group-item list-group-item-action" @click.prevent="goCategory('Athlete')" :class="{'active': now === 'Athlete'}">
                運動服飾
            </a>
            <a href="#" class="list-group-item list-group-item-action" @click.prevent="goCategory('Accessory')" :class="{'active': now === 'Accessory'}">
                配件
            </a>
          </div>

    </div>
</template>

<script>
export default {
    props: ['now'],
    methods: {
        goCategory(item) {
            this.$bus.$emit('switchCategory', item)
        }
    }  
}
</script>

