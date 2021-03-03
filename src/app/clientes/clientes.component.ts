import { Component, OnInit } from '@angular/core';
import { Cliente } from '../Cliente';
import { clientes } from '../mock-clientes';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes = clientes;
  selectedCliente?: Cliente;

  constructor() { }

  ngOnInit() {
  }

  onSelect(cliente: Cliente): void {
    this.selectedCliente = cliente;
  }

}