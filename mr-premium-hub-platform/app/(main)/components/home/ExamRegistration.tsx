"use client";

interface ExamCard {
  title: string;
  description: string;
}

const exams: ExamCard[] = [
  {
    title: "University",
    description: "ثبت مقاله و خوابگاه",
  },
  {
    title: "Application Fee",
    description: "اپلیکیشن فی",
  },
  {
    title: "GRE",
    description: "آزمون GRE",
  },
  {
    title: "TOFEL",
    description: "ثبت نام تافل",
  },
];

export default function ExamRegistration() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8 md:mb-12">
          ثبت نام آزمون های بین المللی
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {exams.map((exam, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow cursor-pointer group text-center"
            >
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                {exam.title}
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                {exam.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

