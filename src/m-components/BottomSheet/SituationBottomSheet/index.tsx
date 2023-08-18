import { USER } from '@/assets/icons/User';
import { useParticipantList } from '@/queries/Group';
import { Situation } from '@/types/event';
import React from 'react';
import { useParams } from 'react-router-dom';
import BottomSheet from '..';

import * as Style from './styles';

type Props = {
  onClose: () => void;
  onChange: (value: Situation) => void;
};

const REQUEST_BUTTON: { [key in Situation]: string } = {
  미납: '납부 전',
  확인중: '확인 중',
  완납: '납부 완료',
};

const SituationBottomSheet = ({ onClose, onChange }: Props) => {
  const situationList: Situation[] = ['미납', '완납'];

  const handleSelectMember = (situation: Situation) => {
    onChange(situation);
    onClose();
  };

  return (
    <BottomSheet title="팀원" onClose={onClose}>
      <Style.SituationList>
        {situationList.map((situation) => (
          <Style.SituationListItem key={situation} onClick={() => handleSelectMember(situation)}>
            {REQUEST_BUTTON[situation]}
          </Style.SituationListItem>
        ))}
      </Style.SituationList>
    </BottomSheet>
  );
};

export default SituationBottomSheet;
