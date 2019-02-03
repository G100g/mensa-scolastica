<template>
  <div>
    <input type="text" v-model="weekdate">
    {{ weekNumber }}
  </div>
</template>


<script>
import { getWeekNumber } from "../helpers/date";

export default {
  name: "WeekCalculator",
  data: () => ({
    weekNumber: "",
    weekdate: ""
  }),
  watch: {
    weekdate: function() {
      console.log(this.weekdate);

      const date = this.weekdate.split("/");

      this.weekNumber = getWeekNumber(new Date(date[2], date[1] - 1, date[0]));
    }
  }
};
</script>
