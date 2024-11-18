import ButtonSmall from "../ButtonSmall";
import Washer from "/images/machines/Washer.png";
import { MdCircle } from "react-icons/md";

export default function WasherCard({ id, washingStatus, timeLeft, onClick }) {
  return (
    <article className="flex items-center max-w-[180px] min-w-[180px] p-3 bg-white rounded-md">
      <div className="w-1/2">
        <img src={Washer} />
      </div>
      <div className="flex flex-col ml-5 w-1/2">
        <p>#{id}</p>
        <div className="flex items-center">
          <MdCircle
            className={`${
              washingStatus === "open" ? "text-green-600" : "text-red-600"
            } mr-1`}
          />
          <small>{washingStatus}</small>
        </div>
        <small className={`${washingStatus === "open" ? "hidden" : "block"}`}>
          {timeLeft} min
        </small>
        <div
          className={`${washingStatus === "open" ? "block" : "hidden"} mt-1`}
        >
          <ButtonSmall name="Wash" onClick={onClick} />
        </div>
      </div>
    </article>
  );
}
