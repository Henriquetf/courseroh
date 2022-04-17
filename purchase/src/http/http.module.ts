import path from 'node:path';

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CoreModule } from 'src/core/core.module';
import { DatabaseModule } from 'src/database/database.module';
import { ProductsResolver } from 'src/http/graphql/resolvers/products.resolver';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { ProductsService } from 'src/services/products.service';
import { PurchasesService } from 'src/services/purchases.service';
import { PurchasesResolver } from './graphql/resolvers/purchases.resolver';
import { CustomersService } from 'src/services/customers.service';
import { CustomersResolver } from './graphql/resolvers/customers.resolver';
import { MessagingModule } from 'src/messaging/messaging.module';

@Module({
  imports: [
    CoreModule,
    MessagingModule,
    DatabaseModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
      driver: ApolloFederationDriver,
    }),
  ],
  providers: [
    ProductsResolver,
    ProductsService,

    PurchasesResolver,
    PurchasesService,

    CustomersResolver,
    CustomersService,
  ],
})
export class HttpModule {}
