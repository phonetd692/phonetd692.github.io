import {joinRoom} from './trystero-nostr.min.js'

const config = {appId: '3d_app_test', password: 'this is my password3'}
const room = joinRoom(config, 'yodddyne')
console.log("Test Log");
var selfStream = null;
var selfStream2 = null;
var cou = 0;
var button1 = document.getElementById("button1");
button1.onclick = async function() {
selfStream ??= await navigator.mediaDevices.getUserMedia({
  audio: true,
  video: false
})
      room.addStream(selfStream, null, `testMeta: ${cou++}`);
    };
    
    var button2 = document.getElementById("button2");
button2.onclick = function() {
      console.log("Peers: ", room.getPeers());
    };
    
    var button3 = document.getElementById("button3");
button3.onclick = function() {
      room.leave();
    };

var button4 = document.getElementById("button4");
button4.onclick = async function() {
selfStream2 ??= await navigator.mediaDevices.getUserMedia({
  audio: false,
  video: true
})
      room.replaceTrack(selfStream.getTracks()[0], selfStream2.getTracks()[0], selfStream, null, `testMeta: ${cou++}`);
    };

var button5 = document.getElementById("button5");
button5.onclick = async function() {
	var trac = selfStream.getTracks()[0]
      room.replaceTrack(trac, trac, selfStream, null, `testMeta: ${cou++}`);
    };
// send stream to peers currently in the room


// send stream to peers who join later
room.onPeerJoin(peerId => console.log(peerId));

// handle streams from other peers
room.onPeerTrack((track, stream, peerId, meta) => {
	console.log("Peer track: ", meta, track, peerId, stream);
})
room.onPeerStream((stream, peerId, meta) => {
	console.log("Peer stream: ", peerId, meta, stream);
})
