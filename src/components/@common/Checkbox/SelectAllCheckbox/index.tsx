import CheckboxContainer from '..';
import { SelectedEventInfo } from '@/types/event';
import DetailListCheckBox from '@/components/DetailFine/checkbox';
import useCheckListState from '@/hooks/useCheckListState';

type Props = {
  details?: SelectedEventInfo[];
};

const SelectAllCheckbox = ({ details }: Props) => {
  const {
    setCheckDetailFine: { setMultipleTogglCheckList },
    isAllChecked,
  } = useCheckListState();

  const detailEventIdList = details?.map(({ eventId }) => eventId);

  return (
    <CheckboxContainer
      id={'checkedAll'}
      isChecked={isAllChecked(detailEventIdList) && details?.length! > 0}
      onChange={(event: React.MouseEvent<HTMLInputElement>) => setMultipleTogglCheckList(details, detailEventIdList)}
    >
      <CheckboxContainer.Checkbox as={DetailListCheckBox} />
    </CheckboxContainer>
  );
};

export default SelectAllCheckbox;
