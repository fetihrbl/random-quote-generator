const btnEl = document.getElementById("btn");
const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");

const apiURL = "https://api.quotable.io/random";

const getQuote = async () => {
    try {
        toggleLoadingState(true);

        const response = await fetch(apiURL);
        if(!response.ok) throw new Error("Faild to fetch quete");

        const {content, author} = await response.json();

        updateUI(content, author);
    } catch (error) {
        updateUI(
            "An error occurred while fetching a quote. Please try again later.",
            "Error"
          );
          console.error(error);
    } finally {
        toggleLoadingState(false)
    }
}

const updateUI = (quote, author) => {
    quoteEl.innerText = quote;
    authorEl.innerText = author ? `~ ${author}` : "";
}

const toggleLoadingState = (isLoading) => {
    btnEl.innerText = isLoading ? "Loading..." : "Get a quote";
    btnEl.disabled = isLoading;
}

getQuote();

btnEl.addEventListener("click", getQuote);