# 📌 간편한 벌금 관리의 시작, 소심한 총무
![KakaoTalk_Photo_2023-12-20-21-24-51](https://github.com/so-sim/front/assets/95389265/ef01c999-2b41-4b9b-922d-220ce655db6c)


동아리, 스터디 등 여러 모임을 운영할 때 빠질 수 없는 벌금!

그런데, 오히려 벌금 때문에 골머리를 앓고 계시지는 않나요?

벌금 관리 시 생기는 모든 불편함,

이제 소심한 총무에서 해결해보세요.


> 
> [👉 서비스 사용하러 가기](https://sosim-manager.com)

# 기능
- 벌금 템플릿
  - 장부형 벌금 관리 템플릿
  - 벌금 내역 필터링
  - 벌금 관리
  - 벌금 상세 관리
  - 납부 요청 기능
- 모임 관리
- 멤버
  - 멤버 관리
  - 총무 넘기기
  - 멤버 초대
  - 멤버 검색
- 벌금 알림
  - 알림 설정 (납부일, 반복 주기 설정)
  - SSE를 통한 알림 기능
- 카카오 로그인
  - access token, refresh token
- 모바일 반응형 및 적응형

# 프론트 아키텍쳐
![Web_App_Reference_Architecture_1](https://github.com/so-sim/front/assets/45344418/b563be64-3a1c-4d79-86ae-58aef84ccc42)


# 디렉터리 구조
```
src
 ┣ components
 ┃ ┣ @common
 ┃ ┣ 페이지 네이밍별 폴더
 ┃ ┣ ...
 ┃ 
 ┣ m-components 
 ┃ ┣ @common
 ┃ ┣ 페이지 네이밍별 폴더
 ┃ ┣ ...
 ┃ 
 ┣ pages
 ┃ ┣ 페이지 네이밍별 폴더
 ┃ ┣ ...
 ┃ 
 ┣ hooks
 ┃ ┣ @common
 ┃ ┣ 페이지 네이밍별 폴더
 ┃ ┣ ...
 ┃ 
 ┣ routes
 ┃ ┣ MobileRouter.tsx
 ┃ ┗ Router.tsx
 ┣ api (서버 도메인별 api요청 폴더)
 ┣ constants 
 ┣ mocks (mock up 서버용 폴더)
 ┣ store 
 ┣ styles
 ┣ types
 ┣ utils
```
