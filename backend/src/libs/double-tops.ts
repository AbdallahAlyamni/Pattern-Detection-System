
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


