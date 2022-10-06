import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private url: string = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=150'

  constructor(private httpClient: HttpClient) { }

  get allPokemons(): Observable<any> {
    return this.httpClient.get<any>(this.url).pipe(
      tap(response => response),
      tap(response => {
        response.results.map((responsePokemons: any) => {
          this.getDetailsPokemon(responsePokemons.url).subscribe(
            response => responsePokemons.status = response
          )
        })
      })
    );
  }

  public getDetailsPokemon(url: string): Observable<any> {
    return this.httpClient.get<any>(url).pipe(
      map(
        responsePokemon => responsePokemon
      )
    )
  }
}
