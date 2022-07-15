## ✨ 프로젝트 소개

- 술에 만취한 마법사들이 주점에서 시비가 붙었어요. 이러라고 배운 마법은 아니지만 주점에서 치열한 2:2 마법 카드 대전을 벌이세요!

* [Drunken Wizard 바로가기] // 배포예정

### 🧙 드렁큰 위자드 🍻

![img](./src/images/readme/bg.png)

### 📆 프로젝트 기간

2022/06/24 ~ 2022/07/16 (중간발표)

### 🏗 서비스 아키텍쳐

![img](./src/images/readme/architecture.png)

<details>
<summary>💖 Front-end </summary>

#### React + Typescript

<li>자바스크립트 라이브러리인 리액트를 중심으로 개발</li>
<li>Typescript : 컴파일 단계에서 타입 관련 에러를 막을 수 있으며, 크로스 브라우징(브라우저 호환성) 문제 해결</li>

#### Redux Toolkit

<li>Ingame 페이지에서 관리해야하는 상태가 많아지고 구조가 복잡해지면서 상태관리 시 props 사용이 부담스러웠고, state 갱신에 관한 에러를 방지하기 위해 Redux를 사용
<li>Redux Toolkit을 사용하면 Redux의 보일러 플레이트 코드가 줄고, redux devtool, immer, reselect 등의 라이브러리들이 내장되어 있어서 패키지 의존성을 줄여주기 때문에 Redux Tookit 사용을 결정</li>

#### Stomp & sockJS

<li> Java Spring과의 통신 및 webSocket 채팅 기능을 구현</li>
</details>

### 🎨 와이어 프레임

https://www.figma.com/file/OPlDwSHBgppHPfrDZBmtef/Untitled?node-id=259%3A2
https://www.figma.com/file/shuiI7skCdbrlCa7CElXDc/%ED%95%AD%ED%95%B47%EA%B8%B0_%EC%A3%BD%EC%96%B4%EC%84%9C%EA%B0%90%EB%8A%94%EB%88%88_Drunken-Wizard?node-id=0%3A1

### 💻 프론트엔드 기술 스택

<center>
<br/>
<div style="display: inline;">
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white">
<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/redux_toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white">
<img src="https://img.shields.io/badge/reactquery-61DAFB?style=for-the-badge&logo=reactquery&logoColor=FF4154">
</div>

<div style="display: inline;">
<img src="https://img.shields.io/badge/styled_components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">
<img src="https://img.shields.io/badge/axios-6236FF?style=for-the-badge&logo=axios&logoColor=white">
<img src="https://img.shields.io/badge/stompjs-010101?style=for-the-badge&logo=&logoColor=white">
<img src="https://img.shields.io/badge/sass-CC6699?style=for-the-badge&logo=sass&logoColor=white">
</div>

<div style="display: inline;">
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
</div>

<div style="display: inline;">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"></div>
</center>
<br>

### 🔧 주요 기능

<details>
<summary>🗨️ 게임 로비 실시간 채팅과 내 전적 확인하기!</summary>

<li>여러 유저가 함께 대화할 수 있도록 게임 로비에서 다대다 채팅을 구현했습니다.</li>
<li>나만의 게임 전적을 게임 로비화면에서 확인할 수 있습니다.</li>

</details>
<details>
<summary>🎮 게임방에 입장해, 내 팀을 정해보자!</summary>
  <li>유저는 게임방을 직접 개설할 수도 있고, 다른 유저가 만든 방에 입장해도 됩니다!</li>
  <li>원하는 팀을 선택해 게임을 플레이할 수도 있답니다! (구현예정)</li> 
</details>
<details>
<summary>🧙 실시간 2:2 마법사 카드 대전게임!</summary>
  <li>공격, 보조, 체력회복 등의 다양한 카드를 이용한 2:2 카드 게임을 구현했습니다.</li> 
  <li>각 캐릭터마다의 고유 특성이 있어, 직업에 따른 다양한 전략을 구상할 수 있습니다.</li> 
</details>

### 🔥 &nbsp;트러블슈팅

https://github.com/kordobby/drunken_wizard--frontend/issues

<hr/>

### 💖 About Front-end

#### 👪 &nbsp; 팀원

|   이름    |         깃허브 주소         |                            역할 분담                            |
| :-------: | :-------------------------: | :-------------------------------------------------------------: |
|  👧 이윤  | https://github.com/kordobby |                          인게임 페이지                          |
| 👦 김정욱 | https://github.com/junguk11 | 로그인/회원가입 페이지,<br/> 룰북 페이지<br/>로비/대기실 페이지 |
