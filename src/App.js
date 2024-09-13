import React from 'react';
import { RecoilRoot } from 'recoil';
import { DailyProvider } from '@daily-co/daily-react';
import VideoCall from './VideoCall';

const App = () => {
  const roomUrl = 'https://perfecttest.daily.co/QNYYVO9rVzGjNPHgUXNc'; // Replace with your actual Daily.co room URL

  return (
    <RecoilRoot>
      <DailyProvider url={roomUrl}>
          <VideoCall />
      </DailyProvider>
    </RecoilRoot>
  );
};

export default App;
