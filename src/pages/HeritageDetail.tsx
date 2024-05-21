import { AutoPlay } from '@egjs/flicking-plugins';
import styled from '@emotion/styled';
import { ButtonHTMLAttributes, useState } from 'react';
import { useParams } from 'react-router-dom';

import ImageCarousel from '@/containers/History/ImageCarousel';
import useHistoryDetail from '@/hooks/server/useHistoryDetail';
import { BORDER_RADIUS, FONT_SIZE } from '@/styles/common';
import { HeritageInfo } from '@/types/history';

import DefaultLayout from '@/layouts/DetailLayout';
import {
  Address,
  AddressBox,
  BigTitle,
  Container,
  MediumTitle,
  SmallTitle,
  StyledImage,
  Text,
} from '@/components/Detail/style';
import Header from '@/components/Header';
import KakaoMap from '@/components/History/KakaoMap';

const TabButtonArea = styled.div`
  display: flex;
  height: 4rem;
  background: var(--lightergray);
  align-items: center;
  border-radius: ${BORDER_RADIUS.md};
`;

interface TabButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
}

const TabButton = styled.button<TabButtonProps>`
  background: ${({ isActive }) => (isActive ? 'var(--white)' : 'none')};
  color: ${({ isActive }) => (isActive ? 'var(--text-normal)' : 'var(--gray)')};
  border: 0.2rem solid ${({ isActive }) => (isActive ? 'var(--white)' : 'transparent')}; // 항상 테두리 존재
  border-radius: ${BORDER_RADIUS.sm};
  padding-bottom: 0.3rem;
  flex: 1 1 50%;
  height: 90%;
  cursor: pointer;
  margin: 0.3rem;
  font-size: ${FONT_SIZE.md};
  font-weight: bold;
`;

const Era = styled.div`
  font-size: ${FONT_SIZE.md};
  display: flex;
  flex-direction: row;
  margin: 1rem 0;
`;

const Marker = styled.img`
  width: 1.3rem;
  height: 1.6rem;
  display: block;
`;

const HeritageDetail = () => {
  const { historyId } = useParams();
  const { historyDetailData } = useHistoryDetail(historyId ? +historyId : 1);
  const data: HeritageInfo = historyDetailData as HeritageInfo;

  const [activeTab, setActiveTab] = useState('tab1');
  const nameFormatting = (name: string): string => name.replace(/\(.*\)/, '').trim();
  const plugin = [new AutoPlay({ duration: 4000, direction: 'NEXT', stopOnHover: false })];

  if (!data) return null;

  const showTab = data.additionalInfo !== null; // null로 바꿔줘야 함~

  return (
    <DefaultLayout>
      <Header pageName='문화재 정보' hasPrevious />
      <Container>
        <BigTitle>{nameFormatting(data.name)}</BigTitle>
        <AddressBox>
          <Marker src='/assets/images/placeMarker.png' alt='마커이미지' />
          <Address>{data.address}</Address>
        </AddressBox>
        <Era>
          <SmallTitle> 시대 </SmallTitle>
          {data.era}
        </Era>
        <StyledImage src={data.thumbnail} alt={data.name} />
        {showTab && (
          <TabButtonArea>
            <TabButton onClick={() => setActiveTab('tab1')} isActive={activeTab === 'tab1'}>
              문화재 설명
            </TabButton>
            <TabButton onClick={() => setActiveTab('tab2')} isActive={activeTab === 'tab2'}>
              안내판 설명
            </TabButton>
          </TabButtonArea>
        )}
        {!showTab && (
          <div>
            <MediumTitle>설명</MediumTitle>
            <Text>{data.description}</Text>
          </div>
        )}
        <div>
          {showTab && activeTab === 'tab1' && <Text>{data.description}</Text>}
          {showTab && activeTab === 'tab2' && <Text>{data.additionalInfo}</Text>}
        </div>
        <div>
          <ImageCarousel images={data.images} pluginOptions={plugin} />
        </div>
        <div>
          <MediumTitle>위치</MediumTitle>
          <KakaoMap
            markerLat={data.lat}
            markerLng={data.lng}
            imageSrc='/assets/images/heritageMarker.png'
          />
        </div>
      </Container>
    </DefaultLayout>
  );
};

export default HeritageDetail;
