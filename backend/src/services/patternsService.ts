import { detectDoubleTops, getCandidateTops} from "../libs/double-tops";
import { getAllBottoms, getAllTops, getStockData } from "../libs/utils";


export async function getPatterns({ ticker, fromDate, toDate }) {

    const data = await getStockData(ticker, fromDate, toDate)

    const allTops = getAllTops(data, 2);
    const allBottoms = getAllBottoms(data);
    const candidateTops = getCandidateTops(allTops, 2);
    const patterns = detectDoubleTops(data, candidateTops, allBottoms);
    return {data: data, patterns: patterns};

}