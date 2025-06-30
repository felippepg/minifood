import { prisma } from 'src/infra/client';
import { ICartItem } from 'src/interfaces/cartItem';

export const createCartItemRepository = async (cartItem: ICartItem) => {
  return await prisma.cartItem.create({
    data: {
      cart_id: cartItem.cart_id,
      price: cartItem.price,
      productName: cartItem.productName,
      quantity: cartItem.quantity,
      notes: cartItem.notes,
    },
  });
};