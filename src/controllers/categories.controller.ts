import { Controller, Get, Param } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  // Parametros tipo Params
  @Get(':id/products/:productId')
  getCategory(@Param('id') id: string, @Param('productId') productId: string) {
    return `product ${productId} and ${id}`;
  }
}
