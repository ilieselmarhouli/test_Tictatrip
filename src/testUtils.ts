const { WORDS_PER_DAY_LIMIT, countWords, todayKey } = require("./utils");

const phrase1 = "Bonjour tout le monde";
const phrase2 = "Ceci est un test pour vérifier la fonction";

console.log("Phrase 1 :", phrase1, "→ mots :", countWords(phrase1));
console.log("Phrase 2 :", phrase2, "→ mots :", countWords(phrase2));
console.log("Limite quotidienne :", WORDS_PER_DAY_LIMIT);
console.log(todayKey());
