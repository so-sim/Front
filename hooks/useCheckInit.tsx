import React, { useEffect, useState } from 'react';

export const useCheckInit = (groupName: string, myName: string) => {
  const [isInit, setIsInit] = useState({
    groupName: true,
    myName: true,
  });

  useEffect(() => {
    if (groupName !== '' && isInit.groupName === true) setIsInit((prev) => ({ ...prev, groupName: false }));
    if (myName !== '' && isInit.myName === true) setIsInit((prev) => ({ ...prev, myName: false }));
  }, [groupName, myName]);

  return [isInit.groupName, isInit.myName];
};
