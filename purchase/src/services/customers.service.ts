import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface CreateCustomerParams {
  authUserId: string;
}

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  getCustomerById(id: string) {
    return this.prisma.customer.findUnique({
      where: {
        id,
      },
    });
  }

  getCustomerByAuthUserId(id: string) {
    return this.prisma.customer.findUnique({
      where: {
        authUserId: id,
      },
    });
  }

  async createCustomer({ authUserId }: CreateCustomerParams) {
    const customerWithSameAuthUserId = await this.prisma.customer.findUnique({
      where: {
        authUserId,
      },
    });

    if (customerWithSameAuthUserId) {
      throw new Error('Another customer with same authUserId already exists.');
    }

    const customer = await this.prisma.customer.create({
      data: {
        authUserId,
      },
    });

    return customer;
  }
}
