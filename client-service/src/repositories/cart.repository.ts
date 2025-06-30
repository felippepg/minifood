import { prisma } from 'src/infra/client';
import { ICart } from 'src/interfaces/cart';

export const createCartRepository = async(cart: ICart) => {
  return await prisma.cart.create({
    data: {
      client_id: cart.client_id,
    },
    include: {
      CartItem: true,
    },
  });
};

export const findCartByIdRepository = async(id: number) => {
  return await prisma.cart.findUnique({
    where: { id },
    include: { CartItem: true },
  });
};

export const findCartByClientIdRepository = async(id: number) => {
  return await prisma.cart.findMany({
    where: {
      client_id: id,
    },
  });
};