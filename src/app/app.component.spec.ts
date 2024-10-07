

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';


interface Compra {
  nome: string;
  comprado: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  items: Compra[] = [
    { nome: 'Camisa', comprado: false },
    { nome: 'Calça', comprado: true },
  ];

  itemForm: FormGroup;
  editingItem: Compra | null = null;

  constructor(private fb: FormBuilder) {
    this.itemForm = this.fb.group({
      itemName: ['', Validators.required],
    });
  }

  get itensComprados() {
    return this.items.filter((item) => item.comprado);
  }

  get itensNaoComprados() {
    return this.items.filter((item) => !item.comprado);
  }

  addItem() {
    if (this.itemForm.valid) {
      const itemName = this.itemForm.get('itemName')?.value;

      if (this.editingItem) {
        this.editingItem.nome = itemName;
        this.editingItem = null;
      } else {
        this.items.push({ nome: itemName, comprado: false });
      }

      this.itemForm.reset();
    }
  }

  startEditing(item: Compra) {
    this.editingItem = item;
    this.itemForm.setValue({ itemName: item.nome });
  }

  removeItem(item: Compra) {
    this.items = this.items.filter((i) => i !== item);
  }

  toggleItem(item: Compra) {
    item.comprado = !item.comprado;
  }
}

