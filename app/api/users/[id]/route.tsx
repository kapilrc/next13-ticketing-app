import { NextRequest, NextResponse } from 'next/server';
import schema from '../schema';
import prisma from '@/prisma/client';

interface Props {
  params: { id: string };
}

export async function GET(request: NextRequest, { params: { id } }: Props) {
  // fetch user with that id from a db
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) }
  });
  // if not found return 404
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  // finally return actual data
  return NextResponse.json(user);
}

export async function PUT(request: NextRequest, { params: { id } }: Props) {
  // Validate the req body
  const body = await request.json();
  const validation = schema.safeParse(body);

  // if invalid, return 400
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 404 });

  // fetch the user with the given id
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) }
  });

  // if doesn't exist, return 404
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // update the user
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      name: body.name,
      email: body.email
    }
  });
  // return the updated user
  return NextResponse.json(updatedUser);
}

export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  // if not found, return 404
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) }
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // delete the user
  await prisma.user.delete({
    where: { id: parseInt(id) }
  });

  // return 200
  return NextResponse.json({ message: 'deleted user successfully' });
}
