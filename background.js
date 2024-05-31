chrome.tabs.onCreated.addListener(() => {
    chrome.webNavigation.onCompleted.addListener(async (details) => {
        //Waiting to get input from popup.
        const website = await chrome.storage.local.get(["key", "limit", "newLimit"]);
        const url = details.url;
        const tabId = details.tabId;
        const hour = new Date().getHours();
        const min = new Date().getMinutes();

        if (website && url) {
            console.log(`Website:${website.key}, tab: ${url}, newLimit:${website.newLimit}, hour:${min}`)
            if (url.includes(website.key)) {
                if (hour !== 0 && min !== 0) {
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
                    //Limit resets at midnight.
                    website.newLimit = website.limit;
                    chrome.notifications.create("LimitReset", 
                    {   type: "basic",
                        iconUrl: "icon32.png",
                        title: 'LimitReset',
                        message: `Limit Resetted: ${website.newLimit}`
                    });
                    chrome.notifications.clear("LimitReset");
                }
            }
        }
    })
})
