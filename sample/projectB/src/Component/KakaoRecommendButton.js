import React, { useEffect } from "react";
import { Button } from "@mui/material";

const KakaoRecommendButton = ({ description, buttonTitle, aroma }) => {
  const url = window.location.href;

  const initKakao = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init(process.env.REACT_APP_KAKAO_KEY);
      }
    }
  };

  useEffect(() => {
    initKakao();
  }, []);

  const recommendKakao = () => {
    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: `${aroma.name} 을(를) 추천합니다!`,
        description: description,
        imageUrl: aroma.imageUrl,
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      itemContent: {
        profileText: "SNU Traditional Aroma",
        profileImageUrl: "https://i.postimg.cc/DZHJfSnN/aroma-icon.png",
      },
      buttons: [
        {
          title: buttonTitle,
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      ],
    });
  };

  return (
    <Button
      style={{ color: "#000000", backgroundColor: "#f3dc04" }}
      onClick={recommendKakao}
    >
      카카오톡 공유하기
    </Button>
  );
};

export default KakaoRecommendButton;
