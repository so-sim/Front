export type ConfirmModalType = keyof typeof CONFIRM_MODAL;

export const CONFIRM_MODAL = {
  LOGOUT: {
    title: '로그아웃',
    description: '로그아웃 하시겠습니까?',
    cancel: '취소',
    confirm: '로그아웃',
  },
  CHANGE_ADMIN: {
    title: '총무 넘기기',
    description: '총무 권한을 넘겨주시겠습니까?',
    cancel: '취소',
    confirm: '넘겨주기',
  },
  CHANGE_STATUS: {
    title: '납부여부 변경',
    description: '납부여부를 변경하시겠습니까?',
    cancel: '취소',
    confirm: '변경하기',
  },
  REQUEST_CHANGE_STATUS: {
    title: '납부여부 변경',
    description: `총무에게 확인 요청을 보내시겠습니까? \n 요청 후 변경이 불가능합니다.`,
    cancel: '취소',
    confirm: '요청하기',
  },
  GROUP_DELETE_NO_USER: {
    title: '모임 삭제',
    description: '모임을 삭제하시겠습니까?\n모임 삭제 시, 모임 내 모든 벌금 내역이 삭제되며\n복구가 불가능합니다.',
    cancel: '취소',
    confirm: '삭제하기',
  },
  GROUP_DELETE_HAS_USER: {
    title: '알림',
    description: '모임 내 다른 팀원이 있는 경우,\n모임을 삭제할 수 없습니다.',
    confirm: '확인',
  },
  GROUP_WITHDRAWAL_USER: {
    title: '모임 탈퇴',
    description: '모임에서 탈퇴하시겠습니까?\n모임 탈퇴 시, 자신의 벌금 내역은 삭제되지 않습니다.\n내역 삭제를 원하는 경우 총무에게 미리 요청해 주세요.',
    cancel: '취소',
    confirm: '모임 탈퇴',
  },
  GROUP_WITHDRAWAL_ADMIN_NO_USER: {
    title: '모임 탈퇴',
    description: '모임을 탈퇴하시겠습니까?\n모임에 다른 팀원이 없기 때문에\n모임이 자동으로 삭제됩니다.',
    cancel: '취소',
    confirm: '모임 탈퇴',
  },
  GROUP_WITHDRAWAL_ADMIN_HAS_USER: {
    title: '알림',
    description: '모임 내 팀원이 있는 경우,\n총무는 모임 탈퇴를 할 수 없습니다.\n다른 팀원에게 총무 권한을 넘겨주세요.',
    confirm: '확인',
  },
  WITHDRAWAL_FINAL: {
    title: '회원 탈퇴',
    description: '소심한 총무 회원 탈퇴를 완료하시겠습니까?\n회원 탈퇴 완료 후, 취소가 불가능합니다.',
    cancel: '취소',
    confirm: '회원 탈퇴',
  },
  WITHDRAWAL_HAS_ADMIN: {
    title: '알림',
    description: '모임 내 팀원이 있는 경우,\n총무는 회원 탈퇴를 할 수 없습니다.\n다른 팀원에게 총무 권한을 넘겨주세요.',
    confirm: '확인',
  },
  DETAIL_DELETE: {
    title: '내역 삭제',
    description: `벌금 내역을 삭제하시겠습니까? \n 삭제된 내역은 복구가 불가능합니다.`,
    cancel: '취소',
    confirm: '삭제하기',
  },
};
