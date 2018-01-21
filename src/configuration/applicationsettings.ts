import { InjectionToken  } from "@angular/core";

export let APP_CONFIG = new InjectionToken("applicationSettings");

export interface IApplicationSettings {
  API_ENDPOINT: string;
  CURRENT_TOKEN: string
}

export const ApplicationSettings: IApplicationSettings = {
  API_ENDPOINT: "http://timon-hack.herokuapp.com/api",
  CURRENT_TOKEN: ""
};
