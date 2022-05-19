<template>
        <div class="grid">
            <div><p>PAVADINIMAS</p></div>
            <div><p>UZIMAMAS PLOTAS</p></div>
            <div><p>GYVENTOJU SKAICIUS</p></div>
            <div v-if="atCountries"><p>SALIES TEL. KODAS</p></div>
            <div v-else><p>SALIES PASTO KODAS</p></div>
            <div><p>VEIKSMAI</p></div>
        </div>
</template>   

<script>
    export default {
        props: ['atCountries'],
        data(){
            return {
            }
        }
    }
</script>

<style>

</style>        