
# Daily.co One-on-One Breakout Room POC

This project is a proof of concept (POC) built using Daily.co to create a video call platform where users can be dynamically placed into one-on-one breakout rooms for a fixed duration. The POC allows for up to 20 users, rotating every 2 minutes to meet other users in a one-on-one call, with a waiting room for unpaired users.

## Features

- **One-on-One Breakout Rooms**: Users are paired into separate one-on-one breakout rooms for 2 minutes.
- **Waiting Room**: If there is an odd number of users, one will be placed into the waiting room until they can be paired.
- **Session Rotation**: After each 2-minute session, users are placed into a 10-second waiting room before being rotated to the next one-on-one session.
- **Dynamic Room Creation**: Breakout rooms are created dynamically using the Daily.co API.
- **Audio/Video Control**: Initially, audio and video are disabled. Users' audio and video are only enabled during the one-on-one sessions.

## Technology Stack

- **Frontend**: React.js
- **Video API**: [Daily.co](https://daily.co/) with \`@daily-co/daily-react\` hooks for handling video/audio streams.
- **State Management**: Recoil for managing participant states and breakout room logic.

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/arjun-pzd/daily-poc.git
cd daily-poc
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Daily.co API

1. Create an account on [Daily.co](https://www.daily.co/).
2. Generate an API key and replace the placeholder \`YOUR_DAILY_API_KEY\` in the project.
3. Use the Daily.co REST API to create rooms dynamically.

### 4. Create \`.env\` File

Create a \`.env\` file in the root directory to store your environment variables, including your Daily.co API key.

```bash
REACT_APP_DAILY_API_KEY=your-daily-api-key
REACT_APP_DAILY_ROOM_URL=https://your-domain.daily.co/your-room
```

### 5. Running the App

```bash
npm start
```

Open \`http://localhost:3000\` to view the app in your browser.

## How It Works

### 1. Dynamic Room Creation
Rooms are created dynamically using the Daily.co REST API. For each pair of users, a new room is created for their one-on-one session. These rooms automatically expire after 10 minutes to avoid clutter.

### 2. Breakout Room Logic
- Users are paired into breakout rooms in groups of two.
- If there is an odd number of users, the unpaired user is placed in the waiting room.
- After a 2-minute session, the users are moved into a 10-second waiting room, and then rotated into new breakout rooms.

### 3. Waiting Room
A simple waiting room interface shows users when they are unpaired or waiting for the next session to start.

### 4. Rotation Mechanism
The app ensures that each user gets a chance to meet others in one-on-one sessions. After every 2 minutes, the user list is rotated to create new pairs. This continues until each user has met every other participant.

### 5. Audio/Video Control
The app uses Daily.co's \`useLocalParticipant\`, \`useParticipantIds\`, and \`useVideoTrack\` hooks to control the audio and video of each participant. Initially, all users are placed into a room with video/audio disabled until they join their breakout session.

## Future Improvements

- **Session Feedback**: After each session, add the option for users to leave feedback about their experience.
- **Enhanced Waiting Room**: Customize the waiting room with chat or interactive elements.
- **Session Timer**: Add a countdown timer for each session to display how much time is left.
- **Data Persistence**: Save the session data and interactions in a database for future reference.

## License

None
