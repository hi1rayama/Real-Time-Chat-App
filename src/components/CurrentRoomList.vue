<template>
  <div class="room-list">
    <h4>
      <font color="white">EXIT ABLE ROOM NAME</font>
    </h4>
    <hr />
    <b-list-group>
      <b-list-group-item
        v-for=" room in userRooms"
        :key="room.name"
        href="#"
        variant="success"
        @click="onChange(room.id)"
      >#{{ room.name }}</b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { mapState, mapActions } from "vuex";

export default {
  name: "RoomList",
  computed: {
    ...mapState(["userRooms", "selectRoomId", "joinableRooms"])
  },
  methods: {
    ...mapActions(["selectRoom"]),
    onChange(roomId) {
      this.selectRoom(roomId);
      console.log(this.selectRoomId);
    }
  }
};
</script>

<style>
.room-list {
  margin-top: 10px;
  margin-bottom: 15px;
}
</style>
