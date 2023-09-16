npx react-native@latest init revenuechattest

https://www.revenuecat.com/docs/getting-started#4-using-revenuecats-purchases-sdk
yarn add react-native-purchases && cd ios && pod repo update && pod install

add this <uses-permission android:name="com.android.vending.BILLING" /> to the manifest file

then open the project in xcode and enable in-app purchases

to add the in app keys: https://www.revenuecat.com/docs/authentication

We create an App to get the public keys
For IOS App, we will need to generate the App-Specific Shared Secret
this can be gotten after we create the app on the ios platform making sure we select the bundleID
https://www.revenuecat.com/docs/itunesconnect-app-specific-shared-secret

we will also need to generate the IN-app purchase key at this point: https://appstoreconnect.apple.com/access/api/subs

the In-app purchase key makes it easy for us to securely authenticate and validate a Subscription Offer request with apple, and to also enable Customer Lookup via the orderID for Ios apps.
We generate and download the P8 Key file from App store connect.

Click on Save changes at the top after filling details. the last details which is the appstore start date and end date can be ignored

# To create a Offering

Firstly create a product, using a unique identifier and a display name,
Go to the offerings Section, then click on New offering, then fill in the unique identifier and the description, then go into the offering and after successfully creating it, then click on Add New Packages
after selecting the duration suitable for you and entering the necessary information, you then create it.
Now click on the package you created and attach a product to it. you will see the list of products you created earlier.

So therefore an offering can have multiple packages which have a subscription duration and must be associated to a certain product.

# To Create an Entitlement

An entitlement represents a level of access, features, or content that a user is entitled to
Entitlement are used to ensure a user has appropriate access to content based on their purchases,

make sure you have enabled Paid apps agreements
and also https://appstoreconnect.apple.com/access/api

https://www.revenuecat.com/docs/apple-app-store#ios-14-only-testing-on-the-simulator

https://developer.apple.com/documentation/xcode/setting-up-storekit-testing-in-xcode/

# Types of In-app payment

1. Consumable
2. Non consumable
3. Non Renewable Subscriptions
4. Renewable Subscriptions
5. Consumable In app purchases: Consumables can be purchased multiple times, examples are in-game currencies and extras.
6. Non Consumable In app purchase: Non consumable in-app purchase are products that can only be bought once, it doesnt expire and provides persistent ownership over a paid item, experience or premium features, purchasing game levels, race tracks, and extra app features like ad-removal

   Google makes no difference between Consumable and Non-Consumable in-app purchases, however apple requires developers to specify the type of in-app purchases

   /_ eslint-disable prettier/prettier _/
   import React, { useEffect } from 'react';
   import Purchases, { LOG_LEVEL } from 'react-native-purchases';
   import { SafeAreaView, Platform, Text } from 'react-native';

function App(): JSX.Element {

const getOfferings = async () => {
try {
const offerings = await Purchases.getOfferings();
if (offerings.current !== null && offerings.current.availablePackages.length !== 0) {
// Display packages for sale
console.log(offerings, '==');
}
} catch (e) {
console.log(e, '===error');
}
};

useEffect(() => {
Purchases.setLogLevel(LOG_LEVEL.VERBOSE);
if (Platform.OS === 'ios') {
Purchases.configure({ apiKey: 'appl_fdyEfUNdkWgMMrBuSYMlBHkVLqX' });
} else if (Platform.OS === 'android') {
Purchases.configure({
apiKey: 'appl_fdyEfUNdkWgMMrBuSYMlBHkVLqX',
});
}
getOfferings();

}, []);

return (
<SafeAreaView>
<Text>HOMESCREEN</Text>
</SafeAreaView>
);
}

export default App;

After running storekit configuration, dont use react-native run-ios, as it will not reflect, use xcode to build it

https://github.com/manuelbieh/react-native-iap/blob/716e073a0a37980a7d962c515b8227c8a6e70bfc/IapExample/src/screens/ClassSetup.tsx
