// export const socketUrl = 'wss://node-calisdairy.mobiloitte.io';
import io from 'socket.io-client';
const socketUrl = 'https://chat-socket-api-ebub.onrender.com/';
class WSService {
  initializeSocket = async () => {
    try {
      this.socket = io(socketUrl, {
        transports: ['websocket'],
      });
      this.socket.on('connect', data => {
        console.log('==== SOCKET CONNECTED =====');
      });
      this.socket.on('disconnnect', data => {
        console.log('===== SOCKET DISCONNECT =====');
      });
      this.socket.on('error', data => {
        console.log('=== ERROR ====', data);
      });
    } catch (err) {
      console.log('===== socket is not iniatilized', err);
    }
  };
  emit(event, data = {}) {
    this.socket.emit(event, data);
  }
  on(event, callBack) {
    this.socket.on(event, callBack);
  }
  removeListener(listnerName) {
    this.socket.removeListener(listnerName);
  }
}
const socketServices = new WSService();
export default socketServices;
