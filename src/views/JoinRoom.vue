<!--ログイン画面のコンポーネント-->

<template>
  <!--ヘッダー部-->
  <div class="joinroom">
    <b-navbar id="chat-navbar" toggleable="md" type="dark" variant="success">
      <b-navbar-brand href="#">Demo</b-navbar-brand>
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
              <JoinAbleRoomInfo />
              <b-button @click="onClick" variant="success" class="ld-ext-right" size="lg" :disabled="isValid">このROOMに入る</b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import JoinAbleRoomList from "@/components/JoinAbleRoomList.vue";
import JoinAbleRoomInfo from "@/components/JoinAbleRoomInfo.vue";
import {mapActions,mapState} from "vuex";

export default {
  name: "joinroom",
  components: {
    JoinAbleRoomList,
    JoinAbleRoomInfo
  },
  computed:{
      ...mapState(["selectJoinRoomId"]),
      isValid: function() {
      const result=(this.selectJoinRoomId === null);
      return result;
    },
  },
  methods: {
    ...mapActions(["joinUserToRoom"]),
    async onClick() {
      const result=await this.joinUserToRoom();
      if(result){
        this.$router.push("/chat");
      }else{
          window.alert("エラー");
      }
      
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