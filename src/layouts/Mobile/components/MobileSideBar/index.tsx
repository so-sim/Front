import { SYSTEM } from '@/assets/icons/System';
import * as Style from './styles';
import { GNBLinkList } from '@/constants/ServiceLink';
import GroupList from '@/layouts/Group/components/GroupList';
import GroupSideBar from '@/layouts/Group/components/SideBar';

type Props = {
  location: 'HOME' | 'GROUP';
  sideBarHandler: () => void;
  openSideBar: boolean;
};

const MobileSideBar = ({ sideBarHandler, openSideBar, location }: Props) => {
  return (
    <>
      <Style.BackGround onClick={sideBarHandler} />
      <Style.SideBar isActive={openSideBar}>
        <Style.SideBarHeader onClick={sideBarHandler}>{SYSTEM.CLOSE_LG}</Style.SideBarHeader>
        {location === 'HOME' ? (
          GNBLinkList.map((list) => (
            <Style.GNBLink href={list.href} target="_blank" rel="noopnner noreferrer" key={list.title} id={list.id}>
              {list.title}
            </Style.GNBLink>
          ))
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '76px 260px auto' }}>
            <GroupList />
            <GroupSideBar />
          </div>
        )}
      </Style.SideBar>
    </>
  );
};

export default MobileSideBar;
