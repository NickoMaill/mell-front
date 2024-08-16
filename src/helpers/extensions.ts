// src/utils/math.ts
const originalMathRound = Math.round;
const originalMathPow = Math.pow;

Math.round = function (number: number, decimalPlaces: number = 0): number {
    const factor = originalMathPow(10, decimalPlaces);
    return originalMathRound(number * factor) / factor;
};
