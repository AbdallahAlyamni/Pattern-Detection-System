import { Router } from 'express';
import { detectDoubleTop } from '../libs/utils.js';

const results = [
    { date: '2023-01-01', open: 100, high: 105, low: 99, close: 100, volume: 1000000 },
    { date: '2023-01-02', open: 101, high: 106, low: 100, close: 105, volume: 1200000 },
    { date: '2023-01-03', open: 106, high: 111, low: 105, close: 110, volume: 1500000 },
    { date: '2023-01-04', open: 104, high: 105, low: 102, close: 103, volume: 900000 },
    { date: '2023-01-05', open: 108, high: 110, low: 107, close: 109, volume: 1400000 },
    { date: '2023-01-06', open: 102, high: 103, low: 100, close: 101, volume: 1100000 },
    { date: '2023-01-07', open: 97, high: 100, low: 95, close: 98, volume: 1300000 }
];

export const patterns = Router();

patterns.get('/', (_req, res) => {

    const res2 = detectDoubleTop(results);
    console.log(res2);
    res.json({ message: 'Pattern detection endpoint', pattern: res2 });

});



