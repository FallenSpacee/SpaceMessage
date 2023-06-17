// actions
import getConversations from '../actions/getConversations';
import getUsers from '../actions/getUsers';
// components
import SideBar from '../components/sidebar/Sidebar';
import ConversationList from './components/ConversationList';

export default async function ConversationsLayout({children}: {children: React.ReactNode}) {
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    // @ts-expect-error Server Component
    <SideBar>
      <div className="h-full">{children}</div>
      <ConversationList users={users!} initialItems={conversations!} />
    </SideBar>
  );
}
