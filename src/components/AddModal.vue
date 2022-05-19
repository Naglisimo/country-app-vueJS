<template>
    <div class="modal">
        <button @click.prevent="changeState">X</button>
    <h1>PRIDETI SALI</h1>
    <form @submit.prevent="submitForm" class="flex-column">
        <label for="name">Pavadinimas</label>
        <input v-model="inputValues.name" class='border-shadow' type="text" name="name" id="name">{{inputValues.name}}

        <label for="area">Uzimamas plotas</label>
        <input v-model="inputValues.area" class='border-shadow' type="number" name="area" id="area">{{inputValues.area}}

        <label for="population">Gyventoju skaicius</label>
        <input v-model="inputValues.population" class='border-shadow' type="number" name="population" id="population">{{inputValues.population}}
           
        <div class="flex-column" v-if="atCountries">
            <label  for="phone_code">Salies tel. kodas</label>
            <input v-model="inputValues.phone_code" class='border-shadow' type="tel" name="phone_code" id="phone_code">{{inputValues.phone_code}}
        </div>
        <div class="flex-column" v-else>
            <label for="postal_code">Miesto pasto kodas</label>
            <input  v-model="inputValues.postal_code" class='border-shadow' type="tel" name="postal_code" id="postal_code">{{inputValues.postal_code}}
        </div>


        <button type="submit">SAUGOTI</button>
    </form>
    </div>
</template>

<script>
import axios from 'axios'
import { urlAPI } from '../../vue.config'

export default {
    props: ['atCountries', 'id', 'dataFromChild'],
    data() {
        return{
            inputValues: {
                name: '',
                area: '',
                population: '',
                phone_code: '',
                postal_code: '',
            },
        }
    },
    methods: {
            changeState() {
            this.$emit('toggleState')
            // console.log('this.show', this.show)
        },
        submitForm(){ 
            // console.log(this.requestURL)
            axios.post(this.requestURL, {
                data: {
                    attributes: {
                        name: this.inputValues.name,
                        area: this.inputValues.area,
                        population: this.inputValues.population,
                        phone_code: this.inputValues.phone_code,
                        postal_code: this.inputValues.postal_code
                    }
                },
            })
            .then(response => console.log('response', response))
            .catch(err => console.log('error',err))
        }
    },
    computed: {
        requestURL() {
            if(this.atCountries){
                return  urlAPI
            } else {
                return  `${urlAPI}/${this.id}/cities`
            }

        },
        passedProps() {
            if(dataFromChild){
                console.log('passed props is working')
            }
        }
    },
    created() {
        console.log('created at modal')
        if(this.dataFromChild){

            console.log(' created at data from child',this.dataFromChild)
        }
    }

}

</script>

<style scoped>
.modal {
    width: 466px;
    height: 446px;
    z-index: 1;
    position: absolute;
    left: 33%;
    top: 33%;
    background-color: white;
}
.flex-column {
    display: flex;
    flex-direction: column;
}


</style>