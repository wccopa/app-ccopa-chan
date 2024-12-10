import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { IonContent, ToastController } from '@ionic/angular'; 
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.page.html',
  styleUrls: ['./tienda.page.scss'],
})
export class TiendaPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content!: IonContent;
  productos$: Observable<any[]> = new Observable();

  constructor(
    private firestore: AngularFirestore,
    private carritoService: CarritoService,
    private toastController: ToastController 
  ) {}

  ngOnInit() {
    this.productos$ = this.firestore.collection('productos').valueChanges({ idField: 'id' });
  }

  async agregarAlCarrito(producto: any) {
    try {
      await this.carritoService.agregarAlCarrito(producto);
      
      const toast = await this.toastController.create({
        message: `Producto agregado correctamente al carrito.`,
        duration: 2000,  
        position: 'middle',  
        color: 'success',  
      });
      toast.present();
    } catch (error) {
      const toast = await this.toastController.create({
        message: 'Error al agregar el producto al carrito.',
        duration: 2000,
        position: 'bottom',
        color: 'danger',  
      });
      toast.present();
    }
  }

  toggleFavorito(producto: any) {
    producto.favorito = !producto.favorito;
  }

  scrollToTop() {
    this.content.scrollToTop(500);
  }
}