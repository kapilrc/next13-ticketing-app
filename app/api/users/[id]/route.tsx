import { NextRequest, NextResponse } from 'next/server';

interface Props {
  params: { id: number };
}

export function GET(request: NextRequest, { params: { id } }: Props) {
  // fetch user with that id from a db
  // return NextResponse.json([{ id: 1, name: 'Kapil' }]);
  // if not found return 404
  if (id > 10) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  // finally return actual data
  return NextResponse.json({ id: 1, name: 'Kapil' });
}

export async function PUT(request: NextRequest, { params: { id } }: Props) {
  // Validate the req body
  const body = await request.json();

  // if invalid, return 400
  if (!body.name)
    return NextResponse.json({ error: 'Name is requred' }, { status: 404 });

  // fetch the user with the given id
  // if doesn't exist, return 404
  if (id > 10) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // update the user
  // return the updated user
  return NextResponse.json({ id, name: body.name });
}

export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  // if not found, return 404
  if (id > 10) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // delete the user
  // return 200
  return NextResponse.json({ message: 'deleted user successfully' });
}
