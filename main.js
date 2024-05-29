//let tabs = chrome.tabs.query({});
const webInput = document.querySelector(".webInput");
const numInput = document.querySelector(".numInput");
const submitBtn = document.querySelector(".submit");
const clearBtn = document.querySelector(".clear");
const p = document.querySelector("p");
submitBtn.addEventListener("click", () => {
    console.log(webInput.value);
    chrome.storage.local.set({key: webInput.value, limit: numInput.value, newLimit: numInput.value});
    webInput.value = numInput.value = "";
    p.textContent = "Limit set!"
});

clearBtn.addEventListener("click", () => {
    chrome.storage.local.remove(["key", "limit", "newLimit"])
    p.textContent = "Limit removed."
})
