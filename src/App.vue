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

button {
    border: none;
    background-color: rgba(0, 0, 0, 0);
    cursor: pointer;
}

h2 {
  font-family: oswald;
  font-weight: 200;
    color: #5C5C5C;
}

p {
  font-family: oswald;
    font-weight: 200;
    color: #5C5C5C;
}

a {
  text-decoration: none;
  font-weight: 200;
  color: #5C5C5C;
}

.container {
  width: 1200px;
  margin: 0 auto;
}

.flex {
    display: flex;
    align-items: center;
    justify-content: center;
}

.flex-column {
  display: flex;
  flex-direction: column;
}

.border-shadow {
background: #FFFFFF;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
border-radius: 5px;
}

.grid {
    display: grid;
    grid-template-columns: repeat(4, 2fr) 1fr;
    justify-content: center;
    align-items: center;
    
}

.pagination {
  margin-bottom: 36px;

}

.pagination button {
    margin: 16px 2px 2px;
}

/*   styles for table  */

th {
    font-family: oswald;
    font-weight: 400;
    padding-top: 16px;
    height: 44px;
    border-left: #969696 solid 1px;
}


tr {
    width: 100%;
    border-top: #969696 solid 1px;
}

 tr th:first-child {
    border-left: none;
 
}

tr:first-child {
    border-top: none;
 
}


table tr:first-child th {
    width: 230px;
}

th:nth-child(-n+4){
    width: 230px
}

th:nth-child(n+5){
    width: 115px
}





</style>
