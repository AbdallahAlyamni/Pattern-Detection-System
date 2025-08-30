export function detectHeadAndShoulder(data, tops, bottoms) {
    let i = 0;
    let patterns: any = [];
    while (i < tops.length - 2) {
        const firstShoulder = tops[i]
        const head = tops[i + 1]
        const secondShoulder = tops[i + 2]

        const bottomsBetween1 = bottoms.filter(bottom => {
            const topDate = new Date(bottom.date);
            return (topDate > new Date(firstShoulder.date) && topDate < new Date(head.date))
        });

        if(bottomsBetween1.length == 0){
            i += 3;
            continue;
        }

        const bottomsBetween2 = bottoms.filter(bottom => {
            const topDate = new Date(bottom.date);
            return (topDate > new Date(head.date) && topDate < new Date(secondShoulder.date))
        });

        if(bottomsBetween2.length == 0){
            i += 3;
            continue;
        }

        // Valley 1
        let smallestBottomBetween1 = bottomsBetween1[0];
        bottomsBetween1.forEach((bottom) => {
            smallestBottomBetween1 = smallestBottomBetween1.close < bottom.close ? smallestBottomBetween1 : bottom;
        })

        // Valley 2
        let smallestBottomBetween2 = bottomsBetween2[0];
        bottomsBetween2.forEach((bottom) => {
            smallestBottomBetween2 = smallestBottomBetween2.close < bottom.close ? smallestBottomBetween2 : bottom;
        })

        // Break down
        const smallestCloseAfter = data.find(item => {
            const topDate = new Date(item.date);
            return (topDate > new Date(secondShoulder.date) && item.close <= smallestBottomBetween2.close)
        });

        if (smallestCloseAfter != null && (head.close > firstShoulder.close && head.close > secondShoulder.close)) {
            patterns.push({ firstShoulder: firstShoulder, head: head, secondShoulder: secondShoulder, firstValley: smallestBottomBetween1, secondValley: smallestBottomBetween2, breakDown: smallestCloseAfter });
        }

        i += 3;
    }
    return patterns;
}


