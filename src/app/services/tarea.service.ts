import { Injectable } from '@angular/core';

export interface Tarea {
  id: number;
  nombre: string;
  descripcion: string;
  fechaVencimiento: string;
  completada: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private storageKey = 'tareas';

  constructor() {}

  obtenerTareas(): Tarea[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  obtenerTareaPorId(id: number): Tarea | undefined {
    const tareas = this.obtenerTareas();
    return tareas.find(t => t.id == id);
  }

  agregarTarea(tarea: Omit<Tarea, 'id'>): void {
    const tareas = this.obtenerTareas();
    const nuevaTarea: Tarea = {
      id: Date.now(),
      ...tarea
    };
    tareas.push(nuevaTarea);
    localStorage.setItem(this.storageKey, JSON.stringify(tareas));
  }

  actualizarTarea(tareaActualizada: Tarea): void {
    let tareas = this.obtenerTareas();
    tareas = tareas.map(t => t.id == tareaActualizada.id ? tareaActualizada : t);
    localStorage.setItem(this.storageKey, JSON.stringify(tareas));
  }

  eliminarTarea(id: number): void {
    let tareas = this.obtenerTareas();
    tareas = tareas.filter(t => t.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(tareas));
  }
}
