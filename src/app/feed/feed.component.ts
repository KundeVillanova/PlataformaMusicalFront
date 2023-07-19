import { Component, OnInit } from '@angular/core';
import { PostBandaDTO, PostBandaService } from '../services/post-banda.service';
import { PostShowDTO, PostShowService } from '../services/post-show.service';
import {  TipoMusicalService } from '../services/tipo-musical.service';
import { TipoMusical } from '../models/TipoMusical';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  postBandas: PostBandaDTO[] = [];
  postShows: PostShowDTO[] = [];
  tiposMusicais: TipoMusical[] = [];

  constructor(
    private postBandaService: PostBandaService,
    private postShowService: PostShowService,
    private tipoMusicalService: TipoMusicalService
  ) { }

  ngOnInit(): void {
    this.carregarPostBandas();
    this.carregarPostShows();
    this.carregarTiposMusicais();
  }

  carregarPostBandas(): void {
    this.postBandaService.getAllPostBandas().subscribe(
      postBandas => {
        this.postBandas = postBandas;
      },
      error => {
        console.log('Error fetching PostBandas:', error);
      }
    );
  }

  carregarPostShows(): void {
    this.postShowService.getAllPostShows().subscribe(
      postShows => {
        this.postShows = postShows;
      },
      error => {
        console.log('Error fetching PostShows:', error);
      }
    );
  }

  carregarTiposMusicais(): void {
    this.tipoMusicalService.getAllTipoMusicals().subscribe(
      tipos => {
        this.tiposMusicais = tipos;
      },
      error => {
        console.log('Error fetching Tipos Musicais:', error);
      }
    );
  }

  getNomeTipoMusical(idTipoMusical?: number): string {
    if (idTipoMusical) {
      const tipoMusical = this.tiposMusicais.find(tipo => tipo.id === idTipoMusical);
      return tipoMusical ? tipoMusical.nomeTipo : 'Desconhecido';
    }
    return 'Desconhecido';
  }

  verMaisBanda(idBanda?: number): void {
    // Implementar a ação para "Ver Mais" da PostBanda
    console.log('Ver Mais Banda com ID:', idBanda);
  }

  verMaisShow(idShow?: number): void {
    // Implementar a ação para "Ver Mais" do PostShow
    console.log('Ver Mais Show com ID:', idShow);
  }
}
