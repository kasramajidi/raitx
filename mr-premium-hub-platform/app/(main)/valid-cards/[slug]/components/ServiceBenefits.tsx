import { Service } from "../../components/servicesData";
import {
  HiCheckCircle,
  HiShieldCheck,
  HiClock,
  HiCurrencyDollar,
  HiLocationMarker,
  HiCreditCard,
  HiRefresh,
  HiDeviceMobile,
  HiX,
  HiGlobe,
  HiLockClosed,
  HiUser,
  HiDesktopComputer,
  HiMail,
} from "react-icons/hi";
import { BiShoppingBag, BiTransfer } from "react-icons/bi";
import { MdPayment, MdAccountBalance, MdSimCard } from "react-icons/md";
import { FaGamepad } from "react-icons/fa";
import { HiOutlineGift } from "react-icons/hi";
import { SiPaypal } from "react-icons/si";

interface ServiceBenefitsProps {
  service: Service;
}

const benefits = [
  {
    icon: <HiShieldCheck className="text-2xl sm:text-3xl" />,
    title: "امنیت بالا",
    description: "تمام تراکنش‌ها با بالاترین سطح امنیت انجام می‌شود",
    color: "bg-[#ff5538]/10",
    iconColor: "text-[#ff5538]",
  },
  {
    icon: <HiClock className="text-2xl sm:text-3xl" />,
    title: "پردازش سریع",
    description: "خدمات شما در کوتاه‌ترین زمان ممکن انجام می‌شود",
    color: "bg-[#1a3760]/10",
    iconColor: "text-[#1a3760]",
  },
  {
    icon: <HiCurrencyDollar className="text-2xl sm:text-3xl" />,
    title: "نرخ مناسب",
    description: "بهترین نرخ‌ها و قیمت‌های رقابتی در بازار",
    color: "bg-[#ff5538]/10",
    iconColor: "text-[#ff5538]",
  },
  {
    icon: <HiCheckCircle className="text-2xl sm:text-3xl" />,
    title: "پشتیبانی 24/7",
    description: "پشتیبانی شبانه‌روزی برای پاسخگویی به سوالات شما",
    color: "bg-[#1a3760]/10",
    iconColor: "text-[#1a3760]",
  },
];

const visaCardBenefits = [
  {
    icon: <HiLocationMarker className="text-2xl sm:text-3xl text-white" />,
    title: "پرداخت های بین المللی",
    description:
      "با استفاده از ویزا کارت می‌توانید به‌سادگی انواع پرداخت‌های بین‌المللی از جمله هزینه آزمون‌های زبان، رزرو بلیط، خریدهای اینترنتی و سایر تراکنش‌های ارزی را انجام دهید. این کارت‌ها راهکاری مطمئن و سریع برای انجام پرداخت‌های خارجی بدون محدودیت‌های رایج محسوب می‌شوند.",
    color: "bg-blue-900",
  },
  {
    icon: <BiShoppingBag className="text-2xl sm:text-3xl text-white" />,
    title: "خرید از فروشگاه های خارجی",
    description:
      "ویزا کارت امکان خرید و انجام پرداخت در فروشگاه‌ها و وب‌سایت‌های معتبر بسیاری از کشورهای جهان را برای کاربران فراهم می‌کند.",
    color: "bg-blue-900",
  },
  {
    icon: <HiCreditCard className="text-2xl sm:text-3xl text-white" />,
    title: "برداشت وجه از دستگاه های خودپرداز",
    description:
      "با داشتن ویزا کارت، می‌توانید بدون نیاز به حمل وجه نقد، در بسیاری از کشورها از طریق دستگاه‌های خودپرداز (ATM) وجه نقد برداشت نمایید.",
    color: "bg-blue-900",
  },
];

