import { Injectable } from "@angular/core";
import { NULL_ROCKET, RocketDto } from "@models/rocket.dto";
import { ROCKETS } from "../data/rockets.data";

@Injectable({
  providedIn: 'root',
})
export class RocketsRepository {
  /**
   * Gets all the rockets
   */
  public getAll = (): RocketDto[] => ROCKETS;

  /**
   * Gets a rocket by id
   * @param id - The rocket id
   */
  public getById = (id: string): RocketDto => ROCKETS.find((rocket) => rocket.id === id) || NULL_ROCKET;
}
