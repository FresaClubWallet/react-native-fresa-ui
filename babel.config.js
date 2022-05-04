module.exports = function(api) {
  api.cache(true);
  const moduleResolver = [
    'module-resolver',
    {
      root: './',
      alias: {
        i18n: './i18n'
      }
    }
  ];

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      moduleResolver,
      ["module:react-native-dotenv", {
        "moduleName": "@env",
        "path": ".env",
        "blacklist": null,
        "whitelist": null,
        "safe": false,
        "allowUndefined": true
      }],
      
    ]
  };
};