const visaGiftBenefits = [
  {
    icon: <HiCurrencyDollar className="text-2xl sm:text-3xl text-white" />,
    title: "هزینه صدور متناسب",
    description: "هزینه صدور بسته به مقدار درخواستی متفاوت میباشد.",
    color: "bg-blue-900",
  },
  {
    icon: <HiRefresh className="text-2xl sm:text-3xl text-white" />,
    title: "امکان بازگشت پول",
    description:
      "در صورت کنسل شدن خرید شما امکان بازگشت پول به کارتها (Refund) وجود دارد.",
    color: "bg-blue-900",
  },
  {
    icon: <MdPayment className="text-2xl sm:text-3xl text-white" />,
    title: "پرداخت در سایتهای خارجی",
    description:
      "این کارتها مجازی میباشند و قابلیت پرداخت در سایتهای خارجی را دارند.",
    color: "bg-blue-900",
  },
];

const creditCardBenefits = [
  {
    icon: <MdAccountBalance className="text-2xl sm:text-3xl text-white" />,
    title: "حساب بانکی زراعت بانک ترکیه",
    description:
      "حساب بانکی شما صادره از زراعت بانک ترکیه بوده و افتتاح حساب بر پایه ارز اصلی لیر می باشد.",
    color: "bg-blue-900",
  },
  {
    icon: <HiDeviceMobile className="text-2xl sm:text-3xl text-white" />,
    title: "خدمات بانکداری الکترونیک",
    description:
      "حساب ها دارای اینترنت بانک و موبایل بانک و اس ام اس بانک میباشند.",
    color: "bg-blue-900",
  },
  {
    icon: <HiCurrencyDollar className="text-2xl sm:text-3xl text-white" />,
    title: "امکان افزایش سقف خرید",
    description:
      "جهت افزایش سقف خرید از این کارت قبل از افتتاح حساب باید هماهنگی لازم انجام گردد.",
    color: "bg-blue-900",
  },
];

const playstationBenefits = [
  {
    icon: <FaGamepad className="text-2xl sm:text-3xl text-white" />,
    title: "خرید بازی ها و برنامه ها",
    description:
      "امکان خرید تمام بازی‌ها، برنامه‌ها و محتوای اضافی از پلی استیشن استور.",
    color: "bg-blue-900",
  },
  {
    icon: (
      <div className="relative">
        <HiCreditCard className="text-2xl sm:text-3xl text-white" />
        <HiX className="text-xl sm:text-2xl text-white absolute -top-1 -right-1" />
      </div>
    ),
    title: "بدون نیاز به کارت اعتباری",
    description:
      "شارژ اکانت پلی استیشن بدون نیاز به کارت‌های اعتباری بین‌المللی.",
    color: "bg-blue-900",
  },
  {
    icon: <HiCurrencyDollar className="text-2xl sm:text-3xl text-white" />,
    title: "مبالغ متنوع",
    description: "قابل ارائه در مبالغ مختلف از 1 دلار تا 250 دلار.",
    color: "bg-blue-900",
  },
];

const xboxBenefits = [
  {
    icon: <FaGamepad className="text-2xl sm:text-3xl text-white" />,
    title: "خرید بازی ها و برنامه ها",
    description:
      "امکان خرید تمام بازی‌ها، برنامه‌ها و محتوای اضافی از ایکس باکس استور.",
    color: "bg-blue-900",
  },
  {
    icon: (
      <div className="relative">
        <HiCreditCard className="text-2xl sm:text-3xl text-white" />
        <HiX className="text-xl sm:text-2xl text-white absolute -top-1 -right-1" />
      </div>
    ),
    title: "بدون نیاز به کارت اعتباری",
    description:
      "شارژ اکانت ایکس باکس بدون نیاز به کارت‌های اعتباری بین‌المللی.",
    color: "bg-blue-900",
  },
  {
    icon: <HiCurrencyDollar className="text-2xl sm:text-3xl text-white" />,
    title: "مبالغ متنوع",
    description: "قابل ارائه در مبالغ مختلف از 1 دلار تا 50 دلار.",
    color: "bg-blue-900",
  },
  {
    icon: <HiGlobe className="text-2xl sm:text-3xl text-white" />,
    title: "سازگاری با مایکروسافت",
    description:
      "قابل استفاده برای خرید از مایکروسافت استور و سایر خدمات مایکروسافت.",
    color: "bg-blue-900",
  },
];

