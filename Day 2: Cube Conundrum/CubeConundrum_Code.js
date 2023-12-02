const fs = require("fs");

//! Part 1 - What is the sum of the IDs of those games?
//! Rules - Configuration: 12 red cubes, 13 green cubes, and 14 blue cubes

function question1() {
  console.time("Question 1");
  const maxCubes = { red: 12, green: 13, blue: 14 };
  let runningTotal = 0;

  const input = fs.readFileSync("./input.txt", "utf-8");
  const games = input.split("\n").map((line) => line.trim());

  games.forEach(function (gameString) {
    let [gameId, sets] = gameString.split(":").map((i) => i.trim());
    gameId = Number(gameId.match(/(\d+$)/)[0]);
    let possible = true;

    const setsArray = sets.split(";").map((i) => i.trim());

    setsArray.forEach(function (setValue) {
      let cubes = setValue.split(",").map((i) => i.trim());
      cubes.forEach(function (cube) {
        let [count, color] = cube.split(" ").map((i) => i.trim());
        if (Number(count) > maxCubes[color]) {
          possible = false;
        }
      });
    });

    if (possible) {
      runningTotal += gameId;
    }
  });

  console.log("Possible games: ", runningTotal);
  console.timeEnd("Question 1");
}

question1();

//! Part 2 - What is the sum of the power of these sets?
//! Rules -

function question2() {
  console.time("Question 2");

  const input = fs.readFileSync("./input.txt", "utf-8");
  const games = input.split("\n").map((line) => line.trim());

  let runningTotal = 0;

  games.forEach(function (value) {
    let [, sets] = value.split(":").map((i) => i.trim());
    let set = sets.split(";").map((i) => i.trim());
    let cubeMinimum = { red: 0, green: 0, blue: 0 };

    set.forEach(function (value) {
      let cubes = value.split(",").map((i) => i.trim());
      cubes.forEach(function (cube) {
        let [count, color] = cube.split(" ").map((i) => i.trim());
        if (cubeMinimum[color] < Number(count)) {
          cubeMinimum[color] = Number(count);
        }
      });
    });

    runningTotal += Object.values(cubeMinimum).reduce((p, n) => p * n, 1);
  });

  console.log(`Part Two: ${runningTotal}`);

  console.timeEnd("Question 2");
}

question2();
