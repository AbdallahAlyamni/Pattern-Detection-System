import { HEAD_AND_SHOULDER_DATA, TRIPLE_BOTTOMS_DATA } from "../libs/data";
import { detectDoubleTops } from "../libs/double-tops";
import { detectHeadAndShoulder } from "../libs/head-and-shoulder";
import { detectTripleBottoms } from "../libs/triple-bottom";
import { getAllBottoms, getAllTops, getCandidateBottoms, getCandidateTops, getStockData } from "../libs/utils";


export async function getPatterns({ ticker, fromDate, toDate, patternType }) {

    // console.log(patternType)
    const data = await getStockData(ticker, fromDate, toDate)
    // const data = HEAD_AND_SHOULDER_DATA;
    

    if (patternType == "double-top") {
        const allTops = getAllTops(data, 2);
        const allBottoms = getAllBottoms(data);
        const candidateTops = getCandidateTops(allTops, 2);
        const patterns = detectDoubleTops(data, candidateTops, allBottoms);
        return { data: data, patterns: patterns };

    } else if (patternType == "head-and-shoulders") {
        const allTops = getAllTops(data, 2);
        const allBottoms = getAllBottoms(data);
        const candidateTops = getCandidateTops(allTops, 2);
        const patterns = detectHeadAndShoulder(data, candidateTops, allBottoms);
        return { data: data, patterns: patterns };

    } else if (patternType == "triple-bottom") {
        const allTops = getAllTops(data);
        const allBottoms = getAllBottoms(data, 2);
        const candidateBottoms = getCandidateBottoms(allBottoms, 6);
        const patterns = detectTripleBottoms(data, candidateBottoms, allTops);
        return { data: data, patterns: patterns };

    }

    return { data: [], patterns: [] }

}