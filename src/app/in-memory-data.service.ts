import { Injectable } from '@angular/core';
import { Cliente } from './Cliente';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDataService {
  createDb() {
    const clientes = [
      { id: 1, nome: "Karina", telefone: "9999999", documento: "9999999", endereco: "rua A" },
      { id: 2, nome: "Fábio", telefone: "8888888", documento: "8888888", endereco: "rua B" },
      { id: 3, nome: "Jorge", telefone: "7777777", documento: "7777777", endereco: "rua C" }
    ];
    return {clientes};
  }

  genId(clientes: Cliente[]): number {
    return clientes.length > 0 ? Math.max(...clientes.map(cliente => cliente.id)) + 1 : 5;
  }
}
