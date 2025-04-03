export type Config = {
  noMusic: boolean;
  yay: boolean;
};

export function defaultConfig(): Config {
  return {
    noMusic: false,
    yay: false,
  };
}

export function configExists(): boolean {
  return localStorage.getItem("config") !== null;
}

export const config = $state(defaultConfig());
export default config;
