<template>
  <div v-if="meals && meals.length" class="meal" :class="[type]">
    <h3>{{ getMealTitle(type) }}</h3>
    <ul>
      <li v-for="(meal, key) in meals" :key="key">{{ meal }}</li>
    </ul>
  </div>
</template>

<script>
import get from "lodash/get";
export default {
  props: {
    meals: Array,
    type: String
  },
  methods: {
    getMealTitle: function(key) {
      const mealNames = {
        lunch: "Pranzo",
        breakfast: "Colazione",
        snack: "Merenda",
        latersnack: "Merenda P.Time"
      };

      return mealNames[key] || key;
    }
  }
};
</script>

<style>
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
