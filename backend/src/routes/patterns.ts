import { Router, Request, Response } from 'express';
import { getPatterns } from '../services/patternsService';

export const patterns = Router();

patterns.get('/', (_req, res) => {
     res.json({ message: "fr" });
});

patterns.post("/", async (req: Request, res: Response) => {
  const { ticker, dateRange, patternType } = req.body;
  const fromDate = dateRange.from;
  const toDate = dateRange.to;
  console.log(req.body);
  if (!ticker || !fromDate || !toDate || !patternType ) {
    return res.status(400).json({ message: "Ticker and dates are required" });
  }
  const {data, patterns} =  await getPatterns({ ticker, fromDate, toDate });
  res.status(200).json({data: data, patterns: patterns});
});



