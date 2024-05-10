import { AutoPlay } from '@egjs/flicking-plugins';
import '@egjs/flicking-plugins/dist/arrow.css';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';

import useHistoryDetail from '@/hooks/server/useHistoryDetail';
import { FONT_SIZE } from '@/styles/common';
import { SiteInfo } from '@/types/history';
import ImageCarousel from '@/containers/History/ImageCarousel';

import KakaoMap from '@/components/History/KakaoMap';

const Container = styled.div`
  max-width: 90%;
  margin: 0 auto;
  padding: 0.2rem;
`;

const HeaderTitle = styled.div`
  font-size: ${FONT_SIZE.xl};
  font-weight: bold;
  border-bottom: 0.2rem solid #ccc;
  padding-bottom: 1rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const BigTitle = styled.div`
  font-size: ${FONT_SIZE.xxxl};
  font-weight: bold;
  margin: 1rem;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  height: auto;
  border-radius: 2%;
  object-fit: cover;
  display: block;
  margin: auto;
  margin-bottom: 2rem;
`;

const MediumTitle = styled.div`
  font-size: ${FONT_SIZE.xxl};
  font-weight: bold;
  margin: 1rem;
`;

const SmallTitle = styled.div`
  font-size: ${FONT_SIZE.md};
  font-weight: bold;
  margin-right: 0.9rem;
`;

const AddressBox = styled.div`
  margin: 1rem;
  display: flex;
  flex-direction: row;
`;

const Address = styled.div`
  font-size: ${FONT_SIZE.md};
  margin: 1rem;
`;

const Marker = styled.img`
  width: 1.3rem;
  height: 1.6rem;
  display: block;
  margin: auto 0 auto;
  margin-right: 0.2rem;
`;

const Status = styled.div`
  font-size: ${FONT_SIZE.md};
  margin: 1rem;
  display: flex;
  flex-direction: row;
`;

const Text = styled.div`
  font-size: ${FONT_SIZE.md};
  margin: 1rem;
  padding: 0.2rem;
  letter-spacing: 0.03rem;
  margin-bottom: 2.5rem;
  line-height: 1.6;
  white-space: pre-wrap;
`;

const SiteDetail = () => {
  const { historyId } = useParams();
  const { historyDetailData } = useHistoryDetail(historyId ? +historyId : 1);
  console.log(historyDetailData);
  const data: SiteInfo = historyDetailData as SiteInfo;
  const plugin = [new AutoPlay({ duration: 4000, direction: 'NEXT', stopOnHover: false })];

  if (!data) return null;

  let markerImgSrc = '/assets/images/siteMarker6.25.png';
  if (data.category === '3·1운동') markerImgSrc = '/assets/images/siteMarker3.1.png';

  return (
    <Container>
      <HeaderTitle>사적지 정보</HeaderTitle>
      <BigTitle>{data.name}</BigTitle>
      <AddressBox>
        <Marker src='/assets/images/placeMarker.png' alt='마커이미지' />
        <Address>
          {data.address} <br />
          (구) {data.historicAddress}
        </Address>
      </AddressBox>
      <Status>
        <SmallTitle> 상태 </SmallTitle>
        {data.status}
      </Status>
      <StyledImage src={data.thumbnail} alt={data.name} />
      <MediumTitle>요약</MediumTitle>
      <Text>{data.summary}</Text>
      <MediumTitle>설명</MediumTitle>
      <Text>{data.description}</Text>
      <MediumTitle>참고문헌</MediumTitle>
      <Text>{data.reference}</Text>
      <ImageCarousel images={data.images} pluginOptions={plugin} />
      <MediumTitle>위치</MediumTitle>
      <KakaoMap markerLat={data.lat} markerLng={data.lng} imageSrc={markerImgSrc} />
    </Container>
  );
};

export default SiteDetail;
