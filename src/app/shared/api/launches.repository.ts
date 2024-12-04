import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { LaunchDto } from "@models/launch.dto";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class LaunchesRepository {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;
  private readonly launchesEndpoint = `${this.apiUrl}/launches`;


  /**
   * Gets all the launches
   * @returns An observable of the launches
   */
  public getAll$ = (): Observable<LaunchDto[]> => this.http.get<LaunchDto[]>(this.launchesEndpoint);

   /**
   * Gets a launch by id
   * @param id - The launch id
   * @returns An observable of the launch with the given id
   */
  public getById$ = (id: string): Observable<LaunchDto> => this.http.get<LaunchDto>(`${this.launchesEndpoint}/${id}`);

}
