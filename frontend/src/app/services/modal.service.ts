// modal.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private showAddModalSource = new Subject<boolean>();
  private showEditModalSource = new Subject<any>();
  private showDeleteModalSource = new Subject<number>();

  showAddModal$ = this.showAddModalSource.asObservable();
  showEditModal$ = this.showEditModalSource.asObservable();
  showDeleteModal$ = this.showDeleteModalSource.asObservable();

  openAddModal() {
    this.showAddModalSource.next(true);
  }

  openEditModal(formateur: any) {
    this.showEditModalSource.next(formateur);
  }

  openDeleteModal(id: number) {
    this.showDeleteModalSource.next(id);
  }
}