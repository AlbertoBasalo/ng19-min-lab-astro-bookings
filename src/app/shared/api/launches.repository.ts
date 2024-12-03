import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { LaunchDto, NULL_LAUNCH } from "@models/launch.dto";
import { Observable } from "rxjs";
import { LAUNCHES } from "../data/launches.data";

@Injectable({
  providedIn: 'root',
})
export class LaunchesRepository {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;
  private readonly launchesEndpoint = `${this.apiUrl}/launches`;
  /**
   * Gets all the launches
   */
  public getAll = (): LaunchDto[] => LAUNCHES;

  /**
   * Gets all the launches
   * @returns An observable of the launches
   */
  public getAll$ = (): Observable<LaunchDto[]> => this.http.get<LaunchDto[]>(this.launchesEndpoint);

  /**
   * Gets a launch by id
   * @param id - The launch id
   */
  public getById = (id: string): LaunchDto => LAUNCHES.find((launch) => launch.id === id) || NULL_LAUNCH;

  /**
   * Gets a launch by id
   * @param id - The launch id
   * @returns An observable of the launch with the given id
   */
  public getById$ = (id: string): Observable<LaunchDto> => this.http.get<LaunchDto>(`${this.launchesEndpoint}/${id}`);

}
