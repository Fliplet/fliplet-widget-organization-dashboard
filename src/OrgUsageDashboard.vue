<template>
  <div class="org-usage-dashboard">
    <Message type="alert-info">
      <p>
        <strong>This feature is currently in beta.</strong>
        We are actively refining the functionality and collecting feedback. If you have any questions please
        <a href='#' @click="openChatOverlay">contact us</a>.
      </p>
    </Message>
    <RangeDatePicker :onChange="loadData" :isEnabled="!isLoading" v-if="showDatePicker"></RangeDatePicker>
    <div v-if="this.isLoading" class="spinner-holder animated">
      <div class="spinner-overlay"></div>
      <p>Loading...</p>
    </div>
    <div v-else-if="this.hasError">
      <span class="text-danger">{{ this.errorMessage }}</span>
    </div>
    <div v-else-if="Object.keys(this.analyticsData).length > 0">
      <AnalyticsChart class="component" :appsSessions="this.analyticsData.appSessions" :studioSessions="this.analyticsData.studioSessions"></AnalyticsChart>
      <AnalyticsSummary class="component" :analyticsData="this.analyticsData.stats"></AnalyticsSummary>
      <Message v-show="this.isDataPartiallyAvailable" class="component">
        Data for <b>studio sessions, new studio users</b> and <b>apps edited</b> are only available from June 24th 2020.
      </Message>
      <ul class="tabs">
        <li role="presentation" @click="activeTab = 'apps'" :class="{active: activeTab === 'apps'}">Apps</li>
        <li role="presentation" @click="activeTab = 'users'" :class="{active: activeTab === 'users'}">Users</li>
      </ul>
      <AppDataTable v-if="activeTab === 'apps'" class="component" :apps="this.analyticsData.apps"></AppDataTable>
      <UsersDataTable v-else-if="activeTab === 'users'" class="component" :users="this.analyticsData.users"></UsersDataTable>
    </div>
    <div v-else>
      <span>There is no data to show</span>
    </div>
  </div>
</template>

<script>
import AnalyticsSummary from './components/AnalyticsSummary.vue';
import AppDataTable from './components/tables/AppsDataTable';
import RangeDatePicker from './components/RangeDatePicker.vue';
import getAnalyticsData, { handleSessions } from './services/analytics';
import AnalyticsChart from './components/AnalyticsChart';
import UsersDataTable from './components/tables/UsersDataTable';
import Message from './components/Message';
import { sampleData } from './config/sample-data';

export default {
  data() {
    return {
      isLoading: false,
      analyticsData: {},
      errorMessage: '',
      hasError: false,
      activeTab: 'apps',
      showDatePicker: false,
      isDataPartiallyAvailable: false,
      featureAvailable: true
    };
  },
  components: {
    AnalyticsSummary,
    AppDataTable,
    RangeDatePicker,
    AnalyticsChart,
    UsersDataTable,
    Message
  },
  methods: {
    loadData: function(startDate, endDate) {
      this.isLoading = true;
      this.isDataPartiallyAvailable = moment(startDate).isBefore('2020-06-24');

      const getAnalytics = this.featureAvailable
        ? getAnalyticsData(startDate, endDate)
        : Promise.resolve(sampleData);

      getAnalytics
        .then(result => {
          result.appSessions = handleSessions(startDate, endDate, result.appSessions);
          result.studioSessions = handleSessions(startDate, endDate, result.studioSessions);
          this.analyticsData = result;
        })
        .catch(error => {
          this.hasError = true;
          this.errorMessage = Fliplet.parseError(error);
        })
        .finally(() => {
          this.isLoading = false;
          this.showDatePicker = true;
        });
    },
    init: function() {
      Fliplet.Studio.onMessage(function(event) {
        if (event.data && event.data.event === 'overlay-close') {
          setTimeout(() => {
            Fliplet.Widget.autosize();
          }, 500);
        }
      });
    },
    openChatOverlay: function() {
      Fliplet.Studio.emit('open-live-chat');
    }
  },
  created() {
    this.isLoading = true;

    const widgetId = Fliplet.Widget.getDefaultId();
    const widgetData = Fliplet.Widget.getData(widgetId) || {};

    this.featureAvailable = widgetData.hasOwnProperty('featureAvailable')
      ? !!widgetData.featureAvailable
      : this.featureAvailable;
  },
  mounted() {
    const startDate = moment().add(-1, 'month');
    const endDate = moment();

    this.init();
    this.loadData(startDate, endDate);

    Fliplet.Widget.autosize();
  },
  updated() {
    Fliplet.Widget.autosize();
  }
};
</script>
