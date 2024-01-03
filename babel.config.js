module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      '@emotion',
      'expo-router/babel',
      'react-native-reanimated/plugin',
    ],
  };
};
