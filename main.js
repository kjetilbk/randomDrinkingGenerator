const poissonProcess = require("poisson-process");
const exec = require("await-exec");

const meanMs = 10000;

const beforeSaturday13List = [
  "Sjur",
  "Kjetil",
  "Nora",
  "Mirza",
  "Solveig",
  "Sunniva",
  "Øystein",
];

const afterSaturday13List = [
  "Birk",
  "Sjur",
  "Kjetil",
  "Nora",
  "Mirza",
  "Solveig",
  "Sunniva",
  "Øystein",
];
const slurkRange = [1, 2, 3, 4, 5];

const nameShotsBeforeSaturday13 = beforeSaturday13List.flatMap((name) =>
  slurkRange.map((slurk) => [name, slurk])
);

const nameShotsAfterSaturday13 = afterSaturday13List.flatMap((name) =>
  slurkRange.map((slurk) => [name, slurk])
);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const p = poissonProcess.create(meanMs, async function message() {
  const now = new Date();
  const saturday13 = new Date(2022, 3, 23, 13, 39);
  const index =
    Math.floor(Math.random() * nameShotsBeforeSaturday13.length) + 1;
  if (now.getTime() < saturday13.getTime()) {
    console.log("before");
    await exec("afplay /Users/kjetilbk/Downloads/alert.wav");
    await exec(
      `say Congratulations to ${nameShotsBeforeSaturday13[index][0]}...`
    );
    await sleep(2000);
    if (Math.random() > 0.5) {
      await exec(`say Happy birthday Solveig, you are a star!`);
    }
    await exec(
      `say You are hereby given the solid amount of... ${nameShotsBeforeSaturday13[index][1]} sips`
    );
    await exec(`say Best of luck. Yours truly, Sjur and Kjetil`);
  } else {
    console.log("after");
    await exec("afplay /Users/kjetilbk/Downloads/alert.wav");
    await exec(
      `say Congratulations to ${nameShotsAfterSaturday13[index][0]}...`
    );
    const random = Math.random();
    if (random > 0.5) {
      await exec(`say Happy birthday Solveig, you are a fucker`);
    }
    await sleep(2000);
    await exec(
      `say You are hereby given the solid amount of... ${nameShotsAfterSaturday13[index][1]} sips`
    );
    await exec(`say Best of luck. Yours truly, Sjur and Kjetil`);
  }
});

p.start();
