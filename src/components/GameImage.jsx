import lottoPic from "../assets/images/lotteryticket.avif";

const GameImage = () => {
  return (
    <div className="img-container">
      <img className="landing-img" src={lottoPic} alt="lottery ticket image" />
    </div>
  );
};

export default GameImage;
