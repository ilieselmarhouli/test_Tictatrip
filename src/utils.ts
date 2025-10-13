const WORDS_PER_DAY_LIMIT = 80000;

function countWords(text: string): number {
  return text.split(" ").length;
}

function todayKey(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");         

  return `${year}-${month}-${day}`;
}

module.exports = { WORDS_PER_DAY_LIMIT, countWords, todayKey };
