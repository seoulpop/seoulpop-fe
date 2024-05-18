import styled from '@emotion/styled';

import PC_LAYOUT, { MOBILE_MIN_WIDTH } from '@/constants/pcLayout';

// TODO: 스크립트로 처리

const PcBackground = styled.div`
  display: none;

  @media screen and (min-width: ${MOBILE_MIN_WIDTH}px) {
    display: block;
    position: fixed;
    z-index: -1;

    width: 100%;
    height: 100vh;
    background: #e2ddff;
  }
`;

const PCContainer = styled.div`
  display: none;

  @media screen and (min-width: ${MOBILE_MIN_WIDTH}px) {
    display: block;
    position: fixed;
    left: calc(50vw - 52rem + ${PC_LAYOUT.OFFSET}rem);

    width: 52rem;

    color: var(--black);
    letter-spacing: -0.333px;

    h1.title {
      font-size: 16px;
    }

    .logo-wrapper {
      margin-top: 4.1rem;
      width: 28rem;
      height: 28rem;

      img {
        width: 100%;
      }
    }

    .title {
      margin: 3.6rem 3.6rem 0;

      font-size: 24px;
      font-weight: 600;
    }

    .desc {
      margin: 2.6rem 3.6rem 0;

      line-height: 1.4;
      font-size: 20px;
      font-weight: 400;
    }

    .link-container {
      margin: 10rem 3.6rem 0;

      font-size: 14px;
      font-weight: 600;

      p > span {
        color: var(--primary);
        font-weight: 800;
      }

      .link {
        display: flex;
        flex-direction: row;
        gap: 1.2rem;

        margin-top: 12px;

        .link-android {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;

          width: 16.2rem;
          height: 5.8rem;

          border-radius: 4px;
          background: var(--white);

          color: inherit;
          text-decoration: none;

          .logo {
            width: 54px;
            height: 30px;
            background: url('/assets/images/android.png') no-repeat center;
            background-size: contain;
          }
        }

        .qr {
          width: 5.8rem;
          height: 5.8rem;

          img {
            width: 100%;
          }
        }
      }
    }
  }
`;

export const PcContainer = () => {
  return (
    <>
      <PcBackground />
      <PCContainer>
        <h1 className='title'>서울팝</h1>
        <div className='logo-wrapper'>
          <img src='/assets/images/logo.png' alt='' />
        </div>
        <h1 className='title'>일상속에서 서울의 역사를 알아보세요!</h1>
        <p className='desc'>
          주변을 거닐며 역사적 지식을 탐구하고
          <br /> 카메라를 통해 과거의 모습을 생생하게 체험해보세요!
        </p>
        <div className='link-container'>
          <p>
            서울팝은 <span>안드로이드 12</span>부터 최적화되어 있습니다.
          </p>
          <div className='link'>
            <a
              className='link-android'
              href='https://drive.google.com/file/d/1V5Yt-i7uwTJR1bWPjYjYGDwHAtJvuK1D/view?usp=drive_link'
              target='_blank'
              rel='noreferrer'
            >
              <span className='logo' />
              <span>설치하러 가기</span>
            </a>
            <div className='qr'>
              <img src='/assets/images/seoul-pop-qr.png' alt='' />
            </div>
          </div>
        </div>
      </PCContainer>
    </>
  );
};
