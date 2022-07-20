import { useCallback, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
// stomp
import stompJS from "stompjs";
import sockJS from "sockjs-client";
// cookies
import { getCookie } from "../shared/Cookies";
// apis
import apis from "../shared/api/apis";

const WaitingRoom = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [waitingUsers, setWaitingUsers] = useState<any>();
  const navigate = useNavigate();
  const { roomId } = useParams();
  const socket = new sockJS(`${API_URL}SufficientAmountOfAlcohol`);
  const stompClient = stompJS.over(socket);
  const accessToken = getCookie("token");
  const accessId = getCookie("id");
  const queryClient = useQueryClient();

  // mutate
  const { mutate: joinRoom } = useMutation(apis.joinRoomMT, {
    onSuccess: (res) => {
      console.log(res);
      queryClient.invalidateQueries(["room_list"]);
    },
    onError: (error) => {
      console.log(error);
      navigate("/lobby");
    },
  });
  const { mutate: leaveRoom } = useMutation(apis.leaveRoomMT, {
    onSuccess: (res) => {
      console.log(res);
      queryClient.invalidateQueries(["room_list"]);
      navigate("/lobby");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // leaveHandler
  const leaveHandler = useCallback(() => {
    leaveRoom({ roomId: roomId, id: accessId });
  }, [leaveRoom, roomId, accessId]);

  // 방 접속 포스트 요청
  useEffect(() => {
    joinRoom({ roomId: roomId, id: accessId });
  }, [joinRoom, roomId, accessId]);

  // 구독
  useEffect(() => {
    socketSubscribe();
    return () => {
      socketUnsubscribe();
    };
  }, []);

  // /* function Subscribe */
  const socketSubscribe = useCallback(() => {
    try {
      stompClient.connect(
        {
          token: accessToken,
          id: accessId,
        },
        () => {
          stompClient.subscribe(
            `/sub/game/${roomId}`,
            (data: any) => {
              const response = JSON.parse(data?.body);
              const res = JSON.parse(response?.content);
              console.log(res);
              setWaitingUsers(res?.userList);
            },
            { token: accessToken }
          );
          joinRoomMessage();
        }
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

  const socketUnsubscribe = useCallback(() => {
    try {
      stompClient.unsubscribe(`/sub/game/${roomId}`);
      console.log("success to unsubscribe");
    } catch (error) {
      console.log(error);
    }
  }, []);

  const joinRoomMessage = () => {
    const data = {
      type: "UPDATE",
      roomId: roomId,
      sender: accessId,
      content: null,
    };
    stompClient.send(`/pub/game/${roomId}`, {}, JSON.stringify(data));
  };

  const gameReady = () => {
    const data = {
      type: "UPDATE",
      roomId: roomId,
      sender: accessId,
      content: null,
    };
    stompClient.send(`/pub/game/${roomId}`, {}, JSON.stringify(data));
  };

  const readyHandler = () => {
    gameReady();
  };

  return (
    <div>
      웨이팅룸입니다.
      {waitingUsers && (
        <>
          <div>
            <span>1팀</span>
            <br />
            {waitingUsers[0] ? (
              <div>
                <span>{waitingUsers[0].id}</span>
                <span>{waitingUsers[0].nickname}</span>
              </div>
            ) : (
              <div>
                <span>유저 없음</span>
              </div>
            )}
            <br />
            {waitingUsers[2] ? (
              <div>
                <span>{waitingUsers[2].id}</span>
                <span>{waitingUsers[2].nickname}</span>
              </div>
            ) : (
              <div>
                <span>유저 없음</span>
              </div>
            )}
          </div>
          <br />
          <div>
            <span>2팀</span>
            <br />
            {waitingUsers[1] ? (
              <div>
                <span>{waitingUsers[1].id}</span>{" "}
                <span>{waitingUsers[1].nickname}</span>
              </div>
            ) : (
              <div>
                <span>유저 없음</span>
              </div>
            )}
            <br />
            {waitingUsers[3] ? (
              <div>
                <span>{waitingUsers[3].id}</span>
                <span>{waitingUsers[3].nickname}</span>
              </div>
            ) : (
              <div>
                <span>유저 없음</span>
              </div>
            )}
          </div>
        </>
      )}
      <button onClick={readyHandler}>준비완료</button>
      <button onClick={leaveHandler}>방에서 나가기</button>
    </div>
  );
};

export default WaitingRoom;
