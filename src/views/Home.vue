<template>
    <div>   
            <Add-modal v-if='show' 
                        v-on:refreshData='onSubmit($event)' 
                        v-on:toggleState="updateModalState"
                        v-bind:atCountries="atCountries" 
                        v-bind:dataFromChild="dataFromChild"
                        v-bind:editing="editing"
                        v-bind:idOfEditing="idOfEditing"/>

            <Add-button v-on:toggleState="updateModalState"
                        v-on:isEditing="isEditing" 
                        v-bind:atCountries='atCountries' 
                        v-bind:show='show'/>

            <Form       v-bind:data="fetchedData" 
                        v-bind:atCountries='atCountries'
                        v-bind:url="url"
                        v-on:sortAsc="getData($event)"
                        v-on:sortDesc="getData($event)"/>

            <Display-data 
                        v-on:isEditing="isEditing"
                        v-bind:countries='fetchedData' 
                        v-bind:atCountries='atCountries' 
                        v-on:refreshData='onSubmit($event)'
                        v-on:toggleState="updateModalState"/>

            <div class="flex pagination">
                <button v-if="avaliablePages.length > 0" @click="getData(`${url}?page=1`)"><img src="../assets/icons/vectorLeft.svg"></button>
                <button v-for="(page, index) in avaliablePages" v-bind:key="index" @click="getData(`${url}?page=${page}`)">{{page}}</button>
                <button v-if="avaliablePages.length > 0" @click="getData(`${url}?page=${lastPage}`)"><img src="../assets/icons/vectorRight.svg"></button>
            </div>

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
                lastPage: 0,
                atCountries: true,
                show: false,
                dataFromChild: {},
                editing: false,
                idOfEditing: ''
        }
    },
    components: {
        AddButton,
        Form,
        DisplayData,
        AddModal,
    },
    methods: {
        sortAsc(){
            console.log('sorting asc at home component')
        },
                sortDesc(){
            console.log('sorting Desc at home component')
        },
        isEditing(data) {
            console.log('is editing data', data)
            this.editing = data.isEditing,
            this.idOfEditing = data.idOfEditing

            },
        onSubmit(e){
            console.log('on submit at home.vue was launched with event value:', e)
                this.getData(e)
            },
        updateModalState(resData) {
            if(!this.show){
                this.show = !this.show;
                if(resData) {
                this.dataFromChild = resData.data.attributes
                }
            } else {
                this.show = !this.show;
                this.dataFromChild = ''
            }
        },
        getData(url){
            console.log('get data url is', url)
            axios
            .get(url)
            .then( ({data}) => {
                this.fetchedData = data.data
                this.maxPages = data.meta.last_page
                this.currentPage = data.meta.current_page
                this.lastPage = data.meta.last_page
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