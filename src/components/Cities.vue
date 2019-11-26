<template>
  <div>
    <div v-if="!!currentMenu">
      <h1>Scegli il menù della tua città</h1>
      <div v-for="(city, index) in cities" :key="index">
        <div v-if="city.menus.length > 0">
          <h2>{{ city.name}}</h2>
          <div v-for="(menu, indexMenu) in city.menus" :key="indexMenu">
            <button type="button" @click="selectMenu(menu)">{{ menu.title}}</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <DayNavigator :menu="currentMenu" />
    </div>
  </div>
</template>

<script>
import DayNavigator from "./DayNavigator.vue";

export default {
  components: {
    DayNavigator
  },
  data() {
    return {
      cities: [],
      currentMenu: null
    };
  },
  methods: {
    selectMenu(menu) {
      this.currentMenu = menu;
    }
  },
  mounted: async function() {
    const result = await fetch("/data/index.json")
      .then(res => res.json())
      .then(data => data);
    console.log(result);
    this.cities = result.cities;
  }
};
</script>

<style>
</style>
