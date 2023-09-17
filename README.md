npx react-native@latest init revenuechattest

https://www.revenuecat.com/docs/getting-started#4-using-revenuecats-purchases-sdk
yarn add react-native-purchases && cd ios && pod repo update && pod install

add this <uses-permission android:name="com.android.vending.BILLING" /> to the manifest file

then open the project in xcode and enable in-app purchases

# Types of In-app payment

1. Consumable
2. Non consumable
3. Non Renewable Subscriptions
4. Renewable Subscriptions
5. Consumable In app purchases: Consumables can be purchased multiple times, examples are in-game currencies and extras.
6. Non Consumable In app purchase: Non consumable in-app purchase are products that can only be bought once, it doesnt expire and provides persistent ownership over a paid item, experience or premium features, purchasing game levels, race tracks, and extra app features like ad-removal

   Google makes no difference between Consumable and Non-Consumable in-app purchases, however apple requires developers to specify the type of in-app purchases

After running storekit configuration, dont use react-native run-ios, as it will not reflect, use xcode to build it

https://github.com/manuelbieh/react-native-iap/blob/716e073a0a37980a7d962c515b8227c8a6e70bfc/IapExample/src/screens/ClassSetup.tsx

# In app payment

1. Local non-sync: Create Storekit Configuration file and add the products and subscriptions to it, making sure the sync option is disabled. The create products and subscriptions to populate it. After doing this. within the xcode, open the product tab, then go to the edit schema aspect, then edit the schema my setting the storekit configuration field to the Newly created Storekit configugation file. Always Rebuild with Xcode
2. Appstore connect: its similar, but its just that we get the data from online. so we will go to the appstore connect section, then go under products and subscriptions, here we will create subscription groups e.g Premium Subscriptions, the under the subscription group, we will create multiple subscriptions. we can title the subscriptions as yearly_subscription, monthly_subscription, two_month_subscription, weekly_subscription. Note to get a subscription ready, we need to make sure that its in the Ready to Submit State, not on the Missing Meta data state. After we have created the products and subscriptions, we now go to our xcode and create a new Storekit file, if there was an existing one that was SYNCHED, we can sync it by clicking the refresh icon at the bottom left corner, but if there is no existing one in SYNCH, we can then create a new one. then go to the Product toolbar and select edit schema, we go to the storekit configuration field and switch it to the newly created one. After this, build or rebuild your application with Xcode. https://www.avanderlee.com/xcode/storekit-testing-syncing-configuration-file/

# Things I observed

1. React Native IAP interact with the Storekit file not with the Appstore connect.
2. You can also use the Storekit file locally by making sure you dont enable the `sync`, the sync when enabled cannot be `edited`, so to use it locally, we wont enable the Sync, and we can then create the products and subscriptions
3. The Storekit file must be in sync with the production file and confirmed, by seeing the subscriptions and products you created online in the Xcode environment.
4. React native IAP does not get Non-renewable subscriptions in my experience.
5. The Storekit file must be enabled for testing by going to the Edit Schema Schema/Manage Schema and going to the Options tab at the top of the Modal window that pops up, then going to the Storekit Configuration field and Selecting the Newly created Storekit file we just initialized. This makes it the active Storekit file as we can have multiple storekit files but we can only have one active one. so that is the place to set it up.
6. Always build with XCODE, dont use react-native run-ios. as it will initialize the storekit file to the workspace
7. In app capability must be added in xcode, under the capabilities section
