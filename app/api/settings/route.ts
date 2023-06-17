// next
import {NextResponse} from 'next/server';
// actions
import getCurrentUser from '@/app/actions/getCurrentUser';
// libraries
import prisma from '@/app/libs/prismadb';

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const {name, image} = body;

    if (!currentUser) {
      return new NextResponse('Unauthorized', {status: 401});
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        image,
        name,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.log(error);
    return new NextResponse('Internal Server Error', {status: 500});
  }
}
