import { InjectionToken  } from "@angular/core";

export let APP_CONFIG = new InjectionToken("applicationSettings");

export interface IApplicationSettings {
  API_ENDPOINT: string;
}

export const ApplicationSettings: IApplicationSettings = {
  API_ENDPOINT: "http://192.168.0.2:8080/api/",
};
