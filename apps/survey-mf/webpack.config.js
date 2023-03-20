const { ModuleFederationPlugin } = require('webpack').container;
const nrwlConfig = require('@nrwl/react/plugins/webpack.js');
const { dependencies } = require('../../package.json');

const _shared = {};
const depsBlacklist = ['gridstack'];

Object.keys(dependencies).forEach((d, i) => {
  if (depsBlacklist.includes(d)) return;

  _shared[d] = {
    singleton: true,
    eager: true,
    requiredVersion: dependencies[d],
  };
});

module.exports = (config, context) => {
  nrwlConfig(config);
  config.context = process.cwd();
  config.plugins.push(
    new ModuleFederationPlugin({
      name: 'Survey',
      filename: 'remoteEntry.js',
      exposes: {
        // Module
        './SurveyComponent': './apps/survey-mf/src/app/app.tsx',

        // Slice
        // './grid': './apps/react-remote/src/app/pages/projects/store/index.ts',

        // Route
        // './RoutingDemoConfig':
        //   './apps/survey-mf/src/app/pages/projects/DemoConfig.tsx',
      },
      shared: {
        ..._shared,
      },
    })
  );
  config.optimization.runtimeChunk = false;
  config.output = {
    ...config.output,
    uniqueName: 'Survey',
    publicPath: 'auto',
  };

  return config;
};
