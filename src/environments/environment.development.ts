import packageInfo from '../../package.json';
export const environment = {
  production: false,
  version: packageInfo.version,
  measurUtilitiesApi: 'http://127.0.0.1:3000/',
};
