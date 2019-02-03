<template>
  <div class="dateNavigator">
    <button @click="yesterday()">&lt;</button>
    <div class="humanDate">
      <h3 class="weekday">{{ selectedWeekdayHuman }}</h3>
      {{ selectedDateHuman }}
    </div>
    <button @click="tomorrow()">&gt;</button>
  </div>
</template>

<script>
import addDays from "date-fns/addDays";
import subDays from "date-fns/subDays";
import { format } from "../helpers/date";

export default {
  name: "DateSelector",
  data: function() {
    console.log(this.initDate);
    return { selectedDate: this.initDate };
  },

  props: ["init-date"],
  methods: {
    yesterday: function() {
      this.selectedDate = subDays(this.selectedDate, 1);
    },
    tomorrow: function() {
      this.selectedDate = addDays(this.selectedDate, 1);
    }
  },
  watch: {
    selectedDate: function() {
      this.$emit("select", this.selectedDate);
    }
  },
  computed: {
    selectedDateHuman: function() {
      return format(this.selectedDate, "d MMMM yyyy");
    },
    selectedWeekdayHuman: function() {
      return format(this.selectedDate, "EEEE");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.humanDate {
  font-size: 1.3rem;
}
.weekday {
  text-transform: capitalize;
  margin: 0;
}

.dateNavigator {
  position: fixed;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  bottom: 0;
  left: 0;
  right: 0;

  color: #472d30;
  background-color: #ffe1a8;

  padding: 1rem 0.1rem;
}

button {
  border: none;
  background-color: white;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  border-radius: 4px;
}
</style>
