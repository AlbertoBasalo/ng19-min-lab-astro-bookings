import { Injectable } from "@angular/core";
import { LaunchDto, NULL_LAUNCH } from "@models/launch.dto";
import { LAUNCHES } from "../data/launches.data";

@Injectable({
  providedIn: 'root',
})
export class LaunchesRepository {
  /**
   * Gets all the launches
   */
  public getAll = (): LaunchDto[] => LAUNCHES;

  /**
   * Gets a launch by id
   * @param id - The launch id
   */
  public getById = (id: string): LaunchDto => LAUNCHES.find((launch) => launch.id === id) || NULL_LAUNCH;
}
