/* eslint-disable */
<template>
  <div style="padding: 20px">
    <div align="right">
      <el-button
        type="warning"
        @click="
          () => {
            $router.push('/users/add');
          }
        "
      >
        Add User
      </el-button>
    </div>
    <el-table
      :data="users"
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
      <el-table-column align="center" label="Account Type">
        <template slot-scope="{ row }">
          <span>{{ row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Name">
        <template slot-scope="{ row }">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Email">
        <template slot-scope="{ row }">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Phone Number">
        <template slot-scope="{ row }">
          <span>{{ row.phoneNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="CNIC">
        <template slot-scope="{ row }">
          <span>{{ row.cnic }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Company Name">
        <template slot-scope="{ row }">
          <span>{{ row.companyName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Business Type" >
        <template  slot-scope="{ row }">
          <span>{{ row.businessActivity }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="160px" label="Actions">
        <template slot-scope="{ row }">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-tooltip
                content="View Employee"
                placement="bottom"
                effect="dark"
              >
                <el-button
                  circle
                  type="success"
                  icon="el-icon-view"
                  @click="() => {
                    $router.push('/users/' + row._id)
                  }"
                ></el-button>
              </el-tooltip>
            </el-col>
            <el-col :span="8">
              <el-tooltip
                content="Update Employee"
                placement="bottom"
                effect="dark"
              >
                <el-button
                  circle
                  type="warning"
                  icon="el-icon-edit"
                  @click="() => {
                    $router.push('/users/update/' + row._id)
                  }"
                ></el-button>
              </el-tooltip>
            </el-col>
            <el-col :span="8">
              <el-tooltip
                content="Delete User"
                placement="bottom"
                effect="dark"
              >
                <el-popconfirm
                  confirm-button-text="Confirm"
                  cancel-button-text="No, Thanks"
                  icon="el-icon-info"
                  icon-color="red"
                  title="Are you sure to delete this user?"
                  @onConfirm="deleteUser(row._id)"
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
  name: 'UserIndex',
  data() {
    return {
      users: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.$store
        .dispatch('getUsers')
        .then(
          (response) => {
            this.users = response.data.data
          }
        )
    },
    deleteRestaurant(id) {
      this.$store
        .dispatch('deleteUser', id)
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
