import { NextRequest, NextResponse } from 'next/server';
import schema from '../schema';
import prisma from '@/prisma/client';

interface Props {
  params: { id: string };
}

export async function GET(request: NextRequest, { params: { id } }: Props) {
  // fetch product with that id from a db
  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) }
  });
  // if not found return 404
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
  // finally return actual data
  return NextResponse.json(product);
}

export async function PUT(request: NextRequest, { params: { id } }: Props) {
  // Validate the req body
  const body = await request.json();
  const validation = schema.safeParse(body);
  // if invalid, return 400
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 404 });

  // fetch the product with the given id
  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) }
  });

  // if doesn't exist, return 404
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  // update the product
  const updatedProduct = await prisma.product.update({
    where: { id: parseInt(id) },
    data: {
      name: body.name,
      price: body.price
    }
  });
  // return the updated product
  return NextResponse.json(updatedProduct);
}

export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  // if not found, return 404
  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) }
  });

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  // delete the product
  await prisma.product.delete({
    where: { id: parseInt(id) }
  });

  // return 200
  return NextResponse.json({ message: 'deleted product successfully' });
}
