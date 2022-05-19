<template>
    <div>   
            <Add-modal v-show='show' v-on:toggleState="updateState" v-bind:atCountries="atCountries" v-bind:dataFromChild="dataFromChild"/>
            <Add-button v-on:toggleState="updateState" v-bind:atCountries='atCountries' v-bind:show='show'/>
            <Form v-bind:data="fetchedData" v-bind:atCountries='atCountries'/>
            <Display-data v-bind:countries='fetchedData' v-bind:atCountries='atCountries' v-on:toggleState="updateState"/>
            <div class="flex"><button v-for="(page, index) in avaliablePages" v-bind:key="index" @click="getData(`${url}?page=${page}`)">{{page}}</button></div>

    </div>
</template>

<script>
import AddButton from '../components/AddButton.vue'
import Form from '../components/Form.vue'
import AddModal from '../components/AddModal'
import DisplayData from '../components/DisplayData'
import axios from 'axios'
import { urlAPI } from "../../vue.config"

    export default {
        data() {
            return {
                url: urlAPI,
                fetchedData: '',
                maxPages: 0,
                currentPage: 0,
                avaliablePages: [],
                atCountries: true,
                show: false,
                dataFromChild: '',
        }
    },
    components: {
        AddButton,
        Form,
        DisplayData,
        AddModal,
    },
    methods: {
        updateState() {
            this.show = !this.show
            // if(data){

            //     this.dataFromChild = data.data.attributes
            // } 
            // console.log('emited data is',data.data.attributes)
        },
            getData(url){
                // console.log("GetData was launched")
            axios
            .get(url)
            .then( ({data}) => {
                this.fetchedData = data.data
                this.maxPages = data.meta.last_page
                this.currentPage = data.meta.current_page
                this.paginationLoop(this.maxPages)
                console.log(this.fetchedData)
                                })
        },
                    paginationLoop(maxPages){

                if (maxPages > 0) {
                    for( let i = 1; this.avaliablePages.length +1 <= maxPages; i++) {
                        this.avaliablePages.push(i)
                }
            }
        },
    },
        computed: {
                computedAvaliablePages: () => {return this.avaliablePages.splice(0, 5)}
        },

    created() {
        this.getData(this.url)
 
    }
}
</script>

<style>

</style>