import { StatusCodes } from 'http-status-codes';
import logger from 'src/infra/logger';
import { ICart } from 'src/interfaces/cart';
import { ICartItem } from 'src/interfaces/cartItem';
import { Order } from 'src/interfaces/order';
import { createCartRepository, findCartByClientIdRepository, findCartByIdRepository } from 'src/repositories/cart.repository';
import { createCartItemRepository } from 'src/repositories/cartItem.repository';
import { sendOrder } from 'src/service/sendOrder.service';
import { handlePrismaError } from 'src/utils/prisma-erro-handler';

export type CartWithItems = {
  id: number;
  client_id: number;
  created_at: Date;
  updated_at: Date;
  CartItem: {
    id: number;
    productName: string;
    price: number;
    quantity: number;
    notes: string | null;
    cart_id: number;
  }[];
};

export const createCartUseCase = async (cart: ICart) => {
  try {
    logger.info('creating cart');
    const newCart = await createCartRepository(cart);

    const cartItensCreated: ICartItem[] = [];

    const cartItens = cart.cart_item.map((item) => ({
      ...item,
      cart_id: newCart.id,
    }));


    logger.info('adding itens to cart');
    for (const item of cartItens) {
      try {
        const created = await createCartItemRepository(item);
        cartItensCreated.push(created);
      } catch (error) {
        logger.error('error while creating item', error);
      }
    }

    logger.info('return full object');
    const fullCart = await findCartByIdRepository(newCart.id);

    const order = prepareOrder(fullCart);

    logger.info('calling send order');
    await sendOrder(order);


    return {
      success: true,
      data: fullCart,
      statusCode: StatusCodes.CREATED,
    };

  } catch (error) {
    logger.error('error while saving cart', error);
    return {
      success: false,
      message: 'Erro interno ao criar carrinho',
      code: 'CART_CREATE_FAILED',
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }
};

export const findCartByClientIdUseCase = async (id: string) => {
  try {
    const idNumber = Number(id);
    
    if (isNaN(idNumber)) {
      return {
        success: false,
        message: 'ID inválido',
        code: 'CLIENTS_INVALID_ID',
        statusCode: StatusCodes.BAD_REQUEST,
      };
    }
    const cart = await findCartByClientIdRepository(idNumber);

    if (!cart) {
      return { success: true, data: null, statusCode: StatusCodes.NO_CONTENT };
    }

    return { success: true, data: cart, statusCode: StatusCodes.OK };
  } catch (error) {
    logger.error('error while fetching cart by id', error);
    return handlePrismaError(error);
  }
};

export const prepareOrder = (cart: CartWithItems | null): Order | undefined => {
  if (!cart) {
    logger.error('Cart is null, cannot transform into order');
    return;
  }

  const orderItens = cart.CartItem.map((item) => ({
    productName: item.productName,
    quantity: item.quantity,
    price: item.price,
    notes: item.notes ?? undefined,
  }));

  return {
    orderClientId: cart.client_id,
    orderItens,
  };
};

