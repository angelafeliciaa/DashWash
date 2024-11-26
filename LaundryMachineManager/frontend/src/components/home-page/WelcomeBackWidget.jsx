import DudeWaving from "/images/DudeWaving.png";

export default function WelcomeBackWidget({ uname }) {
  return (
    <section className="flex items-center justify-evenly w-auto bg-widget px-10 rounded-3xl mr-2">
      <div className="flex flex-col items-start w-3/4">
        <p>Hi {uname}!</p>
        <p>Are you ready to do some laundry?</p>
      </div>
      <div className="w-1/4">
        <img src={DudeWaving} />
      </div>
    </section>
  );
}
