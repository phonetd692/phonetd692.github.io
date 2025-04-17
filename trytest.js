import {joinRoom} from './trystero-ipfs.min.js'

const config = {appId: '3d_app_test', password: 'this is my password3'}
const room = joinRoom(config, 'yodddyne')
console.log("Test Log");
var selfStream = null;

var button1 = document.getElementById("button1");
button1.onclick = async function() {
selfStream ??= await navigator.mediaDevices.getUserMedia({
  audio: true,
  video: false
})
      room.addStream(selfStream, null, "testMeta");
    };
    
    var button2 = document.getElementById("button2");
button2.onclick = function() {
      console.log("Peers: ", room.getPeers());
    };
    
    var button3 = document.getElementById("button3");
button3.onclick = function() {
      room.leave();
    };
// send stream to peers currently in the room


// send stream to peers who join later
room.onPeerJoin(peerId => console.log(peerId));

// handle streams from other peers
room.onPeerTrack((track, stream, peerId, meta) => {
	console.log("Peer track: ", track, peerId, meta, stream);
})
room.onPeerStream((stream, peerId, meta) => {
	console.log("Peer stream: ", peerId, meta, stream);
})
