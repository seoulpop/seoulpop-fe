// ar 폰트 파일 관리
const FILE_PATH = '/assets/msdfs';

interface HeritageFont {
  [key: string]: string;
}

// 서울 숭례문
const HERITAGE_FONT: HeritageFont = {
  '-1': `${FILE_PATH}/sungnyemunGate.json`,
  '1': `${FILE_PATH}/multicampus.json`,
  '2': `${FILE_PATH}/gyeongbokgung.json`,
};

export default HERITAGE_FONT;
