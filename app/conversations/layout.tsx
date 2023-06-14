import getConversations from '../actions/getConversations';
import SideBar from '../components/sidebar/Sidebar';
import ConversationList from './components/ConversationList';

export default async function ConversationsLayout({children}: {children: React.ReactNode}) {
  const conversations = await getConversations();

  return (
    // @ts-expect-error Server Component
    <SideBar>
      <div className="h-full">{children}</div>
      <ConversationList initialItems={conversations!} />
    </SideBar>
  );
}
