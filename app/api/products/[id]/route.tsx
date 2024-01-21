import { NextRequest, NextResponse } from 'next/server';
import schema from '../schema';

interface Props {
  params: { id: number };
}

export function GET(request: NextRequest, { params: { id } }: Props) {
  // fetch product with that id from a db
  // return NextResponse.json([{ id: 1, name: 'Kapil' }]);
  // if not found return 404
  if (id > 10) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
  // finally return actual data
  return NextResponse.json({ id: 1, name: 'Milk', price: 2.6 });
}

export async function PUT(request: NextRequest, { params: { id } }: Props) {
  // Validate the req body
  const body = await request.json();
  const validation = schema.safeParse(body);
  // if invalid, return 400
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 404 });

  // fetch the product with the given id
  // if doesn't exist, return 404
  if (id > 10) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  // update the product
  // return the updated product
  return NextResponse.json({ id, ...body });
}

export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  // if not found, return 404
  if (id > 10) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  // delete the product
  // return 200
  return NextResponse.json({ message: 'deleted product successfully' });
}
