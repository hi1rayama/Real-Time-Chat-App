/* eslint-disable no-console */
import { ChatManager, TokenProvider } from '@pusher/chatkit-client'
import moment from 'moment'
import store from './store/index'

//環境変数の取得
//chatkitにアクセスするための変数
const INSTANCE_LOCATOR = process.env.VUE_APP_INSTANCE_LOCATOR;
const TOKEN_URL = process.env.VUE_APP_TOKEN_URL;
const SECRET_KEY = process.env.VUE_APP_KEY;
const MESSAGE_LIMIT = Number(process.env.VUE_APP_MESSAGE_LIMIT) || 10;

let currentUser = null;
let activeRoom = null;

const Chatkit = require('@pusher/chatkit-server');
const chatkit = new Chatkit.default({
  instanceLocator: INSTANCE_LOCATOR,
  key: SECRET_KEY
})



//アクティブになっているルームのメンバーをセットする
function setMembers() {
  const members = activeRoom.users.map(user => ({
    username: user.id,
    name: user.name,
    presence: user.presence.state
  }));
  store.commit('setUsers', members);
}

//chatkitへのログイン処理
async function connectUser(userId) {
  const chatManager = new ChatManager({
    instanceLocator: INSTANCE_LOCATOR,
    tokenProvider: new TokenProvider({ url: TOKEN_URL }),
    userId
  });
  currentUser = await chatManager.connect();
  return currentUser;
}




//ユーザーを作成する関数
async function CreateUser(userName, userId) {


  chatkit.createUser({
    id: userId,
    name: userName
  })
    .then(() => {
      window.alert("User created success!");
      AddUserToRoom(userId,'312a0630-c04e-4700-8546-754c1008a7ba');
    }).catch((err) => {
      window.alert(err);
    });

}
async function AddUserToRoom(userId,roomID){
  chatkit.addUsersToRoom({
    roomId: roomID,
    userIds: [userId]
  })
    .then(() => console.log('join'))
    .catch(err => console.error(err))


}
async function CreateRoom(roomName, roomId, creatorId) {


  chatkit.createRoom({
    id: roomId,
    creatorId: creatorId,
    name: roomName,
  })
    .then(() => {
      window.alert('Room created successfully');
    }).catch((err) => {
      window.alert(err);
    });
}

function GetUserJoinableRooms(userID) {
  chatkit.getUserJoinableRooms({
    userId: userID
  })
    .then((roomList) => {
      console.log(roomList);
      store.commit('joinableRoom', roomList);
      return roomList;
    }).catch((err) => {
      console.log(err);
      return -1;
    });
}

async function subscribeToRoom(roomId) {
  store.commit('clearChatRoom');
  activeRoom = await currentUser.subscribeToRoom({
    roomId,
    messageLimit: MESSAGE_LIMIT,
    hooks: {
      //メッセージの取得
      onMessage: message => {
        store.commit('addMessage', {
          name: message.sender.name,
          username: message.senderId,
          text: message.text,
          date: moment(message.createdAt).format('h:mm:ss a D-MM-YYYY')
        });
      },
      onPresenceChanged: () => {
        setMembers();
      },
      onUserStartedTyping: user => {
        store.commit('setUserTyping', user.id)
      },
      onUserStoppedTyping: () => {
        store.commit('setUserTyping', null)
      }
    }
  });
  setMembers();
  return activeRoom;
}

async function sendMessage(text) {
  const messageId = await currentUser.sendMessage({
    text,
    roomId: activeRoom.id
  });
  return messageId;
}


export function isTyping(roomId) {
  currentUser.isTypingIn({ roomId });
}


// ログアウト処理
function disconnectUser() {
  currentUser.disconnect();
}


export default {
  connectUser,
  subscribeToRoom,
  sendMessage,
  disconnectUser,
  CreateUser,
  CreateRoom,
  GetUserJoinableRooms,
  AddUserToRoom
}
