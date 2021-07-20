<template>
  <div class="dataTable">
    <table ref="table" class="data-table table-responsive d-print-inline" style="width:100%">
      <thead>
        <tr>
          <th v-for="(col, colIndex) in columns" :key="col">
            {{ col.name }}
            <Tooltip @click.stop :options="{ placement: 'bottom' }" :content="col.help"></Tooltip>
            <input @click.stop @input="filter($event, colIndex)" @keydown="onKeydown($event)" data type="text" class="filter" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row">
          <DataTableCell v-for="cell in row" :key="cell.value" :cellValue="cell.value" :cellType="cell.type"></DataTableCell>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
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
        scrollX: true,
        dom: 'Blfrtip',
        buttons: [
          {
            extend: 'excelHtml5',
            text: 'Export to Excel',
            title: `Fliplet usage ${moment().format('YYYY-MM-DD')}`,
            exportOptions: {
              format: {
                body: this.exportFormat
              }
            }
          },
          {
            extend: 'csvHtml5',
            text: 'Export to CSV',
            title: `Fliplet usage ${moment().format('YYYY-MM-DD')}`,
            exportOptions: {
              format: {
                body: this.exportFormat
              }
            }
          }
        ],
        lengthMenu: [10, 25, 50, 100, 500],
        pageLength: 10
      });
      $(window).trigger('resize');
    },
    exportFormat: function(data, row, column, node) {
      const dataCell = this.rows[row][column];

      if (dataCell.type && dataCell.type === 'date') {
        return node.innerText === '—' ? '—' : moment(node.innerText).format('YYYY/MM/DD');
      }

      if (dataCell.type && dataCell.type === 'dynamic') {
        return $(node).find('p').text();
      }

      return node.innerText;
    },
    filter: function(event, colIndex) {
      this.component.columns(colIndex)
        .search(event.target.value)
        .draw();
    },
    onKeydown: function(event) {
      if (event.which === 65 && (event.ctrlKey || event.metaKey)) {
        this.selectAll(event.currentTarget);
      }
    },
    selectAll: function(input) {
      input.select();
    }
  },
  mounted: function() {
    this.initTable();
    $('.dataTables_length').find('select').on('change', function() {
      Fliplet.Widget.autosize();
    });
  }
};
</script>
