SDG[SDG.CONFIG.SYSTEM.ADTEMPLATES].templateDoubleDynamicSitebar = function (advertisement) {
	'use strict';
	var jsonData = advertisement.getResponseParameters();

	var SRWerbung = {
		quelle: jsonData.formatParams.skyLeftElement,
		medium: jsonData.formatParams.skyLeftAdType
	};
	var SLWerbung = {
		quelle: jsonData.formatParams.skyRightElement,
		medium: jsonData.formatParams.skyRightAdType
	};
	var mSDGUrl = jsonData.Media[0].links[0].url;
	var mSDGZaehlpixel = jsonData.formatParams.trackingPixel;

	var content;
	var adhesion;
	//container-----------------------------------------------------------------------------------------------------------------------
	if (typeof window.top.SDG === 'object') {
		content = window.top.SDG.getPUB().getConfig().getContentObject().element;
		adhesion = window.top.SDG.getPUB().getConfig().getAdhesionUnit();
	} else {
		content = false;
		adhesion = false;
	}

	function loadScript(url, callback) {
		var head = window.top.document.head;
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = url;

		script.onreadystatechange = callback;
		script.onload = callback;

		// Fire the loading
		head.appendChild(script);
	}
	if (advertisement.startLocalBuildProcess() && !!this.buildMediaSegments(advertisement)) {
		var dds = function () {

			var toppos = 0, mSDGGSRBreite, mSDGGSRHoehe, mSDGGSLBreite, mSDGGSLHoehe, mSDGGSRTop, mSDGGSRLeft, mSDGGSLTop,
				mSDGGSLLeft;
			var helper = new SDI.LIBRARY.Helper();
			var elements = new SDI.LIBRARY.Element();
			var browser = helper.browserDetection();
			if ((browser[0] === 'Internet Explorer') && ((SRWerbung.medium === 'Script') || (SLWerbung.medium === 'Script'))) {
				if (SRWerbung.medium === 'Script') {
					SRWerbung.medium = 'Iframe';
					SRWerbung.quelle = 'https://cdn.stroeerdigitalmedia.de/Ads/script/script2frame/decode.html?redirect=' + encodeURIComponent(SRWerbung.quelle);
				}
				if (SLWerbung.medium === 'Script') {
					SLWerbung.medium = 'Iframe';
					SLWerbung.quelle = 'https://cdn.stroeerdigitalmedia.de/Ads/script/script2frame/decode.html?redirect=' + encodeURIComponent(SLWerbung.quelle);
				}
			}

			function position() {
				content.dimAndPos = helper.getDimAndPos(content);
				adhesion.dimAndPos = helper.getDimAndPos(adhesion);
				toppos = (adhesion) ? parseInt(adhesion.dimAndPos.computedHeight, 10) : 0;
				mSDGGSRBreite = parseInt((window.parent.innerWidth - content.dimAndPos.computedRight) - 20, 10);
				mSDGGSRHoehe = parseInt(window.parent.innerHeight - toppos, 10);
				mSDGGSLBreite = parseInt(content.dimAndPos.left, 10);
				mSDGGSLHoehe = parseInt(window.parent.innerHeight - toppos, 10);
				mSDGGSRTop = parseInt(toppos, 10);
				mSDGGSRLeft = parseInt(content.dimAndPos.computedRight, 10);
				mSDGGSLTop = parseInt(toppos, 10);
				mSDGGSLLeft = parseInt(0, 10);
				return true;
			}

			position();
			var bannerSkyRechts = new SDI.LIBRARY.CreateBanner(0, 0, -1, -1, 1, mSDGUrl, '_blank', 'DDS_SkyRight', SRWerbung);
			var bannerSkyLinks = new SDI.LIBRARY.CreateBanner(0, 0, -1, -1, 1, mSDGUrl, '_blank', 'DDS_SkyLeft', SLWerbung);
			var bannerSR = elements.createDiv('div', 'SkyR', 'top:' + mSDGGSRTop + 'px; left:' + mSDGGSRLeft + 'px; height:' + mSDGGSRHoehe + 'px; width:' + mSDGGSRBreite + 'px; position:fixed;z-index:11111');
			var bannerSL = elements.createDiv('div', 'SkyL', 'top:' + mSDGGSLTop + 'px; left:' + mSDGGSLLeft + 'px; height:' + mSDGGSLHoehe + 'px; width:' + mSDGGSLBreite + 'px; position:fixed;z-index:11111');
			bannerSL.appendChild(bannerSkyLinks);
			bannerSR.appendChild(bannerSkyRechts);
			helper.getParent().Holder.appendChild(bannerSL);
			helper.getParent().Holder.appendChild(bannerSR);
			window.parent.onresize = resizeBanner;
			window.parent.onscroll = resizeBanner;
			window.parent.document.head.appendChild(helper.setStyle('#DDS_SkyRight_container {width:inherit;height:inherit;} #DDS_SkyLeft_container {width:inherit;height:inherit;}#DDS_SkyRight_container {width:inherit !important;height:inherit !important;} #DDS_SkyLeft_container {width:inherit !important;height:inherit !important;}#SkyR_container img {width: auto !important;}#SkyL_container img{ width: auto !important;float:right;}'));

			function resizeBanner() {
				setTimeout(function () {
					if (position() === true) {
						window.parent.document.getElementById('SkyR_container').setAttribute('style', 'top:' + mSDGGSRTop + 'px; left:' + mSDGGSRLeft + 'px; height:' + mSDGGSRHoehe + 'px; width:' + mSDGGSRBreite + 'px; position:fixed;z-index:11111');
						window.parent.document.getElementById('SkyL_container').setAttribute('style', 'top:' + mSDGGSLTop + 'px; left:' + mSDGGSLLeft + 'px; height:' + mSDGGSLHoehe + 'px; width:' + mSDGGSLBreite + 'px; position:fixed;z-index:11111');
					}
				}, 100);
			}

			if ((mSDGZaehlpixel !== '') && (mSDGZaehlpixel !== null)) {
				helper.createCounter(mSDGZaehlpixel);
			}
		};
		loadScript('//cdn.stroeerdigitalmedia.de/Ads/script/Library.min.js', dds);

		return true;
	} else {
		return false;
	}
};