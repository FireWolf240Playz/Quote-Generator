const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiTab = [];

// Show the loader
const loading = function () {
  loader.hidden = false;
  quoteContainer.hidden = true;
};
// Stop to show the loader
const complete = function () {
  quoteContainer.hidden = false;
  loader.hidden = true;
};
// Show new quote
const newQuote = function () {
  loading();
  // Pick a random quote from apiTab
  let quote = apiTab[Math.floor(Math.random() * apiTab.length)];
  // Check if author field is blank and replace it with 'Unknown'
  if (!quote.author) {
    quoteAuthor.textContent = "Unknown";
  } else {
    quoteAuthor.textContent = quote.author;
  }
  // Check quote length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
  complete();
};

const getQuotes = async function () {
  loading();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiTab = await response.json();
    newQuote();
  } catch (error) {
    // handling error
  }
};

const tweetQuote = function () {
  const tweet = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
  window.open(tweet, "_blank");
};

twitterBtn.addEventListener("click", tweetQuote);
newQuoteBtn.addEventListener("click", getQuotes);

getQuotes();
