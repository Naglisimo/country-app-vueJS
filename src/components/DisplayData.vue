<template>
    <div class="container table border-shadow">


        <Table-header v-bind:atCountries='atCountries'/>
        <div class="grid" v-for="item in countries" v-bind:key="item.id">
            <!-- <div><p @click="getData(`${url}/${item.id}/cities`)">{{item.attributes.name}}</p></div> -->
            <div><router-link :to="{ name: 'cities', params: { id: item.id}}"  ><p>{{item.attributes.name}}</p></router-link></div>
            <div><p>{{item.attributes.area}}</p></div>
            <div><p>{{item.attributes.population}}</p></div>
            <div v-if=atCountries><p>{{item.attributes.phone_code}}</p></div>
            <div v-else><p>{{item.attributes.postal_code}}</p></div>
            <div class="flex">
            <button><img src='../assets/icons/trash.svg'></button>
            <button><img src='../assets/icons/pen.svg'></button>
            </div>
        </div>
<!-- 
        {{countries}} -->
    </div>
</template>``

<script>
import axios from 'axios'
import TableHeader from './TableHeader.vue'

export default {
    props: ['countries', 'atCountries', 'url'],

    components: {
        TableHeader,
    },

    data: () => {
        return {
        }
    },
    methods: {
            getData(url){
            axios
            .get(url)
            .then( ({data}) => {
                this.countries = data.data
                this.maxPages = data.meta.last_page
                this.currentPage = data.meta.current_page
                // this.paginationLoop(data)
                console.log(data)
                                })

        }
    },

    created() {
        console.log('at countries', this.atCountries)
    }
    

}

</script>

<style scoped>
.grid {
    display: grid;
    grid-template-columns: repeat(4, 2fr) 1fr;
    justify-content: center;
    align-items: center;

}

 .table{
     margin-top: 24px;
     justify-self: center;
     align-self: center;
 }




</style>