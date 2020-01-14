<template>
  <div class="message-list">
    <h4 class="print-message-list">ROOM INFOMATION</h4>
    <hr />
    <div id="chat-messages" class="message-group" v-chat-scroll="{smooth: true}">
      <div class="roomInfo" v-for="room in joinableRooms" :key="room.id">
        <div v-if="selectJoinRoomId === room.id">
          <div class="room-infomation">
            <h3>
              <b-badge>ROOM ID</b-badge>
            </h3>
            <hr />
            <h4>{{room.id}}</h4>
          </div>
          <div class="room-infomation">
            <h3>
              <b-badge>ROOM NAME</b-badge>
            </h3>
            <hr />
            <h4>{{room.name}}</h4>
          </div>
          <div class="room-infomation">
            <h3>
              <b-badge>ROOM CREATOR</b-badge>
            </h3>
            <hr />
            <h4>{{room.created_by_id}}</h4>
          </div>
           <div class="room-infomation">
            <h3>
              <b-badge>ROOM MEMBERS</b-badge>
            </h3>
            <hr />
            <div v-for="member in room.member_user_ids" :key="member">
            <h4>{{member}}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "message-list",
  computed: {
    ...mapState(["messages", "userTyping", "joinableRooms", "selectJoinRoomId"])
  }
};
</script>

<style>
.message-list {
  margin-top: 10px;
  margin-bottom: 15px;
  padding-right: 15px;
  padding-left: 15px;
  border-radius: 4px;
  border: 2px solid #57c957;
  background-color: white;
}
.message-group {
  height: 65vh !important;
  overflow-y: scroll;
}
.print-message-list {
  padding-top: 10px;
}
.room-infomation {
  border: 1px solid green;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 15px;
}
.message-title {
  font-size: 1rem;
  display: inline;
}
.message-text {
  color: black;
  margin-bottom: 0;
}
.user-typing {
  height: 1rem;
}
</style>
