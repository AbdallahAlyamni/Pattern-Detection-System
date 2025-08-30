import { Router, Request, Response } from 'express';
import { getPatterns } from '../services/patternsService';

export const patterns = Router();

patterns.get('/', async (req: Request, res: Response) => {
    const { ticker, fromDate, toDate, patternType } = req.query;
    if (!ticker || !fromDate || !toDate || !patternType) {
        return res.status(400).json({ message: "Ticker and dates are required" });
    }
    const { data, patterns } = await getPatterns({ ticker, fromDate, toDate, patternType });
    res.status(200).json({ data: data, patterns: patterns });
});

