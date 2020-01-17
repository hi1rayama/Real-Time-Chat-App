<!--ログイン画面のコンポーネント-->

<template>
  <!--ヘッダー部-->
  <div class="joinroom">
    <b-navbar id="chat-navbar" toggleable="md" type="dark" variant="success">
      <b-navbar-brand href="#" @click="onClickBack">Demo</b-navbar-brand>
    </b-navbar>
    <b-container fluid class="ld-over">
      <div class="ld ld-ring ld-spin"></div>
      <b-row>
        <b-col cols="3" class="joinableroom">
          <JoinAbleRoomList />
        </b-col>
        <b-col cols="7">
          <b-row>
            <b-col id="chat-content">
              <RoomInfo />
              <b-button
                @click="onClick"
                variant="success"
                class="ld-ext-right"
                size="lg"
                :disabled="isValid"
              >このROOMに入る</b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import JoinAbleRoomList from "@/components/JoinAbleRoomList.vue";
import RoomInfo from "@/components/JoinAbleRoomInfo.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "joinroom",
  components: {
    JoinAbleRoomList,
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
    ...mapActions(["joinUserToRoom"]),
    async onClick() {
      const result = await this.joinUserToRoom();
      if (result) {
        this.$router.push("/chat");
      } else {
        window.alert("エラー");
      }
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