import { ARROW } from '@/assets/icons/Arrow';
import useDropDown from '@/hooks/useDropDown';
import TimeBottomSheet from '@/m-components/BottomSheet/TimeBottomeSheet';
import { NotificationInfo } from '@/types/group';
import { convertDateFormat, convertTimeFormat, covertDateForView } from '@/utils/convertFormat';
import { padStart } from '@/utils/padStart';
import { ChangeEvent, useState } from 'react';
import { isMobile } from 'react-device-detect';
import * as Style from './styles';
import MobileMiniCalendar from '@/m-components/MobileMiniCalendar';
import useLockScroll from '@/hooks/useLockScroll';

export const TIME_LIST = Array.from({ length: 48 }, (v, i) => {
  const hour = padStart(Math.floor(i / 2));
  const minute = padStart((i % 2) * 30);
  return `${hour}:${minute}`;
});

const DATE_UNIT = {
  M: '개월 마다',
  W: '주 마다',
  D: '일 마다',
};

type Props = {
  notificationForm: NotificationInfo;
  isErrorField: (field: keyof NotificationInfo) => boolean;
  handleNotificationForm: <T extends keyof NotificationInfo>(type: T, value: NotificationInfo[T]) => void;
};

const CommonForm = ({ notificationForm, handleNotificationForm, isErrorField }: Props) => {
  const { dropDownRef, openDrop, setOpenDrop } = useDropDown();

  useLockScroll(openDrop && isMobile);
  const [openCalendar, setOpenCalendar] = useState(false);

  const handleOpenDrop = () => {
    setOpenDrop((prev) => !prev);
  };

  const handleNotificationStartDate = (e: ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value.replaceAll(/\./g, '');
    if (!Number.isNaN(Number(date)) && date.length < 9) {
      handleNotificationForm('startDate', convertDateFormat(date));
    }
  };

  const handleNotificationRepeatCycle = (e: ChangeEvent<HTMLInputElement>) => {
    if (Number.isNaN(Number(e.target.value))) return;
    if (Number(e.target.value) > 100) return handleNotificationForm('repeatCycle', 100);
    handleNotificationForm('repeatCycle', Number(e.target.value));
  };

  const handleNotificationSendTime = (time: string) => {
    handleNotificationForm('sendTime', time);
    setOpenDrop(false);
  };

  const handleOpenCalendar = () => {
    setOpenCalendar((prev) => !prev);
  };
  console.log(notificationForm.startDate);

  return (
    <>
      <Style.CommonContainer>
        <Style.CommonTitle>반복 주기</Style.CommonTitle>
        <Style.CommonBlock>
          <Style.CommonInput //
            type="text"
            isError={isErrorField('repeatCycle')}
            value={Number(notificationForm.repeatCycle)}
            onChange={handleNotificationRepeatCycle}
          />
          <Style.Body>{DATE_UNIT[notificationForm.settingType]}</Style.Body>
        </Style.CommonBlock>
      </Style.CommonContainer>
      <Style.CommonContainer>
        <Style.CommonTitle>시작일</Style.CommonTitle>
        <Style.CommonBlock>
          {isMobile ? (
            <Style.CommonDateBox //
              // isError={isErrorField('startDate')}
              onClick={handleOpenCalendar}
            >
              {covertDateForView(notificationForm.startDate)}
            </Style.CommonDateBox>
          ) : (
            <Style.CommonDateInput //
              type="text"
              isError={isErrorField('startDate')}
              value={covertDateForView(notificationForm.startDate)}
              onChange={handleNotificationStartDate}
            />
          )}

          <Style.Body>이후부터</Style.Body>
        </Style.CommonBlock>
      </Style.CommonContainer>
      <div style={{ height: '24px' }} />
      <Style.TabTitle>시간 설정</Style.TabTitle>
      <Style.CommonContainer>
        <Style.CommonTitle>알림시간</Style.CommonTitle>
        <div style={{ position: 'relative' }} ref={dropDownRef}>
          <Style.CommonDropBox onClick={handleOpenDrop}>
            {convertTimeFormat(notificationForm.sendTime)}
            {ARROW.DOWN_LG_NON_FOCUS}
          </Style.CommonDropBox>
          {openDrop && !isMobile && (
            <Style.CommonDropDown style={{ position: 'absolute' }}>
              {TIME_LIST.map((time) => {
                return (
                  <Style.CommonTime
                    key={time} //
                    onClick={() => handleNotificationSendTime(time)}
                  >
                    {convertTimeFormat(time)}
                  </Style.CommonTime>
                );
              })}
            </Style.CommonDropDown>
          )}
          {openDrop && isMobile && (
            <TimeBottomSheet //
              onClose={() => setOpenDrop(false)}
              onChange={handleNotificationSendTime}
            />
          )}
        </div>
      </Style.CommonContainer>
      {openCalendar && (
        <MobileMiniCalendar
          onClose={handleOpenCalendar}
          date={notificationForm.startDate}
          onChangeDate={(date) => {
            handleNotificationForm('startDate', date);
          }}
        />
      )}
    </>
  );
};

export default CommonForm;
