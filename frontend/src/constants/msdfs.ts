// ar 폰트 파일 관리
const FILE_PATH = '/assets/msdfs';

interface HeritageFont {
  [key: string]: string;
}

const HERITAGE_FONT: HeritageFont = {
  '-1': `${FILE_PATH}/sungnyemunGate.json`, // FIXME: 서울 숭례문 -> 서울서숭례문 으로 렌더링됨
  '1': `${FILE_PATH}/multicampus.json`,
  '2': `${FILE_PATH}/gyeongbokgung.json`,
};

export default HERITAGE_FONT;