const steamBenefits = [
  {
    icon: <FaGamepad className="text-2xl sm:text-3xl text-white" />,
    title: "خرید بازی ها و برنامه ها",
    description:
      "امکان خرید تمام بازی‌ها، برنامه‌ها و محتوای اضافی از استیم استور.",
    color: "bg-blue-900",
  },
  {
    icon: (
      <div className="relative">
        <HiCreditCard className="text-2xl sm:text-3xl text-white" />
        <HiX className="text-xl sm:text-2xl text-white absolute -top-1 -right-1" />
      </div>
    ),
    title: "بدون نیاز به کارت اعتباری",
    description: "شارژ اکانت استیم بدون نیاز به کارت‌های اعتباری بین‌المللی.",
    color: "bg-blue-900",
  },
  {
    icon: <HiCurrencyDollar className="text-2xl sm:text-3xl text-white" />,
    title: "مبالغ متنوع",
    description: "قابل ارائه در مبالغ مختلف از 1 دلار تا 100 دلار.",
    color: "bg-blue-900",
  },
];

const battlenetBenefits = [
  {
    icon: <FaGamepad className="text-2xl sm:text-3xl text-white" />,
    title: "خرید انواع بازی‌های مختلف",
    description:
      "امکان خرید تمام بازی‌ها و محتوای اضافی از فروشگاه Battle.net.",
    color: "bg-blue-900",
  },
  {
    icon: <MdPayment className="text-2xl sm:text-3xl text-white" />,
    title: "امکان پرداخت درون برنامه‌ای",
    description: "پرداخت آسان برای خرید آیتم‌ها و خدمات درون بازی.",
    color: "bg-blue-900",
  },
  {
    icon: <HiClock className="text-2xl sm:text-3xl text-white" />,
    title: "بدون محدودیت زمانی و تاریخ انقضا",
    description: "گیفت کارت بدون تاریخ انقضا و قابل استفاده در هر زمان.",
    color: "bg-blue-900",
  },
  {
    icon: <HiOutlineGift className="text-2xl sm:text-3xl text-white" />,
    title: "مناسب هدیه به دوستان",
    description: "بهترین گزینه برای هدیه دادن به دوستان گیمر.",
    color: "bg-blue-900",
  },
];

const mastercardPrimeBenefits = [
  {
    icon: <HiCreditCard className="text-2xl sm:text-3xl text-white" />,
    title: "دبیت کارت",
    description: "صادر شده از بانک‌های معتبر انگلیس.",
    color: "bg-blue-900",
  },
  {
    icon: <HiLocationMarker className="text-2xl sm:text-3xl text-white" />,
    title: "خودپردازهای متصل به MasterCard",
    description: "قابل استفاده در تمام ATMهای متصل به MasterCard.",
    color: "bg-blue-900",
  },
  {
    icon: <MdSimCard className="text-2xl sm:text-3xl text-white" />,
    title: "ارائه سیمکارت فیزیکی",
    description: "ارائه سیم کارت فیزیکی همراه با این کارت‌ها.",
    color: "bg-blue-900",
  },
  {
    icon: <HiLockClosed className="text-2xl sm:text-3xl text-white" />,
    title: "کد 3D Secure",
    description: "امکان دریافت کد 3D secure از طریق نوتیفیکیشن در اپلیکیشن.",
    color: "bg-blue-900",
  },
  {
    icon: <SiPaypal className="text-2xl sm:text-3xl text-white" />,
    title: "اتصال به کیف پول های الکترونیک",
    description: "قابلیت لینک شدن به پی‌پال انگلیس.",
    color: "bg-blue-900",
  },
  {
    icon: <HiUser className="text-2xl sm:text-3xl text-white" />,
    title: "چاپ نام دارنده کارت",
    description: "جهت جلوگیری از کپی شدن کارت.",
    color: "bg-blue-900",
  },
];

