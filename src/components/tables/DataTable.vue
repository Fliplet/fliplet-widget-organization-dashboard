<template>
  <div class="dataTable">
    <table ref="table" class="data-table table-responsive d-print-inline" style="width:100%">
      <thead>
        <tr>
          <th v-for="(col, colIndex) in columns" :key="col">
            {{ col.name }}
            <Tooltip @click.stop :content="col.help"></Tooltip>
            <input @click.stop @input="filter($event, colIndex)" data type="text" class="filter" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row">
          <td v-for="cell in row" :key="cell.value">
            <DataTableCell :cellValue="cell.value" :cellType="cell.type"></DataTableCell>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';
import Tooltip from '../Tooltip';
import DataTableCell from './DataTableCell';

export default {
  data() {
    return {
      component: {}
    };
  },
  components: {
    Tooltip,
    DataTableCell
  },
  props: {
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    rows: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    initTable: function() {
      this.component = $(this.$refs.table).DataTable({
        scrollX: true
      });
      $(window).trigger('resize');
    },
    filter: function(event, colIndex) {
      this.component.columns(colIndex)
        .search(event.target.value)
        .draw();
    }
  },
  mounted: function() {
    this.initTable();
  }
};
</script>