import { Component, OnInit } from '@angular/core';
import { Cliente } from '../Cliente';
import { ClienteService } from '../cliente.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})

export class ClienteComponent implements OnInit {
  clientes: Cliente[];

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.getClientes();
  }

  getClientes(): void {
    this.clienteService.getClientes()
    .subscribe(clientes => this.clientes = clientes);
  }

  add(nome: string, telefone: string, documento: string, endereco: string): void {
    nome = nome.trim();
    telefone = telefone.trim();
    documento = documento.trim();
    endereco = endereco.trim();
    if (!nome) { return; }
    this.clienteService.addCliente({ nome,telefone,documento,endereco } as Cliente)
      .subscribe(cliente => {
        this.clientes.push(cliente);
      });
      console.log(this.clientes)
  }

  delete(cliente: Cliente): void {
    this.clientes = this.clientes.filter(h => h !== cliente);
    this.clienteService.deleteCliente(cliente).subscribe();
  }

}