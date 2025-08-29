import { DOUBLE_TOPS_DATA } from './data';
import { getStockData, roughlyEqual, getAllTops, getAllBottoms } from './utils';

const results = DOUBLE_TOPS_DATA;

export function getCandidateTops(tops, tolerance) {
    const topsSet : any = new Set(tops);
    const candidateTops : any = [];

    for (const top1 of topsSet) {
        for (const top2 of topsSet) {
            if (top1 == top2) continue;
            if (roughlyEqual(top1.close, top2.close, tolerance)) {
                candidateTops.push(top1, top2);
                topsSet.delete(top1);
                topsSet.delete(top2);
            }
        }
    }

    return candidateTops;
}

export function detectDoubleTops(data, tops, bottoms) {
    let i = 0;
    let patterns : any = [];
    while (i < tops.length - 1) {
        const firstTop = tops[i]
        const secondTop = tops[i + 1]

        const bottomsBetween = bottoms.filter(botom => {
            const bottomDate = new Date(botom.date);
            return (bottomDate > new Date(firstTop.date) && bottomDate < new Date(secondTop.date))
        });

        // Valley
        let smallestBotomBetween = bottomsBetween[0];
        bottomsBetween.forEach((bottom) => {
            smallestBotomBetween = smallestBotomBetween.close < bottom.close ? smallestBotomBetween : bottom;
        })

        // Break down
        const smallestCloseAfter = data.find(item => {
            const bottomDate = new Date(item.date);
            return (bottomDate > new Date(secondTop.date) && item.close <= smallestBotomBetween.close)
        });

        if (smallestCloseAfter != null) {
            patterns.push({ firstTop: firstTop, secondTop: secondTop, valley: smallestBotomBetween, breakDown: smallestCloseAfter });
        }

        i += 2;
    }
    return patterns;
}


