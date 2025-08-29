import { DOUBLE_TOPS_DATA } from './data.js';
import { getStockData, roughlyEqual, getAllTops, getAllBottoms } from './utils.js';

const results = DOUBLE_TOPS_DATA;

function getCandidateTops(tops, tolerance) {
    const topsSet = new Set(tops);
    const candidateTops = [];

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

function detectDoubleTops(data, tops, bottoms) {
    let i = 0;
    let patterns = [];
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

async function main() {

    const allTops = getAllTops(results, 2);
    // console.log('allTops', JSON.stringify(allTops));

    const allBottoms = getAllBottoms(results);
    // console.log('allBottoms', JSON.stringify(allBottoms));

    const candidateTops = getCandidateTops(allTops, 2);
    // console.log('candidateTops', JSON.stringify(candidateTops));

    const patterns = detectDoubleTops(results, candidateTops, allBottoms);
    console.log('patterns', JSON.stringify(patterns));

    // const res = await getStockData('AMZN', new Date('2018-08-15'), new Date('2018-10-10'))


    // console.log(res.map(item => { return {...item, date: item.date.toISOString() }}));

}

main().catch(console.error)
