import { AutoPlay } from '@egjs/flicking-plugins';
import '@egjs/flicking-plugins/dist/arrow.css';
import { useParams } from 'react-router-dom';

import ImageCarousel from '@/containers/History/ImageCarousel';
import useHistoryDetail from '@/hooks/server/useHistoryDetail';
import { SiteInfo } from '@/types/history';

import DefaultLayout from '@/layouts/DetailLayout';
import {
  Address,
  AddressBox,
  BigTitle,
  Container,
  MediumTitle,
  SmallTitle,
  Status,
  StyledImage,
  Text,
} from '@/components/Detail/style';
import Header from '@/components/Header';
import KakaoMap from '@/components/History/KakaoMap';

const SiteDetail = () => {
  const { historyId } = useParams();
  const { historyDetailData } = useHistoryDetail(historyId ? +historyId : 1);
  const data: SiteInfo = historyDetailData as SiteInfo;
  const plugin = [new AutoPlay({ duration: 4000, direction: 'NEXT', stopOnHover: false })];

  if (!data) return null;

  return (
    <DefaultLayout>
      <Header pageName='사적지 정보' hasPrevious />
      <Container>
        <BigTitle>{data.name}</BigTitle>
        <AddressBox>
          <img src='/assets/images/placeMarker.png' alt='마커이미지' width={15} height={20} />
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
        <div>
          <MediumTitle>요약</MediumTitle>
          <Text>{data.summary}</Text>
        </div>
        <div>
          <MediumTitle>설명</MediumTitle>
          <Text>{data.description}</Text>
        </div>
        <div>
          <MediumTitle>참고문헌</MediumTitle>
          <Text>{data.reference}</Text>
          <ImageCarousel images={data.images} pluginOptions={plugin} />
        </div>
        <div>
          <MediumTitle>위치</MediumTitle>
          <KakaoMap
            markerLat={data.lat}
            markerLng={data.lng}
            imageSrc={`/assets/images/${data.category}-false.webp`}
          />
        </div>
      </Container>
    </DefaultLayout>
  );
};

export default SiteDetail;
