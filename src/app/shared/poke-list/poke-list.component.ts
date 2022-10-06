import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {

  private allPokemons: Array<any> = [];
  public filteredPokemons: Array<any> = [];  

  public apiError: boolean = false;

  constructor(private pokeApiService: PokeApiService) { }

  ngOnInit(): void {
    this.pokeApiService.allPokemons.subscribe(
      response => {
        this.allPokemons = response.results
        this.filteredPokemons = this.allPokemons

        this.apiError = false;
      },
      error => {
        this.apiError = true;
      }
    );
  }

  public filterPokemon(value: string) {
    const filter = this.allPokemons.filter((response: any) => {
      return response.name.includes(value.toLowerCase());
    });

    this.filteredPokemons = filter;
  }
}
