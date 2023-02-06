import React from "react";
import axios from "../api/axios";
import "../styles/rankStyles.css";

const Rank = () => {
  const [totalWinsUsers, setTotalWinsUsers] = React.useState();
  const [winStreakUsers, setWinStreakUsers] = React.useState();
  const [fastestWinUsers, setFastestWinUsers] = React.useState();

  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/users");
        let users = sortDataTotalWins(response.data.users);
        setTotalWinsUsers(
          users.map((user, i) => {
            return (
              // using index as unique keys NOT good practice!
              <div key={i} className="total-wins-user">
                {user.username}
                <span className="total-wins-num">{user.stats.wins}</span>
              </div>
            );
          })
        );
        users = sortDataWinStreak(response.data.users);
        setWinStreakUsers(
          users.map((user, i) => {
            return (
              <div key={i} className="longest-win-streak-user">
                {user.username}{" "}
                <span className="longest-win-streak-num">
                  {user.stats.longestWinStreak}
                </span>
              </div>
            );
          })
        );
        users = sortDataFastestWin(response.data.users);
        setFastestWinUsers(
          users.map((user, i) => {
            return (
              <div key={i} className="fastest-time-user">
                {user.username}
                <span className="fastest-time-num">
                  {user.stats.bestTimeToWin}
                </span>
              </div>
            );
          })
        );
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  const sortDataTotalWins = (users) => {
    console.log("sorting...");
    for (let i = 0; i < users.length; i++) {
      for (let j = i + 1; j < users.length; j++) {
        if (users[j].stats.wins > users[i].stats.wins) {
          const temp = users[j];
          users[j] = users[i];
          users[i] = temp;
        }
      }
    }
    return users;
  };

  const sortDataWinStreak = (users) => {
    console.log("sorting...");
    for (let i = 0; i < users.length; i++) {
      for (let j = i + 1; j < users.length; j++) {
        if (users[j].stats.longestWinStreak > users[i].stats.longestWinStreak) {
          const temp = users[j];
          users[j] = users[i];
          users[i] = temp;
        }
      }
    }
    return users;
  };

  const sortDataFastestWin = (users) => {
    console.log("sorting...");
    for (let i = 0; i < users.length; i++) {
      for (let j = i + 1; j < users.length; j++) {
        if (
          // make sure lowest non-null number is at top of leader board
          users[j].stats.bestTimeToWin < users[i].stats.bestTimeToWin &&
          users[j].stats.bestTimeToWin != null &&
          users[i].stats.bestTimeToWin != null
        ) {
          const temp = users[j];
          users[j] = users[i];
          users[i] = temp;
        }
        if (
          // make sure nulls are at the bottom of leader board
          users[i].stats.bestTimeToWin == null &&
          users[j].stats.bestTimeToWin != null
        ) {
          const temp = users[j];
          users[j] = users[i];
          users[i] = temp;
        }
      }
    }
    return users;
  };

  return (
    <section className="rank-container">
      <div className="rank">
        <h2 className="rank-title">Leader Board</h2>
        <div className="rank-categories">
          <div className="total-wins-container">
            <h3 className="total-wins-title">Total Wins</h3>
            <div className="total-wins-user-cards">{totalWinsUsers}</div>
          </div>
          <div className="longest-win-streak-container">
            <h3 className="longest-win-streak-title">Win Streak</h3>
            <div className="longest-win-streak-user-cards">
              {winStreakUsers}
            </div>
          </div>
          <div className="fastest-time-container">
            <h3 className="fastest-time-title">Time-to-Win</h3>
            <div className="fastest-time-user-cards">{fastestWinUsers}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rank;
