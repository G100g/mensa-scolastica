<template>
  <div class="container">
    <Meal v-bind:date="selectedDate"/>
    <!-- <WeekCalculator/> -->
    <DateSelector v-on:select="updateDate" v-bind:init-date="selectedDate"/>
  </div>
</template>

<script>
import { format } from "../helpers/date";

import WeekCalculator from "./WeekCalculator.vue";
import Meal from "./Meal.vue";
import DateSelector from "./DateSelector.vue";

export default {
  name: "DayNavigator",
  data: () => ({
    selectedDate: new Date()
  }),
  methods: {
    updateDate: function(selectedDate) {
      this.selectedDate = selectedDate;
    }
  },
  computed: {
    selectedDateHuman: function() {
      return format(this.selectedDate, "EEEE d MMMM");
    }
  },
  components: {
    WeekCalculator,
    Meal,
    DateSelector
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
}

.dateNavigator {
  position: fixed;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  bottom: 0;
  left: 0;
  right: 0;

  padding: 2rem;
}

button {
  border: 1px solid #999;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
}
</style>
