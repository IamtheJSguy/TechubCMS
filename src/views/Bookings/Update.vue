<template>
  <div style="padding: 20px">
    <div class="shadow-card">
      <el-form>
        <el-row :grid="20">
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <el-form-item label="Booking Category">
              <el-select
                class="input"
                v-model="form.type"
                placeholder="Select booking category"
              >
                <el-option value="Sharing">Sharing</el-option>
                <el-option value="Dedicated">Dedicated</el-option>
                <el-option value="Private Room">Private Room</el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <el-form-item label="Business">
              <el-select
                class="input"
                v-model="form.businessName"
                placeholder="Select business"
              >
                <el-option
                  v-for="(business, index) in configurations.businesses"
                  :key="'business-' + index"
                  :value="business"
                  >{{ business }}</el-option
                >
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <el-form-item label="Address">
              <el-select
                class="input"
                v-model="form.address"
                placeholder="Select Address"
              >
                <el-option
                  v-for="(address, index) in configurations.addresses"
                  :key="'address-' + index"
                  :value="address"
                  >{{ address }}</el-option
                >
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <el-form-item label="Shift">
              <el-select
                class="input"
                v-model="form.shift"
                placeholder="Select Shift"
              >
                <el-option value="Day">Day</el-option>
                <el-option value="Night">Night</el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <el-form-item label="Room Number">
              <el-input
                v-model="form.roomNumber"
                class="input"
                placeholder="Room Number"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <el-form-item label="Seats">
              <el-input
                v-model="form.seats"
                class="input"
                type="number"
                placeholder="No. of Seats"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <el-form-item label="Base Rate">
              <el-input
                v-model="form.baseRate"
                class="input"
                type="number"
                placeholder="Base Rate/seat"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <el-form-item label="Discount">
              <el-input
                v-model="form.discount"
                class="input"
                type="number"
                placeholder="Discount"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <el-form-item label="Rate (Discounted)">
              <el-input
                v-model="form.singleChairAmount"
                class="input"
                type="number"
                placeholder="Rate/seat with Discount"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <el-form-item label="Security Charges">
              <el-input
                v-model="form.securityCharges"
                class="input"
                type="number"
                placeholder="Security Charges"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <el-form-item label="Employee Card Charges">
              <el-select
                class="input"
                v-model="form.employeeCardPaymentPaid"
                placeholder="Select Status"
              >
                <el-option value="Paid">Paid</el-option>
                <el-option value="Unpaid">Unpaid</el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <el-form-item label="Security Status">
              <el-select
                class="input"
                v-model="form.employeeCardPaymentPaid"
                placeholder="Select Status"
              >
                <el-option value="Paid">Paid</el-option>
                <el-option value="Unpaid">Unpaid</el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item align="right">
          <button 
          style="background-color: #F6B233; border: none; padding: 10px; width: 100px; color: white; border-radius: 5px; cursor: pointer; " 
           @click="onSubmit">Update</button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        user: '',
        type: '',
        seats: '',
        roomNumber: '',
        shift: '',
        baseRate: '',
        discount: '',
        singleChairAmount: '',
        total: '',
        address: '',
        businessName: '',
        securityCharges: '',
        securityPaid: '',
        employeeCardPaymentPaid: ''
      },
      configurations: {}
    }
  },
  created() {
    this.getData()
    this.getConfiguration()
  },
  methods: {
    getData() {
      this.$store.dispatch('getBooking', this.$route.params.id)
        .then(
          (response) => {
            this.form = response.data.data
          }
        )
    },
    getConfiguration() {
      this.$store.dispatch(
        'getConfiguration'
      )
        .then(
          (response) => {
            this.configurations = response.data.data[0]
          }
        )
    },
    onSubmit(e) {
      e.preventDefault()
      this.form.total = this.form.seats * this.form.singleChairAmount
      const data = {
        id: this.$route.params.id,
        payload: this.form
      }
      this.$store
        .dispatch('updateBooking', data)
        .then(
          (response) => {
            this.notification(response.data, 'success')
            this.$router.push('/bookings')
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

<style lang="scss">
.el-input__inner {
    height: 50px !important;
}
.el-select {
  width: 100%;
}
</style>

<style scoped>
.upload-cover {
    height: 330px;
    width: 330px;
    border-radius: 8px;
    border: 3px dashed;
    outline: none;
}
.cover {
    max-width: 300px;
    max-height: 300px;
}
</style>

<style>
.theme-btn {
    height: 50px;
    width: 100px;
    background-color: #6c63ff;
    border-radius: 8px;
    outline: none;
    color: #fff;
    font-weight: 700;
    border: none;
}
.shadow-card {
  background-color: #fff;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.20);
  border-radius: 8px;
  padding: 10px 20px;
}
.shadow-card:hover {
  box-shadow: 0 7px 15px 0 rgba(0, 0, 0, 0.26);
}
</style>
