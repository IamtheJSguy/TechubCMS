/* eslint-disable */
<template>
  <div style="padding: 20px">
    <el-table
      :data="invoices"
      stripe
      row-key="_id"
      fit
      highlight-current-row
      style="width: 100%"
    >
      <!-- <el-table-column align="center" label="Avatar" width="100px">
        <template slot-scope="{ row }">
          <img :src="row.cover" alt="" class="table-cover-img" />
        </template>
      </el-table-column> -->
      <el-table-column align="center" label="Name">
        <template slot-scope="{ row }">
          <span>{{ row.user.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Email">
        <template slot-scope="{ row }">
          <span>{{ row.user.email }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Shift">
        <template slot-scope="{ row }">
          <span>{{ row.booking.shift }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Room Number">
        <template slot-scope="{ row }">
          <span>{{ row.booking.roomNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Seats">
        <template slot-scope="{ row }">
          <span>{{ row.booking.seats }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Amount">
        <template slot-scope="{ row }">
          <span>Rs.{{ row.netTotal }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Status">
        <template slot-scope="{ row }">
          <span>{{ row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Date">
        <template slot-scope="{ row }">
          <span>{{ formatDate(row.createdAt) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="160px" label="Actions">
        <template slot-scope="{ row }">
          <el-tooltip content="View Invoice" placement="bottom" effect="dark">
            <el-button
              circle
              type="success"
              icon="el-icon-view"
              @click="
                () => {
                  $router.push('/invoices/' + row._id);
                }
              "
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'InvoiceIndex',
  data() {
    return {
      invoices: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.$store
        .dispatch('getInvoices')
        .then(
          (response) => {
            this.invoices = response.data.data
          }
        )
    },
    deleteBooking(id) {
      this.$store
        .dispatch('deleteInvoice', id)
        .then(
          (response) => {
            this.notification(response.data, 'success')
            this.getData()
          }
        )
        .catch(
          (error) => {
            this.notification(error.response.data, 'danger')
          }
        )
    },
    notification(data, type) {
      this.$notify({
        title: data.status,
        message: data.message || data.errEmail || data.errPassword,
        type: type
      })
    },
    formatDate(date) {
      return moment(date).format('dddd MMMM DD, YYYY')
    }
  }
}
</script>

<style>
.table-cover-img {
    max-height: 80px;
    max-width: 80px;
}
</style>
