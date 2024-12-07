const adviceId = document.getElementById("advice-id");
const adviceText = document.getElementById("advice-text");
const adviceButton = document.getElementById("advice-btn");
const baseUrl = "https://api.adviceslip.com/advice";

// To store already displayed advice IDs
const displayedAdviceIds = new Set();

async function getAdvice() {
    try {
        adviceText.innerText = "Loading...";
        let adviceData;
        let retries = 0;
        const maxRetries = 5;
        do {
            //random query parameter to bypass caching
            const url = `${baseUrl}?timestamp=${new Date().getTime()}`;
            const res = await fetch(url);
            if (!res.ok) throw new Error("Failed to fetch advice");
            const { slip } = await res.json();
            adviceData = slip;
            retries++;
        } while (displayedAdviceIds.has(adviceData.id) && retries < maxRetries);

        // this is for a fallback to display it if max retries reached and no unique advice, 
        if (retries >= maxRetries) {
            console.warn("Unable to find unique advice after multiple retries.");
        }

        // to update the advice and store its ID
        adviceId.innerText = adviceData.id;
        adviceText.innerText = adviceData.advice;
        displayedAdviceIds.add(adviceData.id);

        // this is optional. only for when you want to limit history size to prevent excessive memory use
        if (displayedAdviceIds.size > 50) {
            const [firstId] = displayedAdviceIds;
            displayedAdviceIds.delete(firstId);
        }
    } catch (error) {
        adviceText.innerText = "Something went wrong. Please try again.";
        console.error(error);
    }
}

// Initial fetch on page load
getAdvice();

// Event listener for your button clicks
adviceButton.addEventListener("click", getAdvice);
