import React, { useEffect, useMemo, useState } from "react";

export default function WeddingInvitationSite() {
    const timeline = [
    {
      time: "15:00",
      title: "Сбор гостей",
      text: "Встречаемся, обнимаемся, знакомимся и начинаем этот день с лёгкого летнего настроения и велком дринка",
      icon: "☀️",
    },
    {
      time: "16:00",
      title: "Церемония",
      text: "Самый важный и трогательный момент. Берите с собой улыбки и, на всякий случай, платочки",
      icon: "💍",
    },
    {
      time: "17:30",
      title: "Ужин и праздник",
      text: "Вкусная еда, тёплые слова, танцы, смех и много красивых моментов вместе",
      icon: "🥂",
    },
    {
      time: "23:30",
      title: "Отъезд трансфера",
      text: "Будем прощаться неохотно, но счастливо — с ощущением очень хорошего дня",
      icon: "✨",
    },
  ];

  const palette = [
    "#B7AE7E",
    "#D7C9A5",
    "#EEE3CF",
    "#8A9A71",
    "#59694F",
    "#C8D7E8",
    "#E4C6C9",
    "#B89F8D",
  ];

  const travelIcons = [];

  const weddingDate = useMemo(() => new Date("2026-06-04T16:00:00+02:00"), []);
  const [countdown, setCountdown] = useState({ days: "00", hours: "00", minutes: "00", seconds: "00" });
  const [opened, setOpened] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [musicOn, setMusicOn] = useState(false);
  const [formData, setFormData] = useState({ name: "", attendance: "yes", transfer: "yes", diet: "", alcohol: [], partner: "", notes: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const googleScriptURL = "https://script.google.com/macros/s/AKfycbyU-3uQSciz9jIL9gYhdDAjIe3bwh4sPiTZjjL4FcvHGiPHHkBwY85av8sdKK75vTHj/exec";

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "alcohol") {
      setFormData(prev => ({
        ...prev,
        alcohol: checked ? [...prev.alcohol, value] : prev.alcohol.filter(a => a !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value
      }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(googleScriptURL, {
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setFormSubmitted(true);
        setFormData({ name: "", attendance: "yes", transfer: "yes", diet: "", alcohol: [], partner: "", notes: "" });
        setTimeout(() => setFormSubmitted(false), 3000);
      }
    } catch (error) {
      console.error("Ошибка отправки:", error);
    }
  };

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const diff = weddingDate.getTime() - now.getTime();
      if (diff <= 0) {
        setCountdown({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setCountdown({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    };
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [weddingDate]);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY || 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("revealed");
        });
      },
      { threshold: 0.15 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [opened]);

  useEffect(() => {
    const audio = document.getElementById("wedding-audio");
    if (!audio) return;
    if (musicOn) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [musicOn]);

  const mapSrc = "https://www.google.com/maps?q=Yard%20Resort%2C%20Ke%20Tvrzi%207%2C%20250%2072%20P%C5%99edboj-Kojetice%20u%20Prahy&z=14&output=embed";
  const mapLink = "https://maps.google.com/?q=Yard%20Resort%2C%20Ke%20Tvrzi%207%2C%20250%2072%20P%C5%99edboj-Kojetice%20u%20Prahy";
  const rsvpLink = "https://forms.gle/PASTE_YOUR_FORM_LINK";

  return (
    <div className="min-h-screen bg-[#FAF7F1] text-[#6B7258]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Inter:wght@300;400;500;600&display=swap');
        html { scroll-behavior: smooth; }
        body { background: #FAF7F1; }
        .title-font { font-family: 'Cormorant Garamond', serif; }
        .body-font { font-family: 'Inter', sans-serif; }
        .paper { background: linear-gradient(180deg, rgba(255,255,255,0.7), rgba(255,255,255,0.45)); }
        .reveal { opacity: 0; transform: translateY(24px); transition: opacity .8s ease, transform .8s ease; }
        .revealed { opacity: 1 !important; transform: translateY(0) !important; }
        .floaty { animation: floaty 6s ease-in-out infinite; }
        .soft-pulse { animation: pulse 2.8s ease-in-out infinite; }
        .route-dash { stroke-dasharray: 11 10; animation: dash 22s linear infinite; }
        .postcard { box-shadow: 0 10px 30px rgba(112, 98, 64, 0.08); border: 1px solid rgba(196, 183, 157, 0.45); }
        .sketch-label { letter-spacing: 0.16em; text-transform: uppercase; font-size: 11px; color: #939783; }
        .icon-stamp { opacity: 0.9; filter: saturate(0.85); }
        .map-paper { background:
          radial-gradient(circle at 20% 30%, rgba(188,170,132,0.18), transparent 22%),
          radial-gradient(circle at 78% 62%, rgba(134,156,122,0.14), transparent 24%),
          linear-gradient(180deg, #efe6d6 0%, #eadfcf 100%);
        }
        .map-lines::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(115deg, transparent 0 18%, rgba(140,120,84,0.08) 18.5% 19%, transparent 19.5% 100%),
            linear-gradient(25deg, transparent 0 38%, rgba(140,120,84,0.06) 38.5% 39%, transparent 39.5% 100%),
            radial-gradient(circle at 22% 28%, rgba(126,135,100,0.13) 0 2px, transparent 3px),
            radial-gradient(circle at 68% 66%, rgba(126,135,100,0.13) 0 2px, transparent 3px);
          opacity: .75;
          pointer-events: none;
        }
        .micro-float { animation: microFloat 5.5s ease-in-out infinite; }
        .micro-float-delay { animation: microFloat 6.5s ease-in-out 1.2s infinite; }
        .card-hover { transition: transform .45s ease, box-shadow .45s ease, background-color .45s ease; }
        .card-hover:hover { transform: translateY(-3px); box-shadow: 0 14px 34px rgba(112, 98, 64, 0.12); }
        .button-breathe { animation: breathe 3.2s ease-in-out infinite; }
        .shimmer-line {
          position: relative;
          overflow: hidden;
        }
        .shimmer-line::after {
          content: "";
          position: absolute;
          top: 0;
          left: -120%;
          width: 60%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.45), transparent);
          animation: shimmer 5.5s ease-in-out infinite;
        }
        @keyframes microFloat { 0%,100% { transform: translateY(0) rotate(var(--rot,0deg)); } 50% { transform: translateY(-6px) rotate(var(--rot,0deg)); } }
        @keyframes breathe { 0%,100% { transform: scale(1); } 50% { transform: scale(1.04); } }
        @keyframes shimmer { 0% { left: -120%; } 55%,100% { left: 140%; } }
        @keyframes floaty { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.02); } }
        @keyframes dash { to { stroke-dashoffset: -260; } }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
        @keyframes inkReveal {
          0% {
            opacity: 0;
            filter: blur(6px);
            transform: translateY(10px);
          }
          60% {
            opacity: 1;
            filter: blur(2px);
          }
          100% {
            opacity: 1;
            filter: blur(0);
            transform: translateY(0);
          }
        }

        .ink-reveal {
          animation: inkReveal 1.6s ease forwards;
        }
        }
      `}</style>

      <audio id="wedding-audio" loop>
        <source src="/audio/cosa-sei.mp3" type="audio/mpeg" />
      </audio>

      {!opened && (
        <div className="fixed inset-0 z-50 bg-[#F4EEE2] flex items-center justify-center px-6">
          <div className="max-w-sm w-full relative">
            <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-[#e7dfce] blur-2xl opacity-80" />
            <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-[#dfe8e5] blur-2xl opacity-70" />

            <div className="rounded-[2.2rem] shadow-2xl border border-[#E6DED1] bg-white overflow-hidden relative postcard card-hover">
              <div className="h-72 relative map-paper map-lines flex items-end justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'url(/images/old-map-texture.png)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div className="absolute top-8 right-6 w-12 h-12 rounded-full border border-[#bfae8a] opacity-60" />
                <div className="absolute top-20 left-7 w-16 h-[2px] bg-[#cdbb98]/60 rotate-[22deg]" />
                <div className="absolute top-24 left-16 w-14 h-[2px] bg-[#cdbb98]/50 rotate-[-18deg]" />
                <div className="absolute bottom-24 left-8 text-[#8e8b7a] opacity-70 micro-float" style={{ ['--rot']: '-8deg' }}>✦</div>
                <div className="absolute bottom-28 right-10 text-[#8e8b7a] opacity-70 micro-float-delay" style={{ ['--rot']: '7deg' }}>✦</div>
                <div className="absolute inset-x-0 top-0 h-36 bg-[#d8c29a] origin-top shadow-sm" style={{ clipPath: 'polygon(0 0,100% 0,50% 100%)' }} />
                <div className="absolute inset-x-8 top-8 h-20 rounded-[1.2rem] border border-[#d6c5a7]/70 opacity-60" />
                <div className="absolute left-5 bottom-[165px] w-16 h-16 rounded-[1.1rem] overflow-hidden opacity-55 rotate-[-8deg] shadow-sm border border-white/40 micro-float" style={{ ['--rot']: '-8deg' }}>
                  <img src="/images/paris-normandy-watercolor.png" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="absolute right-7 bottom-[170px] w-16 h-16 rounded-[1.1rem] overflow-hidden opacity-55 rotate-[7deg] shadow-sm border border-white/40 micro-float-delay" style={{ ['--rot']: '7deg' }}>
                  <img src="/images/tenerife-watercolor.png" alt="" className="w-full h-full object-cover" />
                </div>

                <div className="relative z-10 text-center px-8 pb-8">
                  <div className="title-font text-5xl text-[#697256]">Илья & Маша</div>
                  <button
                    onClick={() => setOpened(true)}
                    className="body-font text-[#8C907E] mt-4 leading-7 shimmer-line inline-block px-3 py-2 rounded-full bg-white/40 backdrop-blur-[2px] border border-white/40 card-hover"
                  >
                    Открыть приглашение в наше свадебное путешествие
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="relative overflow-hidden body-font">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-8 left-0 w-48 h-48 rounded-full bg-[#EAE6DB] blur-3xl opacity-70"
            style={{ transform: `translateY(${scrollY * 0.06}px)` }}
          />
          <div
            className="absolute top-40 right-0 w-52 h-52 rounded-full bg-[#E5EFEF] blur-3xl opacity-60"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          />
          <div
            className="absolute top-[75rem] left-[-2rem] w-56 h-56 rounded-full bg-[#F1E7DD] blur-3xl opacity-70"
            style={{ transform: `translateY(${scrollY * 0.08}px)` }}
          />
          <div
            className="absolute top-[150rem] right-[-2rem] w-56 h-56 rounded-full bg-[#E6ECF4] blur-3xl opacity-70"
            style={{ transform: `translateY(${scrollY * 0.07}px)` }}
          />

          <img
            src="/images/tenerife-watercolor.png"
            alt=""
            className="hidden md:block absolute top-[12rem] left-4 w-64 h-64 object-cover opacity-21 rounded-none"
            style={{
              transform: `translateY(${scrollY * 0.04}px)`,
              maskImage: 'radial-gradient(ellipse at center, black 0%, black 50%, transparent 85%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, black 50%, transparent 85%)',
            }}
          />
          <img
            src="/images/paris-normandy-watercolor.png"
            alt=""
            className="hidden md:block absolute top-[28rem] right-4 w-60 h-60 object-cover opacity-21 rounded-none"
            style={{
              transform: `translateY(${scrollY * 0.03}px)`,
              maskImage: 'radial-gradient(ellipse at center, black 0%, black 50%, transparent 85%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, black 50%, transparent 85%)',
            }}
          />
          <img
            src="/images/morocco-watercolor.png"
            alt=""
            className="hidden md:block absolute top-[55rem] right-6 w-72 h-72 object-cover opacity-21 rounded-none"
            style={{
              transform: `translateY(${scrollY * 0.05}px)`,
              maskImage: 'radial-gradient(ellipse at center, black 0%, black 50%, transparent 85%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, black 50%, transparent 85%)',
            }}
          />
          <img
            src="/images/iceland-watercolor.png"
            alt=""
            className="hidden md:block absolute top-[85rem] left-6 w-72 h-72 object-cover opacity-21 rounded-none"
            style={{
              transform: `translateY(${scrollY * 0.04}px)`,
              maskImage: 'radial-gradient(ellipse at center, black 0%, black 50%, transparent 85%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, black 50%, transparent 85%)',
            }}
          />
          <img
            src="/images/georgia-watercolor.png"
            alt=""
            className="hidden md:block absolute top-[120rem] right-8 w-60 h-60 object-cover opacity-21 rounded-none"
            style={{
              transform: `translateY(${scrollY * 0.045}px)`,
              maskImage: 'radial-gradient(ellipse at center, black 0%, black 50%, transparent 85%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, black 50%, transparent 85%)',
            }}
          />
          <img
            src="/images/south-africa-watercolor.png"
            alt=""
            className="hidden md:block absolute top-[150rem] left-8 w-64 h-64 object-cover opacity-21 rounded-none"
            style={{
              transform: `translateY(${scrollY * 0.03}px)`,
              maskImage: 'radial-gradient(ellipse at center, black 0%, black 50%, transparent 85%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, black 50%, transparent 85%)',
            }}
          />
          <img
            src="/images/portugal-watercolor.png"
            alt=""
            className="hidden md:block absolute top-[180rem] right-6 w-72 h-72 object-cover opacity-21 rounded-none"
            style={{
              transform: `translateY(${scrollY * 0.05}px)`,
              maskImage: 'radial-gradient(ellipse at center, black 0%, black 50%, transparent 85%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, black 50%, transparent 85%)',
            }}
          />
        </div>

        <main className="relative z-10 mx-auto max-w-md px-5 pb-20 pt-8">
          <section className="text-center pt-8 pb-12 reveal" data-reveal>
            <div className="postcard rounded-[2rem] bg-white/80 paper overflow-hidden">
             <div className="relative border-b border-[#EEE6D8] overflow-hidden">
              {/* фото */}
              <div className="relative">
                <img
                  src="/images/hero-travel-watercolor.png"
                  alt="Илья и Маша"
                  className="w-full h-[420px] object-cover rounded-[1.4rem]"
                />

                {/* затемнение сверху */}
                <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/30 to-transparent rounded-t-[1.4rem]" />

                {/* затемнение снизу */}
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/30 to-transparent rounded-b-[1.4rem]" />

                {/* верхний текст */}
                <div className="absolute top-1 left-0 right-0 text-center px-6">
                  <h1 className="title-font text-5xl text-white drop-shadow-lg">
                    Илья и Маша
                  </h1>
                </div>

                {/* нижний текст */}
                <div className="absolute bottom-6 left-0 right-0 text-center px-6">
                  <p className="uppercase tracking-[0.24em] text-sm text-white/90 leading-6 drop-shadow">
                    дорогие друзья! <br />
                    мы с любовью приглашаем вас на нашу свадьбу 💛
                  </p>
                </div>
              </div>

              {/* текст под фото */}
              <div className="px-6 py-8 text-center">
                <div className="max-w-xs mx-auto px-4 py-3 rounded-[1.3rem] bg-[#8A9A71]/20 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-md border">
                  
                  <p className="ink-reveal [animation-delay:0.6s] opacity-70 text-[#5F664F] leading-8 text-[17px]">
                    Мы много путешествовали вместе, и теперь зовём вас
                    в самое главное путешествие нашей жизни
                  </p>

                </div>
              </div>

            </div>

            <div className="grid grid-cols-2 border-b border-[#EEE6D8]">
              <div className="border-r border-[#EEE6D8]">
                <div className="h-[190px] px-5 py-5 grid grid-rows-[56px_1fr] text-center">
                  <div className="flex items-center justify-center">
                    <div className="inline-block bg-[#8A9A71]/20 rounded-full px-4 py-2">
                      <div className="sketch-label text-[#5F664F]">Наша дата</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="title-font text-4xl text-[#6F775C] leading-tight">
                      4 июня
                      <br />
                      2026
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="h-[190px] px-5 py-5 grid grid-rows-[56px_1fr] text-center">
                  <div className="flex items-center justify-center">
                    <div className="inline-block bg-[#8A9A71]/20 rounded-full px-4 py-2">
                      <div className="sketch-label text-[#5F664F] whitespace-nowrap">
                        Для настроения
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setMusicOn((v) => !v)}
                        className="w-12 h-12 rounded-full bg-[#F6F1E7] shadow-sm border border-[#E8E1D3] text-[#6F775C] text-lg soft-pulse card-hover"
                      >
                        {musicOn ? "❚❚" : "▶"}
                      </button>

                      <div className="text-left">
                        <div className="text-[#6F775C] text-[15px] leading-6">Cosa Sei</div>
                        <div className="text-sm text-[#9B9F8E]">включить</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5">
              <div className="bg-[#8A9A71]/10 backdrop-blur-sm rounded-[1.4rem] px-4 py-5 shadow-sm border border-white/40">
                <div className="sketch-label text-center text-base">
                  Свадьба уже через
                </div>

                <div className="grid grid-cols-4 gap-3 mt-4 max-w-sm mx-auto">
                  {[
                    [countdown.days, "дней"],
                    [countdown.hours, "часов"],
                    [countdown.minutes, "минут"],
                    [countdown.seconds, "секунд"],
                  ].map(([num, label]) => (
                    <div
                      key={label}
                      className="rounded-[1.2rem] bg-[#FCFAF6]/95 border border-[#E8E1D4] py-4 text-center card-hover shadow-sm"
                    >
                      <div className="title-font text-3xl text-[#6F775C]">{num}</div>
                      <div className="text-[10px] uppercase tracking-[0.18em] text-[#9B9F8E] mt-1">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

          <section className="py-10 reveal" data-reveal>
            <div className="postcard rounded-[2rem] bg-white/80 paper overflow-hidden relative">
              <div className="px-6 pt-7 pb-5 border-b border-[#EEE6D8] text-center relative z-10">
                <h2 className="title-font text-5xl text-[#6F775C] mt-2">График дня</h2>
                <p className="mt-4 text-[#8C907E] leading-8 max-w-sm mx-auto">
                  Вот как будет разворачиваться наш день — присоединяйтесь к каждому моменту!
                </p>
              </div>
              <div className="p-6 space-y-3 relative z-10">
                {timeline.map((event, idx) => (
                  <div
                    key={idx}
                    className="relative pb-6 border-b border-[#EEE6D8] last:border-b-0 text-center"
                  >
                    {/* Иконка — абсолютно слева */}
                    <div className="absolute left-0 top-2 text-3xl">
                      {event.icon}
                    </div>

                    {/* Контент — по центру */}
                    <div className="mx-auto max-w-xs">
                      <div className="text-sm uppercase tracking-[0.16em] text-[#939783] font-semibold">
                        {event.time}
                      </div>

                      <div className="title-font text-xl text-[#6F775C] mt-1">
                        {event.title}
                      </div>

                      <p className="text-[#8C907E] text-sm mt-2 leading-6">
                        {event.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-10 reveal" data-reveal>
            <div className="postcard rounded-[2rem] bg-white/80 paper overflow-hidden relative">
              <div className="px-6 pt-7 pb-5 border-b border-[#EEE6D8] text-center relative z-10">
                <h2 className="title-font text-5xl text-[#6F775C] mt-2">Дресс-код</h2>
                <p className="mt-4 text-[#8C907E] leading-8 max-w-sm mx-auto">
                  Нам очень близка лёгкая летняя эстетика путешествий. Будем рады видеть вас в летних платьях, сарафанах, льняных костюмах и мягких природных оттенках.
                </p>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-4 gap-3 mt-4 max-w-sm mx-auto">
                  {palette.map((color) => (
                    <div key={color} className="aspect-square rounded-[1.4rem] shadow-sm border border-white/50" style={{ background: color }} />
                  ))}
                </div>
                <img src="/images/download.png" alt="Примеры костюмов" className="w-full mt-6 rounded-[1.4rem]" />
                <p className="mt-6 text-center text-[#9B9F8E] leading-7">
                  Песочные, кремовые, зелёные, голубые, пудровые и другие тёплые природные тона будут особенно уместны.
                </p>
              </div>
            </div>
          </section>

          <section className="py-10 reveal" data-reveal>
            <div className="postcard rounded-[2rem] bg-white/80 paper overflow-hidden relative">
              <img src="/images/morocco-watercolor.png" alt="" className="absolute top-6 -right-10 w-28 h-28 object-cover rounded-[2rem] opacity-14 blur-[1px] rotate-[7deg]" style={{ maskImage: 'radial-gradient(ellipse at center, black 0%, black 70%, transparent 95%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, black 70%, transparent 95%)' }} />
              <div className="px-6 pt-7 pb-5 border-b border-[#EEE6D8] text-center relative z-10">
                <h2 className="title-font text-5xl text-[#6F775C] mt-2">Несколько деталей</h2>
              </div>
              <div className="p-6 text-[#8C907E] leading-8 space-y-4 relative z-10">
                <p>Если вам нужен обратный трансфер, пожалуйста, отметьте это в анкете — мы всё учтём заранее.</p>
                <p>За года, проведенные вместе, мы накопили кучу вещей, поэтому, пожалуйста, не дарите нам материальные подарки. Очень оценим Вашу финансовую помощь — подарок на наш желанный медовый месяц. Спасибо 💛</p>
                <p>Также просим не приносить с собой букеты и длинные тосты.</p>
                <p>Главное для нас — чтобы вы были рядом, чувствовали себя легко и наслаждались этим днём вместе с нами.</p>
              </div>
            </div>
          </section>

          <section className="py-10 reveal" data-reveal>
            <div className="postcard rounded-[2rem] bg-white/80 paper overflow-hidden relative">
              <div className="px-6 pt-7 pb-5 border-b border-[#EEE6D8] text-center relative z-10">
                <h2 className="title-font text-5xl text-[#6F775C] mt-2">Место</h2>
                <p className="mt-4 text-[#8C907E] leading-8 max-w-sm mx-auto">
                  Свадьба состоится в Yard Resort — уютном месте среди природы, подходящем идеально для нашего празднества
                </p>
              </div>
              <div className="p-5 relative z-10">
                <div className="rounded-[1.4rem] bg-[#F6F1E7] p-4 border border-[#E8E1D3] mb-4">
                  <p className="text-sm text-[#6F775C] leading-7">
                    <span className="font-semibold">Yard Resort</span><br/>
                    Ke Tvrzi 7<br/>
                    250 72 Předboj-Kojetice<br/>
                    Чехия
                  </p>
                  <a href={mapLink} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-[#7E8764] underline text-sm hover:text-[#6F775C] transition">
                    Открыть в карте
                  </a>
                </div>
                <iframe 
                  src={mapSrc}
                  width="100%" 
                  height="280" 
                  style={{ border: 0, borderRadius: '1.4rem' }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-[1.4rem]"
                />
              </div>
            </div>
          </section>

          <section className="py-10 reveal" data-reveal>
            <div className="postcard rounded-[2rem] bg-white/85 paper overflow-hidden relative">
              <div className="px-6 pt-7 pb-5 border-b border-[#EEE6D8] text-center relative z-10">
                <h2 className="title-font text-5xl text-[#6F775C] mt-2">Анкета</h2>
                <p className="mt-4 text-[#8C907E] leading-8 max-w-sm mx-auto">
                  Пожалуйста, заполните форму, чтобы подтвердить своё присутствие и помочь нам всё организовать удобно
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="m-6 mt-8 rounded-[2rem] bg-white/90 border border-[#E7DFD1] shadow-sm p-6 space-y-5 relative z-10">
                <div>
                  <label className="text-[#8C907E] mb-2 block">Ваше имя и фамилия *</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleFormChange}
                    required
                    placeholder="Введите имя и фамилию"
                    className="w-full h-14 rounded-full border border-[#DBD3C4] bg-[#FCFBF8] px-4 text-[#6F775C] placeholder-[#B0B0A0]" 
                  />
                </div>
                <div>
                  <label className="text-[#8C907E] mb-3 block">Сможете ли вы быть с нами? *</label>
                  <div className="space-y-2">
                    <label className="flex items-center text-[#8C907E]">
                      <input 
                        type="radio" 
                        name="attendance" 
                        value="yes" 
                        checked={formData.attendance === "yes"}
                        onChange={handleFormChange}
                        className="mr-3"
                      />
                      Да, с радостью
                    </label>
                    <label className="flex items-center text-[#8C907E]">
                      <input 
                        type="radio" 
                        name="attendance" 
                        value="no" 
                        checked={formData.attendance === "no"}
                        onChange={handleFormChange}
                        className="mr-3"
                      />
                      К сожалению, нет
                    </label>
                  </div>
                </div>
                <div>
                  <label className="text-[#8C907E] mb-3 block">Мне нужен обратный трансфер</label>
                  <div className="space-y-2">
                    <label className="flex items-center text-[#8C907E]">
                      <input 
                        type="radio" 
                        name="transfer" 
                        value="yes" 
                        checked={formData.transfer === "yes"}
                        onChange={handleFormChange}
                        className="mr-3"
                      />
                      Да
                    </label>
                    <label className="flex items-center text-[#8C907E]">
                      <input 
                        type="radio" 
                        name="transfer" 
                        value="no" 
                        checked={formData.transfer === "no"}
                        onChange={handleFormChange}
                        className="mr-3"
                      />
                      Нет
                    </label>
                  </div>
                </div>
                <div>
                  <label className="text-[#8C907E] mb-2 block">Диетические ограничения</label>
                  <input 
                    type="text" 
                    name="diet" 
                    value={formData.diet} 
                    onChange={handleFormChange}
                    placeholder="(если есть)"
                    className="w-full h-12 rounded-full border border-[#DBD3C4] bg-[#FCFBF8] px-4 text-[#6F775C] placeholder-[#B0B0A0]" 
                  />
                </div>
                <div>
                  <label className="text-[#8C907E] mb-3 block">Выберите алкогольные напитки (можно несколько)</label>
                  <div className="space-y-2">
                    {["Игристое", "Вино белое", "Вино красное", "Виски", "Коньяк", "Водка"].map(drink => (
                      <label key={drink} className="flex items-center text-[#8C907E]">
                        <input 
                          type="checkbox" 
                          name="alcohol" 
                          value={drink}
                          checked={formData.alcohol.includes(drink)}
                          onChange={handleFormChange}
                          className="mr-3"
                        />
                        {drink}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-[#8C907E] mb-2 block">Примечание о партнере</label>
                  <textarea 
                    name="partner" 
                    value={formData.partner} 
                    onChange={handleFormChange}
                    placeholder="Если ваша вторая половинка не получила отдельного приглашения, пожалуйста, укажите её имя и фамилию"
                    rows="2"
                    className="w-full rounded-[1.2rem] border border-[#DBD3C4] bg-[#FCFBF8] px-4 py-3 text-[#6F775C] placeholder-[#B0B0A0] resize-none" 
                  />
                </div>
                <div>
                  <label className="text-[#8C907E] mb-2 block">Хочу вам сказать...</label>
                  <textarea 
                    name="notes" 
                    value={formData.notes} 
                    onChange={handleFormChange}
                    placeholder="Напишите любые пожелания или вопросы..."
                    rows="3"
                    className="w-full rounded-[1.2rem] border border-[#DBD3C4] bg-[#FCFBF8] px-4 py-3 text-[#6F775C] placeholder-[#B0B0A0] resize-none" 
                  />
                </div>
                {formSubmitted && (
                  <div className="p-4 bg-[#8A9A71]/20 rounded-[1rem] text-[#59694F] text-center">
                    Спасибо! Ваши данные отправлены.
                  </div>
                )}
                <button 
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#7E8764] text-white font-medium card-hover button-breathe transition"
                >
                  Отправить анкету
                </button>
              </form>
            </div>
          </section>

          <footer className="pt-12 pb-10 text-center reveal" data-reveal>
            <div className="title-font text-5xl text-[#6F775C]">Илья и Маша</div>
            <p className="mt-3 text-[#9B9F8E]">4 июня 2026 · Yard Resort</p>
          </footer>
        </main>
      </div>
    </div>
  );
}
