import { NextRequest, NextResponse } from 'next/server';
import schema from './schema';
import prisma from '@/prisma/client';

export async function GET(request: NextRequest) {
  // fetch products from a db
  const products = await prisma.product.findMany();
  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, price } = body;
  const validation = schema.safeParse(body);
  // if invalid, return 400
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 404 });

  // if product already exists, return 400
  const product = await prisma.product.findFirst({
    where: { name }
  });

  if (product)
    return NextResponse.json({ error: 'Product already exists!' }, { status: 400 });

  const newProduct = await prisma.product.create({
    data: {
      name,
      price
    }
  });
  return NextResponse.json(newProduct, { status: 201 });
}
