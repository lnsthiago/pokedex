import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  private urlPokemon: string = 'http://pokeapi.co/api/v2/pokemon'
  private urlSpecies: string = 'http://pokeapi.co/api/v2/pokemon-species'

  public pokemonDetail: any;
  public isLoading: boolean = false;
  public apiError: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pokeApiService: PokeApiService
  ) { }

  ngOnInit(): void {
    this.getPokemon();
  }

  public getPokemon() {
    const id = this.activatedRoute.snapshot.params['id'];

    const pokemon = this.pokeApiService.getDetailsPokemon(`${this.urlPokemon}/${id}`)
    const name = this.pokeApiService.getDetailsPokemon(`${this.urlSpecies}/${id}`)

    return forkJoin([pokemon, name]).subscribe(
      response => {
        this.pokemonDetail = response;
        this.isLoading = true;
        this.apiError = false;
      },
      error => {
        this.apiError = true;
      }
    )
  }
}
