export const GROUP_WITHDRWWAL_ADMIN = {
  NO_USER: { title: '모임 탈퇴', desc: '모임을 탈퇴하시겠습니까?\n모임에 다른 팀원이 없기 때문에\n모임이 자동으로 삭제됩니다.' },
  HAS_USER: { title: '알림', desc: '모임 내 팀원이 있는 경우,\n총무는 모임 탈퇴를 할 수 없습니다.\n다른 팀원에게 총무 권한을 넘겨주세요.' },
};

export const GROUP_WITHDRWWAL_USER = {
  titel: '모임 탈퇴',
  desc: '모임에서 탈퇴하시겠습니까?\n모임 탈퇴 시, 자신의 벌금 내역은 삭제되지 않습니다.\n내역 삭제를 원하는 경우 총무에게 미리 요청해 주세요.',
};

export const GROUP_DELETE = {
  HAS_USER: { title: '알림', desc: '모임 내 다른 팀원이 있는 경우,\n모임을 삭제할 수 없습니다.' },
  NO_USER: { title: '모임 삭제', desc: '모임을 삭제하시겠습니까?\n모임 삭제 시, 모임 내 모든 벌금 내역이 삭제되며\n복구가 불가능합니다.' },
};
