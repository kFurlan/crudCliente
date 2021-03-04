import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from '../Cliente';
import { ClienteService } from '../cliente.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cliente-detalhes',
  templateUrl: './cliente-detalhes.component.html',
  styleUrls: ['./cliente-detalhes.component.css']
})
export class ClienteDetalhesComponent implements OnInit {

  cliente: Cliente;
  constructor(
    private clienteService: ClienteService, 
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    this.getCliente();
  }

  getCliente(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.clienteService.getCliente(id)
      .subscribe(cliente => this.cliente = cliente);
  }
  
  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.clienteService.updateCliente(this.cliente)
      .subscribe(() => this.goBack());
  }

}
