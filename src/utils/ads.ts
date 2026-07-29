import {
	AdMob,
	BannerAdSize,
	BannerAdPosition,
	AdmobConsentStatus,
	type AdOptions,
	type AdLoadInfo,
	InterstitialAdPluginEvents,
} from "@capacitor-community/admob";

export async function initialize(): Promise<void> {
	await AdMob.initialize();

	const [trackingInfo, consentInfo] = await Promise.all([
		AdMob.trackingAuthorizationStatus(),
		AdMob.requestConsentInfo(),
	]);

	if (trackingInfo.status === "notDetermined") {
		/**
		 * If you want to explain TrackingAuthorization before showing the iOS dialog,
		 * you can show the modal here.
		 * ex)
		 * const modal = await this.modalCtrl.create({
		 *   component: RequestTrackingPage,
		 * });
		 * await modal.present();
		 * await modal.onDidDismiss();  // Wait for close modal
		 **/

		await AdMob.requestTrackingAuthorization();
	}

	const authorizationStatus = await AdMob.trackingAuthorizationStatus();
	if (
		authorizationStatus.status === "authorized" &&
		consentInfo.isConsentFormAvailable &&
		consentInfo.status === AdmobConsentStatus.REQUIRED
	) {
		await AdMob.showConsentForm();
	}
}

export async function interstitial(id: string): Promise<void> {
	AdMob.addListener(InterstitialAdPluginEvents.Loaded, (info: AdLoadInfo) => {
		// Subscribe prepared interstitial
	});

	const options: AdOptions = {
		adId: id,
		// adId: 'ca-app-pub-3940256099942544/1033173712',
		// npa: true
		// immersiveMode: true
	};
	await AdMob.prepareInterstitial(options);
	await AdMob.showInterstitial();
}

export async function gameOverInterstitial(): Promise<void> {
    await interstitial("ca-app-pub-1919299121157918/6971137020");
}