import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { Product } from 'src/app/models/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.component.html',
  styleUrls: ['./listar-producto.component.css']
})
export class ListarProductoComponent implements OnInit {

  productList: Product[] = [];

  constructor(private productoService: ProductoService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos() {
    this.productoService.getProductos().subscribe(data => {
      console.log(data);
      this.productList = data;
    },
    error => {
      console.error(error);
    });
  }

  deleteProduct(id: any) {
    this.productoService.deleteProduct(id).subscribe(data => {
      this.toastr.error('El producto fue eliminado correctamente', 'Producto eliminado');
      this.getProductos();
    }, error => {
      console.error(error);
    });
  }
}
