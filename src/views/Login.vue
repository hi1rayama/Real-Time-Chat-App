<template>
  <div class="login">
    <b-jumbotron
      header="Real time chat App Demo"
      lead="Powered by Chatkit SDK and Bootstrap-Vue"
      bg-variant="success"
      text-variant="white"
    >
      <b-btn href="#" pill variant="primary" @click="onCreateUser" active>ユーザの作成</b-btn>
    </b-jumbotron>
    <b-container>
      <b-row>
        <b-col lg="4" md="3"></b-col>
        <b-col lg="4" md="6" class="form">
          <LoginForm />
        </b-col>
        <b-col lg="4" md="3"></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";

export default {
  name: "login",
  components: {
    LoginForm
  },
  methods: {
    onCreateUser() {
      this.$router.push({ path: "/createuser" });
      //this.CreateUser();
    }
  }
};
</script>