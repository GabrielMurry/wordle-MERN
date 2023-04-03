# Wordle Clone

A fully functional and responsive Worlde clone created on the MERN stack.

For a more personal experience, I included user authentication with JWT access, refresh tokens, and cookies. This enabled me to perform CRUD operations on user data (stored in MongoDB) to display individual and global statistics on a leaderboard, so users can compare and compete against eachother.

# Goals
Build a fullstack project from scratch.

Strengthen my skills in React, Express, and Node.

Create a responsive, user-friendly design using CS with a mobile-first approach.

Deploy my frontend and backend separately with continuous deployment.

Have the backend and API run "indefinitely", receiving requests and sending responses from the frontend.

Manage user info, data, and statistics in MongoDB using Mongoose Schemas.

Engineer CRUD operations on user data to display statistics on a global player leaderboard.

Create a REST API to issue the client app's access and refresh token in an httpOnly cookie for better security.

Encrypt user login passwords using bcrypt and salt, with persist login state on refresh.

# Next Steps
Real-time multiplayer - play against a friend to see who can guess the correct word first.

Allow users to choose customizable color palettes.

Display a page of personal data with graphs and charts based on win/loss percentages, average time-to-win, win probabilities for each row, etc.

For inclusivity (and personal foreign language practice), add language options such as Spanish. May require an API to access other random foreign language solution word.

Add a "forgot my password" option on the login page.

Add an option to delete account.
