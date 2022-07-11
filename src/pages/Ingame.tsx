/* Package */
import React, { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import stompJS from "stompjs";
import { useParams } from "react-router-dom";

/* Hooks */
import { useAppSelector, useAppDispatch } from "../hooks/tsHooks";

/* Modules */
import {
  setNowPlayerIdTK,
  setThisPlayerTK,
  setTeamPlayerTK,
  setEnemyPlayerATK,
  setEnemyPlayerBTK,
  setMyCardsTK,
  setNowPlayerTK,
  setCraveTK,
  addBonusCardTK,
  setSelectedCardsTK,
  setTimerTK,
} from "../redux/modules/ingameSlice";

/* Cookies */
import { getCookie } from "../Shared/Cookies";

/* Components */
import PlayerField from "../Components/IngameComponents/PlayerField/PlayerField";
import DrawModal from "../Components/IngameComponents/Modals/DrawModal";
import MainField from "../Components/IngameComponents/MainField/MainField";
import NoticeField from "../Components/IngameComponents/NoticeField/NoticeField";
import StartModal from "../Components/IngameComponents/Modals/StartModal";

/* CSS & SC */
import { StGameWrap } from "../Components/IngameComponents/InGameStyled";

const Ingame = () => {
  /* useState */
  // #GAME :: Turn Ctrl
  const [status, setStatus] = useState<string>("");

  // #DRAW-TURN :: Modal Ctrl
  const [drawModalOpen, setDrawModalOpen] = useState<boolean>(false);

  // #DRAW-TURN :: About Selecting Cards
  const [selectableCnt, setSelectableCnt] = useState<number>(0);
  const [selectableCard, setSelectableCard] = useState<any[]>([]);
  const [selectedCardName, setSelectedCardName] = useState<string>("");
  const [drawDisabled, setDrawDisabled] = useState<boolean>(false);

  // #DRAW-TURN :: Confirmed to Draw
  const [selectedCard, setSelectedCard] = useState<object[]>([]);

  // #ACTION-TURN :: About Selecting Cards & Targets
  const [selectUseCard, setSelectUseCard] = useState<any>("");
  const [findTargetGroup, setFindTargetGroup] = useState<string>("");
  const [selectTarget, setSelectTarget] = useState<number>(0); // DELETE!!

  // #ACTION-TURN :: Updated status
  const [update, setUpdate] = useState<any>([]);

  // #DRAW & ACTION-TURN :: About Used Cards
  const [cardCrave, setCardCrave] = useState<string>(""); // MAYBE DELETE!!

  /* tookit things */
  const dispatch = useAppDispatch();
  const playersData = useAppSelector((state) => state.game.players);
  const myCards = useAppSelector((state) => state.game.myCards);
  const nowPlayer = useAppSelector((state) => state.game.game.nowPlayer);
  const nowPlayerId = useAppSelector((state) => state.game.game.nowPlayerId);
  const cardTarget = useAppSelector((state) => state.game.game.targetPlayer);

  /* socket connect - token */
  const socket = new SockJS("http://13.124.63.214/SufficientAmountOfAlcohol");
  const stompClient = stompJS.over(socket);
  const accessToken = getCookie("token");
  const { roomid } = useParams();
  const myId = Number(getCookie("id"));

  useEffect(() => {
    socketSubscribe();
    return () => {
      socketUnsubscribe();
    };
  }, []);

  const socketUnsubscribe = React.useCallback(() => {
    try {
      stompClient.unsubscribe("sub-0");
      console.log("success to unsubscribe");
    } catch (error) {
      console.log(error);
    }
  }, []);

  const socketSubscribe = () => {
    stompClient.connect(
      {
        token: accessToken,
      },
      () => {
        stompClient.subscribe("/sub/game/1", (data: any) => {
          const response = JSON.parse(data.body);
          const msgType = response?.type;
          const msgData = JSON.parse(response?.content);
          const msgSender = response?.sender;
          const playersInfo = msgData.players;
          switch (msgType) {
            case "START":
              // #1 첫 번째 턴인 유저를 찾아 nowPlayer에 저장
              const findNowPlayer = playersInfo.filter(
                (value: any) => value.turnOrder === 1
              ); // 나중에 받는 데이터보고 타입 지정해주자***
              dispatch(setNowPlayerIdTK(findNowPlayer[0].playerId));
              dispatch(setNowPlayerTK(findNowPlayer[0].username));
              // #2 로그인 유저의 게임 정보 저장
              const myPlayerInfo = playersInfo.filter(
                (value: any) => value.playerId === myId
              );
              // toolkit
              dispatch(setThisPlayerTK(myPlayerInfo[0]));
              switch (myPlayerInfo[0].turnOrder) {
                case 1:
                  dispatch(
                    setTeamPlayerTK(
                      playersInfo.filter(
                        (value: any) => value.turnOrder === 3
                      )[0]
                    )
                  );
                  dispatch(
                    setEnemyPlayerATK(
                      playersInfo.filter(
                        (value: any) => value.turnOrder === 2
                      )[0]
                    )
                  );
                  dispatch(
                    setEnemyPlayerBTK(
                      playersInfo.filter(
                        (value: any) => value.turnOrder === 4
                      )[0]
                    )
                  );
                  break;
                case 2:
                  dispatch(
                    setTeamPlayerTK(
                      playersInfo.filter(
                        (value: any) => value.turnOrder === 4
                      )[0]
                    )
                  );
                  dispatch(
                    setEnemyPlayerATK(
                      playersInfo.filter(
                        (value: any) => value.turnOrder === 1
                      )[0]
                    )
                  );
                  dispatch(
                    setEnemyPlayerBTK(
                      playersInfo.filter(
                        (value: any) => value.turnOrder === 3
                      )[0]
                    )
                  );
                  break;
                case 3:
                  dispatch(
                    setTeamPlayerTK(
                      playersInfo.filter(
                        (value: any) => value.turnOrder === 1
                      )[0]
                    )
                  );
                  dispatch(
                    setEnemyPlayerATK(
                      playersInfo.filter(
                        (value: any) => value.turnOrder === 2
                      )[0]
                    )
                  );
                  dispatch(
                    setEnemyPlayerBTK(
                      playersInfo.filter(
                        (value: any) => value.turnOrder === 4
                      )[0]
                    )
                  );
                  break;
                case 4:
                  dispatch(
                    setTeamPlayerTK(
                      playersInfo.filter(
                        (value: any) => value.turnOrder === 2
                      )[0]
                    )
                  );
                  dispatch(
                    setEnemyPlayerATK(
                      playersInfo.filter(
                        (value: any) => value.turnOrder === 1
                      )[0]
                    )
                  );
                  dispatch(
                    setEnemyPlayerBTK(
                      playersInfo.filter(
                        (value: any) => value.turnOrder === 3
                      )[0]
                    )
                  );
                  break;
                default:
                  break;
              }
              setStatus("START");
              break;
            case "PRECHECK":
              // 여기는 나중에 작업할 예정 => 게임 종료 시 작업
              if (msgData.gameOver === true) {
              } else if (msgData.player.dead === true) {
                // 죽었을 때는 어떻게 할지? 논의 안해봄
                // setStatus("ENDTURN") or setStatus("DEAD") or ????
                // 디자이너님한테 죽었을 때 초상화 변화 여쭤보기
                setStatus("WAITING");
              } else if (msgSender === myId && msgData.player.dead === false) {
                // 만약 플레이어가 죽지 않았다면, 플레이어 스탯 업데이트하고 카드 드로우해도 되는지 확인
                dispatch(setThisPlayerTK(msgData.player));
                setStatus("PRECHECK");
              } else if (msgSender !== myId) {
                // 만약 이 플레이어가 현재 플레이어가 아니라면 대기
                setStatus("WAITING");
              }
              break;
            case "DRAW":
              if (msgSender === myId) {
                // 선택가능한 카드 수와 종류 저장
                setSelectableCard(msgData.cardDrawed);
                setSelectableCnt(msgData.selectable);
                setStatus("DRAW");
              }
              break;
            case "SELECT":
              ClearTimer();
              dispatch(setTimerTK(""));
              setDrawModalOpen(false);

              /* Clear */
              setSelectedCard([]);
              setSelectableCnt(0);
              setSelectedCardName("");
              setDrawDisabled(false);
              if (msgSender === myId && msgData.drawSuccess === true) {
                // 문구 띄워줘야하면 status 추가
                console.log(msgData.card);
                dispatch(addBonusCardTK(msgData.card));
                setStatus("DRAWSUCCESS");
                sendStompMsgFunc("1", myId, "TURNCHECK", null);
              } else if (msgSender === myId && msgData.drawSuccess === false) {
                // 문구 띄워줘야하면 status 추가
                dispatch(setCraveTK(msgData.card.cardName));
                sendStompMsgFunc("1", myId, "TURNCHECK", null);
              }
              break;
            case "TURNCHECK":
              ClearTimer();
              dispatch(setTimerTK(""));
              if (msgSender === myId) {
                dispatch(setTimerTK("action"));
                ActionTimer();
              }
              break;
            case "ENDDRAW":
              setDrawModalOpen(false);
              if (msgSender === myId) {
                sendStompMsgFunc("1", myId, "TURNCHECK", null);
              }
              break;
            case "USECARD":
              // 카드 셋팅
              setUpdate(msgData.players);
              setStatus("USECARD");
              break;
            case "ENDTURN":
              if (msgSender === myId) {
                dispatch(setThisPlayerTK(msgData.player));
              }
              ClearTimer();
              dispatch(setTimerTK(""));
              dispatch(setNowPlayerIdTK(msgData.nextPlayerId));
              setStatus("CHANGETURN");
              break;
            default:
              break;
          }
        });
      }
    );
  };

  useEffect(() => {
    switch (status) {
      case "READY":
        setTimeout(() => {
          sendStompMsgFunc("1", myId, "START", null);
        }, 3000);
        break;
      case "GREETING":
        setTimeout(() => {
          setStatus("START");
        }, 7000);
        break;
      case "WAITING":
        console.log("아직 내 턴이 아니옵니다.");
        break;
      case "START":
        if (nowPlayerId === playersData.thisPlayer.playerId) {
          sendStompMsgFunc("1", myId, "PRECHECK", null);
        } else {
          setStatus("WAITING");
        }
        break;
      case "PRECHECK":
        sendStompMsgFunc("1", myId, "DRAW", null);
        break;
      case "DRAW":
        setDrawModalOpen(true);
        setDrawDisabled(false);
        drawTimer();
        dispatch(setTimerTK("draw"));
        break;
      case "ACTION":
        setSelectedCard([]);
        break;
      case "USECARD":
        setStatus("USECARDSUCCESS");
        break;
      case "USECARDSUCCESS":
        const thisPlayer = update.filter(
          (value: any) =>
            Number(value.playerId) === Number(playersData.thisPlayer.playerId)
        );
        if (nowPlayerId === playersData.thisPlayer.playerId) {
          dispatch(setThisPlayerTK(thisPlayer[0]));
          dispatch(setMyCardsTK(thisPlayer[0].cardsOnHand));
        }
        const teamPlayer = update.filter(
          (value: any) => value.playerId === playersData.teamPlayer.playerId
        );
        const enemyA = update.filter(
          (value: any) => value.playerId === playersData.enemyPlayerA.playerId
        );
        const enemyB = update.filter(
          (value: any) => value.playerId === playersData.enemyPlayerB.playerId
        );
        if (teamPlayer[0] !== undefined) {
          dispatch(setTeamPlayerTK(teamPlayer[0]));
        }
        if (enemyA[0] !== undefined) {
          dispatch(setEnemyPlayerATK(enemyA[0]));
        }
        if (enemyB[0] !== undefined) {
          dispatch(setEnemyPlayerBTK(enemyB[0]));
        }
        setSelectTarget(0);
        setFindTargetGroup("");
        break;
      case "CHANGETURN":
        if (nowPlayerId === Number(playersData.thisPlayer.playerId)) {
          sendStompMsgFunc("1", myId, "PRECHECK", null);
        } else {
          setStatus("WAITING");
        }
        break;
      default:
        break;
    }
  }, [status]);

  // send stompMsg
  function waitForConnection(stompClient: stompJS.Client, callback: any) {
    setTimeout(function () {
      if (stompClient.ws.readyState === 1) {
        callback();
      } else {
        waitForConnection(stompClient, callback);
      }
    }, 1);
  }

  const sendStompMsgFunc = (
    roomId: string,
    sender: number,
    msgType: string,
    data: object | null
  ) => {
    waitForConnection(stompClient, function () {
      stompClient.send(
        "/pub/game/1",
        { token: accessToken },
        JSON.stringify({
          roomId: roomId,
          sender: sender,
          content: JSON.stringify(data),
          type: msgType,
        })
      );
    });
  };

  /* DRAW => SELECT */
  // 드로우할 카드 배열 만드는 함수
  const selectCardDrawTurnHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const newSelectedCard: any[] = [...selectedCard];
    const targetId = (event.target as HTMLButtonElement).id;
    const setNew = newSelectedCard.push(targetId);
    const removeDup = newSelectedCard.filter(
      (value, index) => newSelectedCard.indexOf(value) === index
    );
    setSelectedCard(removeDup);
  };

  // 드로우할 카드 취소하는 함수
  const cancelCardDrawTurnHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const newSelectedCard = [...selectedCard];
    const target = (event.target as HTMLButtonElement).id;
    const setNew = newSelectedCard.filter(
      (value) => Number(value) !== Number(target)
    );
    setSelectedCard(setNew);
  };

  /* TIMER */
  const timer: { current: NodeJS.Timeout | null } = useRef(null);

  const drawTimer = () => {
    timer.current = setTimeout(() => {
      setDrawModalOpen(false);
      sendStompMsgFunc("1", myId, "SELECT", null);
      alert("시간초과!");
    }, 10000);
  };

  const ActionTimer = () => {
    timer.current = setTimeout(() => {
      alert("시간초과!");
      sendStompMsgFunc("1", myId, "ENDTURN", null);
    }, 30000);
  };
  const ClearTimer = () => {
    console.log("된다");
    window.clearTimeout(timer.current || 0);
  };

  useEffect(() => {
    if (selectableCnt === selectedCard.length) {
      setDrawDisabled(true);
    } else {
      setDrawDisabled(false);
    }
  }, [selectedCard]);

  /* DRAW => SELECT :: Send StompMsg */
  const selectTurnController = () => {
    const cardsMaker = selectedCard.map(function (value: any) {
      const selectedCardsObj = { cardId: 0 };
      selectedCardsObj.cardId = Number(value);
      return selectedCardsObj;
    });
    const confirmDrawCards = selectedCard.map((value) =>
      selectableCard.find((elem) => Number(elem.cardId) === Number(value))
    );
    dispatch(setMyCardsTK(confirmDrawCards));
    const data = {
      selectedCards: cardsMaker,
    };
    sendStompMsgFunc("1", myId, "SELECT", data);
    setStatus("SELECT");
  };

  // TK 에서 가져올지 useState로 갈지 하나만 설정하기
  const selectUseCardHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const cardId = (event.target as HTMLButtonElement).id;
    const targetGroup = (event.target as HTMLButtonElement).className;
    const cardName = (event.target as HTMLButtonElement).name;
    setCardCrave(cardName);
    setSelectUseCard(Number(cardId));
    setSelectedCardsTK(Number(cardId));
    setFindTargetGroup(targetGroup);
    const targetName = (event.target as HTMLButtonElement).name;
    setSelectedCardName(targetName);
  };

  const sendUseCardHandler = () => {
    if (findTargetGroup === "SELECT" && cardTarget === 0) {
      alert("타겟을 설정해주세요!");
      return;
    }
    if (findTargetGroup === "SELECT") {
      const data = {
        targetPlayerId: Number(cardTarget),
        cardId: selectUseCard,
      };
      sendStompMsgFunc("1", myId, "USECARD", data);
    } else {
      const data = {
        targetPlayerId: null,
        cardId: selectUseCard,
      };
      sendStompMsgFunc("1", myId, "USECARD", data);
    }
    setFindTargetGroup("");
    setSelectedCardName("");
  };

  const selectDisCardHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const cardId = (event.target as HTMLButtonElement).id;
    const cardName = (event.target as HTMLButtonElement).name;
    dispatch(setCraveTK(cardName));
    const data = {
      cardId: Number(cardId),
    };
    sendStompMsgFunc("1", myId, "DISCARD", data);
    const myCardsSet = [...myCards];
    const updateCards = myCardsSet.filter(
      (value: any) => Number(value.cardId) !== Number(cardId)
    );
    dispatch(setMyCardsTK(updateCards));
    setFindTargetGroup("");
    setSelectUseCard("");
    setSelectTarget(0);
  };

  return (
    <>
      {status === "" && <StartModal setStatus={setStatus}></StartModal>}
      <StGameWrap>
        <NoticeField status={status}></NoticeField>
        <MainField></MainField>
        <PlayerField
          setFindTargetGroup={setFindTargetGroup}
          findTargetGroup={findTargetGroup}
          selectUseCardHandler={selectUseCardHandler}
          sendUseCardHandler={sendUseCardHandler}
          selectDisCardHandler={selectDisCardHandler}
          setSelectTarget={setSelectTarget}
          sendStompMsgFunc={sendStompMsgFunc}
          selectedCardName={selectedCardName}
        ></PlayerField>
        {drawModalOpen && (
          <DrawModal
            id={0}
            selectCardDrawTurnHandler={selectCardDrawTurnHandler}
            cancelCardDrawTurnHandler={cancelCardDrawTurnHandler}
            selectTurnController={selectTurnController}
            selectedCard={selectedCard}
            selectableCard={selectableCard}
            drawDisabled={drawDisabled}
            setDrawModalOpen={setDrawModalOpen}
          ></DrawModal>
        )}
        <button
          onClick={() => {
            sendStompMsgFunc("1", myId, "ENDGAME", null);
          }}
        >
          게임 종료
        </button>
      </StGameWrap>
    </>
  );
};
export default Ingame;
