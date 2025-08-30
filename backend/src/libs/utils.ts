import yahooFinance from 'yahoo-finance2';

export async function getStockData(ticker, fromDate, toDate) {
    const queryOptions = {
        period1: fromDate,
        period2: toDate,
        interval: "1d" as "1d" // Use 1-day candles for analysis
    };
    const result = await yahooFinance.historical(ticker, queryOptions);
    return result; // An array of daily candles
}

export function roughlyEqual(a, b, tolerance) {
    return Math.abs(a - b) <= tolerance;
}

export function getCandidateTops(tops, tolerance) {
    const candidateTops: any = [];

    for (let i = 0; i < tops.length; i++) {
        for (let j = 0; j < tops.length; j++) {
            let bottom1 = tops[i];
            let bottom2 = tops[j];
            if (bottom1 == bottom2) continue;
            if (roughlyEqual(bottom1.close, bottom2.close, tolerance)) {
                candidateTops.push(bottom1, bottom2);
                tops = tops.filter(bottom => (bottom.date != bottom1.date && bottom.date != bottom2.date))
            }
        }
    }

    return candidateTops;
}

export function getCandidateBottoms(bottoms, tolerance) {

    const candidateBottoms: any = [];

    for (let i = 0; i < bottoms.length; i++) {
        for (let j = 0; j < bottoms.length; j++) {
            let bottom1 = bottoms[i];
            let bottom2 = bottoms[j];
            if (bottom1 == bottom2) continue;
            if (roughlyEqual(bottom1.close, bottom2.close, tolerance)) {
                candidateBottoms.push(bottom1, bottom2);
                bottoms = bottoms.filter(bottom => (bottom.date != bottom1.date && bottom.date != bottom2.date))
            }
        }
    }

    return candidateBottoms;
}

export function getAllTops(data, window = null as any) {

    if (window) return getTopsWithinWindow(data, window)

    return data.filter((point, i) => {
        if (i === 0 || i === data.length - 1) return false;
        const prev = data[i - 1];
        const next = data[i + 1];
        return point.close > prev.close && point.close > next.close;
    });
}

export function getAllBottoms(data, window = null as any) {

    if (window) return getBottomsWithinWindow(data, window)

    return data.filter((point, i) => {
        if (i === 0 || i === data.length - 1) return false;
        const prev = data[i - 1];
        const next = data[i + 1];
        return point.close < prev.close && point.close < next.close;
    });
}

function getBottomsWithinWindow(data, window = 2) {
    const bottoms: any = [];

    for (let i = window; i < data.length - window; i++) {
        const point = data[i];

        const isBottom = data
            .slice(i - window, i + window + 1)
            .every((neighbor, idx) => {
                if (idx === window) return true;
                return point.close < neighbor.close;
            });

        if (isBottom) {
            bottoms.push(point);
        }
    }

    return bottoms;
}

function getTopsWithinWindow(data, window = 2) {
    const tops: any = [];

    for (let i = window; i < data.length - window; i++) {
        const point = data[i];

        const isTop = data
            .slice(i - window, i + window + 1)
            .every((neighbor, idx) => {
                if (idx === window) return true;
                return point.close > neighbor.close;
            });

        if (isTop) {
            tops.push(point);
        }
    }

    return tops;
}