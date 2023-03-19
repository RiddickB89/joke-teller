import VoiceRSS from "./voicerss-tts.min.js";

const btnEl = document.querySelector(".button");
const audioEl = document.querySelector(".audio");

const toggleBtn = function () {
  btnEl.disabled = !btnEl.disabled;
};

const getJoke = async function () {
  try {
    toggleBtn();
    const response = await fetch("https://v2.jokeapi.dev/joke/Any");
    const data = await response.json();
    const jokeText =
      data["type"] == "twopart"
        ? `${data["setup"]} ... ${data["delivery"]}`
        : data["type"] == "single"
        ? `${data["joke"]}`
        : "application is not working correctly, sorry!";
    readText(jokeText);
  } catch (error) {}
};

const readText = function (jokeText) {
  VoiceRSS.speech({
    key: "4d2b8cd618d141d4b6167004736f07fa",
    src: jokeText,
    hl: "en-us",
    v: "Mary",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
};

btnEl.addEventListener("click", getJoke);
audioEl.addEventListener("ended", toggleBtn);
