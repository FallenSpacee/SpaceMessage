// actions
import getCurrentUser from '@/app/actions/getCurrentUser';
// components
import DesktopSidebar from './DesktopComponents/DesktopSidebar';
import MobileFooter from './MobileComponents/MobileFooter';

async function SideBar({children}: {children: React.ReactNode}) {
  const currentUser = await getCurrentUser();

  return (
    <div className="h-full">
      <DesktopSidebar currentUser={currentUser!} />
      <MobileFooter />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
}

export default SideBar;
