import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  productForm: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService) { 
    this.productForm = this.fb.group(
      {
        product: ['', Validators.required],
        category: ['', Validators.required],
        localization: ['', Validators.required],
        price: ['', Validators.required]
      }
    );
  }

  ngOnInit(): void {
  }

  addProduct() {

    let product = new Product(
      this.productForm.get('product')?.value, 
      this.productForm.get('category')?.value, 
      this.productForm.get('localization')?.value, 
      this.productForm.get('price')?.value
    );

    console.log(product);
    this.toastr.success('El producto fue registrado con éxito!', 'Producto registrado');
    this.router.navigate(['/']);
  }

}
