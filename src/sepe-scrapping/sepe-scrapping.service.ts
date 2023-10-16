import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ResponseSepe } from 'src/model/response-sepe';

@Injectable()
export class SepeScrappingService {
  constructor(private readonly httpService: HttpService) {}

  async getHorariosSepe(): Promise<ResponseSepe> {
    let responseSepe: ResponseSepe = null;
    try {
      const response = await this.httpService.axiosRef.post<ResponseSepe>(
        'https://sucitaprevia.es/citapreviasepe/cita/cargaTiposAtencionMapa',
        new URLSearchParams({
          idCliente: '39',
          idGrupoServicio: '8',
          codigoPostal: '28821',
          latOrigen: '40.426549',
          lngOrigen: '-3.567494',
          hasDependientes: '1',
          tieneTramiteRelacionado: '1',
          idsJerarquiaTramites: '5',
          codIdioma: 'es',
        }),
      );

      responseSepe = response.data;
    } catch (error) {
      responseSepe = null;
    }

    return responseSepe;
  }
}
