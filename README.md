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

# In app payment

1. Local non-sync: Create Storekit Configuration file and add the products and subscriptions to it, making sure the sync option is disabled. The create products and subscriptions to populate it. After doing this. within the xcode, open the product tab, then go to the edit schema aspect, then edit the schema my setting the storekit configuration field to the Newly created Storekit configugation file. Always Rebuild with Xcode
2. Appstore connect: its similar, but its just that we get the data from online. so we will go to the appstore connect section, then go under products and subscriptions, here we will create subscription groups e.g Premium Subscriptions, the under the subscription group, we will create multiple subscriptions. we can title the subscriptions as yearly_subscription, monthly_subscription, two_month_subscription, weekly_subscription. Note to get a subscription ready, we need to make sure that its in the Ready to Submit State, not on the Missing Meta data state. After we have created the products and subscriptions, we now go to our xcode and create a new Storekit file, if there was an existing one that was SYNCHED, we can sync it by clicking the refresh icon at the bottom left corner, but if there is no existing one in SYNCH, we can then create a new one. then go to the Product toolbar and select edit schema, we go to the storekit configuration field and switch it to the newly created one. After this, build or rebuild your application with Xcode.

# Things I observed

1. React Native IAP interact with the Storekit file not with the Appstore connect.
2. You can also use the Storekit file locally by making sure you dont enable the `sync`, the sync when enabled cannot be `edited`, so to use it locally, we wont enable the Sync, and we can then create the products and subscriptions
3. The Storekit file must be in sync with the production file and confirmed, by seeing the subscriptions and products you created online in the Xcode environment.
4. React native IAP does not get Non-renewable subscriptions in my experience.
5. The Storekit file must be enabled for testing by going to the Edit Schema Schema/Manage Schema and going to the Options tab at the top of the Modal window that pops up, then going to the Storekit Configuration field and Selecting the Newly created Storekit file we just initialized. This makes it the active Storekit file as we can have multiple storekit files but we can only have one active one. so that is the place to set it up.
6. Always build with XCODE, dont use react-native run-ios. as it will initialize the storekit file to the workspace
