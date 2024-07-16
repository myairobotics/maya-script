(function () {
  // Load Tailwind CSS
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href =
    "https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css";
  document.head.appendChild(link);

  var streamId = null;
  var sessionId = null;
  var offer = null;
  var iceServers = null;
  var peerConnection = null;
  var DID_API_KEY =
    "ZGV2ZWxvcG1lbnRAbXlhaXJvYm90aWNzLmNvbQ:zn-SRq3ykjKaqeboAjI-F"; // replace with actual value
  var streamVideoElement = null;
  var connected = false;
  var streamVideoOpacity = 0;
  var videoStream = null;
  var previousInputText = null;

  var timer = null;
  var reminderCount = 0;
  var sessionExpired = false;

  async function createStream() {
    try {
      const response = await fetch("https://api.d-id.com/talks/streams", {
        method: "POST",
        headers: {
          Authorization: `Basic ${DID_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source_url: "https://app.myaisells.com/assets/mayaframe.jpeg",
        }),
      });

      const data = await response.json();
      streamId = data.id;
      sessionId = data.session_id;
      offer = new RTCSessionDescription(data.offer);
      iceServers = data.ice_servers;
    } catch (error) {
      console.error("Error creating stream:", error);
      // handle error notification here
    }
  }

  async function sendAnswer(answer) {
    try {
      if (!sessionId) {
        console.warn("No valid session ID found. Cannot send answer.");
        return;
      }

      if (answer) {
        await fetch(`https://api.d-id.com/talks/streams/${streamId}/sdp`, {
          method: "POST",
          headers: {
            Authorization: `Basic ${DID_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            answer: answer,
            session_id: sessionId,
          }),
        });
      }
    } catch (error) {
      console.error("Error sending answer:", error);
    }
  }

  async function handleIceCandidate(event) {
    try {
      if (!sessionId) {
        console.warn("No valid session ID found. Cannot handle ICE candidate.");
        return;
      }

      if (event.candidate) {
        await fetch(`https://api.d-id.com/talks/streams/${streamId}/ice`, {
          method: "POST",
          headers: {
            Authorization: `Basic ${DID_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            candidate: event.candidate,
            session_id: sessionId,
          }),
        });
      }
    } catch (error) {
      console.error("Error handling ICE candidate:", error);
    }
  }

  function setVideoStream(stream) {
    streamVideoElement.srcObject = stream;
    streamVideoElement.play();
  }

  async function initializePeerConnection() {
    peerConnection = new RTCPeerConnection({ iceServers });

    peerConnection.onicecandidate = handleIceCandidate;

    peerConnection.ontrack = (event) => {
      if (event.streams && event.streams[0]) {
        setVideoStream(event.streams[0]);
      }
    };

    peerConnection.setRemoteDescription(offer);

    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    sendAnswer(peerConnection.localDescription);
  }

  async function start() {
    await createStream();
    await initializePeerConnection();
  }

  function stop() {
    clearInterval(timer);

    streamId = null;
    sessionId = null;
    offer = null;
    iceServers = null;
    videoStream = null;

    if (peerConnection) {
      peerConnection.close();
      peerConnection = null;
    }

    if (streamVideoElement) {
      streamVideoElement.srcObject = null;
    }
  }

  function handleStream() {
    connected = !connected;

    if (connected) {
      start();
    } else {
      stop();
    }
  }

  function handleStreamOpacity() {
    streamVideoOpacity = streamVideoElement.style.opacity == 0 ? 1 : 0;
    streamVideoElement.style.opacity = streamVideoOpacity;
  }

  document.addEventListener("DOMContentLoaded", () => {
    streamVideoElement = document.getElementById("stream-video");

    document
      .getElementById("maya-activate")
      .addEventListener("click", handleStream);

    document
      .getElementById("maya-toggle")
      .addEventListener("click", handleStreamOpacity);
  });
})();
