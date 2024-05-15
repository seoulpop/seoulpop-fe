// ar 폰트 파일 관리
const FILE_PATH = '/assets/msdfs';

interface HeritageFont {
  [key: string]: string;
}

const HERITAGE_FONT: HeritageFont = {
  1: `${FILE_PATH}/multicampus.json`,
  2: `${FILE_PATH}/Gyeongbokgung.json`,
};

export default HERITAGE_FONT;
