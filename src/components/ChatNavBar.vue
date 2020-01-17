<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="success">
      <b-navbar-brand href="#">Chat Demo</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#" @click="onLogout">Logout</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="SettingRoom" right>
            <b-dropdown-item href="#" @click="onCreateRoom">Create Room</b-dropdown-item>
            <b-dropdown-item href="#" @click="onJoinRoom">Join Room</b-dropdown-item>
            <b-dropdown-item href="#" @click="onLeaveRoom">Leave Room</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>


<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "ChatNavBar",
  computed: {
    ...mapState(["user", "reconnect"])
  },
  methods: {
    ...mapActions(["logout", "login", "joinableRoom", "getRooms"]),
    ...mapMutations(["setReconnect"]),
    onLogout() {
      this.$router.push({ path: "/" });
      this.logout();
    },
    onCreateRoom() {
      this.$router.push({ path: "chat/createroom" });
    },
    onJoinRoom() {
      this.joinableRoom();
      this.$router.push({ path: "chat/joinRoom" });
    },
    onLeaveRoom() {
      this.getRooms();
      this.$router.push({ path: "chat/leaveRoom" });
    },
    unload() {
      if (this.user.username) {
        // User hasn't logged out
        this.setReconnect(true);
      }
    }
  },
  mounted() {
    window.addEventListener("beforeunload", this.unload);
    if (this.reconnect) {
      this.login(this.user.username);
    }
  }
};
</script>

<style>
#chat-navbar {
  margin-bottom: 15px;
}
</style>