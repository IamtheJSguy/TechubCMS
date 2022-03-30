/* eslint-disable */
<template>
  <div style="padding: 20px">
    <el-table
      :data="bookings"
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
          <span>{{ row.shift }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Room Number">
        <template slot-scope="{ row }">
          <span>{{ row.roomNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Seats">
        <template slot-scope="{ row }">
          <span>{{ row.seats }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Seat Rate">
        <template slot-scope="{ row }">
          <span>Rs.{{ row.singleChairAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Amount">
        <template slot-scope="{ row }">
          <span>Rs.{{ row.total }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="160px" label="Actions">
        <template slot-scope="{ row }">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-tooltip
                content="View Booking"
                placement="bottom"
                effect="dark"
              >
                <el-button
                  circle
                  type="success"
                  icon="el-icon-view"
                  @click="() => {
                    $router.push('/users/' + row.user._id)
                  }"
                ></el-button>
              </el-tooltip>
            </el-col>
            <el-col :span="8">
              <el-tooltip
                content="Update Booking"
                placement="bottom"
                effect="dark"
              >
                <el-button
                  circle
                  type="warning"
                  icon="el-icon-edit"
                  @click="() => {
                    $router.push('/bookings/update/' + row._id)
                  }"
                ></el-button>
              </el-tooltip>
            </el-col>
            <el-col :span="8">
              <el-tooltip
                content="Delete Booking"
                placement="bottom"
                effect="dark"
              >
                <el-popconfirm
                  confirm-button-text="Confirm"
                  cancel-button-text="No, Thanks"
                  icon="el-icon-info"
                  icon-color="red"
                  title="Are you sure to delete this Booking?"
                  @onConfirm="deleteBooking(row._id)"
                >
                  <el-button
                    circle
                    type="danger"
                    icon="el-icon-delete"
                    slot="reference"
                  ></el-button>
                </el-popconfirm>
              </el-tooltip>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'BookingIndex',
  data() {
    return {
      bookings: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.$store
        .dispatch('getBookings')
        .then(
          (response) => {
            this.bookings = response.data.data
          }
        )
    },
    deleteBooking(id) {
      this.$store
        .dispatch('deleteBooking', id)
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