const mastercardUsVirtualBenefits = [
  {
    icon: <HiDesktopComputer className="text-2xl sm:text-3xl text-white" />,
    title: "پرداخت‌های اینترنتی",
    description:
      "امکان پرداخت در درگاه‌های پذیرنده کارت‌های پیش‌پرداخت مجازی (Virtual Prepaid).",
    color: "bg-blue-900",
  },
  {
    icon: <HiCurrencyDollar className="text-2xl sm:text-3xl text-white" />,
    title: "ارز دلار آمریکا",
    description:
      "کارت با ارز دلار آمریکا صادر شده و صرفاً امکان پرداخت به ارز این شرکت را دارد.",
    color: "bg-blue-900",
  },
  {
    icon: <HiGlobe className="text-2xl sm:text-3xl text-white" />,
    title: "سایت‌های آمریکایی",
    description: "امکان پرداخت در سایت‌های آمریکایی پذیرنده این نوع کارت.",
    color: "bg-blue-900",
  },
  {
    icon: <HiLocationMarker className="text-2xl sm:text-3xl text-white" />,
    title: "آدرس ثابت",
    description:
      "آدرس کارت به هیچ وجه قابل تغییر نبوده و با آدرس آمریکا صادر می‌شود.",
    color: "bg-blue-900",
  },
  {
    icon: <HiCreditCard className="text-2xl sm:text-3xl text-white" />,
    title: "مبالغ دلخواه",
    description: "امکان صدور با مبالغ دلخواه تا ۱۰۰۰ دلار.",
    color: "bg-blue-900",
  },
  {
    icon: <HiMail className="text-2xl sm:text-3xl text-white" />,
    title: "تحویل سریع",
    description: "مشخصات کارت از طریق ایمیل ارسال می‌شود.",
    color: "bg-blue-900",
  },
];

const mastercardVirtualBenefits = [
  {
    icon: <HiShieldCheck className="text-2xl sm:text-3xl text-white" />,
    title: "امنیت بالا",
    description: "استفاده از تکنولوژی‌های امنیتی پیشرفته.",
    color: "bg-blue-900",
  },
  {
    icon: <HiClock className="text-2xl sm:text-3xl text-white" />,
    title: "تحویل سریع",
    description: "دریافت کارت در کمترین زمان ممکن.",
    color: "bg-blue-900",
  },
  {
    icon: <HiGlobe className="text-2xl sm:text-3xl text-white" />,
    title: "پذیرندگی جهانی",
    description: "قابل استفاده در سراسر دنیا.",
    color: "bg-blue-900",
  },
];

const mastercardPhysicalBenefits = [
  {
    icon: <MdAccountBalance className="text-2xl sm:text-3xl text-white" />,
    title: "اتصال به حساب بانکی",
    description:
      "مستر کارت‌های فیزیکی به حساب بانکی شما متصل بوده و در هر جای دنیا قابل استفاده هستند.",
    color: "bg-blue-900",
  },
  {
    icon: <HiGlobe className="text-2xl sm:text-3xl text-white" />,
    title: "پذیرندگی جهانی",
    description: "امکان استفاده در تمامی کشورها و پذیرندگی در سراسر دنیا.",
    color: "bg-blue-900",
  },
  {
    icon: <BiTransfer className="text-2xl sm:text-3xl text-white" />,
    title: "انتقال وجه",
    description: "قابلیت انتقال وجه و انجام تراکنش‌های مالی در سطح بین‌المللی.",
    color: "bg-blue-900",
  },
];

