import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  ParseIntPipe,
} from '@nestjs/common';

import { ProductsService } from '../services/products.service';
// Esta importacion es para traernos el "PIPE-CUSTOM"
// import { ParseIntPipe } from '../common/parse-int/parse-int.pipe';
import { CreateProductsDto, UpdateProductsDto } from '../dtos/products.dto';

// Para evitar los choques entre URLS estaticas vs dinamicas. Se debe colocar las estaticas por encima de las dinamicas.
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('filter')
  getProductFilter() {
    return {
      message: `yo soy un filter`,
    };
  }

  // Parametros tipo Params
  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED) // esto se utiliza para configurar un status code
  getProduct(@Param('productId', ParseIntPipe) productId: number) {
    // Pipes => Son transformadores y validadores ya diseñados por "nest". Para transformar o validar valores o datos.
    //"ParseIntPipe" => es un pipe que funciona para transformar los valores a number y valida que se este recibiendo realmente un numero.
    // return {
    //   message: `product ${productId}`,
    // };
    return this.productsService.findOne(productId);
  }

  // Parametros tipo Query
  @Get()
  getProducts(
    @Query('limit') limit = 100, // recibe valores por defecto
    @Query('offset') offset: number,
    @Query('brand') brand: string,
  ) {
    // const { limit, offset } = query;
    // return {
    //   message: `products: Limit: ${limit} offset: ${offset} brand: ${brand}`,
    // };
    return this.productsService.findAll();
  }

  //create (post)
  @Post()
  create(@Body() payload: CreateProductsDto) {
    // return {
    //   message: 'accion de crear',
    //   payload,
    // };

    return this.productsService.create(payload);
  }

  // update (Put o Patch)
  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateProductsDto) {
    // return {
    //   id,
    //   payload,
    // };
    return this.productsService.update(id, payload);
  }

  // delete (delete)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productsService.remove(id);
  }
}
