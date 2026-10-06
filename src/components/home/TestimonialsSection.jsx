import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { createPageUrl } from '@/utils';

const testimonials = [
  {
    name: 'Anonymous',
    quote: 'A Ko Nyan was very patient and took the time to explain everything clearly. At first, I wasn’t sure which country to choose or what steps to take, but after the consultation, I gained new ideas and perspectives that I had never considered before. Thank you so much ako',
  },
  {
    name: 'Anonymous',
    quote: "I wasn't sure if I should book at first, but having the chance to talk to ako Nyan made all the difference. He was so welcoming and genuinely willing to help me work through my ideas. He really helped me gain the clarity I needed to make the right choice for major choosing.",
  },
  {
    name: 'Swe',
    quote: "I will recommend BladeX Education to  my other friends who's looking for the study abroad. Cause your service is not limited just for a single time and which is free consultation for Myanmar people. Not every students are affordable to pay the consultation fees.",
  },
  {
    name: 'Tun',
    quote: 'I received proper guidance and clarification about uOttawa from the consultant, and it was genuinely helpful in my decision-making process. I am satisfied with the consultation overall.',
  },
  {
    name: 'Saw',
    quote: 'Wonderfully appreciate her work and support and sharing her story in Germany. We got to know the pros and cons and much more about what we want to know from there',
  },
  {
    name: 'Pyae',
    quote: "To be honest\nthis is the best consultation l've even had and l wanna thank my consultant\nl was really confused about my academic pathways before but he helped me a lot\nnow l have a clear plan for my studies.\nThank you so much",
  },
  {
    name: 'WUNNA',
    quote: 'I am highly motivated to gain admission to Osaka University and now have a clear roadmap for my preparation. I would like to express my sincere gratitude to my consultant, Dennis, for his valuable advice, guidance, and continuous support. His encouragement has helped me stay focused and confident in pursuing my goal of studying at Osaka University.',
  },
  {
    name: 'Khaing',
    quote: 'Thank you so much for the consultation. These sessions are incredibly helpful for young people. The entire BladeX process is highly systematic and smooth, from selecting the right consultant all the way to the post-session follow-up. I am very impressed with BladeX. Please keep up the fantastic work.',
  },
  {
    name: 'Andre',
    quote: 'Thank you so much Nang Sa! You helped me a lot with reassurance and a clear guide for how to manage college applications.',
  },
  {
    name: 'Ei',
    quote: 'Honestly, I was feeling hopeless at first but after the consultation with Ma Thae Myat Aung, I felt motivated. She was truly inspiring and I appreciate every single advice she gave.',
  },
  {
    name: 'Anonymous',
    quote: 'I really appreciate Ko Thuta for openly sharing his personal experiences and practical advice with us. His insights were honest and realistic rather than sugar-coated, which gave me valuable information to consider when deciding on my next steps. Overall, I found the session very helpful. I also sincerely appreciate the page for serving as a bridge, offering support, and showing a path forward for those who are eager to learn but may feel stuck or unsure about their next steps.',
  },
  {
    name: 'MYAT',
    quote: 'I really appreciate Ko Thuta Ye Moe for his detailed explanations and advices throughout this one-on-one education consultation program. Despite the short timeframe, he covered all the mandatory requirements for the whole process of university application in Australia and gave effective answers to all our questions. Thank you so much for your time. I do hope for a more successful journey ahead.',
  },
  {
    name: 'Phoo',
    quote: "The session was well-structured and really helpful. Thank you so much for the encouraging session today. The advice on PhD admissions and scholarship strategies was clear, practical and gave me great direction on what steps to take next based on the consultant's experience. I really appreciate your time and dedication to guiding students on our study abroad journeys. Hope to have an opportunity to be accepted as a mentee in the upcoming mentorship program. Wishing you and the team continued success!",
  },
  {
    name: 'Chu',
    quote: "BladeX is one of the most interesting and effective non-profit educational website I've seen so far in Myanmar and I find these resources, time of consultants, efforts & follow-ups surprisingly impactful for youths who are still trying to figure out which destination they should thrive for. Appreciate for your dedication!",
  },
  {
    name: 'Khin',
    quote: 'I really want to appreciate consultants who are willing to share their time for students who want to study abroad despite being busy with your personal lives. It means a lot to hear study abroad experience and guidance from someone of your own ethnicity and that gave me a chance to consider if the path that I have chosen is realistic or not. And thank you to the BladeX team for getting back to students so quickly via email and for creating such a supportive community.',
  },
  {
    name: 'Shine',
    quote: 'I really appreciate the support and guidance I received from Ama Hsu Myat Pwint Wai throughout our one-on-one consulting sessions. She was patient, understanding, and always willing to explain things clearly whenever I had questions. Our sessions also gave me new ideas and options that I had not considered before, which helped me look at my study abroad plans from different perspectives and make more informed decisions.\n\nThank you, Ama Hsu Myat Pwint Wai, for your time, effort, and encouragement throughout this journey. Your guidance has been really valuable to me, and I’m grateful to have had your support. I hope BladeX Education continues to help more students discover new opportunities and achieve their study abroad goals.',
  },
  {
    name: 'Hsu',
    quote: 'သေသေချာချာလေး ပြောပြပေးလို့ တကယ့်ကို ကျေးဇူးတင်ပါတယ်။ ပြောပြပေးတဲ့ အကြောင်းအရာတွေက ညီမတွက်တကယ်ထည့်သွင်းစဉ်းစားဖို့လိုတာတွေပြောပြပေးလို့ကျေးဇူးတင်ပါတယ်ရှင့်',
  },
  {
    name: 'May',
    quote: 'အချိန်ပေးပြီး သေသေချာချာပြောပြပေး၊ လမ်းညွှန်ပေး၊ ဆွေးနွေးပေးခဲ့တဲ့ အစ်ကို Dennis ကို တကယ်ကျေးဇူးတင်ရပါတယ်။ Blade X Education က အခုလို study abroadအတွက် consultation session တွေ စီစဉ်ပေးလို့ တကယ်ဝမ်းသာရပါတယ်။ ကျေးဇူးလည်း တင်ပါတယ်ရှင်။',
  },
  {
    name: 'Chaw',
    quote: 'အများကြီး Motivation တွေတိုးခဲ့ပါတယ်။ အခုလိုစီစဥ်ပေးတဲ့ BladeX Educationကိုရော ရှင်းပြပေးခဲ့တဲ့ အကို ကိုရော ကျေးဇူးတင်ပါတယ်ရှင်။',
  },
  {
    name: 'Kaung',
    quote: 'Consultant   Ma Thae Myat Aung မှ သူမ၏ အတွေ့အကြုံများကိုအခြေခံ၍ အကောင်းဆုံးအပြည့်စုံဆုံး အကြံပြုခဲ့ပါသည်\nကျောင်းသားနှင့်မိဘအတွက် တန်ဖိုးရှိသော အကြံပြုချက်များရရှိခဲ့၍ကျေးဇူးအထူးတင်ရှိပါသည်',
  },
];

