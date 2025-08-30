import { Router, Request, Response } from 'express';
import { getPatterns } from '../services/patternsService';

export const patterns = Router();

patterns.get('/', async (_req, res) => {
     const { data, patterns } =  await getPatterns({ ticker:"", fromDate:"fromDate", toDate:"toDate", patternType:"head-and-shoulders" });
  res.status(200).json({data: [1], patterns: patterns});
});

patterns.post("/", async (req: Request, res: Response) => {
  const { ticker, dateRange, patternType } = req.body;
  const fromDate = dateRange.from;
  const toDate = dateRange.to;
  console.log(req.body);
  if (!ticker || !fromDate || !toDate || !patternType ) {
    return res.status(400).json({ message: "Ticker and dates are required" });
  }
  const { data, patterns } =  await getPatterns({ ticker, fromDate, toDate, patternType });
  res.status(200).json({data: data, patterns: patterns});
});



