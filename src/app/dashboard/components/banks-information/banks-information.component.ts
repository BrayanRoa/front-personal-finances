import { Component, OnInit } from '@angular/core';

interface Product{
  code:string;
  name: string;
  category:string;
  quantity:number;
}

@Component({
  selector: 'app-banks-information',
  templateUrl: './banks-information.component.html',
  styleUrl: './banks-information.component.css'
})
export class BanksInformationComponent implements OnInit {
  
  products:Product[] =[]
  ngOnInit(): void {

  }




}
