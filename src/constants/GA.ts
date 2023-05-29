export type GATriggerId = keyof typeof GA;

export const GA = {
  INTRODUCTION: 'indroduction',
  FEEDBACK: 'feedback',
  GUIDE: 'guide',
  TODAY_LIST: 'today_list',
  MEMBER_SETTING: 'member_setting',
  CREATE: {
    MAIN_BUTTON: 'create_main_button',
    MAIN_MODAL: 'create_main_modal',
    SIDE_BUTTON: 'create_side_button',
    SIDE_MODAL: 'create_side_modal',
  },
  CALENDAR_SKIP: {
    ALL: 'calendar_skip_all',
    LEFT: 'calendar_skip_left',
    RIGHT: 'calendar_skip_right',
  },
  LIST_SKIP: {
    ALL: 'list_skip_all',
    LEFT: 'list_skip_left',
    RIGHT: 'list_skip_right',
  },
  ADD_LIST: {
    BUTTON: 'add_list_button',
    NORMAL: 'add_list_normal',
    KEEP: 'add_list_keep',
  },
  CON: {
    LIST_BUTTON: 'confirming_list_button',
    LIST_MODAL: 'confirming_list_modal',
    SIDE_BUTTON: 'confirming_side_button',
    SIDE_MODAL: 'confirming_side_modal',
  },
  NON: {
    LIST_BUTTON: 'nonpayment_list_button',
    LIST_MODAL: 'nonpayment_list_modal',
    SIDE_BUTTON: 'nonpayment_side_button',
  },
  FULL: {
    LIST_BUTTON: 'fullpayment_list_button',
    LIST_MODAL: 'fullpayment_list_modal',
    SIDE_BUTTON: 'fullpayment_side_button',
    SIDE_MODAL: 'fullpayment_side_modal',
  },
  FILTER: {
    MONTH: 'filter_month',
    DAY: 'filter_day',
    WEEK_DROP: 'filter_week_drop',
    PAYMENT_BUTTON: 'filter_payment_button',
    MEMBER_BUTTON: 'filter_member_button',
    MEMBER_DROP: 'filter_member_drop',
    FULL: 'filter_fullpayment',
    NON: 'filter_nonpayment',
    CON: 'filter_confirming',
  },
  INVITATION: {
    MODAL: 'invitation_modal',
    MEMBER: 'invitation_member',
  },
  TOSS_MANAGER: {
    BUTTON: 'toss_manager_button',
    MODAL: 'toss_manager_modal',
  },
  GROUP: {
    MODIFY: 'group_modify',
    SETTING: 'group_setting',
  },
};
