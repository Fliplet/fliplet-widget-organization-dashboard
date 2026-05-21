<template>
  <div>
    <div v-if="isDataTransformed">
      <DataTable :sort-params="sortParams" :columns="cols" :rows="rows" :startDate="startDate" :endDate="endDate"></DataTable>
    </div>
  </div>
</template>

<script>
import DataTable from './DataTable';

export default {
  data() {
    return {
      cols: [
        {
          name: 'Project',
          help: ''
        },
        {
          name: 'Created',
          help: 'The date the project was created in Studio'
        },
        {
          name: 'Last edit',
          help: 'The date a screen was last editing in Studio'
        },
        {
          name: 'Last publish',
          help: 'The date a project update was last published in Studio'
        },
        {
          name: 'Apple',
          help: 'The first time a project was built for iOS'
        },
        {
          name: 'Android',
          help: 'The first time a project was built for Android'
        },
        {
          name: 'Web',
          help: 'The first time a project was published to web'
        },
        {
          name: 'Users',
          help: 'Total number of logged-in users.'
        },
        {
          name: 'Devices',
          help: 'Total number of unique devices.'
        },
        {
          name: 'Sessions',
          help: 'The total number of sessions.\n A session is a group of interactions without 30 min of inactivity.'
        },
        {
          name: 'Edits',
          help: 'The total times screens were edited in Studio'
        },
        {
          name: 'Published',
          help: 'The total times a project update was published in Studio'
        }
      ],
      rows: [],
      isDataTransformed: false
    };
  },
  components: {
    DataTable
  },
  props: {
    apps: {
      type: Array,
      default() {
        return [];
      }
    },
    startDate: {
      type: String,
      default: ''
    },
    endDate: {
      type: String,
      default: ''
    }
  },
  computed: {
    sortParams: function() {
      var targets = [];
      var l = this.rows[0].length;

      for (var i = 0; i < l; i++) {
        if (this.rows[0][i].type === 'date') targets.push(i);
      }

      return [{ type: 'data', targets: targets }];
    }
  },
  methods: {
    transformData: function() {
      this.apps.forEach(app => {
        this.rows.push(
          [
            { value: { title: app.name, appId: app.id }, type: 'action' },
            { value: app.createdAt, type: 'date' },
            { value: app.updatedAt, type: 'date' },
            { value: app.publishedAt, type: 'date' },
            { value: app.publishedAppleAt, type: 'date' },
            { value: app.publishedGoogleAt, type: 'date' },
            { value: app.publishedWebAt, type: 'date' },
            { value: [app.stats.users.count, app.stats.users.previousPeriodCount], type: 'dynamic' },
            { value: [app.stats.devices.count, app.stats.devices.previousPeriodCount], type: 'dynamic' },
            { value: [app.stats.sessions.count, app.stats.sessions.previousPeriodCount], type: 'dynamic' },
            { value: [app.stats.updates.count, app.stats.updates.previousPeriodCount], type: 'dynamic' },
            { value: [app.stats.publishes.count, app.stats.publishes.previousPeriodCount], type: 'dynamic' }
          ]
        );

        this.isDataTransformed = true;
      });
    }
  },
  mounted: function() {
    this.transformData();
  }
};
</script>
