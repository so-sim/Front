import { ARROW } from '@/assets/icons/Arrow';
import { SYSTEM } from '@/assets/icons/System';
import React, { useState } from 'react';
import * as Style from './styles';

export type Location = 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT';

type TooltipProps = {
  title: string;
  contents: JSX.Element[];
  width: number;
  location: Location;
  trigger: JSX.Element;
  messageBox: {
    left?: string;
    top?: string;
  };
  left?: string;
  top?: string;
  defaultValue?: boolean;
  preventClick?: boolean;
};

export const Tooltip = ({
  title,
  contents, //
  width,
  location,
  trigger,
  left = '0px',
  top = '0px',
  defaultValue = false,
  messageBox,
  preventClick = false,
}: TooltipProps) => {
  const [page, setPage] = useState(0);
  const [showTooltip, setShowTooltip] = useState(defaultValue);

  const onClose = () => {
    setPage(0);
    setShowTooltip((prev) => !prev);
  };

  const openTooltip = () => {
    if (preventClick) return;
    setShowTooltip(true);
  };

  return (
    <span style={{ position: 'relative' }}>
      {showTooltip && (
        <div style={{ position: 'absolute', left, top, zIndex: '10' }}>
          <Style.Arrow top={messageBox.top || '0'} left={messageBox.left || '0'} location={location}>
            {ARROW.TOOLTIP}
          </Style.Arrow>
          <Style.Frame width={width} isOnlyTitle={!Boolean(contents.length)}>
            <Header title={title} onClose={onClose} isOnlyTitle={!Boolean(contents.length)} />
            {contents[page]}
            {contents.length > 1 && <Footer contents={contents} page={page} setPage={setPage} onClose={onClose} />}
          </Style.Frame>
        </div>
      )}
      {/* 트리거에 의해서 열리는 아이가 존재하는 반면, 그냥 달려있기 위해서 존재하는 아이들이 있음 */}
      <span style={{ cursor: 'pointer' }} onClick={openTooltip}>
        {trigger}
      </span>
    </span>
  );
};

const Header = ({ title, onClose, isOnlyTitle }: Pick<TooltipProps, 'title'> & { onClose: VoidFunction; isOnlyTitle: boolean }) => {
  return (
    <Style.Header isOnlyTitle={isOnlyTitle}>
      <span>{title}</span>
      <span style={{ cursor: 'pointer' }} onClick={onClose}>
        {SYSTEM.CLOSE_SM_WHITE}
      </span>
    </Style.Header>
  );
};

type FooterProps = Pick<TooltipProps, 'contents'> & { page: number; setPage: React.Dispatch<React.SetStateAction<number>>; onClose: VoidFunction };

const Footer = ({ contents, page, setPage, onClose }: FooterProps) => {
  const buttonText = (page: number) => {
    if (page === contents.length - 1) return '닫기';
    return '다음';
  };

  const handleNext = () => {
    if (page >= contents.length - 1) return onClose();
    setPage((prev) => prev + 1);
  };

  return (
    <Style.Footer>
      <Style.Pagination>
        {contents.map((_, index) => (
          <Style.Page onClick={() => setPage(index)} isActive={page === index} key={index} />
        ))}
      </Style.Pagination>
      <Style.NextButton onClick={handleNext}>{buttonText(page)}</Style.NextButton>
    </Style.Footer>
  );
};
