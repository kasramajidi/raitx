import ContactBadge from "./ContactBadge";
import ContactCards from "./ContactCards";

export default function ContactHeader() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12 lg:mb-16 items-start lg:items-center">
      <div className="order-1 lg:order-1">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 md:mb-4 text-right leading-tight sm:leading-normal">
          <span style={{ color: '#ff5538' }}>ما اینجاییم تا شبانه روزی</span>{" "}
          <span className="text-blue-900">پاسخگوی شما باشیم ...</span>
        </h1>
        <div className="text-right text-gray-700 text-[11px] sm:text-xs md:text-sm leading-6 sm:leading-7 md:leading-8 mt-2 sm:mt-0">
          <p className="text-justify sm:text-right">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها است.
          </p>
        </div>
      </div>

      <div className="order-2 lg:order-2 w-full">
        <ContactBadge />
        <ContactCards />
      </div>
    </div>
  );
}

