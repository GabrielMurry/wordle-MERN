import { useState, useEffect } from "react";
import BarChart from "./BarChart";
import { Chart, registerables } from "chart.js";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import "../styles/statsStyles.css";

const Statistics = (props) => {
  Chart.register(...registerables);
  const { auth } = useAuth();

  const [allStats, setAllStats] = useState({});
  const [rowChartData, setRowChartData] = useState({});
  const [rowChartOptions, setRowChartOptions] = useState({});

  useEffect(() => {
    const getStatistics = async () => {
      let user = JSON.stringify(auth?.user);
      try {
        const response = await axios.get("/statistics", { params: { user } });
        setAllStats({
          ...response.data._doc.stats,
          ...response.data.additionalStats,
        });
        const rowData = response.data.additionalStats.rowData;
        const rowWonArr = response.data._doc.stats.rowWon;
        const rowWon = rowWonArr[rowWonArr.length - 1];
        setRowChartData({
          labels: rowData.map((data) => data.row),
          datasets: [
            {
              label: "Wins",
              data: rowData?.map((data) => data.wins),
              backgroundColor: rowData?.map((data) =>
                data.row === rowWon
                  ? "rgba(255, 182, 193, 0.7)"
                  : "rgba(216, 195, 255, 0.7)"
              ),
              borderColor: "black",
              borderWidth: "1.5",
              barThickness: 61.9,
            },
          ],
        });
        setRowChartOptions({
          indexAxis: "y",
          plugins: {
            legend: { display: false, position: "right" },
            title: {
              display: true,
            },
          },
          maintainAspectRatio: false,
          scales: {
            x: {
              suggestedMax: response.data._doc.stats.wins,
              grid: {
                display: false,
                drawBorder: false,
              },
              ticks: {
                display: false,
              },
            },
            y: {
              grid: {
                display: false,
                drawBorder: false,
              },
              ticks: {
                display: false,
              },
            },
          },
        });
      } catch (err) {
        console.error(err);
      }
    };
    if (props.gameOver) {
      getStatistics();
    }
  }, [props.gameOver, auth?.user]);

  return (
    <div className="statistics-container">
      {allStats.didWin && (
        <div className="barchart-row-container">
          <BarChart chartData={rowChartData} options={rowChartOptions} />
        </div>
      )}
      {/* {allStats.didWin && (
        <div>
          <h3>Win Streak: {allStats.winStreak}</h3>
          {allStats.winTime.length === 4 && (
            <h3>
              Time to Win: {allStats.winTime[0]}{" "}
              {allStats.winTime[0] > 1 ? "days" : "day"} {allStats.winTime[1]}{" "}
              {allStats.winTime[1] > 1 ? "hours" : "hour"} {allStats.winTime[2]}{" "}
              {allStats.winTime[2] > 1 ? "minutes" : "minute"}
              {allStats.winTime[3]}{" "}
              {allStats.winTime[3] === 1 ? "second" : "seconds"}
            </h3>
          )}
          {allStats.winTime.length === 3 && (
            <h3>
              Time to Win: {allStats.winTime[0]}{" "}
              {allStats.winTime[0] > 1 ? "hours" : "hour"} {allStats.winTime[1]}{" "}
              {allStats.winTime[1] > 1 ? "minutes" : "minute"}{" "}
              {allStats.winTime[2]}{" "}
              {allStats.winTime[2] === 1 ? "second" : "seconds"}
            </h3>
          )}
          {allStats.winTime.length === 2 && (
            <h3>
              Time to Win: {allStats.winTime[0]}{" "}
              {allStats.winTime[0] > 1 ? "minutes" : "minute"}{" "}
              {allStats.winTime[1]}{" "}
              {allStats.winTime[1] === 1 ? "second" : "seconds"}
            </h3>
          )}
          {allStats.winTime.length === 1 && (
            <h3>
              Time to Win: {allStats.winTime[0]}{" "}
              {allStats.winTime[0] === 1 ? "second" : "seconds"}{" "}
            </h3>
          )}
          {allStats.fastestWinTime.length === 4 && (
            <h3>
              Fastest Time to Win: {allStats.fastestWinTime[0]}{" "}
              {allStats.fastestWinTime[0] > 1 ? "days" : "day"}{" "}
              {allStats.fastestWinTime[1]}{" "}
              {allStats.fastestWinTime[1] > 1 ? "hours" : "hour"}{" "}
              {allStats.fastestWinTime[2]}{" "}
              {allStats.fastestWinTime[2] > 1 ? "minutes" : "minute"}
              {allStats.fastestWinTime[3]}{" "}
              {allStats.fastestWinTime[3] === 1 ? "second" : "seconds"}
            </h3>
          )}
          {allStats.fastestWinTime.length === 3 && (
            <h3>
              Fastest Time to Win: {allStats.fastestWinTime[0]}{" "}
              {allStats.fastestWinTime[0] > 1 ? "hours" : "hour"}{" "}
              {allStats.fastestWinTime[1]}{" "}
              {allStats.fastestWinTime[1] > 1 ? "minutes" : "minute"}{" "}
              {allStats.fastestWinTime[2]}{" "}
              {allStats.fastestWinTime[2] === 1 ? "second" : "seconds"}
            </h3>
          )}
          {allStats.fastestWinTime.length === 2 && (
            <h3>
              Fastest Time to Win: {allStats.fastestWinTime[0]}{" "}
              {allStats.fastestWinTime[0] > 1 ? "minutes" : "minute"}{" "}
              {allStats.fastestWinTime[1]}{" "}
              {allStats.fastestWinTime[1] === 1 ? "second" : "seconds"}
            </h3>
          )}
          {allStats.fastestWinTime.length === 1 && (
            <h3>
              Fastest Time to Win: {allStats.fastestWinTime[0]}{" "}
              {allStats.fastestWinTime[0] === 1 ? "second" : "seconds"}{" "}
            </h3>
          )}
        </div>
      )} */}
    </div>
  );
};

export default Statistics;
