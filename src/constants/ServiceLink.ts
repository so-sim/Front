import { GA } from './GA';

export const TOS_LINK = {
  TERMS: 'https://www.notion.so/10e0ec59f6564133a9efbcf37e0c2c5a?pvs=4',
  PRIVACY: 'https://www.notion.so/10fd6054e69e4cdbb5e83548fce6f2d0?pvs=4',
};

export const GNB_LINK = {
  SERVICE: 'https://www.notion.so/25348117c25b4403842ed533f388179c?pvs=4',
  FAQ: 'https://www.notion.so/83ac133c02f2454fb4f6787aef123ce6?pvs=4',
  SUGGEST: 'https://forms.gle/V7ArjjrinyyHkvzT7',
};

export const GNBLinkList = [
  { title: '서비스 소개', href: GNB_LINK.SERVICE, id: GA.INTRODUCTION },
  { title: '의견 남기기', href: GNB_LINK.SUGGEST, id: GA.FEEDBACK },
  { title: '이용 가이드', href: GNB_LINK.FAQ, id: GA.GUIDE },
];

export const FOOTER_LINK = {
  TERMS: 'https://www.notion.so/10e0ec59f6564133a9efbcf37e0c2c5a?pvs=4',
  PRIVACY: 'https://www.notion.so/e41fced998d24fdda770ea8f7274fb7b?pvs=4',
};

export type TOS = {
  id: number;
  title: string;
  href: string;
  required: boolean;
};

export const TOSList: TOS[] = [
  { id: 1, title: '개인정보수집 동의', href: TOS_LINK.PRIVACY, required: true },
  { id: 2, title: '이용약관 동의', href: TOS_LINK.TERMS, required: true },
];
