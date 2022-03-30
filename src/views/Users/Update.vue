<template>
  <div style="padding: 20px">
    <div class="shadow-card">
      <el-form>
        <el-row :grid="20">
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <el-form-item label="Account Type">
              <el-select v-model="form.type">
                <el-option value="Individual">Individual</el-option>
                <el-option value="Company">Company</el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :grid="20" v-if="form.type === 'Company'">
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <el-form-item label="Company Name">
              <el-input
                v-model="form.companyName"
                class="input"
                placeholder="Company Name"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <el-form-item label="Business Activity">
              <el-input
                v-model="form.businessActivity"
                class="input"
                placeholder="Business Activity"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :grid="20">
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <el-form-item label="Name">
              <el-input
                v-model="form.name"
                class="input"
                placeholder="Name"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <el-form-item label="Email">
              <el-input
                v-model="form.email"
                class="input"
                placeholder="Email"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <el-form-item label="CNIC">
              <el-input
                v-model="form.cnic"
                class="input"
                placeholder="CNIC"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <el-form-item label="Phone Number">
              <el-input
                v-model="form.phoneNumber"
                class="input"
                placeholder="Phone Number"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item align="right">
          <button style="background-color: #F6B233; border: none; padding: 10px; width: 100px; color: white; border-radius: 5px; cursor: pointer; " @click="onSubmit">Update</button>
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
        name: '',
        email: '',
        phoneNumber: '',
        companyName: '',
        businessActivity: '',
        type: '',
        cnic: '',
        cover: ''
      }
    }
  },
  created() {
    this.$store
      .dispatch('getUser', this.$route.params.id)
      .then(
        (response) => {
          this.form = response.data.data
        }
      )
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      const data = {
        id: this.$route.params.id,
        payload: this.form
      }
      this.$store
        .dispatch('updateUser', data)
        .then(
          (response) => {
            this.notification(response.data, 'success')
            this.$router.push('/users')
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
