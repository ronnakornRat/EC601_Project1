const socket = io('/')
const videoGrid = document.getElementById('video-grid')

// use peerjs to generate a userId for us
const myPeer = new Peer(undefined, {
    host: '/',
    port: '3001'
})

const myVideo = document.createElement('video')

// mute ourselves so the output won't playback our own voice
myVideo.muted = true
// connect our video
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    addVideoStream(myVideo, stream)
})

myPeer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id)
})


socket.on('user connected', userId => {
    console.log('User connected', userId)
})

function addVideoStream(video, stream) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
    videoGrid.append(video)
}