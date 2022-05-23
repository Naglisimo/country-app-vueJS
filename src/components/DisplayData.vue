<template>
    <div class="container border-shadow ">


             <Table-header 
                v-bind:atCountries='atCountries'
                v-bind:url='url'
                v-on:sortAsc="sortAsc($event)"
                v-on:sortDesc="sortDesc($event)"/>

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
import TableHeader from './TableHeader.vue'
import axios from 'axios'
import { urlAPI } from '../../vue.config'


export default {
    props: ['countries', 'atCountries'],

    components: {
        TableHeader
    },

    data: () => {
        return {

        }
    },
    methods: {

        editData(id){
            this.$emit('isEditing', {isEditing: true, idOfEditing: id})
            
        let reqUrl = `${this.computedUrl}/${id}`
            axios.get(reqUrl)
            .then(res => {
                this.$emit('toggleState', res.data)
                })
            console.log(reqUrl)
        },
        deleteData(id){
            let reqUrl = `${this.computedUrl}/${id}`
            axios.delete(reqUrl)
            .then(res => {
                console.log(res)
                this.$emit('refreshData', this.computedUrl)
                })
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

.container {
    margin-top: 24px;
}

.grid div {
    margin-left: 32px;
    margin-bottom: 16px;
    border-top: 1px solid black;
    padding-left: 32px;
}



</style>