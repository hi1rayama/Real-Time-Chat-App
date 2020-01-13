<template>
  <div class="chat-dashboard">
    <ChatNavBar />
    <b-container fluid class="ld-over" v-bind:class="{ running: loading }">
      <div class="ld ld-ring ld-spin"></div>
      <b-row>
        <b-col cols="2" class="roomlist">

          <RoomList />
        </b-col>
        <b-col cols="6" >
          <b-row>
            <b-col id="chat-content" >
              <MessageList />
            </b-col>
          </b-row>
          <b-row>
            <b-col >
              <MessageForm />
            </b-col>
          </b-row>
        </b-col>

        <b-col cols="3" class="members-list">
          <UserList />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ChatNavBar from '@/components/ChatNavBar.vue'
import RoomList from '@/components/RoomList.vue'
import MessageList from '@/components/MessageList.vue'
import MessageForm from '@/components/MessageForm.vue'
import UserList from '@/components/UserList.vue'
import { mapState } from 'vuex';

export default {
  name: 'Chat',
  components: {
    ChatNavBar,
    RoomList,
    UserList,
    MessageList,
    MessageForm
  },
  computed: {
    ...mapState([
      'loading'
    ])
  }
}
</script>

<style >
.roomlist{
    margin-top: 5px;
    margin-left: 40px;
    background-color:#57c957;
    border-radius: 15px;
}
.members-list{
    margin-top: 5px;
    background-color:#57c957;
    border-radius: 15px;
}
</style>