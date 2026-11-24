import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonButton, IonInput, IonTextarea, IonButtons, IonBackButton, AlertController } from '@ionic/angular';
import { TareaService } from '../../services/tarea.service';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.page.html',
  styleUrls: ['./tarea.page.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonButton, IonInput, IonTextarea, IonButtons, IonBackButton
  ]
})
export class TareaPage implements OnInit {
  nombre: string = '';
  descripcion: string = '';
  fechaVencimiento: string = '';

  constructor(
    private router: Router,
    private tareaService: TareaService,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  async guardarTarea() {
    // 1. Validar campos vacíos
    if (!this.nombre.trim() || !this.descripcion.trim() || !this.fechaVencimiento) {
      await this.mostrarAlerta('Error', 'Todos los campos (nombre, descripción y fecha) son obligatorios.');
      return;
    }

    // 2. Validar que la fecha de vencimiento sea futura
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // Reiniciar horas para comparar solo fechas
    const fechaSeleccionada = new Date(this.fechaVencimiento);

    if (fechaSeleccionada < hoy) {
      await this.mostrarAlerta('Fecha Inválida', 'La fecha de vencimiento debe ser una fecha futura (no se permiten fechas pasadas).');
      return;
    }

    // 3. Guardar mediante el servicio
    this.tareaService.agregarTarea({
      nombre: this.nombre,
      descripcion: this.descripcion,
      fechaVencimiento: this.fechaVencimiento,
      completada: false
    });

    // Limpiar y regresar
    this.router.navigate(['/home']);
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Aceptar']
    });
    await alert.present();
  }
}
