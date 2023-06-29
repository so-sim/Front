import { Dispatch, SetStateAction } from 'react';
import { DetailFilter } from '@/store/detailFilter';
import { SYSTEM } from '@/assets/icons/System';
import { Situation } from '@/types/event';
import { convertToPriceFormat } from '@/utils/convertPriceFormat';
import { USER } from '@/assets/icons/User';
import { AutoComplete } from './AutoComplete';
import * as Style from './styles';

type Props = {
  detailFilter: DetailFilter;
  setDetailFilter: Dispatch<SetStateAction<DetailFilter>>;
  totalAmount: number;
};

const SITUATION_FILTER: Situation[] = ['미납', '완납', '확인중'];

const FilterController = ({ detailFilter, setDetailFilter, totalAmount }: Props) => {
  const updateSituationFilter = (situation: Situation) => {
    const isSameSituationFilter = detailFilter.situation === situation;

    setDetailFilter((prev) => ({ ...prev, situation: isSameSituationFilter ? '' : situation }));
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
          <Style.Icon_LG>{SYSTEM.SEARCH_BLACK}</Style.Icon_LG>
          {Boolean(detailFilter.nickname) ? (
            <Style.SelectedMember>
              <Style.Icon_SM>{USER.PERSON_SM}</Style.Icon_SM>
              <span>{detailFilter.nickname}</span>
              <Style.Icon_SM>{SYSTEM.CLOSE_SM}</Style.Icon_SM>
            </Style.SelectedMember>
          ) : (
            <AutoComplete setDetailFilter={setDetailFilter} />
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
