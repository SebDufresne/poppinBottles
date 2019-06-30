const getArguments = () => {
  return process.argv.slice(2);
};

// Pass an amount of money as int and returns an object
const calculateBottles = (money,bottles,summary) => {
  summary = (summary || {
    money : {left: 0},
    total : {money: 0, bottle: 0, empty: 0, caps: 0}, // Refactored
    bottles : { bought: 0},
    empty : { left: 0, earned : 0 },
    caps : { left : 0, earned : 0 },
  });

  let fullBottles = 0;

  // If the parameter as some money as input, add it
  if (money) summary.total.money += money;

  // if there's enoug money to buy some bottles
  if ((money + summary.money.left) >= 2) {
    fullBottles += Math.floor(money / 2);
    summary.bottles.bought += fullBottles;
    money = money % 2;
  }

  // summary.money.left shouldn't end up at more than 1
  summary.money.left += (money || 0);

  // Caculate emptyBottles / caps from previous bottles number
  if (bottles) {
    summary.total.empty += bottles;
    summary.total.caps += bottles;
    summary.empty.left += bottles;
    summary.caps.left += bottles;
  }

  const addEmpty = (qty, freeRatio) => Math.floor(qty / freeRatio);

  const addRecycle = (itemObj,freeRatio) => {
    itemObj.earned += Math.floor(itemObj.left / freeRatio);
    itemObj.left = itemObj.left % freeRatio;
    return itemObj;
  };

  fullBottles += addEmpty(summary.empty.left, 2);
  fullBottles += addEmpty(summary.caps.left, 4);

  summary.empty = addRecycle(summary.empty,2);
  summary.caps = addRecycle(summary.caps,4);

  if (fullBottles) {
    summary = calculateBottles(0,fullBottles,summary);
  }

  return summary;
};

const printSummary = summary => {
  const log = console.log;

  const earnedFromBottles = summary.empty.earned;
  const earnedFromCaps = summary.caps.earned;

  const remainingCaps = summary.caps.left;
  const remainingBottles = summary.empty.left;

  const totalEarned = earnedFromBottles + earnedFromCaps;
  const totalBottles = totalEarned + summary.bottles.bought;

  const earnedBottles = summary.empty.earned;
  const earnedCaps = summary.caps.earned;

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