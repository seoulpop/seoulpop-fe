import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { BackgroundRunner } from '@capacitor/background-runner';
import Button from '@/components/Button/index';

// import useMediaQuery from '@/hooks/useMediaQuery';

// import NavBar from '@/components/NavBar';

const Root = () => {
  // const { isMobile } = useMediaQuery();

  const init = async () => {
    try {
      const permissions = await BackgroundRunner.requestPermissions({
        apis: ['geolocation', 'notifications'],
      });
      console.log('init notifications: ', permissions);
    } catch (error) {
      console.log('init error: ', error);
    }
  };

  const loadCheckins = async () => {
    const result = await BackgroundRunner.dispatchEvent({
      label: 'com.ssafy.seoulpop.push',
      event: 'loadCheckins',
      details: {},
    });
    console.log('result: ', result);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <>
        <Outlet />
        <Button type='button' onClick={loadCheckins}>
          loadCheckins
        </Button>
        {/* {isMobile && <NavBar isHide={isListShowed && scrollDirection.y === 'down'} />} */}
      </>
      {/* <Modal portalElementId='portal' isBottom={isMobile} blockScrollOnMount /> */}
    </>
  );
};

export default Root;
