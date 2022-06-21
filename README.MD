# ZipHR/NYTimes app

## Setup

1) Follow instructions here: https://reactnative.dev/docs/environment-setup
2) `npm install && npx pod-install` and you're ready to go

## Run

### Instructions for iOS:

Choose any option:

- `react-native run-ios simulator='iPhone 8'`
- `npm run ios`
- `run "xed -b ios"`
- Open `mobile/ios` folder in Xcode and hit the Run button

### Instructions for Android:

Start by launching your emulator with commands, `emulator -list-avds` and `emulator -avd [avd-name]`
Then `npm run android`


## Offline support:

Is implemented by caching data from backend and only showing error and loading state when no articles were fetched. So basically
we fetch data in the background and users always see cached data.

```js
const state = {status: 'loading', articles: [/*length > 0*/]} //-> show articles anyway 
const state = {status: 'error', articles: [/*length > 0*/]} //-> show articles anyway  
const state = {status: 'success', articles: [/*length > 0*/]} //-> show articles anyway

const state = {status: 'loading', articles: [/*length === 0*/]} //-> show loader (1st fetch) 
const state = {status: 'error', articles: [/*length === 0*/]} //-> show error in ui (1st fetch failed)  
const state = {status: 'success', articles: [/*length === 0*/]} //-> show zero state in ui
```
