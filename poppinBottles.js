const getArguments = () => {
  return process.argv.slice(2);
};

// Pass an amount of money as int and returns an object
const calculateBottles = (money,bottles,summary) => {
  summary = (summary || {
    money : {total: 0, left: 0},
    fullBottles : { bought: 0},
    emptyBottles : { total: 0, left: 0, earned : 0 },
    bottleCaps : { total: 0, left : 0, earned : 0 },
  });

  let fullBottles = 0;

  // If the parameter as some money as input, add it
  if (money) summary.money.total += money;

  // if there's enoug money to buy some bottles
  if ((money + summary.money.left) >= 2) {
    fullBottles += Math.floor(money / 2);
    summary.fullBottles.bought += fullBottles;
    money = money % 2;
  }

  // summary.money.left shouldn't end up at more than 1
  summary.money.left += (money || 0);

  // Caculate emptyBottles / caps from previous bottles number
  if (bottles) {
    summary.emptyBottles.total += bottles;
    summary.bottleCaps.total += bottles;
    summary.emptyBottles.left += bottles;
    summary.bottleCaps.left += bottles;
  }

  // if we have enough emptyBottles to get bottles
  if (summary.emptyBottles.left >= 2) {
    fullBottles += Math.floor(summary.emptyBottles.left / 2);
    summary.emptyBottles.earned += Math.floor(summary.emptyBottles.left / 2);
    summary.emptyBottles.left = summary.emptyBottles.left % 2;
  }

  // if we have enough bottleCaps to get bottles
  if (summary.bottleCaps.left >= 4) {
    fullBottles += Math.floor(summary.bottleCaps.left / 4);
    summary.bottleCaps.earned += Math.floor(summary.bottleCaps.left / 4);
    summary.bottleCaps.left = summary.bottleCaps.left % 4;
  }

  if (fullBottles) {
    summary = calculateBottles(0,fullBottles,summary);
  }

  return summary;
};

const printSummary = summary => {
  const log = console.log;

  const earnedFromBottles = summary.emptyBottles.earned;
  const earnedFromCaps = summary.bottleCaps.earned;

  const remainingCaps = summary.bottleCaps.left;
  const remainingBottles = summary.emptyBottles.left;

  const totalEarned = earnedFromBottles + earnedFromCaps;
  const totalBottles = totalEarned + summary.fullBottles.bought;

  const earnedBottles = summary.emptyBottles.earned;
  const earnedCaps = summary.bottleCaps.earned;

  log(`TOTAL BOTTLES: ${totalBottles}`);
  log(`REMAINING BOTTLES: ${remainingBottles}`);
  log(`REMAINING CAPS: ${remainingCaps}`);
  log(`TOTAL EARNED:`);
  log(`  BOTTLES: ${earnedBottles}`);
  log(`  CAPS: ${earnedCaps}`);
};

const poppinBottles = () => {
  const arrAgg = getArguments();

  const summary = calculateBottles(Number(arrAgg[0]));

  printSummary(summary);
};

poppinBottles();