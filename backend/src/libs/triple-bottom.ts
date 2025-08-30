
export function detectTripleBottoms(data, bottoms, tops) {
    let i = 0;
    let patterns: any = [];
    while (i < bottoms.length - 2) {
        const firstBottom = bottoms[i]
        const secondBottom = bottoms[i + 1]
        const thirdBottom = bottoms[i + 2]

        const topsBetween1 = tops.filter(top => {
            const topDate = new Date(top.date);
            return (topDate > new Date(firstBottom.date) && topDate < new Date(secondBottom.date))
        });

        if(topsBetween1.length == 0){
            i += 3;
            continue;
        }

        const topsBetween2 = tops.filter(top => {
            const topDate = new Date(top.date);
            return (topDate > new Date(secondBottom.date) && topDate < new Date(thirdBottom.date))
        });

        if(topsBetween2.length == 0){
            i += 3;
            continue;
        }

        // Valley
        let biggestTopBetween1 = topsBetween1[0];
        topsBetween1.forEach((top) => {
            biggestTopBetween1 = biggestTopBetween1.close > top.close ? biggestTopBetween1 : top;
        })

        let biggestTopBetween2 = topsBetween2[0];
        topsBetween2.forEach((top) => {
            biggestTopBetween2 = biggestTopBetween2.close > top.close ? biggestTopBetween2 : top;
        })

        // Break down
        const biggestCloseAfter = data.find(item => {
            const topDate = new Date(item.date);
            return (topDate > new Date(thirdBottom.date) && item.close >= biggestTopBetween2.close)
        });

        if (biggestCloseAfter != null) {
            patterns.push({ firstBottom: firstBottom, secondBottom: secondBottom, thirdBottom: thirdBottom, firstHigh: biggestTopBetween1, secondHigh: biggestTopBetween2, breakOut: biggestCloseAfter });
        }

        i += 3;
    }
    return patterns;
}


