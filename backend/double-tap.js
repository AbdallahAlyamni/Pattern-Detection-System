export function detectDoubleTop(data, tolerance = 0.02) {
  // We'll use "close" prices
  const prices = data.map(d => d.close);

  // Helper to find local maxima (peaks)
  function isPeak(i) {
    return prices[i] > prices[i - 1] && prices[i] > prices[i + 1];
  }

  let peaks = [];
  for (let i = 1; i < prices.length - 1; i++) {
    if (isPeak(i)) {
      peaks.push({ index: i, price: prices[i], date: data[i].date });
    }
  }

  // Look for two peaks of roughly equal height
  for (let i = 0; i < peaks.length - 1; i++) {
    for (let j = i + 1; j < peaks.length; j++) {
      const p1 = peaks[i];
      const p2 = peaks[j];

      // Check if within tolerance (e.g. 2%)
      const avg = (p1.price + p2.price) / 2;
      const diff = Math.abs(p1.price - p2.price) / avg;

      if (diff <= tolerance) {
        // Ensure there's a dip in between
        const between = prices.slice(p1.index, p2.index + 1);
        const minBetween = Math.min(...between);

        if (minBetween < p1.price && minBetween < p2.price) {
          return {
            type: "Double Top",
            peaks: [p1, p2],
            dip: {
              price: minBetween,
              date: data[between.indexOf(minBetween) + p1.index].date
            }
          };
        }
      }
    }
  }

  return null; // No pattern found
}
