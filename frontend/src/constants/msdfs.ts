// ar 폰트 파일 관리
const FILE_PATH = '/assets/msdfs';

interface HeritageFont {
  [key: string]: {
    src: string;
    text: string;
  };
}

const HERITAGE_FONT: HeritageFont = {
  '1': {
    src: `${FILE_PATH}/sungnyemunGate.json`,
    text: '서울숭례문',
  },
  '2': {
    src: `${FILE_PATH}/gyeongbokgung.json`,
    text: '경복궁',
  },
  72: {
    src: `${FILE_PATH}/seonjeongneungTomb.json`,
    text: '선정릉',
  },
};

export default HERITAGE_FONT;
