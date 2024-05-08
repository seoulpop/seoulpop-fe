import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';

import useHistoryDetail from '@/hooks/server/useHistoryDetail';
import { FONT_SIZE, Z_INDEX } from '@/styles/common';

// size는 px 대신 rem으로 작성 (15px -> 1.5rem)
// base.ts에 색깔 변수 있음
// font-size, z-index, border-radius는 common.ts에 정의된 상수 사용
const ComponentName = styled.div`
  color: var(--primary);
  font-size: ${FONT_SIZE.lg};
  z-index: ${Z_INDEX.float};
`;

// http://localhost:5173/history/detail/1 로 접속해주세요
const HistoryDetail = () => {
  const { historyId } = useParams();
  // data 상세 정보는 화면에 있는 dev tool에서 확인 가능
  // 감사합니다람쥐
  const { historyDetailData } = useHistoryDetail(historyId ? +historyId : 1);
  console.log(historyDetailData);

  return <ComponentName>컴포넌트</ComponentName>;
};

export default HistoryDetail;
