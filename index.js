const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
	return new Promise((resolve, reject) => {
		rl.question(questionText, resolve);
	});
}

start();

async function start() {
	let lowerBound = 0;
	let higherBound = 100;
	let guess = average(higherBound, lowerBound);
	console.log(
		"Let's play a game where you (human) make up a number and I (computer) try to guess it."
	);
	let yesOrNo = await ask("Is it " + guess + "? ");
	let yesOrNoFinal = yesOrNo.toLowerCase();

	while (yesOrNoFinal !== "yes") {
		console.log("You entered: " + yesOrNo);
		let lowOrHigh = await ask("Is it lower or higher? ");
		let lowOrHighFinal = lowOrHigh.toLowerCase();
		console.log("You entered: " + lowOrHigh);
		if (yesOrNoFinal === "yes") {
			console.log("winner, winner, chicken dinner!");
			process.exit();
		}
		if (yesOrNoFinal !== "yes" && lowOrHighFinal === "higher") {
			lowerBound = defineLow(lowerBound, guess);
			guess = average(higherBound, lowerBound);
		} else if (yesOrNoFinal !== "yes" && lowOrHighFinal === "lower") {
			higherBound = defineHigh(higherBound, guess);
			guess = average(higherBound, lowerBound);
		} else {
			console.log("What's wrong with you human!? Try again!");
		}
		yesOrNo = await ask("Is it " + guess + "? ");
		yesOrNoFinal = yesOrNo.toLowerCase();
		if (yesOrNoFinal !== "yes" || yesOrNoFinal !== "no") {
			console.log("What's wrong with you human!? Try again!");
		}
	}
	console.log("winner, winner, chicken dinner!");
	process.exit();
}

function defineLow(lowerBound, guess) {
	return guess - 1;
}

function defineHigh(higherBound, guess) {
	return guess + 1;
}

function average(higherBound, lowerBound) {
	let number = (higherBound + lowerBound) / 2;
	return Math.floor(number);
}
