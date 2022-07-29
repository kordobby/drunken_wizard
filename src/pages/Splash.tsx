import { useState } from "react";

import {
  LogLogo,
  BackWrap,
  LeftBeerImg,
  RightBeerImg,
  BeerBgImg,
  Shadow,
  DarkBg,
} from "../Components/UserComponents/UserStyled";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toggleFullScreen } from "../hooks/fullScreen";
import { DefaultBtnL } from "../Components/Common/CommonStyle";
import PlayBtn from "../Components/Common/PlayBtn";
// import { Helmet } from "react-helmet";
import { Helmet, HelmetProvider } from "react-helmet-async";
const Splash = () => {
  const [clicked, setClicked] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (toggle) {
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    }
  }, [toggle]);

  const toggleFunc = () => {
    toggleFullScreen(document.body);
    setClicked(true);
    setTimeout(() => {
      setToggle(!toggle);
    }, 2000);
  };
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Welcome! Drunken Wizard</title>
        </Helmet>
      </HelmetProvider>
      <BackWrap>
        {toggle ? (
          <>
            {/* <DarkBg></DarkBg> */}
            <LogLogo top={5.729} bottom={4.6875}></LogLogo>
            <BeerBgImg></BeerBgImg>
            <RightBeerImg></RightBeerImg>
            <LeftBeerImg></LeftBeerImg>
            <Shadow></Shadow>
          </>
        ) : (
          <>
            <PlayBtn></PlayBtn>
            <LogLogo top={5.729} bottom={4.6875}></LogLogo>
            <DefaultBtnL disabled={clicked} onClick={toggleFunc}>
              입장하기
            </DefaultBtnL>
          </>
        )}
      </BackWrap>
    </>
  );
};

export default Splash;
