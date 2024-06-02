chrome.tabs.onCreated.addListener(() => {
    chrome.webNavigation.onCompleted.addListener(async (details) => {
        //Waiting to get input from popup.
        const website = await chrome.storage.local.get(["key", "limit", "newLimit", "currentDay"]);
        const url = details.url;
        const tabId = details.tabId;
        const day = new Date().getDay();

        if (website && url) {
            if (url.includes(website.key)) {
                if (day === website.currentDay) {
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
                        chrome.notifications.create("LimitMessage", 
                        {   type: "basic",
                            iconUrl: "icon32.png",
                            title: 'LimitMessage',
                            message: `Limit left: ${website.newLimit}`
                        });
                        chrome.notifications.clear("LimitMessage");
                    }
                }
                else {
                    //Limit resets every day.
                    chrome.storage.local.set({newLimit:website.limit, currentDay: day})
                    chrome.notifications.create("LimitReset", 
                    {   type: "basic",
                        iconUrl: "icon32.png",
                        title: 'LimitReset',
                        message: `Limit Resetted: ${chrome.storage.local.get("newLimit").newLimit}`
                    });
                    chrome.notifications.clear("LimitReset");
                }
            }
        }
    })
})
