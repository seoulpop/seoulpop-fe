import { Link } from 'react-router-dom';

import DefaultLayout from '@/Layouts/DetailLayout';

const SettingPage = () => {
  return (
    <DefaultLayout>
      <Link to='/signin'>로그인하기</Link>
    </DefaultLayout>
  );
};

export default SettingPage;
