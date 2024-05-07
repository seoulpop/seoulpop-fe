import { Outlet } from 'react-router-dom';

// import useMediaQuery from '@/hooks/useMediaQuery';

// import NavBar from '@/components/NavBar';

const Root = () => {
  // const { isMobile } = useMediaQuery();

  return (
    <>
      <>
        <Outlet />
        {/* {isMobile && <NavBar isHide={isListShowed && scrollDirection.y === 'down'} />} */}
      </>
      {/* <Modal portalElementId='portal' isBottom={isMobile} blockScrollOnMount /> */}
    </>
  );
};

export default Root;
