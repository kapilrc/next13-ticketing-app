import { NextRequest, NextResponse } from 'next/server';
import schema from './schema';
import prisma from '@/prisma/client';

export async function GET(request: NextRequest) {
  // fetch users from a db
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email } = body;
  const validation = schema.safeParse(body);
  // if invalid, return 400
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 404 });

  // if user exists, return error
  const isUserExist = await prisma.user.findUnique({
    where: { email }
  });
  if (isUserExist)
    return NextResponse.json({ error: 'user already exists!' }, { status: 400 });

  const user = await prisma.user.create({
    data: { name, email }
  });
  return NextResponse.json(user, { status: 201 });
}
