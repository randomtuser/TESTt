import React, { useState, useEffect, useRef } from 'react';

function VideoPlayer() {
  const [codecString] = useState('video/mp4; codecs="avc1.42C028"');
  var buffer = null;
  var mediaSource = new MediaSource();
  var queue = [];
  var ws = null;
  var video = null;
  const videoRef = useRef(null);

  const updateBuffer = async () => {
    if (queue.length > 0 && !buffer.updating) {
      buffer.appendBuffer(queue.shift());
    }
  };

  const sourceBufferHandle = () => {
    if (!buffer) {
      buffer = mediaSource.addSourceBuffer(codecString);
      buffer.mode = 'sequence';
    }

    buffer.addEventListener('update', async () => {
      updateBuffer();
    });

    // buffer.addEventListener('updateend', async () => {
    //   updateBuffer();
    // });

    initWS();
  };

  const initWS = () => {
    ws = new WebSocket(`ws://192.168.100.40:8080`, 'echo-protocol');
    ws.binaryType = 'arraybuffer';

    if (video !== undefined) {
      ws.onopen = () => {
        console.info('WebSocket connection initialized');
      };

      ws.onmessage = (event) => {
        if (video.error === null) {
          if (buffer.updating || queue.length > 0) {
            queue.push(event.data);
          } else {
            buffer.appendBuffer(event.data);
            video.play();
          }
        } else {
          console.error('Video element has an error:', video.error);
        }
      };
    }
  };

  useEffect(() => {
    console.log('UseEFfect');
    if (!buffer) {
      video = videoRef.current;
      video.src = window.URL.createObjectURL(mediaSource);
      mediaSource.addEventListener('sourceopen', sourceBufferHandle);
    }

    return () => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} controls />
    </div>
  );
}

export default VideoPlayer;
