<template>
  <div class="container">
    <div v-if="meals">
      <div class="meal" :class="[key]" v-for="(value, key) in meals" :key="key">
        <h3>{{ getMealTitle(key) }}</h3>
        <ul>
          <li v-for="(meal, key) in value" :key="key">{{ getMealName(meal) }}</li>
        </ul>
      </div>
    </div>
    <div v-else>Nessun pasto trovato</div>
  </div>
</template>

<script>
import get from "lodash/get";
import calendar from "../data/calendar.json";

import { getWeekNumber } from "../helpers/date";

export default {
  name: "Meal",
  props: ["date"],
  data: () => ({
    currentDate: new Date()
    // meal: {
    //   ciao: "pippo"
    // }
  }),

  methods: {
    getMealTitle: function(key) {
      const mealNames = {
        lunch: "Pranzo",
        breakfast: "Colazione",
        snack: "Merenda",
        "later-snack": "Merenda P.Time"
      };

      return mealNames[key] || key;
    },

    getMealName: function(key) {
      const mealNames = {
        lunch: "Pranzo",
        breakfast: "Colazione",
        snack: "Merenda",
        "later-snack": "Merenda P.Time"
      };

      return get(calendar, `meals.${key}`, key);
    }
  },

  computed: {
    meals: function() {
      console.log(this.date);
      const d = this.date;
      const [weekYear, weekNumber] = getWeekNumber(d);

      const weekDay = d.getDay();

      const weekmeal = get(calendar, `weeks.${weekNumber}`, null);

      // Get meal
      // console.log(calendar);
      const meals = get(calendar, `weeksmeal.${weekmeal}.${weekDay}`, null);

      console.log(
        weekNumber,
        weekDay,
        weekmeal,
        `weeksmeal.${weekmeal}.${weekDay}`
      );
      console.log(meals);

      return meals;
    }
  }
  //   computed: {
  //     meal: function() {
  //       console.log(this.currentDate);

  //       return {};
  //     }
  //   }
};
</script>

<style scoped>
/* 

C9CBA3
FFE1A8
E26D5C
723D46
472D30

*/

.container {
  max-width: 480px;
  padding-bottom: 100px;
  margin: 0 auto;
}

.meal {
  font-size: 1.5rem;
}

.meal.breakfast h3 {
  border-bottom: 4px solid #ffe1a8;
}

.meal.lunch h3 {
  border-color: #c9cba3;
}

.meal.snack h3 {
  border-color: #e26d5c;
}

.meal.later-snack h3 {
  border-color: #472d30;
}

.meal h3 {
  border-bottom: 4px solid #ffe1a8;
  padding: 2rem 1rem 0.3rem;
  margin: 1rem;
}

ul {
  text-align: left;
  padding-right: 0.3rem;
}

li {
  margin-bottom: 0.6rem;
}
</style>
