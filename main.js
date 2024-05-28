//let tabs = chrome.tabs.query({});
const webInput = document.querySelector(".webInput");
const numInput = document.querySelector(".numInput");
const submitBtn = document.querySelector(".submit");
const clearBtn = document.querySelector(".clear");
const p = document.querySelector("p");

//TODO:Add limiters per day. Adding option for user to add website in the form of buttons so they don't
//have to comment all the time.

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
