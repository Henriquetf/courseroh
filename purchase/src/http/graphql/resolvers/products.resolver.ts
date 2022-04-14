import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/http/auth/authorization.guard';

import { ProductsService } from 'src/services/products.service';
import { CreateProductInput } from '../inputs/createProductInput';
import { Product } from '../models/product';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Query(() => [Product])
  async products() {
    return await this.productsService.listAllProducts();
  }

  @Mutation(() => Product)
  @UseGuards(AuthGuard)
  async createProduct(@Args('data') data: CreateProductInput) {
    return await this.productsService.createProduct(data);
  }
}
