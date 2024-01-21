import { NextRequest, NextResponse } from 'next/server';

export function GET(request: NextRequest) {
  // fetch users from a db
  return NextResponse.json([{ id: 1, name: 'Kapil' }]);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name } = body;

  if (!name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  }

  return NextResponse.json({ id: 1, name }, { status: 201 });
}
