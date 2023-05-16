export const WITHDRAWAL_REASON = [
  { title: '서비스를 잘 이용하지 않아서', wording: 'notusing' },
  { title: '내가 생각한 서비스가 아니라서', wording: 'notservice' },
  { title: '사용하기 불편해서', wording: 'inconvenient' },
  { title: '사용할 수 있는 기능이 부족해서', wording: 'lackfeatures' },
  { title: '새 계정을 만들고 싶어서', wording: 'newaccount' },
  { title: '서비스 사용 중 에러가 잦아서', wording: 'errors' },
  { title: '기타 / 해당 사항 없음', wording: 'none' },
];

export const WITHDRAWAL_HEADER = {
  CONFIRM: '소심한 총무를 탈퇴하시려면,\n아래 내용을 꼭 확인해 주세요!',
  REASON: '소심한 총무를 떠나시는\n이유를 말씀해 주세요.',
  CONFIRM_DESC: '남겨주신 소중한 의견은 서비스 개선에 반영하겠습니다.',
};

export const WITHDRWWAL_LIST = [
  {
    title: '회원 탈퇴 시, 참여하고 있는 모든 모임에서 자동으로 탈퇴되며\n기존에 등록된 자신의 벌금 내역은 삭제되지 않습니다.',
    desc: ['모임 내 총무라면,\n회원 탈퇴 전 벌금 내역 수정 및 삭제를 진행해 주세요.', '모임 내 팀원이라면,\n회원 탈퇴 전 총무에게 벌금 내역 수정 및 삭제를 요청해 주세요.'],
  },
  { title: '모임 내 팀원이 있는 경우, 총무는 회원 탈퇴를 할 수 없습니다.\n모임의 총무라면 탈퇴 전 다름 팀원에게 총무 권한을 넘겨주세요.' },
];

export const WITHDRAWAL_MODAL = {
  FINAL: {
    title: '회원 탈퇴',
    desc: '소심한 총무 회원 탈퇴를 완료하시겠습니까?\n회원 탈퇴 완료 후, 취소가 불가능합니다.',
  },
  HAS_ADMIM: {
    title: '알림',
    desc: '모임 내 팀원이 있는 경우,\n총무는 회원 탈퇴를 할 수 없습니다.\n다른 팀원에게 총무 권한을 넘겨주세요.',
  },
};
