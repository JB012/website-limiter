const webInput = document.querySelector(".webInput");
const numInput = document.querySelector(".numInput");
const submitBtn = document.querySelector(".submit");
const clearBtn = document.querySelector(".clear");
const p = document.querySelector("p");

submitBtn.addEventListener("click", () => {
    chrome.storage.local.set({key: webInput.value, limit: numInput.value, newLimit: numInput.value, currentDay:new Date().getDay()});
    webInput.value = numInput.value = "";
    p.textContent = "Limit set!"
});

clearBtn.addEventListener("click", () => {
    chrome.storage.local.remove(["key", "limit", "newLimit", "currentDay"])
    p.textContent = "Limit removed."
})
