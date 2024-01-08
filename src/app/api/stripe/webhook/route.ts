import prisma from '@/lib/prisma';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import type Stripe from 'stripe';

export async function POST(request: Request) {
  const body = await request.text();

  const signature = (headers().get('Stripe-Signature') as string) ?? '';

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature.toString(),
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (err) {
    console.log(err?.message);
    return new Response(
      `Webhook Error: ${err instanceof Error ? err.message : 'Unknown Error'}`,
      { status: 400 }
    );
  }

  const session = event.data.object as Stripe.Checkout.Session;
  console.log('🚀 ~ file: route.ts:29 ~ POST ~ event.type:', event.type);

  // if (!session?.metadata?.userId) {
  //   return new Response(null, {
  //     status: 200,
  //   });
  // }
  console.log(event.type);

  // if (event.type === 'payment_intent.succeeded') {
  //   console.log('metadataaaaaaaaaaaaaaaaaaaaaaaaa');

  //   console.log(
  //     '🚀 ~ file: route.ts:109 ~ POST ~ session.metadata:',
  //     session.metadata
  //   );
  // }
  if (event.type === 'charge.succeeded') {
    console.log('metadataaaaaaaaaaaaaaaaaaaaaaaaa');

    const { userFullName, checkedItems, userEmail, amount, uuid } =
      session.metadata;
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });
    let data = {};
    if (!user) {
      data = {
        anonymousUser: uuid,
        anonymousUserName: userFullName,
        anonymousUserEmail: userEmail,
        total: parseFloat(amount),
      };
    } else {
      data = {
        userId: user.id,
        total: parseFloat(amount),
      };
    }
    const orderItems = JSON.parse(checkedItems);
    console.log('🚀 ~ file: route.ts:70 ~ POST ~ orderItems:', orderItems);

    const res = await prisma.order.create({
      data: {
        ...data,
        orderId: orderItems.id,
      },
    });
    console.log('🚀 ~ file: route.ts:78 ~ POST ~ res:', res);
    // for (const item of orderItems) {
    //   await prisma.productSize.updateMany({
    //     where: {
    //       productId: item.productId,
    //       size: item.selectedSize,
    //     },
    //     data: {
    //       quantity: {
    //         decrement: item.quantity,
    //       },
    //     },
    //   });
    // }
    //TODO: create order => xong
  }
  return new Response(JSON.stringify('ok'), { status: 200 });
}
