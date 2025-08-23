import fs from "fs";
import csv from "csv-parser";
import yahooFinance from 'yahoo-finance2';

async function getStockData(ticker, fromDate, toDate) {
  const queryOptions = {
    period1: fromDate,
    period2: toDate,
    interval: '1d' // Use 1-day candles for analysis
  };
  const result = await yahooFinance.historical(ticker, queryOptions);
  return result; // An array of daily candles
}



// getStockData('AAPL', '2023-01-01', '2023-12-31')
//   .then(data => console.log(data)).catch(err => console.error(err));

const results = [];

// fs.createReadStream("data.csv")
//   .pipe(csv())
//   .on("data", (row) => {
//     // Convert numbers from strings to floats/ints
//     results.push({
//       date: row.Date,
//       open: parseFloat(row.Open),
//       high: parseFloat(row.High),
//       low: parseFloat(row.Low),
//       close: parseFloat(row.Close),
//       volume: parseInt(row.Volume, 10),
//     });
//   })
//   .on("end", () => {
//     console.log("✅ CSV Loaded:");
//     console.log(results);
//   });