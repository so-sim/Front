import { selectedDataReducer } from '@/components/@common/Modal/FineBookModal/reducer/selectedDataReducer';
import { EvnetId, Ground, SelectedEventInfo } from '@/types/event';
import React, { useReducer } from 'react';
import useSituationList, { SituationText } from '@/hooks/useSituationList';
import { useParticipantList } from '@/queries/Group';
import { useParams } from 'react-router-dom';
import { useCreateDetail, useUpdateDetail } from '@/queries/Detail';
import { initialSelectData } from '@/pages/FineBook/DetailFine';
import { ServerResponse } from '@/types/serverResponse';

export type FormFieldActions = {
  onInitForm: () => void;
  onChangeNickName: (nickname: string) => void;
  onChaneSituation: (situation: SituationText) => void;
  onChangeAmount: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDate: (date: string) => void;
  onChangeGround: (ground: Ground) => void;
  onChangeMemo: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  createDetail: () => Promise<ServerResponse<EvnetId>>;
  updateDetail: () => Promise<ServerResponse<EvnetId>>;
};

const useFinebook = (initialSelectData: SelectedEventInfo) => {
  const { groupId } = useParams();

  const [selectData, dispatch] = useReducer(selectedDataReducer, initialSelectData);

  const { data: participants } = useParticipantList(Number(groupId));

  const admin = { title: participants?.content.adminNickname as string };
  const participantList = participants?.content.nicknameList.map((nickname) => ({ title: nickname })) || [];
  const memberList = [admin, ...participantList];

  const { dropdownList, convertSituationToText, convertTextToSituation } = useSituationList(initialSelectData.situation);

  const filteredSituationList = dropdownList.filter((situation) => convertTextToSituation(situation) !== selectData.situation);

  const onChangeNickName = (nickname: string) => {
    dispatch({ type: 'NICKNAME', nickname });
  };

  const onChaneSituation = (situation: SituationText) => {
    dispatch({ type: 'SITUATION', situation: convertTextToSituation(situation) });
  };

  const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'AMOUNT', amount: e.target.value });
  };

  const onChangeDate = (date: string) => {
    dispatch({ type: 'DATE', date });
  };

  const onChangeGround = (ground: Ground) => {
    dispatch({ type: 'GROUND', ground });
  };

  const onChangeMemo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: 'MEMO', memo: e.target.value });
  };

  const onInitForm = () => {
    dispatch({ type: 'INIT', initialData: doNotInitProperty('nickname', 'memo') });
  };

  const { mutateAsync: create, isLoading: createLoading } = useCreateDetail();
  const { mutateAsync: update, isLoading: updateLoading } = useUpdateDetail();

  const createDetail = async () => {
    return create({ ...selectData, groupId: Number(groupId), date: selectData.date.replaceAll('-', '.') });
  };

  const updateDetail = async () => {
    return update(selectData);
  };

  const getFormFiledActions = (): FormFieldActions => {
    return {
      onInitForm,
      onChangeNickName,
      onChaneSituation,
      onChangeAmount,
      onChangeDate,
      onChangeGround,
      onChangeMemo,
      createDetail,
      updateDetail,
    };
  };

  return {
    createLoading,
    updateLoading,
    selectData,
    memberList,
    filteredSituationList,
    convertSituationToText,
    getFormFiledActions,
  };
};

export default useFinebook;

const doNotInitProperty = <K extends keyof SelectedEventInfo>(...arg: K[]) => {
  const newObj: Partial<SelectedEventInfo> = {};

  arg.forEach((key) => {
    newObj[key] = initialSelectData[key];
  });

  return newObj;
};
