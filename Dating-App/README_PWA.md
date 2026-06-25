# Dating App PWA Setup Guide

This guide provides the complete steps to configure, build, and deploy the Dating App as a Progressive Web App (PWA) with zero store-fee dependencies.

## 1. Firebase Configuration

### Web App Setup
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Add a new **Web App** to your project.
3. Copy the `firebaseConfig` object.
4. Update `lib/firebase_options.dart` with your Web, Android, and iOS credentials.
5. Update `web/firebase-messaging-sw.js` with your Web Firebase config.

### Enable Services
- **Authentication**: Enable Phone Auth.
- **Firestore**: Enable production mode and set rules.
- **Storage**: Enable and set rules for image uploads.
- **Messaging**: Enable Cloud Messaging for push notifications.

## 2. Google AdSense Integration

The PWA uses the `flutter_adsense` package for monetization.

1. Obtain your **Publisher ID** (starts with `ca-pub-`).
2. Obtain your **Ad Slot ID** for a "Rectangle" ad unit.
3. Update `web/index.html`:
   - Replace `ca-pub-XXXXXXXXXXXXXXXX` in the `<script>` tag.
4. Update `lib/main.dart`:
   - Replace `ca-pub-XXXXXXXXXXXXXXXX` in `FlutterAdsense().initialize(...)`.
5. Update `lib/dialogs/web_ad_dialog.dart`:
   - Replace `ca-pub-XXXXXXXXXXXXXXXX` and `1234567890` in the `AdsenseWidget`.

## 3. External Payments (Zero Fees)

Since PWAs bypass app stores, you must use an external payment gateway (e.g., Stripe, PayPal).

1. Create a payment link or a checkout page on your website.
2. Update `lib/widgets/store_products.dart`:
   - Replace `'https://your-payment-gateway.com/pay?...'` with your actual checkout URL.
3. **Important**: After a successful payment, you should update the user's document in Firestore (`C_USERS` collection) setting `USER_IS_VERIFIED: true` and adding a valid VIP subscription ID to `USER_SETTINGS`.

## 4. Building the PWA

To compile the application for web with optimized performance:

```bash
cd Dating-App
flutter build web --release --web-renderer canvaskit
```

## 5. Deployment

1. The build output will be in `build/web/`.
2. Upload the contents of `build/web/` to any web hosting (Firebase Hosting, Vercel, Netlify, or your own server).
3. Ensure your domain is HTTPS-enabled (required for PWA and Geolocation).

## 6. PWA Promotion

The app includes a "Add to Home Screen" banner for web users.
- To customize the banner, edit `lib/widgets/pwa_install_banner.dart`.
- The PWA manifest and icons are located in `web/manifest.json` and `web/icons/`.

---
**Note**: The app remains fully compatible with Native Android and iOS. Native builds will continue to use Google Mobile Ads and In-App Purchases as before.
