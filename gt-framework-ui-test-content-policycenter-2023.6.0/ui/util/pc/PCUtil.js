export class PCUtil {
    /*
     * Generates a randomized string by adding a random number to an input string
     */
    getRandomizedString(inputString) {
        return inputString + this.generateRandomNumber(5).toString();
    }

    /*
     * Generate a N-digit number
     * This is useful when a random/unique number is required to avoid duplicate data. e.g. taxID/SSN
     */
    generateRandomNumber(numDigit) {
        const min = Math.pow(10, numDigit - 1);
        const max = min * 9;
        return Math.floor(Math.random()*max) + min;
    }

}