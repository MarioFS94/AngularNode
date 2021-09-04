import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  productForm: FormGroup;
  titulo: string = 'Crear producto';
  id: string | null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private productService: ProductoService,
    private aRouter: ActivatedRoute /*Obtener el id*/
    ) { 
    this.productForm = this.fb.group(
      {
        product: ['', Validators.required],
        category: ['', Validators.required],
        localization: ['', Validators.required],
        price: ['', Validators.required]
      }
    );
    this.id = this.aRouter.snapshot.paramMap.get('id');//id de la ruta de editar definida en el modulo de rutas
  }

  ngOnInit(): void {
    this.idEditing();
  }

  addProduct() {

    let product = new Product(
      this.productForm.get('product')?.value, 
      this.productForm.get('category')?.value, 
      this.productForm.get('localization')?.value, 
      this.productForm.get('price')?.value
    );

    if(this.id !== null){
      //editamos

      this.productService.editProduct(this.id, product).subscribe( data => {
        this.toastr.info('El producto fue editado con éxito!', 'Producto editado');
        this.router.navigate(['/']);
      }, error => {
        console.error(error);
        this.productForm.reset();
      });
    } else {
      //agregamos

      this.productService.addProduct(product).subscribe(data => {
        this.toastr.success('El producto fue registrado con éxito!', 'Producto registrado');
        this.router.navigate(['/']);
      }, error => {
        console.error(error);
        this.productForm.reset();
      });
    }
    
  }

  idEditing(){
    if(this.id !== null){
      this.titulo = 'Editar producto';
      this.productService.getProducto(this.id).subscribe(data => {
        this.productForm.setValue(
          {
            product: data.name,
            category: data.category,
            localization: data.localization,
            price: data.price
          }
        );
      });
    }
  }

}
