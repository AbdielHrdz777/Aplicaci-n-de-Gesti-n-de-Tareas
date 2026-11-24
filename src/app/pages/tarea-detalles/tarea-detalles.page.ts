import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonButton, IonInput, IonTextarea, IonButtons, IonBackButton, AlertController } from '@ionic/angular';
import { TareaService } from '../../services/tarea.service'; // <--- Importamos el servicio

@Component({
  selector: 'app-tarea-detalles',
  templateUrl: './tarea-detalles.page.html',
  styleUrls: ['./tarea-detalles.page.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonButton, IonInput, IonTextarea, IonButtons, IonBackButton
  ]
})
export class TareaDetallesPage implements OnInit {
  tareaId: any;
  tarea: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tareaService: TareaService, // <--- Inyectamos el servicio
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.tareaId = this.route.snapshot.paramMap.get('id');
    this.cargarTarea();
  }

  cargarTarea() {
    // Buscamos la tarea usando el método del servicio
    this.tarea = this.tareaService.obtenerTareaPorId(Number(this.tareaId));
  }

  async actualizarCambios() {
    if (!this.tarea) return;

    // Validación básica por si dejan campos vacíos al editar
    if (!this.tarea.nombre.trim() || !this.tarea.descripcion.trim() || !this.tarea.fechaVencimiento) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Los campos no pueden quedar vacíos.',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }

    // Actualizamos a través del servicio
    this.tareaService.actualizarTarea(this.tarea);

    // Regresamos al home
    this.router.navigate(['/home']);
  }
}
