import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../entities/product.entity';
// import { Product } from '../interfaces/products.interface';
import { CreateProductsDto, UpdateProductsDto } from '../dtos/products.dto';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'soy un texto',
      price: 12345,
      stock: 50,
      image: 'sdsdsd',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      // Con "NotFoundException" se realiza el manejo correcto del error
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(payload: CreateProductsDto) {
    console.log(payload);
    this.counterId = this.counterId + 1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: UpdateProductsDto) {
    const index = this.products.findIndex((product) => product.id == id);
    if (index >= 0) {
      this.products[index] = {
        ...this.products[index],
        ...payload,
      };

      return this.products[index];
    }

    return null;
  }

  remove(id: number) {
    const index = this.products.findIndex((item) => item.id == id);
    if (index === -1) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    this.products.splice(index, 1);
    return true;
  }
}
