<template>
  <div id="app">
    <Header />      
      <router-view></router-view>
  </div>
</template>

<script>


import Header from "./components/Header"



export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      atCountry: false,
    }
  },
  components: {
    Header,
  }
}
</script>

<style>

/*  import fonts */
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400&display=swap');

* {
  margin: 0;
  padding: 0;

}

body {
    background-color: #E5E5E5;
}

.container {
  width: 1200px;
  margin: 0 auto;
}

.flex {
    display: flex;
    align-items: center;
}

.border-shadow {
  background: #FFFFFF;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
border-radius: 5px;
}

button {
    border: none;
    background-color: rgba(0, 0, 0, 0);
    cursor: pointer;
}


</style>
