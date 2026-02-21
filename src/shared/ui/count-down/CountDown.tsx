import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "#shared/ui/button/Button";

type CountDownProps = {
   countDown: string;
   onTimerClick: () => void;
   onTimerEnd: () => void;
};

const CountDown: FC<CountDownProps> = ({
   // countDown,
   onTimerClick,
}) => {
   const { t } = useTranslation(["common", "requests"]);

   const approveDocument = () => {
      onTimerClick();
   };

   // const [remainingTime, setRemainingTime] = useState(0);

   // useEffect(() => {
   //    if (!countDown) return;

   //    const [minutes, seconds] = countDown.split(":").map(Number);
   //    const totalSeconds = minutes * 60 + (seconds + 1);
   //    setRemainingTime(totalSeconds);

   //    const timer = setInterval(() => {
   //       setRemainingTime((prev) => {
   //          if (prev <= 1) {
   //             clearInterval(timer);
   //             if (onTimerEnd) onTimerEnd();
   //             return 0;
   //          }

   //          return prev - 1;
   //       });
   //    }, 1000);

   //    return () => clearInterval(timer);
   // }, [countDown]);

   // if (remainingTime <= 0) return null;

   // const minutes = Math.floor(remainingTime / 60);
   // const seconds = remainingTime % 60;

   // const padNumber = (num: number) => String(num).padStart(2, "0");

   return (
      // <Tooltip
      //    key={currentLanguage}
      //    placement="top"
      //    title={t("accrueButtonPopup")}
      // >
      <Button variant="contained" onClick={approveDocument}>
         {/* {t("accrueAfter", {
               countDown: `${padNumber(minutes)}:${padNumber(seconds)}`,
            })} */}
         {t("common:confirm")}
      </Button>
      // </Tooltip>
   );
};

export default CountDown;
