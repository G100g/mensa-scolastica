<template>
  <div>
    <!-- <input type="text" v-model="weekdate" /> -->
    {{ weekCurrentNumber}}
  </div>
</template>


<script>
import { getWeekNumber } from "../helpers/date";

export default {
  name: "WeekCalculator",
  props: ["selectedDate"],
  data: () => ({
    weekNumber: "",
    weekdate: ""
  }),
  computed: {
    weekCurrentNumber() {
      return getWeekNumber(this.selectedDate).toString();
    }
  },
  watch: {
    weekdate: function() {
      console.log(this.weekdate);

      const date = this.weekdate.split("/");

      this.weekNumber = getWeekNumber(new Date(date[2], date[1] - 1, date[0]));
    }
  }
};
</script>
