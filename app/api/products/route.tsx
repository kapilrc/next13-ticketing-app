import { NextRequest, NextResponse } from 'next/server';
import schema from './schema';

export function GET(request: NextRequest) {
  // fetch products from a db
  return NextResponse.json([
    { id: 1, name: 'Milk', price: 2.5 },
    { id: 1, name: 'Bread', price: 3.5 }
  ]);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, price } = body;
  const validation = schema.safeParse(body);
  // if invalid, return 400
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 404 });

  return NextResponse.json({ id: 1, name, price }, { status: 201 });
}
