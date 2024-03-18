import { supabase } from '../../../supabase';

export async function realTimeCommandMonitor(commandMonitor, machine_id, videoRef) {
  var codecString = 'video/mp4; codecs="avc1.42C028"';

  var video = videoRef;
  var mediaSource = new MediaSource();
  videoRef.src = window.URL.createObjectURL(mediaSource);
  var buffer = null;
  var queue = [];
  var bufferArray = [];

  async function updateBuffer() {
    if (queue.length > 0 && !buffer.updating) {
      buffer.appendBuffer(queue.shift());
    }
    return true;
  }

  function sourceBufferHandle() {
    buffer = mediaSource.addSourceBuffer(codecString);
    buffer.mode = 'sequence';

    buffer.addEventListener('update', async function () {
      // Note: Have tried 'updateend'
      console.log('update');
      await updateBuffer();
    });

    initWS();
  }

  mediaSource.addEventListener('sourceopen', sourceBufferHandle);
  console.log('here');

  function initWS() {
    var ws = new WebSocket(
      'ws://' + window.location.hostname + ':' + window.location.port,
      'echo-protocol',
    );
    ws.binaryType = 'arraybuffer';

    ws.onopen = function () {
      console.info('WebSocket connection initialized');
    };

    ws.onmessage = function (event) {
      if (typeof event.data === 'object') {
        // Check if the videoRef element has an error
        if (buffer.updating || queue.length > 0) {
          queue.push(event.data);
        } else {
          buffer.appendBuffer(event.data);
          videoRef.play();
        }
      }
    };
  }
}

export async function realTimeCommandMonitorDisable(commandMonitor, machine_id) {
  return supabase
    .from('rl_machine_commands')
    .update({ command: commandMonitor })
    .eq('machine', machine_id);
}
