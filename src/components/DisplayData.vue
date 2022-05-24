<template>
    <div class="container border-shadow ">


             <Table-header 
                v-bind:atCountries='atCountries'
                v-bind:url='url'
                v-on:sortAsc="sortAsc($event)"
                v-on:sortDesc="sortDesc($event)"/>

        <tr class="grid" v-for="item in countries" v-bind:key="item.id">
            <th><router-link :to="{ name: 'cities', params: { id: item.id}}"  ><p>{{item.attributes.name}}</p></router-link></th>
            <th><p>{{item.attributes.area}}</p></th>
            <th><p>{{item.attributes.population}}</p></th>
            <th v-if=atCountries><p>{{item.attributes.phone_code}}</p></th>
            <th v-else><p>{{item.attributes.postal_code}}</p></th>
            <th class="flex">
            <button @click="deleteData(item.id)"><img src='../assets/icons/trash.svg'></button>
            <button @click="editData(item.id)"><img src='../assets/icons/pen.svg'></button>
            </th>
        </tr>

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
            url: urlAPI
        }
    },
    methods: {
                sortAsc(){
                    if (this.atCountries) {
            console.log('sorting asc at home component')
                    } else {
            console.log('sorting asc at displayCities component')
                    }
        },
                sortDesc(){
                    if (this.atCountries) {
            console.log('sorting desc at home component')
                    } else {
            console.log('sorting desc at displayCities component')
                    }
        },

        editData(id){
            this.$emit('isEditing', {isEditing: true, idOfEditing: id})
            
        let reqUrl = `${this.computedUrl}/${id}`
            axios.get(reqUrl)
            .then(res => {
                this.$emit('toggleState', res.data)
                })
        },
        deleteData(id){
            let reqUrl = `${this.computedUrl}/${id}`
            axios.delete(reqUrl)
            .then(res => {
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