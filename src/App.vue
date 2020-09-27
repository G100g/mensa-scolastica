<template>
    <div id="app" class="container">
        <router-view />
    </div>
</template>

<script>
export default {
    name: "app",
    mounted() {
        const lastVisistedMenu = localStorage.getItem("lastVisistedMenu");
        if (lastVisistedMenu) {
            this.currentMenu = lastVisistedMenu;
        }
    },
};
</script>

<style>
/* body {
    margin: 0;
    padding: 0;
}

#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
} */
</style>
