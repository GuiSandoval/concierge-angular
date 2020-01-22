import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(visitantes: any, term: any): any {
    //check if search term is undefined
    if(!visitantes || !term) return visitantes;

    // if(term === undefined) return visitantes;
    //return update ninjas array
    return visitantes.filter(function(visitante){
      let visitanteN = visitante.id_cpf.concat(visitante.nome,visitante.ci);
      return visitanteN.toLowerCase().includes(term.toLowerCase());
    })
  }

}
