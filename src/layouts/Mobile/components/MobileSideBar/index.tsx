import { SYSTEM } from '@/assets/icons/System';
import * as Style from './styles';
import { GNBLinkList } from '@/constants/ServiceLink';

type Props = {
  sideBarHandler: () => void;
  openSideBar: boolean;
};

const MobileSideBar = ({ sideBarHandler, openSideBar }: Props) => {
  return (
    <>
      <Style.BackGround onClick={sideBarHandler} />
      <Style.SideBar isActive={openSideBar}>
        <Style.SideBarHeader>{SYSTEM.CLOSE_LG}</Style.SideBarHeader>
        {GNBLinkList.map((list) => (
          <Style.GNBLink href={list.href} target="_blank" rel="noopnner noreferrer" key={list.title} id={list.id}>
            {list.title}
          </Style.GNBLink>
        ))}
      </Style.SideBar>
    </>
  );
};

export default MobileSideBar;
