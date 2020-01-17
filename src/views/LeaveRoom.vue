<!--ログイン画面のコンポーネント-->

<template>
  <!--ヘッダー部-->
  <div class="leaveroom">
    <b-form @submit.prevent="onSubmit">
      <b-navbar id="chat-navbar" toggleable="md" type="dark" variant="success">
        <b-navbar-brand href="#" @click="onClickBack">Demo</b-navbar-brand>
      </b-navbar>
      <b-container fluid class="ld-over">
        <div class="ld ld-ring ld-spin"></div>
        <b-row>
          <b-col cols="3" class="joinableroom">
            <CurrentRoomList />
          </b-col>
          <b-col cols="7">
            <b-row>
              <b-col id="chat-content">
                <RoomInfo />
                <b-button
                  type="submit"
                  variant="success"
                  class="ld-ext-right"
                  size="lg"
                  :disabled="isValid"
                >LEAVE THIS ROOM</b-button>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
    </b-form>
  </div>
</template>

<script>
import CurrentRoomList from "@/components/CurrentRoomList.vue";
import RoomInfo from "@/components/UserRoomInfo.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "leaveroom",
  components: {
    CurrentRoomList,
    RoomInfo
  },
  computed: {
    ...mapState(["selectRoomId"]),
    isValid: function() {
      const result = this.selectRoomId === null;
      return result;
    }
  },
  methods: {
    ...mapActions(["leaveUserToRoom"]),
    async onSubmit() {
      await this.leaveUserToRoom();
      this.$router.push("/chat");
    },

    async onClickBack() {
      this.$router.push("/chat");
    }
  }
};
</script>

<style >
.joinableroom {
  margin-top: 5px;
  margin-left: 40px;
  background-color: #57c957;
  border-radius: 15px;
  margin-right: 40px;
}
</style>