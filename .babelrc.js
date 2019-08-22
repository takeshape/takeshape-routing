const {BABEL_ENV} = process.env;
module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": "6.10"
        },
        "modules": BABEL_ENV === 'es' ? false : BABEL_ENV
      }
    ],
    "@babel/preset-typescript"
  ]
};
