export default {
    setError(state, error) {
      state.error = error;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setUser(state, user) {
      state.user = user;
    },
    setReconnect(state, reconnect) {
      state.reconnect = reconnect;
    },
    setActiveRoom(state, roomId) {
      state.activeRoom = roomId;
    },
    setRooms(state, rooms) {
      state.rooms = rooms
    },
    setUsers(state, users) {
      state.users = users
    },
   clearChatRoom(state) {
      state.users = [];
      state.messages = [];
    },
    setMessages(state, messages) {
      state.messages = messages
    },
    addMessage(state, message) {
      state.messages.push(message)
    },
    setSending(state, status) {
      state.sending = status
    },
    setUserTyping(state, userId) {
      state.userTyping = userId
    },
    reset(state) {
      state.loading= false;
  state.sending= false,
  state.error= null,
  state.user= null,
  state.reconnect= false,
  state.activeRoom= null,
  state.rooms= [],
  state.users= [],
  state.messages= [],
  state.userTyping= null,
  state.joinableRooms=[],
  state.selectJoinRoomId=null
    },
    joinableRoom(state,joinablerooms){
      state.joinableRooms=joinablerooms;
    },
    setUserRooms(state,userRooms){
      state.userRooms=userRooms;
    },
    setSeletRoom(state,roomId){
      state.selectRoomId=roomId;
    }
  }