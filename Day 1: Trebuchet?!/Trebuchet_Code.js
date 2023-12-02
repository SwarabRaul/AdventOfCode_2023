const fs = require("fs");

//! Part 1 - What is the sum of all of the calibration values?
//! Rules: On each line, the calibration value can be found by combining the first digit and the last digit (in that order) to form a single two-digit number.

function question1() {
  console.time("Question 1");
  fs.readFile("./input.txt", "utf8", (err, data) => {
    if (err) return console.error(`Error reading the file: ${err.message}`);
    // console.log(data)

    const words = data.split(/\s+/);
    const result = words.map((word) => {
      const firstDigitMatch = word.match(/\d/);
      const lastDigitMatch = word.match(/\d(?=\D*$)/);

      const firstDigit = firstDigitMatch ? firstDigitMatch[0] : null;
      const lastDigit = lastDigitMatch ? lastDigitMatch[0] : null;

      const num = Number(firstDigit + lastDigit);
      return !isNaN(num) ? num : 0;
    });

    const sum = result.reduce((acc, val) => acc + val, 0);

    console.log("Calibration Value: ", sum);
    console.timeEnd("Question 1");
  });
}

question1();

//! Part 2 - What is the sum of all of the calibration values? (Including the spelled out letters)
//! Rules: spelled out with letters: one, two, three, four, five, six, seven, eight, and nine also count as valid "digits".

const spelledOutToNumeric = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

function convertWords(words) {
  return words.map((word) => {
    for (const key in spelledOutToNumeric) {
      const regex = new RegExp(key, "ig");
      word = word.replace(regex, (match) => {
        const numericValue = spelledOutToNumeric[key];
        return (
          match.substring(0, match.length / 2) +
          numericValue +
          match.substring(match.length / 2)
        );
      });
    }
    return word;
  });
}

function question2() {
  console.time("Question 2");
  fs.readFile("./input.txt", "utf8", (err, data) => {
    if (err) return console.error(`Error reading the file: ${err.message}`);

    const words = data.split(/\s+/);
    const convertedWords = convertWords(words);
    const newInputData = convertedWords.join("\n");

    fs.writeFile("./newInput.txt", newInputData, "utf8", (err) => {
      if (err)
        return (
          console.error(`Error writing to the file: ${err.message}`) ||
          undefined
        );

      fs.readFile("./newInput.txt", "utf8", (err, Inputdata) => {
        if (err)
          return (
            console.error(`Error reading the file: ${err.message}`) || undefined
          );

        const words = Inputdata.split(/\s+/);
        const result = words.map((word) => {
          const firstDigitMatch = word.match(/\d/);
          const lastDigitMatch = word.match(/\d(?=\D*$)/);

          const firstDigit = firstDigitMatch ? firstDigitMatch[0] : null;
          const lastDigit = lastDigitMatch ? lastDigitMatch[0] : null;

          const num = Number(firstDigit + lastDigit);
          return !isNaN(num) ? num : 0;
        });

        const sum = result.reduce((acc, val) => acc + val, 0);

        console.log("Updated Calibration Value: ", sum);
        console.timeEnd("Question 2");
      });
    });
  });
}

question2();
