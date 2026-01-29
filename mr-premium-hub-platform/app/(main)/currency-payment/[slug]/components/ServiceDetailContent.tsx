import { Service } from "../../components/servicesData";

interface ServiceDetailContentProps {
  service: Service;
}

const serviceDetails: Record<
  string,
  {
    features: string[];
    steps: string[];
    note?: string;
    description?: string;
    stepsDetail?: { title: string; description: string }[];
  }
> = {
  paypal: {
    features: [
      "نقد کردن موجودی پی پال به ریال",
      "پرداخت با پی پال برای خریدهای آنلاین",
      "تبدیل ارز با نرخ روز",
      "پردازش سریع و امن",
      "پشتیبانی 24 ساعته",
      "امنیت بالا در تراکنش‌ها",
    ],
    steps: [
      "ثبت درخواست در سایت",
      "واریز موجودی پی پال",
      "تایید توسط کارشناسان",
      "دریافت مبلغ به ریال",
    ],
    note: "نرخ تبدیل بر اساس نرخ روز بازار محاسبه می‌شود.",
    description: "خدمات پی پال ما شامل نقد کردن موجودی پی پال به ریال و پرداخت با پی پال برای خریدهای آنلاین است. ما با سال‌ها تجربه در این زمینه، بهترین نرخ‌ها و سریع‌ترین پردازش را به شما ارائه می‌دهیم.",
  },
  tickets: {
    features: [
      "خرید بلیط هواپیما",
      "خرید بلیط قطار",
      "خرید بلیط اتوبوس",
      "رزرو هتل",
      "پشتیبانی در تمام مراحل",
      "امکان کنسل و تغییر",
    ],
    steps: [
      "جستجوی بلیط مورد نظر",
      "انتخاب تاریخ و مسیر",
      "تکمیل اطلاعات مسافر",
      "پرداخت و دریافت بلیط",
    ],
    note: "امکان کنسل و تغییر بلیط با توجه به قوانین خطوط هوایی وجود دارد.",
    description: "ما خدمات خرید بلیط هواپیما، قطار و اتوبوس را برای مسیرهای داخلی و بین‌المللی ارائه می‌دهیم. همچنین می‌توانید برای رزرو هتل نیز از خدمات ما استفاده کنید.",
  },
  "international-sim": {
    features: [
      "خرید انواع سیمکارت بین المللی",
      "شارژ سریع و آسان",
      "بدون نیاز به کارت اعتباری بین‌المللی",
      "تحویل در ۲ الی ۴ روز کاری",
    ],
    steps: [
      "ثبت درخواست",
      "بررسی و تایید",
      "انجام خدمت",
      "تایید نهایی",
    ],
    description: "اگر قصد و یا تجربه سفر به کشورهای خارجی را داشته باشید، میدانید که خرید سیم کارت های بین المللی تا چه حد می‌توانند چالش‌های ارتباطی شما را از لحاظ سرویس‌دهی، سهولت تماس، اتصال به اینترنت و همچنین هزینه برطرف سازند!\n\nبا استفاده از خدمات مستر پریمیوم هاب می‌توانید در کوتاه‌ترین زمان ممکن و بدون نیاز به داشتن حساب ارزی و کارت اعتباری بین المللی، تنها با پرداخت معادل ریالی سرویس، معتبرترین سیم کارت‌های بین المللی را خریداری کنید.",
  },
  "virtual-number": {
    features: [
      "پشتیبانی ۲۴ ساعته",
      "بدون نیاز به کارت اعتباری",
      "سرویس سریع",
      "امنیت بالا",
      "مدت زمان تحویل: فوری",
    ],
    steps: [
      "ثبت درخواست",
      "بررسی و تایید",
      "انجام خدمت",
      "تایید نهایی",
    ],
    description: "شماره مجازی یک شماره تلفن واقعی است که بدون نیاز به سیم‌کارت فیزیکی فعالیت می‌کند. از این شماره‌ها می‌توان برای دریافت پیامک‌های تأیید، تماس‌های صوتی و ثبت‌نام در سرویس‌ها و اپلیکیشن‌های مختلف استفاده کرد.\n\nبا استفاده از خدمات مستر پریمیوم هاب می‌توانید به‌سادگی و بدون نیاز به کارت اعتباری بین‌المللی، شماره‌های مجازی معتبر تهیه کرده و از تمامی مزایای آن‌ها بهره‌مند شوید.",
  },
  domain: {
    features: [
      "بدون نیاز به حساب ارزی",
      "پرداخت به صورت ریالی",
      "تضمین خرید",
      "سرعت بالا",
    ],
    steps: [
      "انتخاب دامنه",
      "ثبت نام در مستر پریمیوم هاب",
      "ارسال اطلاعات",
      "پرداخت هزینه",
      "خرید و تحویل",
    ],
    stepsDetail: [
      {
        title: "انتخاب دامنه",
        description: "انتخاب دامنه مورد نظر از سایت های معتبر",
      },
      {
        title: "ثبت نام در مستر پریمیوم هاب",
        description: "ایجاد حساب کاربری در پلتفرم مستر پریمیوم هاب",
      },
      {
        title: "ارسال اطلاعات",
        description: "ارسال لینک و اطلاعات دامنه مورد نظر",
      },
      {
        title: "پرداخت هزینه",
        description: "پرداخت هزینه به صورت ریالی",
      },
      {
        title: "خرید و تحویل",
        description: "انجام خرید و تحویل دامنه به شما",
      },
    ],
    description: "خرید دامنه از وب‌سایت‌های معتبر خارجی مثل GoDaddy، Name.com و سایر ثبت‌کنندگان بین‌المللی",
  },
  host: {
    features: [
      "بدون نیاز به کارت اعتباری",
      "راه‌اندازی سریع",
      "امنیت بالا",
      "مدت زمان تحویل: فوری",
      "قیمت: از ۵ دلار",
    ],
    steps: [
      "ثبت درخواست",
      "بررسی و تایید",
      "انجام خدمت",
      "تایید نهایی",
    ],
    description:
      "هاست خارجی یکی از بهترین گزینه‌ها برای راه‌اندازی وب‌سایت‌های حرفه‌ای است. با خرید هاست از ارائه‌دهندگان معتبر خارجی، از کیفیت بالا، سرعت عالی و پشتیبانی ۲۴ ساعته بهره‌مند شوید.\n\nمستر پریمیوم هاب با ارائه خدمات خرید هاست خارجی، این امکان را فراهم کرده که بدون نیاز به کارت اعتباری بین‌المللی، به بهترین ارائه‌دهندگان هاست جهان دسترسی داشته باشید.",
  },
  amazon: {
    features: [
      "تحویل درب منزل — تحویل کالا در درب منزل شما در ایران",
      "پرداخت ریالی — پرداخت معادل ریالی بدون نیاز به کارت خارجی",
      "خرید از چندین کشور — خرید از آمازون انگلیس، آمریکا، کانادا و سایر کشورها",
      "ضمانت تحویل — ضمانت تحویل کالا یا بازگشت وجه",
      "مدت زمان تحویل — ۴ تا ۸ هفته کاری",
    ],
    steps: [
      "انتخاب کالا از سایت آمازون",
      "کپی لینک محصول و ثبت در پنل",
      "پرداخت هزینه",
      "تحویل درب منزل",
    ],
    description:
      "خرید کالا از فروشگاه اینترنتی آمازون با تحویل درب منزل در کمترین زمان.\n\nبا خدمات مستر پریمیوم هاب، شما می‌توانید به راحتی از فروشگاه اینترنتی آمازون خرید کنید. ما کالای شما را از آمازون خریداری کرده و در ایران به دست شما می‌رسانیم.\n\nدر حال حاضر، خرید از آمازون کشورهای انگلیس، ایتالیا، آمریکا، کانادا، استرالیا، امارات، ترکیه و آلمان توسط مجموعه مستر پریمیوم هاب انجام می‌شود.",
  },
  trendyol: {
    features: [
      "تحویل درب منزل — تحویل کالا در درب منزل شما در ایران",
      "پرداخت ریالی — پرداخت معادل ریالی بدون نیاز به کارت خارجی",
      "مارک‌های جهانی — دسترسی به مارک‌های جهانی و داخلی پوشاک",
      "ضمانت تحویل — ضمانت تحویل کالا یا بازگشت وجه",
      "مدت زمان تحویل — ۴ تا ۶ هفته کاری",
    ],
    steps: [
      "انتخاب کالا از سایت ترندیول",
      "کپی کردن لینک محصول",
      "وارد کردن لینک در پنل مستر پریمیوم هاب",
      "محاسبه قیمت نهایی",
      "پرداخت هزینه",
      "خرید و ارسال کالا",
      "تحویل درب منزل",
    ],
    description:
      "خرید از ترندیول ترکیه یکی از پرتقاضاترین خدمات بین‌المللی در زمینه خرید از فروشگاه‌های اینترنتی است. ترندیول (Trendyol) به‌عنوان یکی از معتبرترین فروشگاه‌های آنلاین در خاورمیانه، با فروش برندهای جهانی و داخلی پوشاک و محصولات متنوع، توانسته جایگاه ویژه‌ای در میان دیگر فروشگاه‌های اینترنتی جهانی به دست آورد.\n\nاکنون شما می‌توانید برای خرید از سایت ترندیول از خدمات مستر پریمیوم هاب استفاده کنید. برای خرید محصولات خود، تنها کافی است لینک کالای مورد نظر را از ترندیول به ما بدهید و پس از انجام کلیه امور مربوط به ارسال، کالا را درب منزل خود دریافت کنید.\n\nمحصولات موجود شامل پوشاک زنان، مردان و کودکان، لوازم جانبی، وسایل ورزشی، لوازم الکترونیکی، عطر و ادکلن، محصولات بهداشتی و آرایشی و بسیاری دیگر از اقلام متنوع می‌شود.",
  },
};

