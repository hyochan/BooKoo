## Contributing

**We prefer you to use [vscode](https://code.visualstudio.com)**

# Issue

- Please search and register if you already have the issue you want to create. If you have a similar issue, you can add additional comments.
- Please write a problem or suggestion in the issue. Never include more than one item in an issue.
- Please be as detailed and concise as possible. \* If necessary, please take a screenshot and upload an image.

## Pull request(PR)

PR is available to `main` branch.

Each PR should correspond to one idea and implement it coherently. This idea may be a feature that spans several parts of the codebase. For example, changing an API may include changes to the Android, iOS, and web implementations, the JavaScript SDK, and the docs for the API.

Generally, each PR should contain one commit that is amended as you address code review feedback. Each commit should be meaningful and make sense on its own. Similarly, it should be easy to revert each commit. This keeps the commit history easier to read when people are working on this code or searching for a commit that could have broken something.

## Coding Guidelines

Please read brief description in [hyochan/style-guide/React](https://github.com/hyochan/style-guide/blob/main/docs/REACT.md).
Most of the style guide would be enforced by ESLint and Prettier.

## Stacks Used

- [react-native](https://github.com/facebook/react-native)
- [expo](https://expo.dev)
- [expo-router](https://expo.github.io/router)
- [emotion](https://emotion.sh)
- [dooboo-ui](https://github.com/dooboolab/dooboo-ui)
- [jest](https://github.com/facebook/jest)
- [react-native-testing-library](https://github.com/callstack/react-native-testing-library)
- [typescript](https://github.com/Microsoft/TypeScript)
- [ts-jest](https://github.com/kulshekhar/ts-jest)
- [prettier](https://prettier.io)
- [react-native-web](https://github.com/necolas/react-native-web)
- [expo-localization](https://docs.expo.dev/versions/latest/sdk/localization)

## Forking Process

We follow [github forking workflow](https://medium.com/dooboolab/quick-start-for-contributing-to-whatssub-with-forking-workflow-16c8c971adc5) which you may checkout.

## Copy Environment Variables

```sh
cp .env.example .env
```

## Account Creation for App Development

We need to setup below environment variables and `google-services.json` and `GoogleService-Info.plist` files.
We'll go over them by creating accounts.

```sh
googleClientIdIOS=
googleClientIdAndroid=
googleClientIdWeb=
expoProjectId=
supabaseUrl=
supabaseAnonKey=
```

## [Firebase](https://firebase.google.com)
This service is necessary for integrating Google sign-in functionality.
After creating an account, you should create a project `BooKoo`.

### 1. Create
<img src="https://github.com/hyochan/BooKoo/assets/27461460/1f234bdf-2006-433b-a94a-ff572fade022" width="640"/>
<img src="https://github.com/hyochan/BooKoo/assets/27461460/6608b4a3-54da-4223-8232-03eb6d72d640" width="640"/>
<img src="https://github.com/hyochan/BooKoo/assets/27461460/18f987e0-4532-4892-9a32-aa9fd234d3e8" width="640"/>

### 2. Add platforms in project settings
Create `iOS` and `Android` apps in project settings. This is to get `google-services.json` and `GoogleService-Info.plist` files.
Make sure that the package name is `dev.hyochan.bookoo`.

<img src="https://github.com/hyochan/BooKoo/assets/27461460/3993e0fa-f7be-451c-a87e-6be74150a7fa" width="640"/>

#### iOS
<img src="https://github.com/hyochan/BooKoo/assets/27461460/b8035ccb-8c5e-4464-a665-bb50ea214b51" width="640"/>

- Download `GoogleService-Info.plist` and place it in project's root directory.

#### Android
<img src="https://github.com/hyochan/BooKoo/assets/27461460/1d524142-762a-4066-88da-d57555ae576f" width="640"/>

- Download `google-services.json` and place it in project's root directory.

### 3. Google Cloud Credentials
Now, proceed to the [Google Cloud Console](console.cloud.google.com) to acquire Google client IDs for `iOS`, `Android`, and `Web`. Note that having a Firebase account grants you access to this service, as they utilize the same account system.
<img src="https://github.com/hyochan/BooKoo/assets/27461460/c6fba53a-f3ef-436e-8a5f-8506cd8e5c24" width="480"/>

- Go to APIs & Services ➡️ Credentials in the Google Cloud Console and create credentials following the steps outlined in the screenshots provided.

#### OAuth Client ID
<img src="https://github.com/hyochan/BooKoo/assets/27461460/65f03502-557f-40bc-a8fb-6eb4552ca3b9" width="640"/>

- iOS

  <img src="https://github.com/hyochan/BooKoo/assets/27461460/8e59f0c3-467a-4aff-980c-916640623550" width="640"/>

- Android

  <img src="https://github.com/hyochan/BooKoo/assets/27461460/5b06607d-1a25-4861-9f58-b6bfe0b25099" width="640"/>

- Web

  <img src="https://github.com/hyochan/BooKoo/assets/27461460/6ba839c2-c6db-47c5-a56d-beb240e11a9d" width="640"/>

  - Keep in mind that a web project is automatically created in the Google Cloud Console when you set up a web project within the Firebase project settings.

## [Expo](expo.dev)
Expo is essential for app development and for generating a [development build](https://docs.expo.dev/develop/development-builds/create-a-build). This step is crucial for implementing social sign-in features. Once you have created an Expo account, you should also establish a project as demonstrated in the following steps.

### Create Project
<img src="https://github.com/hyochan/BooKoo/assets/27461460/c5450851-0ade-4679-ad4f-b74ee03d237b)" width="640"/>

Copy `expoProjectId` to your `.env` file.

<img src="https://github.com/hyochan/BooKoo/assets/27461460/5c200e22-ba62-4109-9b6f-c2d45890f061" width="480"/>

## [Supabase](https://supabase.com)

This tool is vital for developing the backend infrastructure. First, create an account and then set up a project. Afterward, you can obtain the supabaseUrl and supabaseAnonKey from the homepage of your project.

<img src="https://github.com/hyochan/BooKoo/assets/27461460/a69269fa-e74b-404d-8135-e0665f6e3eb4" width="640"/>


Now you have all your credentials setup in `.env` 🎉
