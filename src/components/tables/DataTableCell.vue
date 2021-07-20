<template>
  <td :data-order="orderValue()">
    <span v-if="!cellValue && cellValue !== 0">—</span>
    <span v-else-if="cellType === 'date'">{{ this.transformDate(cellValue) }}</span>
    <div v-else-if="cellType === 'dynamic'" class="multiline-cell">
      <p>
        {{ cellValue[0].toLocaleString('en') }}
      </p>
      <small v-if="cellValue[0] === cellValue[1]">({{ perсent }})</small>
      <small v-else-if="cellValue[0] > cellValue[1]" class="text-success">(&#8593;{{ this.perсent }})</small>
      <small v-else class="text-danger">(&#8595;{{ this.perсent }})</small>
      <small>
        {{ cellValue[1].toLocaleString('en') }}
      </small>
      <small>
        Previous Period
      </small>
    </div>
    <div v-else-if="cellType === 'action'" @click.stop="onCellAction(cellValue)" class="action-holder">
      <span class="link btn-link">{{ cellValue.title }}</span>
      <Tooltip v-if="'appId' in cellValue" :content="'See app analytics'" :icon="'fa-area-chart'" />
      <Tooltip v-else :content="'Edit user'" :icon="'fa-pencil'" />
    </div>
    <span v-else>
      {{ cellValue }}
    </span>
  </td>
</template>

<script>
import { calculateDynamic } from '../../services/analytics';
import Tooltip from '../Tooltip';

export default {
  data() {
    return {
      perсent: 0,
      organizationId: 0
    };
  },
  props: {
    cellValue: {
      type: Object
    },
    cellType: {
      type: String,
      default: 'raw'
    }
  },
  components: {
    Tooltip
  },
  methods: {
    orderValue: function() {
      let date = moment(
        this.cellValue,
        'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]',
        true
      );

      switch (this.cellType) {
        case 'date':
          return date.isValid() ? parseInt(date.format('x'), 10) : Infinity;
        case 'dynamic':
          return this.cellValue[0];
        case 'action':
          return this.cellValue.title;
        default:
          return this.cellValue;
      }
    },
    transformDate: function(date) {
      return moment(date).format(moment().creationData().locale._longDateFormat.LL);
    },
    openUserProfile: function(options) {
      Fliplet.Studio.emit('overlay', {
        name: 'edit-organization-user',
        options: {
          size: 'large',
          title: 'Edit User',
          userId: options.userId,
          organizationId: this.organizationId
        }
      });
    },
    openAppAnalytics: function(options) {
      Fliplet.Studio.emit('overlay', {
        name: 'app-analytics',
        options: {
          size: 'large',
          title: options.title,
          appId: options.appId
        }
      });
    },
    onCellAction: function(options) {
      if ('appId' in options) {
        this.openAppAnalytics(options);
      } else {
        this.openUserProfile(options);
      }
    }
  },
  mounted: function() {
    if (this.cellType === 'dynamic') {
      this.perсent = calculateDynamic(this.cellValue[0], this.cellValue[1]);
    }

    if (this.cellType === 'action') {
      this.organizationId = Fliplet.Env.get('organizationId');
    }
  }
};
</script>
