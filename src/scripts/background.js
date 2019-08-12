
function intro(infolistener) {

	browser.management.getSelf((infoself) => {

		//check si l'ext installé est la meme que bonjourr
		if (infoself.id === infolistener.id) {

			chrome.storage.local.get(null, (data) => {

				//si l'intro a deja été dismiss alors welcome back
				if (data.isIntroduced === true) chrome.storage.local.set({"welcomeback": true});

				chrome.tabs.create({
					url:"../../index.html"
				});
			});
		}
	});	
}

//appelle intro à chaque install
browser.management.onInstalled.addListener(intro);


chrome.storage.local.get(null, (data) => {

	var url =  "https://bonjourr.fr/";

	if (data.lang === "fr") {
		url += "fr/goodbye";
	} else {
		url += "goodbye";
	}

	browser.runtime.setUninstallURL(url);
});