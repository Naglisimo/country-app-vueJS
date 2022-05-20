<template>
    <div>
        <Add-modal v-if='show' 
                    v-on:refreshData="onSubmit($event)"
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
                    v-on:sortAsc="sortAsc"
                    v-on:sortDesc="sortDesc"/>

        <Display-data 
                    v-on:refreshData="onSubmit"
                    v-on:isEditing="isEditing"
                    v-bind:countries='fetchedData' 
                    v-bind:atCountries='atCountries' 
                    v-on:toggleState="updateModalState"/>


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
                idOfEditing: ''
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
                console.log('onSubmit was called at displayCities')
                // this.getData(`${this.url}/${this.id}/cities`)
            },
            getData(url){
                console.log("GetData was launched")
            axios
            .get(url)
            .then( ({data}) => {
                console.log(data)
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
    created() {
        this.getData(`${this.url}/${this.id}/cities`)

    }

}
</script>

<style>

</style>