import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter3'
})
export class Filter3Pipe implements PipeTransform {

  transform(servidores: any, term: any): any {
    //check if search term is undefined
    if(!servidores || !term) return servidores;
    //return update ninjas array
    return servidores.filter(function(servidor){
      let servidorN = servidor.id_cpf.concat(servidor.nome_serv);
      return servidorN.toLowerCase().includes(term.toLowerCase());
      // return servidorN.includes(term);

    })
  }

}
