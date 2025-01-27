const GREETING_PHRASES = [
  '멋진 오늘을 응원해요',
  '정말 잘하고 있어요',
  '언제나 늘 응원할게요',
  '매일매일 반가워요!',
  '힘차게 시작해볼까요?',
  '활짝 웃는 하루되세요',
  '하나씩 이뤄가볼까요?',
  '목표에 한 걸음 다가가요!',
] as const;

type GreetingPhrase = (typeof GREETING_PHRASES)[number];

const getRandomGreeting = (): GreetingPhrase => {
  return GREETING_PHRASES[Math.floor(Math.random() * GREETING_PHRASES.length)];
};

const greetingPhrase = getRandomGreeting();

const WelcomeMessage = () => {
  return (
    <h3 className=" px-5 text-headline-small text-black">
      <b className=" font-bold block">{'아하철'}님,</b>
      {greetingPhrase}
    </h3>
  );
};

export default WelcomeMessage;