const cardTones = [
  {
    card: 'border-blue-100 bg-gradient-to-br from-blue-50 via-sky-50 to-white',
    quote: 'text-blue-300',
    divider: 'border-blue-100',
  },
  {
    card: 'border-emerald-100 bg-gradient-to-br from-emerald-50 via-teal-50 to-white',
    quote: 'text-emerald-300',
    divider: 'border-emerald-100',
  },
  {
    card: 'border-violet-100 bg-gradient-to-br from-violet-50 via-purple-50 to-white',
    quote: 'text-violet-300',
    divider: 'border-violet-100',
  },
];

function TestimonialCard({ item, toneIndex }) {
  const tone = cardTones[toneIndex % cardTones.length];

  return (
    <li className={`overflow-hidden rounded-2xl border p-5 shadow-[0_8px_24px_-18px_rgba(15,23,42,0.18)] ${tone.card}`}>
      <span className={`mb-2 block font-serif text-3xl leading-none ${tone.quote}`} aria-hidden>
        &ldquo;
      </span>
      <p className="whitespace-pre-line break-words text-sm leading-6 text-slate-600">{item.quote}</p>
      <div className={`mt-4 border-t pt-3 ${tone.divider}`}>
        <p className="text-sm font-semibold text-slate-900">{item.name}</p>
      </div>
    </li>
  );
}

