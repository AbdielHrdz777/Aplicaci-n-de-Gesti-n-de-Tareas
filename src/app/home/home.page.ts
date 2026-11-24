import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton, IonIcon, IonFab, IonFabButton, IonCheckbox } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add, trash } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton, IonIcon, IonFab, IonFabButton, IonCheckbox
  ]
})
export class HomePage implements OnInit {
  tareas: any[] = [];

  constructor(private router: Router) {
    addIcons({ add, trash });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.cargarTareas();
  }

  cargarTareas() {
    this.tareas = JSON.parse(localStorage.getItem('tareas') || '[]');
  }

  irACrearTarea() {
    this.router.navigate(['/tarea']);
  }

  verDetalles(id: number) {
    this.router.navigate(['/tarea-detalles', id]);
  }

  eliminarTarea(id: number, event: Event) {
    event.stopPropagation(); // Evita que se abra el detalle al hacer clic en eliminar
    this.tareas = this.tareas.filter((t: any) => t.id !== id);
    localStorage.setItem('tareas', JSON.stringify(this.tareas));
  }
}
