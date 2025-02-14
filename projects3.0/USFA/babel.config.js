const presets = [
  [
    '@babel/preset-env',
    {
      modules: false,
    },
  ],
  // {
  //
  // }
];
// Add this to working tests
// const env = {
//   test: {
//     presets: [['@babel/preset-env']]
//   }
// }

const plugins = [
  [
    require.resolve('babel-plugin-module-resolver'),
    {
      root: ['./src/'],
      alias: {
        '~': './src/data',
        '@files': './src/files.js',
        '@utils': './src/utils.js',
        '@generator': './generator',
        '@raw': '../../../raw',
      },
    },
  ],
  ['@babel/plugin-syntax-dynamic-import'],
];

module.exports = { presets, plugins };
