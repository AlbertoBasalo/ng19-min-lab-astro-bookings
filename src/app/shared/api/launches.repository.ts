import { Injectable } from "@angular/core";
import { LaunchDto } from "@models/launch.dto";
import { LAUNCHES } from "../data/launches.data";

@Injectable({
  providedIn: 'root',
})
export class LaunchesRepository {
  /**
   * Gets all the launches
   */
  public getAll = (): LaunchDto[] => LAUNCHES;
}
