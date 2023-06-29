import React, { Dispatch, SetStateAction } from 'react';
import * as Style from './styles';
import { DetailFilter } from '@/store/detailFilter';
import { SYSTEM } from '@/assets/icons/System';
import { Situation } from '@/types/event';
import { convertToPriceFormat } from '@/utils/convertPriceFormat';
import { USER } from '@/assets/icons/User';

type Props = {
  detailFilter: DetailFilter;
  setDetailFilter: Dispatch<SetStateAction<DetailFilter>>;
  totalAmount: number;
};

const SITUATION_FILTER: Situation[] = ['미납', '완납', '확인중'];

const FilterController = ({ detailFilter, setDetailFilter, totalAmount }: Props) => {
  const updateSituationFilter = (situation: Situation) => {
    if (detailFilter.situation === situation) {
      return setDetailFilter((prev) => ({ ...prev, situation: '' }));
    }
    setDetailFilter((prev) => ({ ...prev, situation }));
  };

  return (
    <Style.FilterContainer>
      <Style.LeftContainer>
        <Style.ButtonContainer>
          {SITUATION_FILTER.map((buttonText) => {
            return (
              <Style.SituationButton
                onClick={() => updateSituationFilter(buttonText)} //
                isActive={detailFilter.situation === buttonText}
              >
                {buttonText}
              </Style.SituationButton>
            );
          })}
        </Style.ButtonContainer>
        <Style.SearchContainer>
          <Style.Icon_LG>{SYSTEM.SEARCH}</Style.Icon_LG>
          {Boolean(detailFilter.nickname) ? (
            <Style.SelectedMember>
              <Style.Icon_SM>{USER.PERSON_SM}</Style.Icon_SM>
              <span>{detailFilter.nickname}</span>
              <Style.Icon_SM>{SYSTEM.CLOSE_SM}</Style.Icon_SM>
            </Style.SelectedMember> //
          ) : (
            <Style.SearchBar type="text" placeholder="팀원을 검색해주세요." />
          )}
        </Style.SearchContainer>
      </Style.LeftContainer>
      <Style.AmountContainer>
        <div>합계</div>
        <Style.Amount>{convertToPriceFormat(totalAmount)}</Style.Amount>
      </Style.AmountContainer>
    </Style.FilterContainer>
  );
};

export default FilterController;