export default function ServiceDetailContent({ service }: ServiceDetailContentProps) {
  const details = serviceDetails[service.id] || {
    features: [
      "خدمات با کیفیت و تضمین شده",
      "پشتیبانی 24 ساعته",
      "پردازش سریع",
      "امنیت بالا",
      "نرخ‌های رقابتی",
      "پردازش در کوتاه‌ترین زمان",
    ],
    steps: [
      "ثبت درخواست",
      "بررسی و تایید",
      "انجام خدمت",
      "تایید نهایی",
    ],
    description: "ما با سال‌ها تجربه در زمینه خدمات ارزی و پرداخت‌های بین‌المللی، آماده ارائه بهترین خدمات به شما هستیم.",
  };

  const aboutId = `about-${service.id}`;
  const featuresId = `features-${service.id}`;
  const stepsId = `steps-${service.id}`;

  return (
    <>
      {/* Description - SEO: section + heading id */}
      {details.description && (
        <section
          aria-labelledby={aboutId}
          className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6 mb-6"
        >
          <h2
            id={aboutId}
            className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-3 sm:mb-4 text-right flex items-center gap-2"
          >
            <span className="w-1 h-6 bg-[#ff5538] rounded" aria-hidden></span>
            درباره {service.label}
          </h2>
          <div className="text-[10px] sm:text-xs md:text-sm text-gray-700 leading-6 sm:leading-7 text-justify sm:text-right space-y-3 sm:space-y-4">
            {details.description.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>
      )}

      {/* Features and Steps - SEO: section + heading ids */}
      <section
        aria-labelledby={`${featuresId} ${stepsId}`}
        className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6 mb-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Features */}
          <div>
            <div className="mb-3 sm:mb-4 text-right flex items-center gap-2">
              <span className="w-1 h-6 bg-[#ff5538] rounded" aria-hidden></span>
              <h2
                id={featuresId}
                className="text-sm sm:text-base md:text-lg font-bold text-gray-900"
              >
                ویژگی‌های {service.label}
              </h2>
            </div>
            <ul className="space-y-2.5 sm:space-y-3 text-right">
              {details.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                  <span className="text-[#ff5538] mt-1 shrink-0">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Steps */}
          <div>
            <h2
              id={stepsId}
              className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-3 sm:mb-4 text-right flex items-center gap-2"
            >
              <span className="w-1 h-6 bg-[#ff5538] rounded" aria-hidden></span>
              {details.stepsDetail
                ? "فرآیند خرید دامنه در مستر پریمیوم هاب"
                : "مراحل انجام کار"}
            </h2>
            {details.stepsDetail ? (
              <p className="text-xs sm:text-sm text-gray-600 text-right mb-4">
                در چند مرحله ساده دامنه خود را خریداری کنید
              </p>
            ) : null}
            <ol className="space-y-2.5 sm:space-y-3 text-right">
              {details.stepsDetail
                ? details.stepsDetail.map((step, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-xs sm:text-sm text-gray-700"
                    >
                      <span className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1a3760] text-white flex items-center justify-center text-xs sm:text-sm font-bold">
                        {index + 1}
                      </span>
                      <div className="pt-0.5">
                        <span className="font-bold text-gray-900 block mb-0.5">
                          {step.title}
                        </span>
                        <span className="text-gray-600">{step.description}</span>
                      </div>
                    </li>
                  ))
                : details.steps.map((step, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-xs sm:text-sm text-gray-700"
                    >
                      <span className="shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#ff5538]/10 text-[#ff5538] flex items-center justify-center text-[10px] sm:text-xs font-bold border-2 border-[#ff5538]/20">
                        {index + 1}
                      </span>
                      <span className="pt-0.5">{step}</span>
                    </li>
                  ))}
            </ol>
          </div>
        </div>

        {details.note && (
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 rounded-lg border-r-4 border-blue-500">
            <p className="text-xs sm:text-sm text-blue-800 text-right">
              <strong>نکته:</strong> {details.note}
            </p>
          </div>
        )}
      </section>
    </>
  );
}

