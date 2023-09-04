import { Button } from '@/components/@common';
import { TOSList } from '@/constants/ServiceLink';
import useSignUp from '@/hooks/Auth/useSignUp';
import { ARROW } from '../../assets/icons/Arrow';
import { LOGO } from '../../assets/icons/Logo';
import * as Style from './styles';

const TOS = () => {
  const {
    checkHandler, //
    allCheckHandler,
    isCheckedId,
    onSubmit,
    isAllChecked,
  } = useSignUp();

  return (
    <>
      <Style.Layout>
        {LOGO.LG}
        <Style.TOSContainer>
          <div style={{ marginBottom: '40px' }}>
            <Style.TOSTitle>약관 동의</Style.TOSTitle>
            <Style.TOSSubTitle>아래의 내용 확인 후 동의해 주세요.</Style.TOSSubTitle>
            <Style.TOSList>
              <Style.TOSWhole>
                <label>
                  <input type="checkbox" checked={isAllChecked} onClick={allCheckHandler} />
                  <span>전체 약관 모두 동의</span>
                </label>
              </Style.TOSWhole>
              {TOSList.map((list) => (
                <Style.TOS key={list.id}>
                  <label>
                    <input type="checkbox" checked={isCheckedId(list.id)} onChange={(event) => checkHandler(list, event)} />
                    <span>
                      {list.required ? '(필수)' : '(선택)'}
                      {list.title}
                    </span>
                  </label>
                  <Style.TOSLink href={list.href} target="_blank" rel="noopnner noreferrer">
                    {ARROW.RIGHT}
                  </Style.TOSLink>
                </Style.TOS>
              ))}
            </Style.TOSList>
          </div>
          <Style.TOSFooter>
            <Button //
              height="36px"
              width="60px"
              color={isAllChecked ? 'primary' : 'disabled'}
              onClick={onSubmit}
            >
              가입
            </Button>
          </Style.TOSFooter>
        </Style.TOSContainer>
      </Style.Layout>
    </>
  );
};

export default TOS;