const mastercardPersonalBenefits = [
  {
    icon: <HiCreditCard className="text-2xl sm:text-3xl text-white" />,
    title: "کارت پریپید فیزیکی",
    description:
      "مسترکارت پیش‌پرداخت از نوع فیزیکی که به حساب بانکی متصل نبوده و نیازی به افتتاح حساب ندارد.",
    color: "bg-blue-900",
  },
  {
    icon: <HiDeviceMobile className="text-2xl sm:text-3xl text-white" />,
    title: "اپلیکیشن موبایل",
    description:
      "دارای اپلیکیشن موبایل برای مشاهده ریز تراکنش‌ها و موجودی کارت.",
    color: "bg-blue-900",
  },
  {
    icon: <HiCurrencyDollar className="text-2xl sm:text-3xl text-white" />,
    title: "پرداخت بین‌المللی",
    description:
      "برای پرداخت و انجام تراکنش‌های مالی در سطح بین‌المللی بر اساس واحد پول کشور مورد نظر.",
    color: "bg-blue-900",
  },
];

export default function ServiceBenefits({ service }: ServiceBenefitsProps) {
  const isVisaCard =
    service.id === "visa-virtual" || service.id === "visa-physical";
  const isVisaGift = service.id === "visa-gift";
  const isCreditCard = service.id === "credit-card";
  const isPlaystation = service.id === "playstation";
  const isXbox = service.id === "xbox";
  const isSteam = service.id === "steam";
  const isBattlenet = service.id === "battlenet";
  const isMastercardPrime = service.id === "mastercard-prime";
  const isMastercardUsVirtual = service.id === "mastercard-us-virtual";
  const isMastercardVirtual = service.id === "mastercard-virtual";
  const isMastercardPhysical = service.id === "mastercard-physical";
  const isMastercardPersonal = service.id === "mastercard-personal";

  return (
    <>
      {isVisaCard && (
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6 mb-6">
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-4 sm:mb-6 text-center">
            مزایای داشتن ویزا کارت
          </h2>
          <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 text-center mb-4 sm:mb-6 leading-5 sm:leading-6">
            از جمله مزایای خرید انواع ویزا کارت مجازی و فیزیکی میتوان به موارد
            زیر اشاره داشت:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {visaCardBenefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 sm:p-5 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center justify-center mb-3 sm:mb-4">
                  <div
                    className={`${benefit.color} p-3 sm:p-4 rounded-lg sm:rounded-xl flex items-center justify-center`}
                  >
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-2 text-center">
                  {benefit.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-600 leading-5 sm:leading-6 text-justify sm:text-right">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {isVisaGift && (
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6 mb-6">
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-4 sm:mb-6 text-center">
            مزایای خرید ویزا کارت هدیه
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {visaGiftBenefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 sm:p-5 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center justify-center mb-3 sm:mb-4">
                  <div
                    className={`${benefit.color} p-3 sm:p-4 rounded-lg sm:rounded-xl flex items-center justify-center`}
                  >
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-2 text-center">
                  {benefit.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-600 leading-5 sm:leading-6 text-justify sm:text-right">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {isCreditCard && (
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6 mb-6">
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-4 sm:mb-6 text-center">
            مزایای کردیت کارت
          </h2>
          <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 text-center mb-4 sm:mb-6 leading-5 sm:leading-6">
            کردیت کارت یکی از انواع کارت‌های اعتباری بانکی است که امکان خرید تا
            سقف معین را با دپوزیت نقدی فراهم میکند.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {creditCardBenefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 sm:p-5 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center justify-center mb-3 sm:mb-4">
                  <div
                    className={`${benefit.color} p-3 sm:p-4 rounded-lg sm:rounded-xl flex items-center justify-center`}
                  >
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-2 text-center">
                  {benefit.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-600 leading-5 sm:leading-6 text-justify sm:text-right">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {isPlaystation && (
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6 mb-6">
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-4 sm:mb-6 text-center">
            مزایای گیفت کارت PSN
          </h2>
          <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 text-center mb-4 sm:mb-6 leading-5 sm:leading-6">
            گیفت کارت پلی استیشن PSN راهی آسان و مطمئن برای شارژ اکانت پلی
            استیشن و خرید از فروشگاه پلی استیشن استور است.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {playstationBenefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 sm:p-5 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center justify-center mb-3 sm:mb-4">
                  <div
                    className={`${benefit.color} p-3 sm:p-4 rounded-lg sm:rounded-xl flex items-center justify-center`}
                  >
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-2 text-center">
                  {benefit.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-600 leading-5 sm:leading-6 text-justify sm:text-right">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {isXbox && (
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6 mb-6">
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-4 sm:mb-6 text-center">
            مزایای گیفت کارت Xbox
          </h2>
          <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 text-center mb-4 sm:mb-6 leading-5 sm:leading-6">
            گیفت کارت ایکس باکس XBOX راهی آسان و مطمئن برای شارژ اکانت ایکس باکس
            و خرید از فروشگاه ایکس باکس استور و مایکروسافت استور است.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {xboxBenefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 sm:p-5 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center justify-center mb-3 sm:mb-4">
                  <div
                    className={`${benefit.color} p-3 sm:p-4 rounded-lg sm:rounded-xl flex items-center justify-center`}
                  >
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-2 text-center">
                  {benefit.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-600 leading-5 sm:leading-6 text-justify sm:text-right">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {isSteam && (
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6 mb-6">
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-4 sm:mb-6 text-center">
            مزایای گیفت کارت استیم
          </h2>
          <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 text-center mb-4 sm:mb-6 leading-5 sm:leading-6">
            گیفت کارت استیم Steam راهی آسان و مطمئن برای شارژ اکانت استیم و خرید
            از فروشگاه استیم استور است.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {steamBenefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 sm:p-5 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center justify-center mb-3 sm:mb-4">
                  <div
                    className={`${benefit.color} p-3 sm:p-4 rounded-lg sm:rounded-xl flex items-center justify-center`}
                  >
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-2 text-center">
                  {benefit.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-600 leading-5 sm:leading-6 text-justify sm:text-right">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {isBattlenet && (
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6 mb-6">
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-4 sm:mb-6 text-center">
            چرا از گیفت کارت بتل نت استفاده کنیم؟
          </h2>
          <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 text-center mb-4 sm:mb-6 leading-5 sm:leading-6">
            محال است اهل بازی‌های اکشن باشید و بتل نت را نشناسید! بتل نت
            (Battle.Net) یکی از بزرگ‌ترین فروشگاه‌های بازی و گیم‌های کامپیوتری
            است و در میان گیمرها محبوبیت زیادی دارد. این فروشگاه به شما امکان
            دسترسی به هزاران بازی را می‌دهد.
          </p>
          <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 text-center mb-4 sm:mb-6 leading-5 sm:leading-6">
            برای تجربه‌های بازی‌های مشهور جهان و لذت بردن از یک بازی باکیفیت،
            کافی است گیفت کارت بتل نت بخرید. با این کارت به سادگی اکانت خود را
            شارژ کنید، بازی‌های مختلف را تهیه کنید و پرداخت‌های درون برنامه‌ای
            را انجام دهید.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {battlenetBenefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 sm:p-5 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center justify-center mb-3 sm:mb-4">
                  <div
                    className={`${benefit.color} p-3 sm:p-4 rounded-lg sm:rounded-xl flex items-center justify-center`}
                  >
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-2 text-center">
                  {benefit.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-600 leading-5 sm:leading-6 text-justify sm:text-right">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {isMastercardPrime && (
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6 mb-6">
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-4 sm:mb-6 text-center">
            مسترکارت پرایم برای پرداخت‌های بین‌المللی
          </h2>
          <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 text-center mb-4 sm:mb-6 leading-5 sm:leading-6">
            مستر کارت پرایم نوعی دبیت کارت و روش مناسبی برای پرداخت ارزی است که
            امکانات زیادی را در اختیار کاربران قرار می‌دهد.
          </p>
          <h3 className="text-xs sm:text-sm md:text-base font-bold text-gray-900 mb-4 sm:mb-6 text-center">
            مزایای مستر کارت پرایم
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {mastercardPrimeBenefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 sm:p-5 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center justify-center mb-3 sm:mb-4">
                  <div
                    className={`${benefit.color} p-3 sm:p-4 rounded-lg sm:rounded-xl flex items-center justify-center`}
                  >
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-2 text-center">
                  {benefit.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-600 leading-5 sm:leading-6 text-justify sm:text-right">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {isMastercardUsVirtual && (
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6 mb-6">
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-4 sm:mb-6 text-center">
            مزایای مستر کارت مجازی آمریکایی
          </h2>
          <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 text-center mb-4 sm:mb-6 leading-5 sm:leading-6">
            مستر کارت مجازی آمریکایی امکانات ویژه‌ای برای پرداخت‌های آنلاین در
            سایت‌های آمریکایی فراهم می‌کند.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {mastercardUsVirtualBenefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 sm:p-5 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center justify-center mb-3 sm:mb-4">
                  <div
                    className={`${benefit.color} p-3 sm:p-4 rounded-lg sm:rounded-xl flex items-center justify-center`}
                  >
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-2 text-center">
                  {benefit.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-600 leading-5 sm:leading-6 text-justify sm:text-right">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {isMastercardVirtual && (
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6 mb-6">
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-4 sm:mb-6 text-center">
            مزایای مستر کارت مجازی
          </h2>
          <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 text-center mb-4 sm:mb-6 leading-5 sm:leading-6">
            مستر کارت مجازی راه حلی مناسب برای پرداخت‌های آنلاین و خرید از
            سایت‌های خارجی است.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {mastercardVirtualBenefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 sm:p-5 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center justify-center mb-3 sm:mb-4">
                  <div
                    className={`${benefit.color} p-3 sm:p-4 rounded-lg sm:rounded-xl flex items-center justify-center`}
                  >
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-2 text-center">
                  {benefit.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-600 leading-5 sm:leading-6 text-justify sm:text-right">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {isMastercardPhysical && (
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6 mb-6">
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-4 sm:mb-6 text-center">
            مزایای مستر کارت فیزیکی
          </h2>
          <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 text-center mb-4 sm:mb-6 leading-5 sm:leading-6">
            مستر کارت فیزیکی امکان انجام پرداخت‌های بین‌المللی و استفاده در
            سراسر دنیا را فراهم می‌کند.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {mastercardPhysicalBenefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 sm:p-5 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center justify-center mb-3 sm:mb-4">
                  <div
                    className={`${benefit.color} p-3 sm:p-4 rounded-lg sm:rounded-xl flex items-center justify-center`}
                  >
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-2 text-center">
                  {benefit.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-600 leading-5 sm:leading-6 text-justify sm:text-right">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {isMastercardPersonal && (
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6 mb-6">
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-4 sm:mb-6 text-center">
            مستر کارت پرسونال
          </h2>
          <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 text-center mb-4 sm:mb-6 leading-5 sm:leading-6">
            مستر کارت پرسونال یکی از انواع کارت‌های پریپید فیزیکی است که امکان
            پرداخت آنلاین با قابلیت شارژ مجدد را فراهم می‌کند.
          </p>
          <h3 className="text-xs sm:text-sm md:text-base font-bold text-gray-900 mb-4 sm:mb-6 text-center">
            مزایای مستر کارت پرسونال
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {mastercardPersonalBenefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 sm:p-5 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center justify-center mb-3 sm:mb-4">
                  <div
                    className={`${benefit.color} p-3 sm:p-4 rounded-lg sm:rounded-xl flex items-center justify-center`}
                  >
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-2 text-center">
                  {benefit.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-600 leading-5 sm:leading-6 text-justify sm:text-right">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6 mb-6">
        <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-4 sm:mb-6 text-right flex items-center gap-2">
          <span className="w-1 h-6 bg-[#ff5538] rounded"></span>
          چرا {service.label} را از ما انتخاب کنید؟
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-gray-100 hover:border-[#ff5538]/30 hover:shadow-md transition-all duration-200"
            >
              <div
                className={`${benefit.color} ${benefit.iconColor} p-2 sm:p-3 rounded-lg shrink-0`}
              >
                {benefit.icon}
              </div>
              <div className="flex-1 text-right">
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-1">
                  {benefit.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-600 leading-5 sm:leading-6">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
