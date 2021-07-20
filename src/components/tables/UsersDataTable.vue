<template>
  <div>
    <div v-if="isDataTransformed">
      <DataTable :columns="cols" :rows="rows"></DataTable>
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
          name: 'Users',
          help: ''
        },
        {
          name: 'Last seen',
          help: 'The users last logged in date'
        },
        {
          name: 'Created',
          help: 'The date the user was created'
        },
        {
          name: 'Studio sessions',
          help: 'The number of Studio sessions the user has.\n A session is a group of interactions without 30 min of inactivity.'
        },
        {
          name: 'Viewer sessions',
          help: 'The number of Fliplet Viewer sessions the user has. \n A session is a group of interactions without 30 min of inactivity.'
        },
        {
          name: 'App Publishes',
          help: 'The number of times the user has published an app updated in Studio'
        },
        {
          name: 'Apps available',
          help: 'The number of apps the user has access to in Studio'
        },
        {
          name: 'Apps created',
          help: 'The number of apps the user has created in Studio'
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
    users: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    transformData: function() {
      this.users.forEach(user => {
        this.rows.push(
          [
            { value: { title: user.email, userId: user.id }, type: 'action' },
            { value: user.lastSeenAt, type: 'date'},
            { value: user.createdAt, type: 'date'},
            { value: user.stats.studioSessions.count },
            { value: user.stats.viewerSessions.count },
            { value: user.stats.appPublishes.count },
            { value: user.stats.appsAvailable.count },
            { value: user.stats.appsCreated.count }
          ]
        );

        this.isDataTransformed = true;
      });
    }
  },
  mounted: function() {
    this.transformData();
    Fliplet.Widget.autosize();
  }
};
</script>
