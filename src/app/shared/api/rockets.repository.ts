import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { RocketDto } from "@models/rocket.dto";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class RocketsRepository {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;
  private readonly rocketsEndpoint = `${this.apiUrl}/rockets`;


  /**
   * Gets all the rockets
   * @returns An observable of the rockets
   */
  public getAll$ = (): Observable<RocketDto[]> => this.http.get<RocketDto[]>(this.rocketsEndpoint);

   /**
   * Gets a rocket by id
   * @param id - The rocket id
   * @returns An observable of the rocket with the given id
   */
  public getById$ = (id: string): Observable<RocketDto> => this.http.get<RocketDto>(`${this.rocketsEndpoint}/${id}`);
}
