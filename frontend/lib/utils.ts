import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL || "http://localhost:8000";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function createSeriesMarkers(patternType: any, data: any[]) {
    if (data.length === 0) return [];
    if (patternType == "double-top") {
        return createDoubleTopMarkers(data);
    } else if (patternType == "head-and-shoulders") {
        return createHAndSMarkers(data);
    } else if (patternType == "triple-bottom") {
        return creatTripleBottomMarkers(data);
    }
    return [];
}

function createDoubleTopMarkers(data: any[]) {
    let markers: any = [];
    data.forEach((pattern) => {
        markers.push({
            time: pattern.firstTop.date.split("T")[0],
            position: "aboveBar",
            color: "red",
            shape: "arrowDown",
            text: "Top 1",
        });
        markers.push({
            time: pattern.secondTop.date.split("T")[0],
            position: "aboveBar",
            color: "red",
            shape: "arrowDown",
            text: "Top 2",
        });
        markers.push({
            time: pattern.valley.date.split("T")[0],
            position: "belowBar",
            color: "blue",
            shape: "arrowUp",
            text: "Valley",
        });
        markers.push({
            time: pattern.breakDown.date.split("T")[0],
            position: "belowBar",
            color: "blue",
            shape: "arrowUp",
            text: "Breakdown",
        });
    });
    return markers;
}

function createHAndSMarkers(data: any[]) {
    let markers: any = [];
    data.forEach((pattern) => {
        markers.push({
            time: pattern.firstShoulder.date.split("T")[0],
            position: "aboveBar",
            color: "red",
            shape: "arrowDown",
            text: "Shoulder 1",
        });
        markers.push({
            time: pattern.head.date.split("T")[0],
            position: "aboveBar",
            color: "red",
            shape: "arrowDown",
            text: "Head",
        });
        markers.push({
            time: pattern.secondShoulder.date.split("T")[0],
            position: "aboveBar",
            color: "red",
            shape: "arrowDown",
            text: "Shoulder 2",
        });
        markers.push({
            time: pattern.firstValley.date.split("T")[0],
            position: "belowBar",
            color: "blue",
            shape: "arrowUp",
            text: "Valley 1",
        });
        markers.push({
            time: pattern.secondValley.date.split("T")[0],
            position: "belowBar",
            color: "blue",
            shape: "arrowUp",
            text: "Valley 2",
        });
        markers.push({
            time: pattern.breakDown.date.split("T")[0],
            position: "aboveBar",
            color: "blue",
            shape: "arrowDown",
            text: "BreakDown",
        });
    });
    return markers;
}

function creatTripleBottomMarkers(data: any[]) {
    let markers: any = [];
    data.forEach((pattern) => {
        markers.push({
            time: pattern.firstBottom.date.split("T")[0],
            position: "belowBar",
            color: "red",
            shape: "arrowUp",
            text: "Bottom 1",
        });
        markers.push({
            time: pattern.secondBottom.date.split("T")[0],
            position: "belowBar",
            color: "red",
            shape: "arrowUp",
            text: "Bottom 2",
        });
        markers.push({
            time: pattern.thirdBottom.date.split("T")[0],
            position: "belowBar",
            color: "red",
            shape: "arrowUp",
            text: "Bottom 3",
        });
        markers.push({
            time: pattern.firstHigh.date.split("T")[0],
            position: "aboveBar",
            color: "blue",
            shape: "arrowDown",
            text: "High 1",
        });
        markers.push({
            time: pattern.secondHigh.date.split("T")[0],
            position: "aboveBar",
            color: "blue",
            shape: "arrowDown",
            text: "High 2",
        });
        markers.push({
            time: pattern.breakOut.date.split("T")[0],
            position: "aboveBar",
            color: "blue",
            shape: "arrowDown",
            text: "BreakOut",
        });
    });
    return markers;
}