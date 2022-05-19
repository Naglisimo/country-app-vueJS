<template>
    <div class="container border-shadow">

        <div class="grid" v-for="item in countries" v-bind:key="item.id">
            <!-- <div><p @click="getData(`${url}/${item.id}/cities`)">{{item.attributes.name}}</p></div> -->
            <div><router-link :to="{ name: 'cities', params: { id: item.id}}"  ><p>{{item.attributes.name}}</p></router-link></div>
            <div><p>{{item.attributes.area}}</p></div>
            <div><p>{{item.attributes.population}}</p></div>
            <div v-if=atCountries><p>{{item.attributes.phone_code}}</p></div>
            <div v-else><p>{{item.attributes.postal_code}}</p></div>
            <div class="flex">
            <button @click="deleteData(item.id)"><img src='../assets/icons/trash.svg'></button>
            <button @click="editData(item.id)"><img src='../assets/icons/pen.svg'></button>
            </div>
        </div>

    </div>
</template>``

<script>
import axios from 'axios'
import { urlAPI } from '../../vue.config'


export default {
    props: ['countries', 'atCountries'],


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

        },
        editData(id){
            
        let reqUrl = `${this.computedUrl}/${id}`
            axios.get(reqUrl)
            .then(res => this.$emit('toggleState', res.data))
            console.log(reqUrl)
        },
        deleteData(id){
            let reqUrl = `${this.computedUrl}/${id}`
            axios.delete(reqUrl)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        }
    },

    computed: {
        computedUrl(){
            if(this.atCountries){
                return urlAPI
            } else {
                return `${urlAPI}/${this.$route.params.id}/cities`
            }
        }
    },

    created() {

    }
    

}

</script>

<style scoped>






</style>