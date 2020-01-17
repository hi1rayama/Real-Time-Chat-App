<template>
  <div class="login-form">
    <h5 class="text-center">LOGIN FORM</h5>
    <hr />
    <b-form @submit.prevent="onSubmit">
      <b-alert variant="danger" :show="hasError">{{ error }}</b-alert>

      <b-form-group id="userInputGroup" label="User Name(User ID)" label-for="userInput">
        <b-form-input
          id="userInput"
          v-model="userId"
          :state="inputState"
          autocomplete="off"
          aria-describedby="input-live-help input-live-feedback"
          placeholder="Enter your name"
          :disabled="loading"
          required
        ></b-form-input>
        <b-form-invalid-feedback id="input-live-feedback">最低でも3文字入力してください</b-form-invalid-feedback>
      </b-form-group>

      <b-button
        type="submit"
        variant="success"
        class="ld-ext-right"
        v-bind:class="{ running: loading }"
        :disabled="isValid"
      >
        LOGIN
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
      userId: ""
    };
  },
  computed: {
    inputState() {
      return this.userId.length > 2 ? true : false;
    },
    isValid: function() {
      const result = this.userId.length < 3;
      return result ? result : this.loading;
    },
    ...mapState(["loading", "error"]),
    ...mapGetters(["hasError"])
  },
  methods: {
    ...mapActions(["login"]),
    async onSubmit() {
      const result = await this.login(this.userId);
      if (result) {
        this.$router.push("chat");
      }
    }
  }
};
</script>
