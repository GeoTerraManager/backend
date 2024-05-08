import SquareDTO from "../models/SquareDTO";
import MongoSquareRepository from "../repositories/MongoSquareRepository";
import shapeBrasil from "../shapes/BrasilShape";
import Task from "./Task";
import * as turf from '@turf/turf';

export default class CreateSquaresTask implements Task {
  private repository = new MongoSquareRepository();

  async run(): Promise<void> {
    // coordenadas do brasil
    const brasilCoordinates = shapeBrasil.geometry.coordinates
    const brazilFeature = turf.multiPolygon(brasilCoordinates);

    // bbox brasil (-73.9872354804, -33.7683777809, -34.79, 5.24448639569)
    const minLat = -33.7683777809;
    const maxLat = 5.24448639569;
    const minLon = -73.9872354804;
    const maxLon = -34.79;

    const difLat = maxLat - minLat;
    const difLon = maxLon - minLon;

    const columnQuantity = 24;
    const rowQuantity = 40;

    // Calculando o tamanho dos objetos quadricula
    const squareWidthStep = difLat / rowQuantity;
    const squareHeightStep = difLon / columnQuantity;

    let contNickname = 1;
    for (let r = 0; r < rowQuantity; r++) {
      for (let c = 0; c < columnQuantity; c++) {
        // Calculando as coordenadas pra quadricula atual
        const squareMinLat = minLat + (r * squareWidthStep);
        const squareMaxLat = squareMinLat + squareWidthStep;
        const squareMinLon = minLon + (c * squareHeightStep);
        const squareMaxLon = squareMinLon + squareHeightStep;
        
        let squareCoordinates = [
          [
              [squareMinLon, squareMinLat], // Bottom-left
              [squareMinLon, squareMaxLat], // Top-left
              [squareMaxLon, squareMaxLat], // Top-right
              [squareMaxLon, squareMinLat], // Bottom-right
              [squareMinLon, squareMinLat]  // Closing point (same as starting point)
          ]
        ];

        const squareFeature = turf.polygon(squareCoordinates);


        if (turf.intersect(squareFeature, brazilFeature)){
          // Criando o objeto com as coordenadas calculadas
          const square = new SquareDTO(
            contNickname.toString(), // apelido
            squareMinLat,
            squareMaxLat,
            squareMinLon,
            squareMaxLon
          );
          // Persistindo dados no repositorio
          await this.repository.createSquare(square);
          contNickname++;
        }        
      }
    }
  }
}
