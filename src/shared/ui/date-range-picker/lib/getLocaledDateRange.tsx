import { ru } from "date-fns/locale";

const kg: Locale = {
   ...ru,
   code: "kg",
   localize: {
      ...ru.localize,
      month: (n: number) => {
         const months = [
            "Үчтүн айы",
            "Бирдин айы",
            "Жалган Куран",
            "Чын Куран",
            "Бугу",
            "Кулжа",
            "Теке",
            "Баш Оона",
            "Аяк Оона",
            "Тогуздун айы",
            "Жетинин айы",
            "Бештин айы ",
         ];
         return months[n];
      },
      day: (n: number) => {
         const days = ["Жк", "Дш", "Шш", "Шр", "Бш", "Жм", "Иш"];
         return days[n];
      },
      dayPeriod: (period: string) => {
         const periods: { [key: string]: string } = {
            am: "таңкы",
            pm: "кечки",
            midnight: "түн ортосу",
            noon: "түш",
            morning: "эртең менен",
            afternoon: "түштөн кийин",
            evening: "кечки",
            night: "түнкүсүн",
         };
         return periods[period] || period;
      },
      ordinalNumber: (n: number) => n + "ый",
      era: () => "", // Fallback for era (empty string or provide logic)
      quarter: (n: number) => `${n} чейрек`,
   },
};

export { kg };
