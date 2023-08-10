import useCheckedListState from '@/hooks/useCheckedListState';
import CheckboxContainer from '..';
import { SelectedEventInfo } from '@/types/event';
import DetailListCheckBox from '@/components/DetailFine/checkbox';

type Props = {
  details?: SelectedEventInfo[];
};

const SelectAllCheckbox = ({ details }: Props) => {
  const {
    setCheckedDetailFine: { setMultipleTogleCheckedList },
    isAllChecked,
  } = useCheckedListState();

  const detailEventIdList = details?.map(({ eventId }) => eventId);

  return (
    <CheckboxContainer
      id={'checkedAll'}
      isChecked={isAllChecked(detailEventIdList!) && details?.length! > 0}
      onChange={(event: React.MouseEvent<HTMLInputElement>) => setMultipleTogleCheckedList(detailEventIdList!)}
    >
      <CheckboxContainer.Checkbox as={DetailListCheckBox} />
    </CheckboxContainer>
  );
};

export default SelectAllCheckbox;
