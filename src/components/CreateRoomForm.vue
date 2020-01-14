<template>
  <div class="login-form">
    <h5 class="text-center">CREATE ROOM FORM</h5>
    <hr />
    <b-form @submit.prevent="onSubmit">
      <b-alert variant="danger" :show="hasError">{{ error }}</b-alert>
      <b-form-group id="userFullNameInputGroup" label="ROOM NAME" label-for="RoomNameInput">
        <b-form-input
          id="RoomlNameInput"
          type="text"
          placeholder="Enter user name"
          v-model="roomName"
          autocomplete="off"
          :disabled="loading"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="userNickNameInputGroup" label="User Nick Name(user ID)" label-for="userNickNameInput">
        <b-form-input
          id="userNickNameInput"
          type="text"
          placeholder="Enter user name"
          v-model="roomId"
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
import { mapState, mapGetters ,mapActions} from "vuex";

export default {
  name: "login-form",
  data() {
    return {
      roomId: "",
      roomName:"",
    };
  },
  computed: {
    isValid: function() {
      const result = this.roomId.length < 3;
      return result ? result : this.loading;
    },
    ...mapState(["loading", "error","user"]),
    ...mapGetters(["hasError"]),
  },
 methods: {
    ...mapActions([
      'createRoom',
      'joinableRoom'
    ]),
    async onSubmit() {
     // const result = await this.createRoom({roomName:this.roomName,roomId:this.roomId,creatorId:this.user.username});
     const result = await this.joinableRoom();
      if(result) {
        this.$router.push('/chat');
      }
    }
  } 

};
</script>