function TestimonialColumn({ items, direction, duration }) {
  return (
    <div className="testimonial-column">
      <div className="testimonial-track" style={{ '--testimonial-duration': duration, '--testimonial-direction': direction }}>
        {[0, 1].map((copy) => (
          <ul className="testimonial-list" key={copy} aria-hidden="true">
            {items.map((item, index) => (
              <TestimonialCard key={`${copy}-${index}`} item={item} toneIndex={item.toneIndex} />
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const columns = [0, 1].map((column) =>
    testimonials
      .map((item, index) => ({ ...item, toneIndex: index }))
      .filter((_, index) => index % 2 === column),
  );

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24">
      <style>{`
        .testimonials-split {
          display: grid;
          gap: 2.5rem;
        }
        @media (min-width: 768px) {
          .testimonials-split {
            grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.4fr);
            align-items: stretch;
            gap: 3rem;
          }
        }
        @media (min-width: 1024px) {
          .testimonials-split { gap: 4rem; }
        }
        .testimonials-cards {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: 1rem;
        }
        .testimonials-cards > :nth-child(2) {
          display: none;
        }
        @media (min-width: 640px) {
          .testimonials-cards {
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
            gap: 1.25rem;
          }
          .testimonials-cards > :nth-child(2) {
            display: block;
          }
        }
        .testimonial-column {
          height: 39rem;
          overflow: hidden;
          -webkit-mask-image: linear-gradient(to bottom, transparent, #000 8%, #000 92%, transparent);
          mask-image: linear-gradient(to bottom, transparent, #000 8%, #000 92%, transparent);
        }
        .testimonial-track {
          display: flex;
          flex-direction: column;
          animation: testimonial-scroll var(--testimonial-duration) linear infinite;
          animation-direction: var(--testimonial-direction);
          will-change: transform;
        }
        .testimonial-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          flex: none;
          list-style: none;
          margin: 0;
          padding: 0 0 1rem;
        }
        .testimonial-column:hover .testimonial-track,
        .testimonial-column:focus-within .testimonial-track {
          animation-play-state: paused;
        }
        @keyframes testimonial-scroll {
          to { transform: translateY(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .testimonial-track { animation: none; }
          .testimonial-list[aria-hidden="true"]:nth-child(2) { display: none; }
          .testimonial-column { height: auto; max-height: 39rem; overflow-y: auto; mask-image: none; }
        }
      `}</style>

      <div className="testimonials-split mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col justify-between py-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">Student Stories</span>
            <h2 className="mt-4 max-w-xl text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl">
              What students say about us
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-slate-600">
              Honest words from students finding their next step with BladeX Education.
            </p>
          </div>

          <div className="mt-8 border-t border-slate-200 pt-6 md:mt-12">
            <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
              <div>
                <p className="text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">500+</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Students consulted</p>
              </div>
              <Link
                to={`${createPageUrl('Consultants')}?browse=all`}
                className="inline-flex items-center gap-1.5 pb-0.5 text-sm font-medium text-slate-900 underline decoration-slate-400 underline-offset-[5px] transition-colors hover:text-blue-700 hover:decoration-blue-700"
              >
                talk to our consultants now
                <ArrowUpRight className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
              </Link>
            </div>
          </div>
        </div>

        <div className="relative min-w-0">
          <ul className="sr-only">
            {testimonials.map((item, index) => (
              <li key={index}>
                <blockquote>{item.quote}</blockquote>
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
          <div className="testimonials-cards">
            {columns.map((items, index) => (
              <TestimonialColumn
                key={index}
                items={items}
                direction={index === 1 ? 'reverse' : 'normal'}
                duration={`${60 + index * 12}s`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
