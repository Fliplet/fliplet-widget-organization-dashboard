<template>
  <div class="range-date-picker">
    <DateDropdown :onDropdownChange="onDropdownChange" :isEnabled="isEnabled" :customDates="customDates"></DateDropdown>
    <date-range-picker
      ref="picker"
      opens="left"
      :max-date="new Date()"
      :disabled="!isEnabled"
      :locale-data="localeData"
      :autoApply=true
      :ranges=false
      v-model="dateRange"
      @update="updateValues"
      :linkedCalendars=false
      :class="{ disabled: !isEnabled }"
    >
      <template v-slot:input="picker">
        <i class="glyphicon glyphicon-calendar fa fa-calendar"></i>
        <span>{{ picker.startDate | formatLocaleDate }} - {{ picker.endDate | formatLocaleDate }}</span>
        <b class="caret"></b>
      </template>
    </date-range-picker>
  </div>
</template>

<script>
import DateRangePicker from 'vue2-daterange-picker';
import DateDropdown from './DateDropdown.vue';
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css';

// Pick an English locale closest to the device/browser setting
const locale = navigator.language.indexOf('en') === 0 ? navigator.language : 'en';

Vue.filter('formatLocaleDate', (date) => {
  return TD(date, {
    format: 'll',
    locale
  });
});

export default {
  data() {
    const localeData = moment.localeData(locale);

    let startDate = new Date();
    let endDate = new Date();

    startDate.setDate(endDate.getDate() - 30);

    return {
      dateRange: {
        startDate,
        endDate
      },
      localeData: {
        direction: getComputedStyle(document.body).direction,
        separator: ' – ',
        firstDay: localeData.firstDayOfWeek()
      },
      customDates: false
    };
  },
  components: {
    DateDropdown,
    DateRangePicker
  },
  props: {
    onChange: Function,
    isEnabled: Boolean
  },
  methods: {
    updateValues() {
      this.customDates = true;

      if (this.onChange && typeof this.onChange === 'function') {
        this.onChange(this.dateRange.startDate, this.dateRange.endDate);
      }
    },
    onDropdownChange(range) {
      if (range === 'none') {
        return;
      }

      let startDate = new Date();
      let endDate = new Date();

      this.customDates = false;
      this.dateRange.startDate = startDate.setDate(endDate.getDate() - range);
      this.dateRange.endDate = endDate;

      if (this.onChange && typeof this.onChange === 'function') {
        this.onChange(this.dateRange.startDate, this.dateRange.endDate);
      }
    }
  }
};
</script>
