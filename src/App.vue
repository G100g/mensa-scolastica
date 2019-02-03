<template>
  <div id="app">
    <DayNavigator/>
  </div>
</template>

<script>
import DayNavigator from "./components/DayNavigator.vue";

export default {
  name: "app",
  components: {
    DayNavigator
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
