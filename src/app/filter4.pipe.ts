import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter4'
})
export class Filter4Pipe implements PipeTransform {

  transform(lotacoes: any, term: any): any {
     //check if search term is undefined
     if(!lotacoes || !term) return lotacoes;
     //return update ninjas array
     return lotacoes.filter(function(lotacao){
       let lotacaoN = lotacao.sigla_lotacao.concat(lotacao.desc_lotacao, lotacao.id_lotacao);
       return lotacaoN.toLowerCase().includes(term.toLowerCase());
       //  return lotacaoN.includes(term);

     })
  }

}


