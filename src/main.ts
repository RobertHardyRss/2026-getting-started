import "./style.css";

import { GuessingGame } from "./guessing-game";

const btnAnswer = document.getElementById("btnAnswer");
const btnRestart = document.getElementById("btnRestart");
const userMessageDiv = document.getElementById("userMessage");
const errorDiv = document.getElementById("errorMessage");
const settings = document.getElementById(
	"gameSettings",
) as HTMLSelectElement | null;

let maxGuess = 100;
let numberOfGuesses = 5;
let game = new GuessingGame(maxGuess, numberOfGuesses);

// leave here
function handleAnswerClick() {
	//debugger;

	if (game.isGameOver) {
		// game over, nothing to do, return
		return;
	}

	errorDiv!.innerText = "";
	userMessageDiv!.innerText = "";

	let answer = getUserAnswer();

	let result = game.guess(answer);

	if (result.isError) {
		errorDiv!.innerText = result.message;
	} else {
		userMessageDiv!.innerText = result.message;
	}
}

btnAnswer?.addEventListener("click", handleAnswerClick);

function handleRestartClick() {
	userMessageDiv!.innerText = "New game started!";
	game = new GuessingGame(maxGuess, 3);
}
btnRestart?.addEventListener("click", handleRestartClick);

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

	answerElement.value = "";
	answerElement.focus();
	return answer;
}

function handleGameSettingsChange() {
	let selection = settings!.value;
	switch (selection) {
		case "10-3":
			maxGuess = 10;
			numberOfGuesses = 3;
			break;
		case "50-5":
			maxGuess = 50;
			numberOfGuesses = 5;
			break;
		case "100-10":
			maxGuess = 100;
			numberOfGuesses = 10;
			break;
		case "1000-20":
			maxGuess = 1000;
			numberOfGuesses = 20;
			break;
	}

	userMessageDiv!.innerText = `Starting new game! You get ${numberOfGuesses} guesses to guess my number between 1 and ${maxGuess}`;
	game = new GuessingGame(maxGuess, numberOfGuesses);
}

settings?.addEventListener("change", handleGameSettingsChange);
