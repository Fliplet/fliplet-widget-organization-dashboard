<template>
  <select
    v-model="selectedRange"
    @change="onDropdownChange(selectedRange)"
    name="dateRange"
    id="dateRange"
    class="date-dropdown form-control"
    :disabled="!isEnabled">
    <option value="1440-minute">Last 24 hours</option> <!-- Using "minute" to ensure the current hour is included -->
    <option value="7-day">Last 7 days</option>
    <option value="30-day">Last 30 days</option>
    <option value="90-day">Last 90 days</option>
    <option value="6-month">Last 6 months</option>
    <option value="12-month">Last 12 months</option>
    <option value="none">Custom dates</option>
  </select>
</template>

<script>
export default {
  data() {
    return {
      selectedRange: '30-day'
    };
  },
  props: {
    onDropdownChange: Function,
    isEnabled: Boolean,
    customDates: Boolean
  },
  watch: {
    customDates(newVal) {
      this.selectedRange = newVal ? 'none' : this.selectedRange;
    }
  }
};
</script>
