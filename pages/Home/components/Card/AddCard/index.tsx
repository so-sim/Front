import React from 'react';
import { Card } from '..';
import { Plus } from '../../../../../assets/icons/System';
import { Add } from './style';

const AddCard = () => {
  return (
    <Card>
      <Add.Frame>
        <Plus />
        <Add.Text>모임 만들기</Add.Text>
      </Add.Frame>
    </Card>
  );
};

export default AddCard;
