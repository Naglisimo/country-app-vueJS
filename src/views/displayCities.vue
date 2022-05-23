<template>
    <div>
        <Add-modal v-if='show' 
                    v-on:refreshData="onSubmit"
                    v-on:toggleState="updateModalState"
                    v-bind:atCountries="atCountries" 
                    v-bind:id="id" 
                    v-bind:dataFromChild="dataFromChild"
                    v-bind:editing="editing"
                    v-bind:idOfEditing="idOfEditing"/>

        <add-button v-bind:atCountries='atCountries'
                    v-on:isEditing="isEditing"
                    v-on:toggleState="updateModalState"/>

        <Form       v-bind:data="fetchedData" 
                    v-bind:atCountries='atCountries'
                    v-bind:url="currentUrl"
                    v-on:sortAsc="getData($event)"
                    v-on:sortDesc="getData($event)"/>

        <Display-data 
                    v-on:refreshData="onSubmit"
                    v-on:isEditing="isEditing"
                    v-bind:countries='fetchedData' 
                    v-bind:atCountries='atCountries' 
                    v-on:toggleState="updateModalState"/>

        <div class="flex"><button v-for="(page, index) in avaliablePages" v-bind:key="index" @click="getData(`${url}/${id}/cities?page=${page}`)">{{page}}</button></div>

    </div>
</template>

<script>
import axios from 'axios'
import AddButton from '../components/AddButton.vue'
import Form from '../components/Form.vue'
import AddModal from '../components/AddModal'
import DisplayData from '../components/DisplayData'
import { urlAPI } from '../../vue.config'


    export default {
        data() {
            return {
                id: this.$route.params.id,
                url: urlAPI,
                fetchedData: '',
                avaliablePages: [],
                atCountries: false,
                show: false,
                dataFromChild: {},
                editing: false,
                idOfEditing: '',
                currentUrl: `${this.url}/${this.id}/cities`
        }
    },
    components: {
        AddButton,
        Form,
        AddModal,
        DisplayData,
    },
        methods: {
                    sortAsc(){
            console.log('sorting asc at cities component')
        },
                sortDesc(){
            console.log('sorting Desc at cities component')
        },
        isEditing(data) {
            console.log('is editing data', data)
            this.editing = data.isEditing,
            this.idOfEditing = data.idOfEditing

            },
    onSubmit(e){
                console.log('e',e)
                this.getData(`${this.url}/${this.id}/cities`)
                console.log('onSubmit url', `${this.url}/${this.id}/cities`)
            },
    getData(url){
            if (url) {
                console.log('get data url is', url)
                console.log(url)
                console.log("GetData was launched")
            axios
            .get(url)
            .then( ({data}) => {
                console.log(data)
                this.fetchedData = data.data
                this.maxPages = data.meta.last_page
                this.currentPage = data.meta.current_page
                this.paginationLoop(this.maxPages)
                console.log(this.maxPages)
                                })
                } else {
                    console.log('this shit doesnt work blet')
                }
        },
                    paginationLoop(maxPages){

                if (maxPages > 0) {
                    for( let i = 1; this.avaliablePages.length +1 <= maxPages; i++) {
                        this.avaliablePages.push(i)
                }
            }
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
    },
    computed: {
    computedAvaliablePages: () => {return this.avaliablePages.splice(0, 5)}
        },
    created() {
        this.getData(`${this.url}/${this.id}/cities`)

    }

}
</script>

<style>

</style>