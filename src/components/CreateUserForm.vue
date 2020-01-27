<template>
  <div class="login-form">
    <h3 class="text-center" style="padding-top:10px">CREATE USER FORM</h3>
    <hr />
    <b-form @submit.prevent="onSubmit" class="form">
      <b-alert variant="danger" :show="hasError">{{ error }}</b-alert>
     <h2>
          <b-icon icon="person-fill"></b-icon>
          </h2> 
      <b-form-group
        id="userFullNameInputGroup"
        label="User Full Name"
        label-for="userFullNameInput"
      >
        <b-form-input
          id="userFullNameInput"
          type="text"
          placeholder="Enter user name"
          v-model="userFullName"
          autocomplete="off"
          :disabled="loading"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="userNickNameInputGroup"
        label="User Nick Name(user ID)"
        label-for="userNickNameInput"
      >
        <b-form-input
          id="userNickNameInput"
          type="text"
          placeholder="Enter user name"
          v-model="userId"
          autocomplete="off"
          :disabled="loading"
          required
        ></b-form-input>
      </b-form-group>

      <b-button
        type="submit"
        variant="success"
        class="ld-ext-right"
        v-bind:class="{ running: loading }"
        :disabled="isValid"
      >
        O K
        <div class="ld ld-ring ld-spin"></div>
      </b-button>
    </b-form>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "login-form",
  data() {
    return {
      userId: "",
      userFullName: ""
    };
  },
  computed: {
    isValid: function() {
      const result = this.userId.length < 3;
      return result ? result : this.loading;
    },
    ...mapState(["loading", "error"]),
    ...mapGetters(["hasError"])
  },
  methods: {
    ...mapActions(["createUser"]),
    async onSubmit() {
      const result = await this.createUser({
        userFullName: this.userFullName,
        userId: this.userId
      });
      if (result) {
        this.$router.push("/");
      }
    }
  }
};
</script>
<style scoped>
.form{
  margin: 15px;
  padding: 15px;

}
.login-form{
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 15px;
   background-color: #DEFFDE;
}

</style>