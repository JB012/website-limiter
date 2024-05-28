chrome.tabs.onCreated.addListener(() => {
    chrome.webNavigation.onCompleted.addListener(async (details) => {
        //Waiting to get input from popup.
        const website = await chrome.storage.local.get(["key", "limit", "newLimit"]);
        const url = details.url;
        const tabId = details.tabId;
        const hour = new Date().getHours();

        if (website && url) {
            if (url.includes(website.key)) {
                if (hour !== 0 || hour !== 24) {
                    if (website.newLimit === 0) {
                        chrome.tabs.remove(tabId);

                        //Remove open tabs of the website.


                        chrome.tabs.query({}, function(tabs) {
                            for (const tab of tabs) {
                                if (tab.url.includes(website.key)) {
                                    chrome.tabs.remove(tab.id);
                                }
                            }
                        })
                    }
                    else {
                        chrome.storage.local.set({newLimit: website.newLimit - 1});
                    }
                }
                else {
                    //Limit resets at midnight.
                    console.log("Limit resetted")
                    chrome.storage.local.set({newLimit: website.limit});
                }
            }
        }
    })
})