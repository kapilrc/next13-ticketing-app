import { NextRequest, NextResponse } from 'next/server';
import schema from './schema';

export function GET(request: NextRequest) {
  // fetch users from a db
  return NextResponse.json([{ id: 1, name: 'Kapil' }]);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name } = body;
  const validation = schema.safeParse(body);
  // if invalid, return 400
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 404 });

  return NextResponse.json({ id: 1, name }, { status: 201 });
}
