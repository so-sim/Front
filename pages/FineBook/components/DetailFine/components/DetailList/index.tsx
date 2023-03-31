import { EvnetInfo } from '@/types/event';
import { changeNumberToMoney } from '@/utils/changeNumberToMoney';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { DropDownWrapper } from '../DropDownWrapper';
import * as Style from './styles';

interface DetailListProps {
  details?: EvnetInfo[];
  page: number;
  setSelect: Dispatch<SetStateAction<EvnetInfo>>;
  setOpenUserDetails: Dispatch<SetStateAction<boolean>>;
}

export const DetailList: FC<DetailListProps> = ({ details, page, setSelect, setOpenUserDetails }) => {
  if (details == null) return null;
  console.log(details);

  if (details.length === 0) return <Style.NotFoundList>내역을 추가해주세요!</Style.NotFoundList>;

  const COUNT_PER_PAGE = 16;

  return (
    <>
      {details.map((detail, i) => {
        const { groundsDate, userName, payment, grounds } = detail;
        console.log('detail', detail);

        return (
          <Style.TableRow
            key={i}
            onClick={(e) => {
              setSelect(detail);
              setOpenUserDetails(true);
            }}
          >
            <Style.Element hasEllipsis={false}>{(groundsDate.split(' ')[0] as string).replaceAll('-', '.')}</Style.Element>
            <DropDownWrapper detail={detail} />
            <Style.Element hasEllipsis>{userName}</Style.Element>
            <Style.Element hasEllipsis>{changeNumberToMoney(payment)}</Style.Element>
            <Style.Element hasEllipsis>{grounds}</Style.Element>
          </Style.TableRow>
        );
        // }
      })}
    </>
  );
};
