<template>
  <div class="analytics-container">
    <SummaryCell
      v-for="(item, index) in cellInformation"
      :data="analyticsData[item[0]]"
      :title="item[1]"
      :tooltip="item[2]"
      :key="index"
    ></SummaryCell>
  </div>
</template>

<script>
import SummaryCell from './SummaryCell.vue';

export default {
  data() {
    return {
      cellInformation: [
        [
          'studioSessions',
          'Studio sessions',
          'The total number of Studio sessions. A session is a group of interactions without 30 min of inactivity.'
        ],
        [
          'newStudioUsers',
          'New studio users',
          'The total number of Studio users that logged in for the first time.'
        ],
        ['studioUsers', 'Studio users', 'The total number of Studio users.'],
        ['appsCreated', 'Projects created', 'The total number of projects created.'],
        [
          'appsEdited',
          'Projects edited',
          'The total number of projects that had screens altered within Studio.'
        ],
        [
          'appsPublished',
          'Projects published',
          'The total number of projects that had updates published via Studio.'
        ],
        [
          'appSessions',
          'Sessions',
          'The total number of sessions. A session is a group of interactions without 30 min of inactivity.'
        ],
        [
          'totalAppUsers',
          'Total users',
          'Total users across all projects. A user is a unique device and, if the project has a login, a unique logged in user.'
        ],
        [
          'uniqueAppUsers',
          'Unique users',
          'Total users excluding duplicate visits from authenticated users.'
        ]
      ]
    };
  },
  components: {
    SummaryCell
  },
  props: {
    analyticsData: Object
  }
};
</script>
