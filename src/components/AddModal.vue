<template>
    <div class="modal">

        <button class="exitBtn" @click.prevent="changeState"><img src="../assets/icons/exitBtn.svg"></button>

    <h2 v-if="atCountries">PRIDETI SALI</h2>
    <h2 v-else>PRIDETI MIESTA</h2>

    <form @submit.prevent="submitForm" class="flex-column">

        <label for="name">Pavadinimas</label>
        <input v-model="inputValues.name" class='border-shadow' type="text" name="name" id="name">

        <label for="area">Uzimamas plotas</label>
        <input v-model="inputValues.area" class='border-shadow' type="number" name="area" id="area">

        <label for="population">Gyventoju skaicius</label>
        <input v-model="inputValues.population" class='border-shadow' type="number" name="population" id="population">
           
        <div class="flex-column" v-if="atCountries">
            <label  for="phone_code">Salies tel. kodas</label>
            <input v-model="inputValues.phone_code" class='border-shadow' type="tel" name="phone_code" id="phone_code">
        </div>

        <div class="flex-column" v-else>
            <label for="postal_code">Miesto pasto kodas</label>
            <input  v-model="inputValues.postal_code" class='border-shadow' type="tel" name="postal_code" id="postal_code">
        </div>


        <button type="submit">SAUGOTI</button>

    </form>
    </div>
</template>

<script>
import axios from 'axios'
import { urlAPI } from '../../vue.config'

export default {
    props: ['atCountries', 'id', 'dataFromChild', 'editing', 'idOfEditing'],
    data() {
        return{
            inputValues: {
                name: '',
                area: '',
                population: '',
                phone_code: '',
                postal_code: '',
                isFormSubmited: '',
            },
        }
    },
    methods: {
        changeState() {
            this.$emit('toggleState')
        },
        submitForm(){ 
            let method = !this.editing ? 'post': 'put'
            let url = !this.editing ? this.requestURL : `${this.requestURL}/${this.idOfEditing}`
            let formData = { data: {
                attributes: {
                        name: this.inputValues.name,
                        area: this.inputValues.area,
                        population: this.inputValues.population,
                        phone_code: this.inputValues.phone_code,
                        postal_code: this.inputValues.postal_code
                }
            }}
            axios({ method: method, url: url, data:formData })
            .then(res => { 

                this.$emit('refreshData', this.requestURL)
                this.changeState()
                })
            .catch(err => console.log(err))
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
    },
    created() {
        if(this.dataFromChild){
            this.inputValues.name = this.dataFromChild.name
            this.inputValues.area = this.dataFromChild.area
            this.inputValues.population = this.dataFromChild.population
            this.inputValues.phone_code = this.dataFromChild.phone_code
            this.inputValues.postal_code = this.dataFromChild.postal_code
        }
    }

}

</script>

<style scoped>


.modal{
    width: 466px;
    height: 446px;
    z-index: 1;
    position: absolute;
    left: 33%;
    top: 33%;
    display: flex;
    flex-direction: column;
    width: 466px;
    height: 466px;
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.exitBtn {
    margin-left: auto;
 
}

.modal h2 {
    margin-left: 48px;
    color: #5C5C5C;
}

form {
    display: flex;
    flex-flow: column;
        margin-left: 48px;
}

form input {
    width: 374px;
    height: 42px;
    margin-top: 16px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    /* box-shadow: 0 0 5px rgba(0, 0, 0, 0.2); */
}

form button {
    font-family: oswald;
    font-weight: 200;
    color: #5C5C5C;
    width: 92px;
    height: 40px;
    border-radius: 5px;
    margin-top: 24px;
    margin-right: 48px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}


 form label{
    font-family: oswald;
    font-weight: 200;
    color: #5C5C5C;
    position:relative;
    top: 25px;
    margin-left:48px;
    background-color:white;
    padding: 0 8px;
    width:fit-content;
  }
  
.flex-column {
    display: flex;
    flex-direction: column;
}


</style>