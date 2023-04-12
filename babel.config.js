module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    [
      'next/babel',
      {
        'preset-env': {
          targets: null,
        },
      },
    ],
    '@babel/preset-typescript',
  ],
};
