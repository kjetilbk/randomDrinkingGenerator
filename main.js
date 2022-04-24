const poissonProcess = require("poisson-process");
const exec = require("await-exec");

//Every 25 minutes on avg.
const meanMs = 25 * 60 * 1000;

const names = [
  "Birk",
  "Sjur",
  "Kjetil",
  "Nora",
  "Mirza",
  "Solveig",
  "Sunniva",
  "Øystein",
];

const sipRange = [1, 2, 3, 4, 5];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function communicateSips(name, sipCount) {
  console.log(`Giving ${sipCount} sips to ${name}`);
  await exec("afplay ./alert.wav");
  await exec(`say Congratulations to ${name}...`);
  const random = Math.random();
  if (random > 0.5 && random < 0.7) {
    await exec(`say Happy birthday Solveig, you are a fucker`);
  }
  if (random > 0.9) {
    await exec(
      `say These ${sipCount} sips goes out to everyone. Lift your glasses.`
    );
    await sleep(500);
    await exec(`say Drink like its your last drink`);
    await sleep(200);
    await exec("say You little wankers");
    await exec("say Cheers");
  } else {
    await sleep(2000);
    await exec(
      `say You are hereby given the solid amount of... ${sipCount} sips`
    );
    await exec(`say Best of luck. Yours truly, Sjur and Kjetil`);
  }
}

async function generateRandomDrink() {
  const name = names[Math.floor(Math.random() * names.length) + 1];
  const sipCount = sipRange[Math.floor(Math.random() * sipRange.length) + 1];
  await communicateSips(name, sipCount);
}

async function randomDrinkingGenerator() {
  await generateRandomDrink();
  setTimeout(randomDrinkingGenerator, poissonProcess.sample(meanMs));
}

setTimeout(randomDrinkingGenerator, poissonProcess.sample(meanMs));
