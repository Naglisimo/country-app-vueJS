<template>
    <div>
        <Add-modal v-if='show' v-on:toggleState="updateState" v-bind:atCountries="atCountries" v-bind:id="id" v-bind:dataFromChild="dataFromChild"/>
        <add-button v-bind:atCountries='atCountries' v-on:toggleState="updateState"/>
        <Form v-bind:data="fetchedData" v-bind:atCountries='atCountries'/>
        <Display-data v-bind:countries='fetchedData' v-bind:atCountries='atCountries' v-on:toggleState="updateState"/>
        Cities says hello 
{{ id }}
    <!-- {{ id }}{{ params }} -->
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
                dataFromChild: {}
        }
    },
    components: {
        AddButton,
        Form,
        AddModal,
        DisplayData,
    },
        methods: {
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
                updateState(resData) {
            this.show = !this.show
            if(resData){
                console.log('we have resData', resData)
                this.dataFromChild = resData.data.attributes
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