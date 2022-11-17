import React from "react";
import axios from "../api/axios";
import "../styles/rankStyles.css";

const Rank = () => {
  //   const [allStats, setAllStats] = React.useState([]);
  const [totalWinsUsers, setTotalWinsUsers] = React.useState();
  const [totalWins, setTotalWins] = React.useState();
  const [winStreakUsers, setWinStreakUsers] = React.useState();
  const [winStreak, setWinStreak] = React.useState();
  const [fastestWinUsers, setFastestWinUsers] = React.useState();
  const [fastestWin, setFastestWin] = React.useState();

  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/users");
        let users = sortDataTotalWins(response.data.users);
        setTotalWinsUsers(
          users.map((user, i) => {
            return <div key={i}>{user.username}</div>; // using index as unique keys NOT good practice!
          })
        );
        setTotalWins(
          users.map((user, i) => {
            return <div key={i}>{user.stats.wins}</div>;
          })
        );
        users = sortDataWinStreak(response.data.users);
        setWinStreakUsers(
          users.map((user, i) => {
            return <div key={i}>{user.username}</div>;
          })
        );
        setWinStreak(
          users.map((user, i) => {
            return <div key={i}>{user.stats.longestWinStreak}</div>;
          })
        );
        users = sortDataFastestWin(response.data.users);
        setFastestWinUsers(
          users.map((user, i) => {
            return <div key={i}>{user.username}</div>;
          })
        );
        setFastestWin(
          users.map((user, i) => {
            return <div key={i}>{user.stats.bestTimeToWin}</div>;
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
            <h3 className="total-wins">Total Wins</h3>
            <div className="total-wins-user">{totalWinsUsers}</div>
            <div className="total-wins-num">{totalWins}</div>
          </div>
          <div className="longest-win-streak-container">
            <h3 className="longest-win-streak">Win Streak</h3>
            <div className="longest-win-streak-user">{winStreakUsers}</div>
            <div className="longest-win-streak-num">{winStreak}</div>
          </div>
          <div className="fastest-time-container">
            <h3 className="fastest-time">Time-to-Win</h3>
            <div className="fastest-time-user">{fastestWinUsers}</div>
            <div className="fastest-time-num">{fastestWin}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rank;
