<template>
    <div>
        <Add-modal v-if='show' 
                    v-on:refreshData="getData($event)"
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
                    v-bind:id="id"
                    v-on:sortAsc="getData($event)"
                    v-on:sortDesc="getData($event)"
                    v-on:filterData="getData($event)"/>

        <Display-data 
                    v-on:refreshData="getData($event)"
                    v-on:isEditing="isEditing"
                    v-bind:countries='fetchedData' 
                    v-bind:atCountries='atCountries' 
                    v-on:toggleState="updateModalState"/>

            <div class="flex pagination">
                <button v-if="prevPage" @click="getData(prevPage)"><img src="../assets/icons/vectorLeft.svg"></button>
        <div class="flex pagination"><button v-for="(page, index) in avaliablePages" v-bind:key="index" @click="getData(`${url}/${id}/cities?page=${page}`)">{{page}}</button></div>
                <button v-if="nextPage" @click="getData(nextPage)"><img src="../assets/icons/vectorRight.svg"></button>
            </div>


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
                prevPage: '',
                nextPage: '',
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
            this.editing = data.isEditing,
            this.idOfEditing = data.idOfEditing

            },
        getData(url){
            this.avaliablePages = []
            if (url) {
            axios
            .get(url)
            .then( ({data}) => {
                this.fetchedData = data.data
                this.maxPages = data.meta.last_page
                this.currentPage = data.meta.current_page
                this.prevPage = data.links.prev
                this.nextPage = data.links.next
                this.paginationLoop(this.maxPages)
                })
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