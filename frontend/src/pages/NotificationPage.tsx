/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { HEADER_HEIGHT, TABBAR_HEIGHT } from '@/constants/components';
import { NOTIFICATION_DATA_KEY } from '@/constants/notification';
import useNotifications from '@/hooks/server/useNotifications';

import Header from '@/components/Header';
import TabBar from '@/components/TabBar';

import { BORDER_RADIUS, FONT_SIZE } from '@/styles/common';
import { NotificationData } from '@/types/notification';
import DefaultLayout from '@/layouts/DetailLayout';

const NotificationWrapper = styled.div`
  padding-top: ${HEADER_HEIGHT + 1.6}rem;
  margin: 0 1.6rem ${TABBAR_HEIGHT + 1.6}rem;
  display: flex;
  gap: 1.6rem;
  flex-direction: column;
`;

const notificationStyle = (checked: boolean) => css`
  display: flex;
  padding: 1.6rem;
  gap: 1.6rem;
  overflow: scroll;
  align-items: center;
  background-color: ${checked ? 'var(--lightergray)' : 'var(--primary)'};
  color: ${checked ? 'var(--black)' : 'var(--white)'};
  border-radius: ${BORDER_RADIUS.md};

  > img {
    border: 1px solid var(--darkgray);
    border-radius: ${BORDER_RADIUS.circle};
    background-color: var(--white);
    padding: 0.5rem;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const HistoryName = styled.div`
  font-size: ${FONT_SIZE.md};
  font-weight: bold;
`;

const NoData = styled.div`
  text-align: center;
  line-height: calc(100svh - ${TABBAR_HEIGHT}rem - ${HEADER_HEIGHT}rem);
`;

const NotificationPage = () => {
  const { notificationsData } = useNotifications();

  const handleNotificationClick = (data: NotificationData) => {
    sessionStorage.setItem(NOTIFICATION_DATA_KEY, JSON.stringify(data));
    window.location.href = '/';
  };

  return (
    <DefaultLayout>
      <Header pageName='알림' />
      <NotificationWrapper>
        {notificationsData && notificationsData.length ? (
          notificationsData.reverse().map((data) => {
            return (
              <button
                css={notificationStyle(data.checked)}
                key={data.notificationId}
                type='button'
                onClick={() => handleNotificationClick(data)}
              >
                <img
                  src={`/assets/images/${data.historyCategory}.webp`}
                  alt=''
                  width={45}
                  height={45}
                />
                <Content>
                  <HistoryName>{data.historyName}</HistoryName>
                  <div>{data.body}</div>
                </Content>
              </button>
            );
          })
        ) : (
          <NoData>알림이 없습니다.</NoData>
        )}
      </NotificationWrapper>
      <TabBar />
    </DefaultLayout>
  );
};

export default NotificationPage;
