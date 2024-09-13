import React, { useEffect, useRef, useState } from 'react';
import { useDaily, useDailyEvent, useParticipantIds, useVideoTrack } from '@daily-co/daily-react';

// VideoTile component for both local and remote videos
const VideoTile = ({ participantId, isLocal = false }) => {
  const videoEl = useRef(null);
  const { track: videoTrack } = useVideoTrack(participantId, 'video');

  useEffect(() => {
    if (videoTrack && videoEl.current) {
      videoEl.current.srcObject = new MediaStream([videoTrack]);
    }
  }, [videoTrack]);

  return (
    <video ref={videoEl} autoPlay playsInline muted={isLocal} style={{ width: isLocal ? '150px' : '100%', height: '100%' }} />
  );
};

// VideoCall component
const VideoCall = () => {
  const daily = useDaily();
  const [joined, setJoined] = useState(false);
  const [muted, setMuted] = useState(false);
  const participantIds = useParticipantIds();
  const localParticipantId = 'local'; // Placeholder for local participant

  useDailyEvent('joined-meeting', () => {
    setJoined(true);
  });

  useDailyEvent('left-meeting', () => {
    setJoined(false);
  });

  useDailyEvent('error', (err) => {
    console.error('Error in Daily call:', err);
  });

  const startCall = async () => {
    try {
      await daily.join({ url: 'https://perfecttest.daily.co/QNYYVO9rVzGjNPHgUXNc' }); // Replace with your room URL
    } catch (err) {
      console.error('Error starting call:', err);
    }
  };

  const leaveCall = async () => {
    await daily.leave();
    setJoined(false);
  };

  const toggleMute = () => {
    const audioTrack = daily.localAudio();
    if (audioTrack && muted) {
      audioTrack.start();
      setMuted(false);
    } else if (audioTrack) {
      audioTrack.stop();
      setMuted(true);
    }
  };

  return (
    <div>
      <h1>Daily.co Video Call Service</h1>
      <div className="video-container">
        {participantIds.map((participantId) => (
          <div key={participantId} className="remote-video">
            <VideoTile participantId={participantId} />
          </div>
        ))}
        <div className="local-video">
          <VideoTile participantId={localParticipantId} isLocal />
        </div>
      </div>
      <div className="controls">
        {joined ? (
          <>
            <button className="end-call-button" onClick={leaveCall}>
              End Call
            </button>
            <button className="mute-button" onClick={toggleMute}>
              {muted ? 'Unmute' : 'Mute'}
            </button>
          </>
        ) : (
          <button className="start-call-button" onClick={startCall}>
            Start Call
          </button>
        )}
      </div>

      <style>{`
        .controls {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }

        .start-call-button, .end-call-button, .mute-button {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: none;
          color: white;
          font-size: 16px;
          cursor: pointer;
          margin: 0 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .start-call-button {
          background-color: #1060eb;
        }

        .end-call-button {
          background-color: #e64d43;
        }

        .mute-button {
          background-color: gray;
        }

        .video-container {
          position: relative;
          height: 80vh;
          max-width: 80vw;
          background-color: #000;
          aspect-ratio: 4 / 3;
          margin: 20px auto;
          border-radius: 12px;
        }

        .remote-video {
          width: 100%;
          height: 100%;
          background-color: #000;
          border-radius: 12px;
        }

        .local-video {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 150px;
          aspect-ratio: 4 / 3;
          background-color: #000;
          border: 1px solid #fff;
          border-radius: 12px;
        }
      `}</style>
    </div>
  );
};

export default VideoCall;
