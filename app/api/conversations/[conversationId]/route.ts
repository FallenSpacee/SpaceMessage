// next
import {NextResponse} from 'next/server';
// actions
import getCurrentUser from '@/app/actions/getCurrentUser';
// libraries
import prisma from '@/app/libs/prismadb';

interface IParams {
  conversationId?: string;
}

export async function DELETE(request: Request, {params}: {params: IParams}) {
  try {
    const {conversationId} = params;
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return NextResponse.json(null);
    }

    const existingConversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    if (!existingConversation) {
      return new NextResponse('Invalid conversation', {status: 400});
    }

    const deletedConversation = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser.id],
        },
      },
    });

    return NextResponse.json(deletedConversation);
  } catch (error) {
    return NextResponse.json(null);
  }
}
