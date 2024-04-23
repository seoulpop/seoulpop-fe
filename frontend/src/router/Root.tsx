import { Outlet, ScrollRestoration } from 'react-router-dom';

// import useMediaQuery from '@/hooks/useMediaQuery';

// import NavBar from '@/components/NavBar';

const Root = () => {
  // const scrollDirection = useScrollDirection();

  // const { isMobile } = useMediaQuery();

  return (
    <>
      <>
        <Outlet />

        {/* {isMobile && <NavBar isHide={isListShowed && scrollDirection.y === 'down'} />} */}
      </>
      <ScrollRestoration />
      {/* <Modal portalElementId='portal' isBottom={isMobile} blockScrollOnMount /> */}
    </>
  );
};

export default Root;
