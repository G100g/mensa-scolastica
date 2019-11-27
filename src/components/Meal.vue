<template>
  <div class="container">
    <div v-if="meals">
      <MealDetails :meals="meals.breakfast" type="breakfast" />
      <MealDetails :meals="meals.lunch" type="lunch" />
      <MealDetails :meals="meals.snack" type="snack" />
      <MealDetails :meals="meals.latersnack" type="latersnack" />
    </div>
    <div v-else>Nessun pasto trovato</div>
  </div>
</template>

<script>
import get from "lodash/get";
// import calendar from "../data/calendar.json";

import { getWeekNumber } from "../helpers/date";

import MealDetails from "./MealDetails.vue";

const weekDayLabel = {
  1: "monday",
  2: "tuesday",
  3: "wednesday",
  4: "thursday",
  5: "friday"
};

export default {
  name: "Meal",
  components: {
    MealDetails
  },
  props: ["date", "calendar"],
  data: () => ({
    currentDate: new Date()
    // meal: {
    //   ciao: "pippo"
    // }
  }),
  methods: {
    getMealName: function(key) {
      return get(this.calendar, `meals.${key}`, key);
    }
  },

  computed: {
    meals: function() {
      // console.log(this.date);
      const d = this.date;
      const [weekYear, weekNumber] = getWeekNumber(d);

      const weekDay = weekDayLabel[d.getDay()];

      const weekmeal = get(
        this.calendar,
        `weeks.${weekYear}.${weekNumber}`,
        null
      );
      // console.log(this.calendar);
      // console.log(`weeks.${weekYear}.${weekNumber}`, weekmeal);

      // Get meal
      // console.log(this.calendar);
      const meals = get(
        this.calendar,
        `weeksmeal.${weekmeal}.${weekDay}`,
        null
      );

      // console.log(
      //   weekNumber,
      //   weekDay,
      //   weekmeal,
      //   `weeksmeal.${weekmeal}.${weekDay}`
      // );
      // console.log(meals);

      if (meals) {
        console.log(meals);
        return Object.keys(meals)
          .filter(key => key !== "_type")
          .reduce((newmeals, mealKey) => {
            newmeals[mealKey] = meals[mealKey].map(m =>
              this.getMealName(m._ref)
            );
            console.log(newmeals);
            return newmeals;
          }, {});
      }

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
