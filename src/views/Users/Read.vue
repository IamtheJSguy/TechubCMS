<template>
  <div style="padding: 20px">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="20" :xl="20">
        <div class="shadow-card">
          <p>
            <span class="key">Name: </span>
            <b>{{ user.name }}</b>
          </p>
          <p>
            <span class="key">Login Name (Username): </span>
            {{ user.email }}
          </p>
          <p>
            <span class="key">Phone Number: </span>
            {{ user.phoneNumber }}
          </p>
          <p>
            <span class="key">CNIC: </span>
            {{ user.cnic }}
          </p>
          <p>
            <span class="key">Account Type: </span>
            {{ user.type }}
          </p>
          <div v-if="user.type === 'Company'">
            <p>
              <span class="key">Company Name: </span>
              <b>{{ user.companyName }}</b>
            </p>
            <p>
              <span class="key">Business Activity: </span>
              {{ user.businessActivity }}
            </p>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="4" :xl="4">
        <div class="shadow-card" align="center">
          <el-button
            type="success"
            style="background-color: #F6B233; border: none; padding: 10px; width: 100px; "
            @click="$router.push('/bookings/add/' + user._id)"
            >Add Booking</el-button
          >
        </div>
      </el-col>
    </el-row>
    <div v-if="bookings.length > 0">
      <p class="heading">Bookings</p>
      <el-row :gutter="20">
        <el-col
          v-for="(booking, index) in bookings"
          :key="index"
          :xs="24"
          :sm="24"
          :md="8"
          :lg="6"
          :xl="6"
        >
          <div class="shadow-card booking-card">
            <p class="date">
              {{ formatDate(booking.createdAt) }}
            </p>
            <p class="seats">
              {{ booking.seats }}
              <sub class="key">(Seats)</sub>
            </p>
            <p class="rates">
              <span class="currency">Rs.</span>{{ booking.singleChairAmount }}
              <sub class="key">(Rate)</sub>
            </p>
            <p class="total">
              <span class="currency">Rs.</span>{{ booking.total }}
              <sub class="key">(Total)</sub>
            </p>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      user: {},
      bookings: []
    }
  },
  created() {
    this.getUser()
    this.getBookings()
  },
  methods: {
    getUser() {
      this.$store
        .dispatch('getUser', this.$route.params.id)
        .then(
          (response) => {
            this.user = response.data.data
          }
        )
    },
    getBookings() {
      this.$store
        .dispatch('getBookingsByUser', this.$route.params.id)
        .then(
          (response) => {
            this.bookings = response.data.data
          }
        )
    },
    formatDate(date) {
      return moment(date).format('dddd - MMMM DD, YYYY')
    }
  }
}
</script>

<style scoped>
.fc-con {
    display: flex;
    justify-content: center;
    align-items: center;
}
.key {
    font-weight: 700;
    font-size: 12px;
    color: #707070;
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
.date {
  text-align: right;
  font-weight: 700;
  color: #707070;
  font-size: 12px;
}
.booking-card {
  text-align: center;
  margin: 10px;
}
.booking-card p {
  font-weight: 700;
  margin: 0;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
.seats {
  font-size: 50px;
  color: blue;
}
.rates {
  font-size: 30px;
  color: red;
}
.total {
  font-size: 30px;
  color: purple;
}
.currency {
  font-size: 10px;
  color: #707070;
}
</style>
