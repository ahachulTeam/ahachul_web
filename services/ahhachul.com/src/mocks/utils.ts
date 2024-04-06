const getShortContent = (complaintType: string) => {
  const getRandomCase = (list: string[]) => {
    const randomIdx = Math.floor(Math.random() * list.length - 1) + 1;
    return list[randomIdx];
  };

  switch (complaintType) {
    case '환경민원':
      return getRandomCase(['오물', '토사물', '환기요청']);
    case '온도조절':
      return getRandomCase(['더워요', '추워요']);
    case '질서저해':
      return getRandomCase(['이동상인', '취객', '노숙', '구걸', '종교행위']);
    case '안내방송':
      return getRandomCase(['시끄러워요', '안들려요']);
    case '응급환자':
      return getRandomCase(['본인', '목격자']);
    case '폭력':
    case '성추행':
      return getRandomCase(['피해자', '목격자']);
  }
};

const getRandomComplaintType = () => {
  const list = ['환경민원', '온도조절', '질서저해', '안내방송', '응급환자', '폭력', '성추행'];
  const randomIdx = Math.floor(Math.random() * list.length - 1) + 1;
  return {
    complaintType: list[randomIdx],
    shortContent: getShortContent(list[randomIdx]),
  };
};

const getRandomTrainNo = () => {
  const list = ['1192', '2332', '3453', '4123', '5049', '6123', '7234', '8958', '9123'];
  const randomIdx = Math.floor(Math.random() * list.length - 1) + 1;
  return {
    trainNo: list[randomIdx],
    roomNumber: +list[randomIdx][1] + 1,
    subwayLine: list[randomIdx][0],
  };
};

const getRandomSubwayLineId = () => {
  const list = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'D', 'UL', 'SI', 'GJ', 'S'];
  const randomIdx = Math.floor(Math.random() * list.length - 1) + 1;
  return list[randomIdx];
};

const getRandomNickname = () => {
  const list = [
    '갯나리',
    '특삼',
    '미호밍',
    '플락',
    '도롱뇽',
    '큐이',
    '선바',
    '김츠유',
    '수련수련',
    '한동숙',
    '짬바',
    '리끼',
    '따효니',
    '아리사',
    '녹두로',
    '룩삼',
  ];
  const randomIdx = Math.floor(Math.random() * list.length - 1) + 1;
  return list[randomIdx];
};

const getRandomContent = () => {
  const list = [
    '일주일에 충치치료, 사랑니(매복)2개나 뺄려하다니',
    '뷰뷰이 오늘 아침 8시에 퇴근하고 갤에 솔 공략 올리고 킬게용',
    '[광고] 약탈폭풍  wow+배틀로얄   신규출시',
    '몬스터 꺼버렸자나 한잔해',
    '토요일에 볼래요?',
    '정규 1등 찍은 효신좌 근황',
    '반갑습니다',
    '치과에서 이빨을 조지고 온 나',
    '광운대행 진짜 화난다',
    '늦은 밤엔 공룡의 광증이 깊어집니다.',
    'zzzㅋㅋㅋㅋㅋㅋㅋㅋ오 오랜만이누',
    '정말 오랜만이야',
    '나락쇼',
    '롤체 시즌11 에메 간다',
    '나랑 영화볼래요?',
    '출근하다가 빵사가는데...',
  ];
  const randomIdx = Math.floor(Math.random() * list.length - 1) + 1;
  return list[randomIdx];
};

const getRandomImg = (idx: number) => {
  return `https://source.unsplash.com/random?id=${idx}`;
};

const getRandomBoolean = (): boolean => {
  const number = Math.floor(Math.random() * 10) + 1;
  return Boolean(number % 2);
};

export {
  getRandomTrainNo,
  getRandomSubwayLineId,
  getRandomNickname,
  getRandomContent,
  getRandomImg,
  getRandomBoolean,
  getRandomComplaintType,
};
