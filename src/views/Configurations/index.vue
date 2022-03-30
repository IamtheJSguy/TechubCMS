<template>
  <div style="padding: 20px">
    <el-row :grid="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="10" :xl="10">
        <div class="shadow-card">
          <el-form>
            <el-form-item label="NTN">
              <el-input
                v-model="form.ntn"
                class="input"
                placeholder="Your NTN Number"
              ></el-input>
            </el-form-item>
            <el-form-item label="Employee Card Rate">
              <el-input
                v-model="form.employeeCardRate"
                class="input"
                type="number"
                placeholder="Employee Card Rate"
              ></el-input>
            </el-form-item>
            <el-form-item label="Businesses">
              <el-input
                v-for="(business, index) in form.businesses"
                :key="'business-' + index"
                v-model="form.businesses[index]"
                class="input"
                placeholder="Business Name"
              >
                <el-button slot="append" icon="el-icon-delete" type="danger" plain @click="removeBusiness(index)"></el-button>
              </el-input>
            </el-form-item>
            <el-button type="primary" plain size="small" @click="addBusiness">Add Business</el-button>
            <el-form-item label="Addresses">
              <el-input
                v-for="(address, index) in form.addresses"
                :key="'address-' + index"
                v-model="form.addresses[index]"
                class="input"
                placeholder="Business Address"
              >
                <el-button slot="append" icon="el-icon-delete" type="danger" plain @click="removeAddress(index)"></el-button>
              </el-input>
            </el-form-item>
            <el-button type="primary" plain size="small" @click="addAddress">Add Address</el-button>
            <el-form-item align="center">
              <el-button style="background-color: #F6B233; border: none; padding: 10px; width: 100px; "  type="success" @click="changeConfig">Update</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Configurations',
  data() {
    return {
      form: {
        businesses: [''],
        ntn: '',
        employeeCardRate: '',
        addresses: ['']
      }
    }
  },
  created() {
    this.getConfiguration()
  },
  methods: {
    addBusiness() {
      this.form.businesses.push('')
    },
    removeBusiness(key) {
      this.form.businesses = this.form.businesses.filter((business, index) => index !== key)
    },
    addAddress() {
      this.form.addresses.push('')
    },
    removeAddress(key) {
      this.form.addresses = this.form.addresses.filter((address, index) => index !== key)
    },
    getConfiguration() {
      this.$store.dispatch(
        'getConfiguration'
      )
        .then(
          (response) => {
            const res = response.data.data 
            if( res.length > 0 )
            {
              this.form = response.data.data[0]
            }
          }
        )
    },
    changeConfig(e) {
      e.preventDefault()
      this.$store.dispatch('postConfiguration', this.form)
        .then(
          (response) => {
            this.notification(response.data, 'success')
            this.getConfiguration()
          }
        )
        .catch(
          (error) => {
            this.notification(error.response.data, 'error')
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

<style scoped>
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