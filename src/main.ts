//import "./style.css";

const btnAnswer = document.getElementById("btnAnswer");
let minGuess = 1;
let maxGuess = 10;

function validateGuess(guess: number | null): boolean {
	const errorDiv = document.getElementById("errorMessage");

	if (guess == null) {
		errorDiv!.innerText = "Please enter a number";
		return false;
	}

	if (guess < minGuess || guess > maxGuess) {
		errorDiv!.innerText = `Please enter a number between ${minGuess} and ${maxGuess}`;
		return false;
	}

	if (!Number.isInteger(guess)) {
		errorDiv!.innerText = "Please enter a whole number";
		return false;
	}

	return true;
}

function handleAnswerClick() {
	let answer = getUserAnswer();
	validateGuess(answer);

	console.log("Answer clicked!", secretNumber, answer);
}

function getSecretNumber(maxNumber: number = 10): number {
	let r = Math.random();
	r = r * maxNumber + 1;
	r = Math.floor(r);
	return r;
}

function getUserAnswer(): number | null {
	const answerElement = document.getElementById(
		"userAnswer",
	) as HTMLInputElement | null;

	if (answerElement == null) {
		return null;
	}

	let answer = Number(answerElement.value);

	if (Number.isNaN(answer) || answer == 0) {
		return null;
	}

	return answer;
}

let secretNumber = getSecretNumber();
let userAnswer = 0;

btnAnswer?.addEventListener("click", handleAnswerClick);
