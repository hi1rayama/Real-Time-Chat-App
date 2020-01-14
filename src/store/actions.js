/* eslint-disable no-console */
import chatkit from '../chatkit';

//setError,setLoadingなどはmutations.jsにある処理

// Helper function for displaying error messages
function handleError(commit, error) {
  const message = error.message || error.info.error_description;
  commit('setError', message);
}

export default {
  //ログイン処理
  async login({ commit, state }, userId) {
    try {
      commit('setError', '');//エラーはなし
      commit('setLoading', true);//ローディング中

      // ログインするユーザーIDの取得
      const currentUser = await chatkit.connectUser(userId);
      commit('setUser', {
        username: currentUser.id,
        name: currentUser.name
      });
      commit('setReconnect', false);//再接続不要

      //ユーザのルーム情報を取得
      const rooms = currentUser.rooms.map(room => ({
        id: room.id,
        name: room.name
      }))
      commit('setRooms', rooms);

      // Subscribe user to a room
      const activeRoom = state.activeRoom || rooms[0]; // pick last used room, or the first one
      commit('setActiveRoom', {
        id: activeRoom.id,
        name: activeRoom.name
      });
      await chatkit.subscribeToRoom(activeRoom.id);

      return true;
    } catch (error) {
      handleError(commit, error)
    } finally {
      commit('setLoading', false);//読み込み終了
    }
  },

  //ユーザー作成処理
  async createUser({commit},obj) {
    try {
      commit('setError', '');
      commit('setLoading', true);

      var userFullName,userId;
      userFullName=obj.userFullName;
      userId=obj.userId;
      window.alert(userFullName);
      window.alert(userId);

     await chatkit.CreateUser(userFullName, userId);
      return true;
    } catch (error) {
      handleError(commit, error)
    } finally {
      commit('setLoading', false);
    }
  },
  //ルーム作成
  async createRoom({commit},obj) {
    try {
      commit('setError', '');
      commit('setLoading', true);
      var roomId,roomName,creatorId;
      roomId=obj.roomId;
      roomName=obj.roomName;
      creatorId=obj.creatorId;

     await chatkit.CreateRoom(roomName,roomId,creatorId);
      return true;
    } catch (error) {
      handleError(commit, error)
    } finally {
      commit('setLoading', false);
    }
  },

  //参加可能なルームを取得
  async joinableRoom({commit,state}) {
    try {
      commit('setError', '');

     await chatkit.GetUserJoinableRooms(state.user.username);
     //console.log(joinableRoomObj);
    } catch (error) {
      handleError(commit, error)
    }
  },

  //ルームに入る処理
  async joinUserToRoom({commit,state}) {
    try {
      commit('setError', '');
      
      await chatkit.AddUserToRoom(state.user.username,state.selectJoinRoomId);
      return true;
    } catch (error) {
      handleError(commit, error)
      return false;
    }
  },

  //ルームチェンジを行う処理
  async changeRoom({ commit }, roomId) {
    try {
      const { id, name } = await chatkit.subscribeToRoom(roomId);
      commit('setActiveRoom', { id, name });
    } catch (error) {
      handleError(commit, error)
    }
  },

  
  async selectJoinRoom({ commit }, roomId) {
    try {
      commit('setSeletJoinRoom', roomId);
    } catch (error) {
      handleError(commit, error)
    }
  },
  
  //メッセージ送信の処理
  async sendMessage({ commit }, message) {
    try {
      commit('setError', '');
      commit('setSending', true);
      const messageId = await chatkit.sendMessage(message);
      return messageId;
    } catch (error) {
      handleError(commit, error)
    } finally {
      commit('setSending', false);
    }
  },
  //ログアウト処理
  async logout({ commit }) {
    commit('reset');
    chatkit.disconnectUser();
    window.localStorage.clear();
  }

}
