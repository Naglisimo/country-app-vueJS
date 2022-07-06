<template>
    <div>   
            <Add-modal v-if='show' 
                        v-on:refreshData='getData($event)' 
                        v-on:toggleState="updateModalState"
                        v-bind:atCountries="atCountries" 
                        v-bind:dataFromChild="dataFromChild"
                        v-bind:editing="editing"
                        v-bind:idOfEditing="idOfEditing"/>

            <Add-button v-on:toggleState="updateModalState"
                        v-on:isEditing="isEditing" 
                        v-bind:atCountries='atCountries' 
                        v-bind:show='show'/>

            <Form       
                        v-bind:atCountries='atCountries'
                        v-bind:url="url"
                        v-on:sortAsc="getData($event)"
                        v-on:sortDesc="getData($event)"
                        v-on:filterData="getData($event)"/>

            <Display-data 
                        v-on:isEditing="isEditing"
                        v-bind:countries='fetchedData' 
                        v-bind:atCountries='atCountries' 
                        v-on:refreshData='getData($event)'
                        v-on:toggleState="updateModalState"/>

            <div class="flex pagination">
                <button v-if="prevPage" @click="getData(prevPage)"><img src="../assets/icons/vectorLeft.svg"></button>
                <button v-for="(page, index) in avaliablePages" v-bind:key="index" @click="getData(`${url}?page=${page}`)"><p>{{page}}</p></button>
                <button v-if="nextPage" @click="getData(nextPage)"><img src="../assets/icons/vectorRight.svg"></button>
            </div>

    </div>
</template>

<script>
import AddButton from '../components/AddButton.vue'
import Form from '../components/Form.vue'
import AddModal from '../components/AddModal'
import DisplayData from '../components/DisplayData'
import { urlAPI } from "../../vue.config"
import { getDataMixin } from '../mixins/getDataMixin'


    export default {
        mixins: [getDataMixin],
        data() {
            return {
                url: urlAPI,
                fetchedData: '',
                maxPages: 0,
                currentPage: 0,
                avaliablePages: [],
                prevPage: '',
                nextPage: '',
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
            this.editing = data.isEditing,
            this.idOfEditing = data.idOfEditing

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
        this.getData(this.url)
 
    }
}
</script>

<style>

</style>