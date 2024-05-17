/** @jsxImportSource @emotion/react */
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
import { HEADER_HEIGHT, TABBAR_HEIGHT } from '@/constants/components';
import useAtlases from '@/hooks/server/useAtlases';
import { BORDER_RADIUS, FONT_SIZE, Z_INDEX } from '@/styles/common';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, hasRefreshToken, reissueAccessToken } from '@/utils/auth';
import LoginModal from '@/components/LoginModal';

const Container = styled.div`
  margin: ${HEADER_HEIGHT + 1.6}rem 1.6rem ${TABBAR_HEIGHT + 1.6}rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const TabArea = styled.div`
  display: flex;
  gap: 2rem;
`;

const tabStyle = (category: string, currentCategory: string) => css`
  color: ${category === currentCategory ? 'var(--black)' : 'var(--gray)'};
  position: relative;
  display: inline;
  font-family: Pretendard;
  font-size: ${FONT_SIZE.md};
  font-weight: bold;

  &::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    display: inline;
    width: ${category === currentCategory ? '100%' : '0%'};
    height: 2px;
    background-color: var(--black);
  }
`;

const Gauge = styled.div`
  width: 100%;
  height: 2rem;
  background-color: var(--lightgray);
  border-radius: ${BORDER_RADIUS.circle};
  margin-bottom: 1.8rem;
`;

const GaugePoint = (percentage: number) => css`
  width: ${percentage}%;
  height: 2rem;
  background-color: var(--primary);
  border-radius: ${BORDER_RADIUS.circle};
  z-index: ${Z_INDEX.float};
`;

const Percentage = styled.div`
  margin-top: 0.8rem;
  color: var(--primary);
  text-align: right;
`;

const CollectionArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.6rem;
`;

const Collection = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const heritageImageStyle = (visited: boolean) => css`
  width: 100%;
  aspect-ratio: 1;
  border: 1px solid var(--lightergray);
  padding: 0.8rem;
  border-radius: ${BORDER_RADIUS.sm};
  filter: ${visited ? 'grayscale(0)' : 'grayscale(1)'};
`;

const CollectionPage = () => {
  const navigate = useNavigate();
  const { atlasesData, isAtlasesLoading } = useAtlases();
  const [currentCategory, setCurrentCategory] = useState<
    '전체' | '문화재' | '6·25전쟁' | '3·1운동'
  >('전체');
  const totalData = atlasesData?.filter(
    ({ historyCategory }) => historyCategory === currentCategory || currentCategory === '전체',
  );
  const gauge = atlasesData?.filter(
    ({ historyCategory, visited }) =>
      (historyCategory === currentCategory || currentCategory === '전체') && visited,
  );

  const changeTab = (category: '전체' | '문화재' | '6·25전쟁' | '3·1운동') => {
    setCurrentCategory(category);
  };
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalSubMessage, setModalSubMessage] = useState('');

  const REST_API_KEY = import.meta.env.VITE_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const loginUri = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleConfirm = () => {
    window.location.href = loginUri; // 로그인 페이지로 이동
  };

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated()) {
        if (!hasRefreshToken()) {
          setModalMessage('로그인이 필요한 서비스입니다.');
          setModalSubMessage('로그인 하시겠습니까?');
          setShowModal(true);
          return;
        }
        try {
          await reissueAccessToken();
        } catch (error) {
          setModalMessage('세션이 만료되었습니다');
          setModalSubMessage('로그인 하시겠습니까?');
          setShowModal(true);
        }
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <>
      {showModal && (
        <LoginModal
          message={modalMessage}
          subMessage={modalSubMessage}
          onConfirm={() => handleConfirm()}
          onClose={() => navigate('/')}
        />
      )}
      <Header pageName='도감' />
      <Container>
        <TabArea>
          <button
            css={tabStyle('전체', currentCategory)}
            type='button'
            onClick={() => changeTab('전체')}
          >
            전체
          </button>
          <button
            css={tabStyle('문화재', currentCategory)}
            type='button'
            onClick={() => changeTab('문화재')}
          >
            문화재
          </button>
          <button
            css={tabStyle('6·25전쟁', currentCategory)}
            type='button'
            onClick={() => changeTab('6·25전쟁')}
          >
            6·25전쟁
          </button>
          <button
            css={tabStyle('3·1운동', currentCategory)}
            type='button'
            onClick={() => changeTab('3·1운동')}
          >
            3·1운동
          </button>
        </TabArea>
        <Gauge>
          <div
            css={GaugePoint(
              gauge && totalData ? Math.round((gauge.length / totalData.length) * 100) : 0,
            )}
          />
          <Percentage>
            {gauge && totalData ? Math.round((gauge.length / totalData.length) * 100) : 0}%
          </Percentage>
        </Gauge>
        <CollectionArea>
          {!isAtlasesLoading &&
            totalData?.map(
              ({ historyId, historyCategory, historyName, heritageImgUrl, visited }) => {
                return (
                  <Collection
                    key={historyId}
                    onClick={() => {
                      if (visited)
                        navigate(
                          `/${historyCategory === '문화재' ? 'heritage' : 'site'}/detail/${historyId}`,
                        );
                    }}
                  >
                    <img css={heritageImageStyle(visited)} src={heritageImgUrl} alt={historyName} />
                    <div>{visited ? historyName : '????'}</div>
                  </Collection>
                );
              },
            )}
        </CollectionArea>
      </Container>
      <TabBar />
    </>
  );
};

export default CollectionPage;
