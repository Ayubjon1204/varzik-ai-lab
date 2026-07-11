import React, { useState } from 'react';
import { VarzikDB, DonationCampaign, Need, Project, Startup, NewsPost, Event } from '../db/db';

interface PublicViewsProps {
  db: VarzikDB;
  currentView: string;
  setView: (view: string) => void;
  refreshDB: () => void;
}

export const PublicViews: React.FC<PublicViewsProps> = ({ db, currentView, setView, refreshDB }) => {
  const stats = db.getFinancialStats();
  const exchangeRate = db.getExchangeRate();

  switch (currentView) {
    case 'home':
      return <HomeView db={db} setView={setView} stats={stats} />;
    case 'about':
      return <AboutView />;
    case 'how-we-work':
      return <HowWeWorkView />;
    case 'curriculum':
      return <CurriculumView />;
    case 'projects':
      return <ProjectsView db={db} />;
    case 'startups':
      return <StartupsView db={db} refreshDB={refreshDB} />;
    case 'open-report':
      return <OpenReportView db={db} stats={stats} refreshDB={refreshDB} />;
    case 'needs':
      return <NeedsView db={db} setView={setView} />;
    case 'inventory':
      return <InventoryView db={db} />;
    case 'sponsor-us':
      return <SponsorUsView db={db} refreshDB={refreshDB} />;
    case 'news':
      return <NewsView db={db} />;
    case 'events':
      return <EventsView db={db} />;
    case 'apply':
      return <ApplyView db={db} refreshDB={refreshDB} />;
    case 'contact':
      return <ContactView />;
    default:
      return <HomeView db={db} setView={setView} stats={stats} />;
  }
};

// ==========================================
// 3. BOSH SAHIFA (HOME)
// ==========================================
const HomeView: React.FC<{ db: VarzikDB; setView: (v: string) => void; stats: any }> = ({ db, setView, stats }) => {
  const [calcAmount, setCalcAmount] = useState<number>(250);
  const [calcCurrency, setCalcCurrency] = useState<'USD' | 'UZS'>('USD');

  // Dynamic system statistics
  const studentsCount = db.getPublicStudents().length;
  const mentorsCount = 2; // Nodira & Bobur
  const projectsCount = db.getProjects().length;
  const startupsCount = db.getStartups().length;
  const activeNeedsCount = db.getNeeds().filter(n => n.status === 'active').length;
  const assetsCount = db.getAssets().filter(a => a.status === 'sotib olingan' || a.status === 'natura yordami').length;

  const handlePresetClick = (amount: number, currency: 'USD' | 'UZS') => {
    setCalcAmount(amount);
    setCalcCurrency(currency);
  };

  // Calculator Logic
  const getCalculatorOutputs = (amountUSD: number) => {
    const outputs: { icon: string; title: string; desc: string }[] = [];
    let remaining = amountUSD;

    const units = db.getImpactUnits().sort((a, b) => b.amountUSD - a.amountUSD); // high to low

    units.forEach(unit => {
      const count = Math.floor(remaining / unit.amountUSD);
      if (count > 0) {
        outputs.push({
          icon: unit.id === 'iu_5' ? '🎓' : unit.id === 'iu_4' ? '🧑‍🏫' : unit.id === 'iu_3' ? '💻' : unit.id === 'iu_2' ? '🛠️' : '🌐',
          title: `${count} ta ${unit.unitName}`,
          desc: unit.impactDescription
        });
        remaining %= unit.amountUSD;
      }
    });

    if (remaining > 0 || outputs.length === 0) {
      outputs.push({
        icon: '📚',
        title: `Qolgan summadan internet/kitoblar ($${remaining.toFixed(1)})`,
        desc: 'O‘quv materiallari va zaxira xarajatlari fondiga yo‘naltiriladi.'
      });
    }

    return outputs;
  };

  const amountInUSD = calcCurrency === 'USD' ? calcAmount : calcAmount / stats.rate;
  const calculatedImpact = getCalculatorOutputs(amountInUSD);

  // Home News limit 2
  const latestNews = db.getNews().slice(0, 2);
  const latestProjects = db.getProjects().slice(0, 2);
  const criticalNeed = db.getNeeds().find(n => n.priority === 'juda zarur' && n.status === 'active');

  return (
    <div>
      {/* Hero Section */}
      <section className="section" style={{ background: 'radial-gradient(circle at top right, rgba(16, 185, 129, 0.08), transparent 40%)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <span className="badge badge-info" style={{ marginBottom: '16px' }}>VARZIK AI LAB</span>
          <h1 style={{ fontSize: '3rem', marginBottom: '24px', letterSpacing: '-1px' }}>
            Varzikda iste’dod bor. <span className="text-gradient">Biz unga imkoniyat yaratamiz.</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '36px' }}>
            Varzik Sun’iy Intellekt va Innovatsiya Markazi — 13–18 yoshli iqtidorli yoshlar uchun bepul sun’iy intellekt ta’limi, amaliy loyihalar va startup yaratish markazi.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={() => setView('projects')}>Natijalarni ko‘rish</button>
            <button className="btn btn-accent" onClick={() => setView('sponsor-us')}>Homiy bo‘lish</button>
            <button className="btn btn-secondary" onClick={() => setView('apply')}>Ariza topshirish</button>
          </div>
        </div>
      </section>

      {/* Slogan & Numbers */}
      <section className="section" style={{ backgroundColor: 'var(--bg-card)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-title">
            <span className="badge badge-success" style={{ marginBottom: '12px' }}>Shaffoflik Shiori</span>
            <h3>“Har bir so‘mning yo‘li ochiq: kelib tushdi → ajratildi → sarflandi → natija berdi”</h3>
          </div>

          {/* Real-time stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-header"><span>Kelib tushgan arizalar</span><span>📋</span></div>
              <div className="stat-value">124</div>
              <div className="stat-label">O‘quvchilar va mentorlar</div>
              <div className="stat-updated">Oxirgi yangilanish: bugun</div>
            </div>
            <div className="stat-card">
              <div className="stat-header"><span>Faol o‘quvchilar</span><span>🧑‍idy</span></div>
              <div className="stat-value">{studentsCount}</div>
              <div className="stat-label">Pilot cohort ishtirokchilari</div>
              <div className="stat-updated">Oxirgi yangilanish: 2026-07-11</div>
            </div>
            <div className="stat-card">
              <div className="stat-header"><span>Jami xayriya (real)</span><span>💵</span></div>
              <div className="stat-value">${Math.round(stats.totalRaisedUSD)}</div>
              <div className="stat-label">Kurs: 1 USD = {stats.rate} UZS</div>
              <div className="stat-updated">Oxirgi yangilanish: 2026-07-11</div>
            </div>
            <div className="stat-card">
              <div className="stat-header"><span>Sarflangan mablag‘</span><span>💸</span></div>
              <div className="stat-value">${Math.round(stats.totalSpentUSD)}</div>
              <div className="stat-label">Sotib olingan jihozlar</div>
              <div className="stat-updated">Oxirgi yangilanish: 2026-07-11</div>
            </div>
            <div className="stat-card">
              <div className="stat-header"><span>Yaratilgan loyihalar</span><span>💡</span></div>
              <div className="stat-value">{projectsCount}</div>
              <div className="stat-label">Amaliy jamoaviy yechimlar</div>
              <div className="stat-updated">Oxirgi yangilanish: 2026-07-11</div>
            </div>
            <div className="stat-card">
              <div className="stat-header"><span>Startup jamoalari</span><span>🚀</span></div>
              <div className="stat-value">{startupsCount}</div>
              <div className="stat-label">Investor kutilmoqda</div>
              <div className="stat-updated">Oxirgi yangilanish: 2026-07-11</div>
            </div>
          </div>
        </div>
      </section>

      {/* Critical Need & Campaign Progress */}
      {criticalNeed && (
        <section className="section" style={{ backgroundColor: 'var(--bg-main)' }}>
          <div className="container">
            <div className="alert-box alert-box-danger">
              <div>
                <h3 style={{ color: 'hsl(350, 80%, 25%)', marginBottom: '8px' }}>🚨 Hozirgi eng muhim ehtiyojimiz: {criticalNeed.name}</h3>
                <p style={{ marginBottom: '16px' }}>{criticalNeed.description}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                  <div style={{ flexGrow: 1, backgroundColor: 'var(--border)', height: '10px', borderRadius: '5px', overflow: 'hidden', minWidth: '200px' }}>
                    <div style={{ backgroundColor: 'var(--secondary)', width: `${(criticalNeed.raisedAmountUSD / criticalNeed.targetAmountUSD) * 100}%`, height: '100%' }}></div>
                  </div>
                  <span style={{ fontWeight: 'bold' }}>
                    ${criticalNeed.raisedAmountUSD} / ${criticalNeed.targetAmountUSD} yig‘ildi
                  </span>
                  <button className="btn btn-accent btn-sm" onClick={() => setView('sponsor-us')}>Yordam berish</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Impact Calculator */}
      <section className="section" style={{ backgroundColor: 'var(--bg-card)' }}>
        <div className="container">
          <div className="section-title">
            <h2>Homiylik Ta’siri Kalkulyatori</h2>
            <p>Varzik AI Lab yoshlariga beradigan yordamingiz qanday imkoniyatlar yaratishini taxminiy hisoblang.</p>
          </div>

          <div className="calculator-box">
            <div className="calc-input-section">
              <div className="form-group">
                <label className="form-label">Ko‘mak miqdori</label>
                <div className="calc-input-wrapper">
                  <input
                    type="number"
                    className="calc-input"
                    value={calcAmount}
                    onChange={(e) => setCalcAmount(Number(e.target.value))}
                  />
                  <span className="calc-currency-label">{calcCurrency}</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Valyuta</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    className={`btn btn-secondary ${calcCurrency === 'USD' ? 'active' : ''}`}
                    onClick={() => {
                      if (calcCurrency === 'UZS') {
                        setCalcAmount(Math.round(calcAmount / stats.rate));
                      }
                      setCalcCurrency('USD');
                    }}
                    style={{ flex: 1, borderColor: calcCurrency === 'USD' ? 'var(--secondary)' : 'var(--border)' }}
                  >
                    USD ($)
                  </button>
                  <button
                    className={`btn btn-secondary ${calcCurrency === 'UZS' ? 'active' : ''}`}
                    onClick={() => {
                      if (calcCurrency === 'USD') {
                        setCalcAmount(calcAmount * stats.rate);
                      }
                      setCalcCurrency('UZS');
                    }}
                    style={{ flex: 1, borderColor: calcCurrency === 'UZS' ? 'var(--secondary)' : 'var(--border)' }}
                  >
                    UZS (so‘m)
                  </button>
                </div>
              </div>

              <div className="calc-presets">
                <button className="preset-btn" onClick={() => handlePresetClick(calcCurrency === 'USD' ? 25 : 25 * stats.rate, calcCurrency)}>
                  {calcCurrency === 'USD' ? '$25' : '320k'}
                </button>
                <button className="preset-btn" onClick={() => handlePresetClick(calcCurrency === 'USD' ? 100 : 100 * stats.rate, calcCurrency)}>
                  {calcCurrency === 'USD' ? '$100' : '1.2M'}
                </button>
                <button className="preset-btn" onClick={() => handlePresetClick(calcCurrency === 'USD' ? 250 : 250 * stats.rate, calcCurrency)}>
                  {calcCurrency === 'USD' ? '$250' : '3.2M'}
                </button>
                <button className="preset-btn" onClick={() => handlePresetClick(calcCurrency === 'USD' ? 1000 : 1000 * stats.rate, calcCurrency)}>
                  {calcCurrency === 'USD' ? '$1K' : '12.8M'}
                </button>
              </div>
            </div>

            <div className="calc-results-section">
              <div>
                <h3 style={{ marginBottom: '16px', fontSize: '1.15rem' }}>Ushbu mablag‘ bilan quyidagilar amalga oshishi mumkin:</h3>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {calculatedImpact.map((imp, idx) => (
                    <div className="calc-result-item" key={idx}>
                      <span className="calc-result-icon">{imp.icon}</span>
                      <div className="calc-result-details">
                        <h4>{imp.title}</h4>
                        <p>{imp.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '20px', fontStyle: 'italic' }}>
                * Homiylik — Varzik yoshlarining ta’limi uchun ko‘mak bo‘lib, yolg‘on kafolatlar bermaydi. Ushbu kalkulyator o‘tgan oylardagi o‘rtacha xarajatlar birligi asosida ta’sirni taxminiy ko‘rsatadi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Projects & News */}
      <section className="section" style={{ backgroundColor: 'var(--bg-main)' }}>
        <div className="container">
          <div className="grid-2">
            <div>
              <h3 style={{ marginBottom: '24px' }}>💡 So‘nggi o‘quvchilar loyihalari</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {latestProjects.map(proj => (
                  <div className="card" key={proj.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <h4>{proj.name}</h4>
                      <span className="badge badge-success">{proj.stage}</span>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '12px' }}>{proj.description}</p>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Texnologiyalar: {proj.techStack.join(', ')}</span>
                  </div>
                ))}
              </div>
              <button className="btn btn-secondary" style={{ marginTop: '16px', width: '100%' }} onClick={() => setView('projects')}>Barcha loyihalarni ko‘rish</button>
            </div>

            <div>
              <h3 style={{ marginBottom: '24px' }}>📰 So‘nggi yangiliklar</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {latestNews.map(news => (
                  <div className="card" key={news.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span className="badge badge-info">{news.category}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{news.date}</span>
                    </div>
                    <h4 style={{ marginBottom: '8px' }}>{news.title}</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{news.content}</p>
                  </div>
                ))}
              </div>
              <button className="btn btn-secondary" style={{ marginTop: '16px', width: '100%' }} onClick={() => setView('news')}>Barcha yangiliklarni ko‘rish</button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section" style={{ backgroundColor: 'var(--bg-card)' }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '36px' }}>Ota-onalar va homiylarimiz fikrlari</h2>
          <div className="card" style={{ fontStyle: 'italic', padding: '40px', marginBottom: '24px' }}>
            <p style={{ fontSize: '1.15rem', marginBottom: '20px' }}>
              “Qishlog‘imizda bunday markaz ochilishini kutmagandik. Farzandim Alijon har kuni darsdan kelib qandaydir aqlli sug‘orish apparatlari bilan shug‘ullanadi. Eng muhimi, u yerda dars bepul ekani kam ta’minlangan oilalar uchun katta yordam bo‘ldi.”
            </p>
            <h4 style={{ fontStyle: 'normal' }}>Vali Karimov</h4>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Ota, Varzik qishlog‘i</span>
          </div>
        </div>
      </section>
    </div>
  );
};

// ==========================================
// 4. “BIZ HAQIMIZDA” SAHIFASI
// ==========================================
const AboutView: React.FC = () => {
  return (
    <div className="container section">
      <div className="section-title">
        <h2>Biz Haqimizda</h2>
        <p>Varzik Sun’iy Intellekt va Innovatsiya Markazi haqida batafsil ma’lumot.</p>
      </div>

      <div className="card" style={{ marginBottom: '40px' }}>
        <p style={{ fontSize: '1.1rem', marginBottom: '16px' }}>
          Varzik AI Lab — Varzik qishlog‘idagi iqtidorli yoshlar uchun tashkil etilayotgan bepul sun’iy intellekt va texnologiya markazidir. Markazga qabul bolaning oilaviy daromadiga yoki shaxsiy kompyuteri bor-yo‘qligiga emas, uning o‘rganishga bo‘lgan intilishi, mas’uliyati, mantiqiy fikrlashi va rivojlanish tezligiga qarab amalga oshiriladi.
        </p>
        <p style={{ fontSize: '1.1rem' }}>
          Biz bolalarga faqat tayyor AI vositalaridan foydalanishni emas, muammoni aniqlash, ma’lumot bilan ishlash, dastur yaratish, mahsulot ishlab chiqish va o‘z g‘oyasini jamoa oldida himoya qilishni o‘rgatamiz.
        </p>
      </div>

      <div className="grid-3" style={{ marginBottom: '40px' }}>
        <div className="card">
          <h3>🎯 Missiyamiz</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '12px' }}>
            Varzikdagi iqtidorli yoshlarni bepul, sifatli va amaliy AI ta’limi bilan ta’minlash, ularni global bozorda raqobatlasha oladigan mutaxassis va mahsulot yaratuvchi sifatida shakllantirish.
          </p>
        </div>
        <div className="card">
          <h3>🔮 Vizionimiz</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '12px' }}>
            Varzikni iste’dodlar qishlog‘idan Markaziy Osiyodagi tanilgan AI ta’lim va innovatsiya markaziga aylantirish.
          </p>
        </div>
        <div className="card">
          <h3>🛡️ Shaffoflik tamoyili</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '12px' }}>
            Biz faqat qancha pul yig‘ilganini emas, u qayerga sarflangani va qanday natija berganini ham ochiq ko‘rsatamiz.
          </p>
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: '40px' }}>
        <div className="card">
          <h3>📅 Maqsadlarimiz</h3>
          <ul style={{ paddingLeft: '20px', marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li><strong>1 yillik:</strong> 15 ta faol AI loyihasi va pilot guruhni muvaffaqiyatli bitirish.</li>
            <li><strong>3 yillik:</strong> Hududiy miqyosda 100+ bitiruvchi va 5 ta ishlaydigan startup.</li>
            <li><strong>5 yillik:</strong> Varzikni respublika darajasidagi AI startup xabiga aylantirish.</li>
          </ul>
        </div>
        <div className="card">
          <h3>🧑‍🧑‍🧒‍🧒 Bolalar xavfsizligi qoidalari</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '12px' }}>
            Bolalarning shaxsiy ma’lumotlari (telefon, aniq tug‘ilgan sana, manzil, baholar) ommaviy sahifalardan yashirin saqlanadi. Har bir fotosurat va ommaviy portfolio ota-onaning yozma/tizimdagi roziligi bilan e’lon qilinadi.
          </p>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 5. QANDAY ISHLAYMIZ SAHIFASI
// ==========================================
const HowWeWorkView: React.FC = () => {
  const steps = [
    { title: 'Ariza topshirish', desc: 'Onlayn yoki joyida ariza topshiriladi. Kompyuter va pul shart emas.' },
    { title: 'Ikki haftalik bootcamp', desc: 'Barcha arizachilar uchun bepul asosiy darslar va mantiqiy sinov bootcampi.' },
    { title: 'Asosiy guruhga qabul', desc: 'Bootcamp davomidagi mantiqiy fikrlash va topshiriqlarni yakunlash tezligiga ko‘ra saralash.' },
    { title: 'Kundalik va haftalik vazifalar', desc: 'Python, ingliz tili va AI savodxonligi bo‘yicha har kuni qisqa amaliy topshiriqlar.' },
    { title: 'Oylik loyiha', desc: 'Har oy jamoada yoki individual qishloqdagi biror muammoga yechim loyihalash.' },
    { title: 'Mentor bahosi va fikri', desc: 'Professional mutaxassislar tomonidan kod va yechim tahlil qilinadi.' },
    { title: 'Ota-ona hisoboti', desc: 'Har oy oxirida ota-ona o‘z farzandi rivojlanish ko‘rsatkichlarini yopiq kabinetda ko‘radi.' },
    { title: 'Har uch oylik Demo Day', desc: 'Yaratilgan prototiplarni keng jamoatchilik, homiylar va investorlar oldida taqdim qilish.' },
    { title: 'Yo‘nalish tanlash', desc: 'O‘quvchilar machine learning, computer vision yoki web AI kabi yo‘nalishlarga bo‘linadi.' },
    { title: 'Startup yoki portfolio', desc: 'Yakunida ishga kirish uchun professional portfolio yoki investitsiyaga tayyor startup MVP.' }
  ];

  return (
    <div className="container section">
      <div className="section-title">
        <h2>Qanday Ishlaymiz</h2>
        <p>Qabuldan boshlab startup yaratishgacha bo‘lgan 10 bosqichli ta’lim tizimimiz.</p>
      </div>

      <div className="timeline">
        {steps.map((step, index) => (
          <div className="timeline-item" key={index}>
            <div className="timeline-badge">{index + 1}</div>
            <div className="timeline-content">
              <h4>{step.title}</h4>
              <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 6. O‘QUV DASTURI SAHIFASI
// ==========================================
const CurriculumView: React.FC = () => {
  const quarters = [
    {
      title: '1-chorak: Python, Git va AI Etikasi',
      items: [
        'Kompyuter savodxonligi va internet xavfsizligi asoslari',
        'AI nima va nima emas, AI etikasi va cheklovlari',
        'Python dasturlash tili: o‘zgaruvchilar, funksiyalar, algoritmlar',
        'Git va GitHub bilan ishlash, versiyalar nazorati',
        'Texnik ingliz tili va jamoaviy ishlash ko‘nikmalari'
      ]
    },
    {
      title: '2-chorak: Ma’lumotlar Tahlili va Machine Learning',
      items: [
        'Ma’lumot yig‘ish va tozalash (Data Cleaning) asoslari',
        'Pandas va Numpy kutubxonalari bilan ishlash',
        'Ma’lumot vizualizatsiyasi (Matplotlib, Seaborn)',
        'Machine Learning modellarini o‘qitish va baholash',
        'AI modellarining xatolari va tarafkashligi (bias) tushunchalari'
      ]
    },
    {
      title: '3-chorak: Generativ AI va Amaliy Prototiplar',
      items: [
        'Generativ AI va prompt engineering amaliyoti',
        'Web yoki mobil ilovalarga Sun’iy Intellekt modellarini ulash',
        'Computer Vision (kompyuter ko‘rishi) loyihalari',
        'AI mahsulot dizayni va Product Management asoslari',
        'Robototexnika va IoT zaxiralari bilan ishlash'
      ]
    },
    {
      title: '4-chorak: Mahalliy MVP va Startup Yaratish',
      items: [
        'Mahalliy qishloq yoki maktab muammolarini aniqlash va foydalanuvchilar bilan suhbat (User Interview)',
        'Startup MVP (Eng kichik mahsulot) ishlab chiqish va test qilish',
        'Biznes modeli, narxlash va jamoaviy ishlash metodologiyasi',
        'Pitch (g‘oyani investorga taqdim etish) san’ati',
        'Yakuniy Demo Day va Startup taqdimoti'
      ]
    }
  ];

  return (
    <div className="container section">
      <div className="section-title">
        <h2>Bir Yillik O‘quv Dasturi</h2>
        <p>Varzik AI Lab o‘quvchilarining 1 yillik chuqurlashtirilgan o‘quv rejasi.</p>
      </div>

      <div className="grid-2">
        {quarters.map((q, idx) => (
          <div className="card" key={idx}>
            <span className="badge badge-info" style={{ marginBottom: '12px' }}>{idx + 1}-CHORAK</span>
            <h3 style={{ marginBottom: '16px' }}>{q.title}</h3>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {q.items.map((item, idy) => (
                <li key={idy} style={{ color: 'var(--text-muted)' }}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 10. O‘QUVCHI LOYIHALARI SAHIFASI
// ==========================================
const ProjectsView: React.FC<{ db: VarzikDB }> = ({ db }) => {
  const projects = db.getProjects();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="container section">
      <div className="section-title">
        <h2>O‘quvchi Loyihalari</h2>
        <p>Ota-onalari roziligi bilan e’lon qilingan amaliy sun’iy intellekt loyihalari.</p>
      </div>

      <div className="grid-3" style={{ marginBottom: '40px' }}>
        {projects.map(proj => (
          <div className="card" key={proj.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedProject(proj)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span className="badge badge-success">{proj.stage}</span>
              <span style={{ fontWeight: 'bold', color: 'var(--secondary)' }}>${proj.fundingReceivedUSD} mikrogrant</span>
            </div>
            <h3 style={{ marginBottom: '12px' }}>{proj.name}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>{proj.description}</p>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <strong>Texnologiyalar:</strong> {proj.techStack.join(', ')}
            </div>
            <button className="btn btn-secondary btn-sm" style={{ marginTop: '16px', width: '100%' }}>Batafsil ma’lumot</button>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="no-print" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '20px' }}>
          <div className="card" style={{ maxWidth: '650px', width: '100%', maxHeight: '90vh', overflowY: 'auto', backgroundColor: 'var(--bg-card)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2>{selectedProject.name}</h2>
              <button className="btn btn-secondary btn-sm" onClick={() => setSelectedProject(null)}>X</button>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <span className="badge badge-success">{selectedProject.stage}</span>
              <span className="badge badge-info">${selectedProject.fundingReceivedUSD} ajratilgan mikrogrant</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.95rem' }}>
              <div>
                <strong>Qisqa tavsif:</strong>
                <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>{selectedProject.description}</p>
              </div>
              <div>
                <strong>Qanday muammoni yechadi:</strong>
                <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>{selectedProject.problemSolved}</p>
              </div>
              <div>
                <strong>Loyiha jamoasi:</strong>
                <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>
                  {/* Pull members */}
                  {selectedProject.id === 'proj_water' ? 'Alijon Karimov, Lobar Soliyeva. Mentor: Bobur Akbarov.' : 
                   selectedProject.id === 'proj_school' ? 'Malika Ergasheva, Sevara Azimova. Mentor: Nodira To‘rayeva.' : 'Jasurbek Usmonov. Mentor: Bobur Akbarov.'}
                </p>
              </div>
              <div>
                <strong>Texnologiyalar:</strong>
                <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>{selectedProject.techStack.join(', ')}</p>
              </div>
              {selectedProject.results && (
                <div>
                  <strong>Sinov natijasi:</strong>
                  <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>{selectedProject.results}</p>
                </div>
              )}
              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                {selectedProject.repoUrl && <a href={selectedProject.repoUrl} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm" style={{ flex: 1 }}>GitHub Repo</a>}
                {selectedProject.demoUrl && <a href={selectedProject.demoUrl} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm" style={{ flex: 1 }}>Jonli Demo (Prototip)</a>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 11. STARTUPLAR SAHIFASI
// ==========================================
const StartupsView: React.FC<{ db: VarzikDB; refreshDB: () => void }> = ({ db, refreshDB }) => {
  const startups = db.getStartups();
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);
  
  // Investor interest form state
  const [invName, setInvName] = useState('');
  const [invEmail, setInvEmail] = useState('');
  const [invPhone, setInvPhone] = useState('');
  const [invOrg, setInvOrg] = useState('');
  const [invRange, setInvRange] = useState('$1,000 - $5,000');
  const [invComment, setInvComment] = useState('');
  const [legalChecked, setLegalChecked] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const handleInterestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!legalChecked) {
      alert("Homiylik va investitsiya farqi shartlarini tasdiqlashingiz loqim!");
      return;
    }
    if (!selectedStartup) return;

    db.addInvestorInterest({
      startupId: selectedStartup.id,
      name: invName,
      email: invEmail,
      phone: invPhone,
      organization: invOrg,
      amountRangeUSD: invRange,
      comments: invComment
    });

    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      setInvName('');
      setInvEmail('');
      setInvPhone('');
      setInvOrg('');
      setInvComment('');
      setLegalChecked(false);
      setSelectedStartup(null);
      refreshDB();
    }, 3000);
  };

  return (
    <div className="container section">
      <div className="section-title">
        <h2>Startuplar sahifasi</h2>
        <p>O‘quvchilar va mentorlarimiz tomonidan ishlab chiqilgan va investitsiyaga tayyor startup MVP loyihalar.</p>
      </div>

      {/* Warning Box required by Legal guidelines */}
      <div className="alert-box alert-box-warning" style={{ marginBottom: '40px' }}>
        <div>
          <strong>⚠️ Muhim huquqiy ogohlantirish:</strong>
          <p style={{ fontSize: '0.88rem', marginTop: '6px' }}>
            Varzik AI Lab uchun berilgan homiylik qarz emas, qaytarilishi kafolatlanmaydi va avtomatik ravishda biror startupdan ulush bermaydi. Startupga investitsiya qilish alohida tekshiruv, baholash va alohida shartnoma asosida amalga oshiriladi. Homiylar markazdan chiqqan startuplar bilan birinchi bo‘lib tanishish imkoniyatiga ega bo‘lishi mumkin.
          </p>
        </div>
      </div>

      <div className="grid-2">
        {startups.map(st => (
          <div className="card" key={st.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span className="badge badge-success">{st.stage}</span>
              <span style={{ fontWeight: 'bold', color: 'var(--secondary)' }}>{st.userCount} ta faol foydalanuvchi</span>
            </div>
            <h3>{st.name}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: '12px 0' }}><strong>Muammo:</strong> {st.problem}</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '16px' }}><strong>Yechim:</strong> {st.solution}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>So‘ralayotgan investitsiya</span>
                <h4 style={{ color: 'var(--secondary)' }}>${st.investmentSoughtUSD}</h4>
              </div>
              <button className="btn btn-primary btn-sm" onClick={() => setSelectedStartup(st)}>Qiziqish bildirish</button>
            </div>
          </div>
        ))}
      </div>

      {selectedStartup && (
        <div className="no-print" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '20px' }}>
          <div className="card" style={{ maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto', backgroundColor: 'var(--bg-card)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3>📈 {selectedStartup.name}</h3>
              <button className="btn btn-secondary btn-sm" onClick={() => setSelectedStartup(null)}>X</button>
            </div>

            {formSuccess ? (
              <div className="alert-box alert-box-info" style={{ textAlign: 'center', padding: '32px' }}>
                <h4>Rahmat! Arizangiz qabul qilindi.</h4>
                <p style={{ marginTop: '8px' }}>Tez orada Varzik AI Lab ma’muriyati va ota-onalar/mentorlar siz bilan bog‘lanishadi.</p>
              </div>
            ) : (
              <form onSubmit={handleInterestSubmit}>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                  <p><strong>Jamoa:</strong> {selectedStartup.team}</p>
                  <p><strong>Metrikalar:</strong> {selectedStartup.metrics}</p>
                  <p><strong>Hozirgi ehtiyojlar:</strong> {selectedStartup.currentNeeds}</p>
                </div>

                <h4 style={{ marginBottom: '12px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>Investor ma’lumotlari</h4>
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">To‘liq ismingiz</label>
                    <input type="text" className="form-control" required value={invName} onChange={e => setInvName(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Tashkilot nomi</label>
                    <input type="text" className="form-control" value={invOrg} onChange={e => setInvOrg(e.target.value)} />
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" required value={invEmail} onChange={e => setInvEmail(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Telefon</label>
                    <input type="text" className="form-control" required value={invPhone} onChange={e => setInvPhone(e.target.value)} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Investitsiya kiritish miqdori (taxminiy)</label>
                  <select className="form-control" value={invRange} onChange={e => setInvRange(e.target.value)}>
                    <option>$1,000 - $5,000</option>
                    <option>$5,000 - $10,000</option>
                    <option>$10,000 dan yuqori</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Muzokara uchun izoh / taklif</label>
                  <textarea className="form-control" rows={3} value={invComment} onChange={e => setInvComment(e.target.value)}></textarea>
                </div>

                <div className="form-group" style={{ backgroundColor: 'var(--bg-main)', padding: '12px', borderRadius: '8px' }}>
                  <label className="checkbox-label">
                    <input type="checkbox" required checked={legalChecked} onChange={e => setLegalChecked(e.target.checked)} />
                    <span>
                      Ushbu startup voyaga yetmagan o‘quvchilar tomonidan ishlab chiqilganini, har qanday investitsiya bitimi ota-ona va huquqshunos ishtirokida amalga oshirilishini hamda homiylik ulush kafolati bermasligini tushunaman va tasdiqlayman.
                    </span>
                  </label>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Qiziqish arizasini yuborish</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 12. MOLIYAVIY HISOBOT (OPEN REPORT)
// ==========================================
const OpenReportView: React.FC<{ db: VarzikDB; stats: any; refreshDB: () => void }> = ({ db, stats, refreshDB }) => {
  const donations = db.getDonations();
  const expenses = db.getExpenses();
  const reports = db.getMonthlyReports();

  const [selectedReport, setSelectedReport] = useState<any | null>(null);

  // CSV Export utility
  const exportToCSV = (type: 'donations' | 'expenses') => {
    let headers: string[] = [];
    let rows: any[] = [];

    if (type === 'donations') {
      headers = ['Sana', 'Homiy', 'Summa', 'Valyuta', 'USD ekvivalenti', 'Maqsadi', 'Holati'];
      rows = donations.map(d => [
        d.created_at.split('T')[0],
        d.donorName,
        d.amount,
        d.currency,
        d.amountInUSD.toFixed(2),
        d.purpose,
        d.status
      ]);
    } else {
      headers = ['Sana', 'Xarajat nomi', 'Kategoriya', 'Summa', 'Valyuta', 'USD ekvivalenti', 'Sotuvchi', 'Holati'];
      rows = expenses.map(e => [
        e.purchaseDate,
        e.name,
        e.category,
        e.amount,
        e.currency,
        e.amountInUSD.toFixed(2),
        e.vendor,
        e.status
      ]);
    }

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.map((val: any) => `"${val}"`).join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `varzik_ai_lab_${type}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container section">
      <div className="section-title">
        <h2>Ochiq Hisobot va Moliyaviy Shaffoflik</h2>
        <p>Tizimdagi har bir kelib tushgan mablag‘ va sarflangan xarajat real vaqt rejimida shaffof ko‘rinadi.</p>
      </div>

      {/* Financial Indicators */}
      <div className="stats-grid" style={{ marginBottom: '48px' }}>
        <div className="stat-card" style={{ borderLeft: '4px solid var(--secondary)' }}>
          <div className="stat-header"><span>Kelib tushgan homiylik (real)</span><span>💵</span></div>
          <div className="stat-value">${stats.totalRaisedUSD.toLocaleString()}</div>
          <div className="stat-label">Jami: {stats.totalRaisedUZS.toLocaleString()} so‘m</div>
        </div>
        <div className="stat-card" style={{ borderLeft: '4px solid var(--warning)' }}>
          <div className="stat-header"><span>Va‘da qilingan / Kutilayotgan</span><span>⏳</span></div>
          <div className="stat-value">${stats.totalPromisedUSD.toLocaleString()}</div>
          <div className="stat-label">Asoschi & Kutilayotgan homiylik</div>
        </div>
        <div className="stat-card" style={{ borderLeft: '4px solid var(--danger)' }}>
          <div className="stat-header"><span>Ishlatilgan mablag‘</span><span>💸</span></div>
          <div className="stat-value">${stats.totalSpentUSD.toLocaleString()}</div>
          <div className="stat-label">Sotib olingan jihozlar & to‘lovlar</div>
        </div>
        <div className="stat-card" style={{ borderLeft: '4px solid var(--success)' }}>
          <div className="stat-header"><span>Sarflanmagan qoldiq</span><span>🏦</span></div>
          <div className="stat-value">${stats.remainingUSD.toLocaleString()}</div>
          <div className="stat-label">Hozirgi mavjud naqd qoldiq</div>
        </div>
      </div>

      {/* Donations Log */}
      <div style={{ marginBottom: '48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
          <h3>📥 Kelib tushgan mablag‘lar jurnali</h3>
          <button className="btn btn-secondary btn-sm" onClick={() => exportToCSV('donations')}>CSV yuklab olish</button>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Sana</th>
                <th>Homiy</th>
                <th>Miqdori (Valyuta)</th>
                <th>USD Ekvivalenti</th>
                <th>Maqsadi / Kampaniya</th>
                <th>Holati</th>
              </tr>
            </thead>
            <tbody>
              {donations.map(d => (
                <tr key={d.id}>
                  <td>{d.created_at.split('T')[0]}</td>
                  <td>{d.donorName}</td>
                  <td>{d.amount.toLocaleString()} {d.currency}</td>
                  <td>${d.amountInUSD.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                  <td>{d.purpose}</td>
                  <td>
                    <span className={`badge ${
                      d.status === 'kelib tushdi' ? 'badge-success' : 
                      d.status === 'kutilmoqda' ? 'badge-warning' : 'badge-info'
                    }`}>{d.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Expenses Log */}
      <div style={{ marginBottom: '48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
          <h3>📤 Sarflangan xarajatlar jurnali</h3>
          <button className="btn btn-secondary btn-sm" onClick={() => exportToCSV('expenses')}>CSV yuklab olish</button>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Sana</th>
                <th>Xarajat nomi</th>
                <th>Kategoriya</th>
                <th>Summa</th>
                <th>USD Ekvivalenti</th>
                <th>Etkazib beruvchi</th>
                <th>Hujjat (PII yashirilgan)</th>
                <th>Holati</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map(e => (
                <tr key={e.id}>
                  <td>{e.purchaseDate}</td>
                  <td>{e.name}</td>
                  <td>{e.category}</td>
                  <td>{e.amount.toLocaleString()} {e.currency}</td>
                  <td>${e.amountInUSD.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                  <td>{e.vendor}</td>
                  <td>
                    {e.invoiceUrl ? (
                      <span className="badge badge-success" style={{ cursor: 'pointer' }} onClick={() => alert(`Hujjat ko‘rildi: ${e.invoiceUrl}. Bank hisob raqami, pasport ma’lumotlari avtomatik yashirilgan.`)}>📄 Chek tekshirildi</span>
                    ) : (
                      <span className="badge badge-warning">Chek biriktirilmagan</span>
                    )}
                  </td>
                  <td>
                    <span className={`badge ${
                      e.status === 'sotib olindi' ? 'badge-success' : 
                      e.status === 'rejalashtirilgan' ? 'badge-info' : 'badge-warning'
                    }`}>{e.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Monthly Reports Section */}
      <div>
        <h3 style={{ marginBottom: '20px' }}>📊 Tasdiqlangan oylik ochiq hisobotlar</h3>
        <div className="grid-2">
          {reports.map(rep => (
            <div className="card" key={rep.id}>
              <span className="badge badge-success" style={{ marginBottom: '8px' }}>TASDIQLANGAN HISOBOT</span>
              <h3>Oylik Hisobot: {rep.reportMonth}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)', margin: '12px 0' }}>
                <span>O‘quvchilar: {rep.activeStudentsCount} ta</span>
                <span>Davomat o‘rtacha: {rep.averageAttendance}%</span>
                <span>Yig‘ildi: ${rep.totalRaisedUSD}</span>
                <span>Sarflandi: ${rep.totalSpentUSD}</span>
              </div>
              <button className="btn btn-secondary btn-sm" style={{ width: '100%' }} onClick={() => setSelectedReport(rep)}>Hisobotni batafsil ko‘rish & chop etish</button>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Report Detail Modal */}
      {selectedReport && (
        <div className="no-print" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '20px' }}>
          <div className="card" style={{ maxWidth: '750px', width: '100%', maxHeight: '90vh', overflowY: 'auto', backgroundColor: 'var(--bg-card)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2>Varzik AI Lab oylik hisoboti — {selectedReport.reportMonth}</h2>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn btn-secondary btn-sm" onClick={() => window.print()}>Chop etish (PDF)</button>
                <button className="btn btn-secondary btn-sm" onClick={() => setSelectedReport(null)}>X</button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px', backgroundColor: 'var(--bg-main)', padding: '16px', borderRadius: '8px' }}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Faol o‘quvchilar</span>
                <h4 style={{ fontSize: '1.25rem' }}>{selectedReport.activeStudentsCount} ta</h4>
              </div>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>O‘rtacha davomat</span>
                <h4 style={{ fontSize: '1.25rem' }}>{selectedReport.averageAttendance}%</h4>
              </div>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Yaratilgan loyihalar</span>
                <h4 style={{ fontSize: '1.25rem' }}>{selectedReport.projectsCreated} ta</h4>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.95rem' }}>
              <div>
                <strong>Asosiy amalga oshirilgan ishlar:</strong>
                <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>Darslar jadval bo‘yicha to‘liq o‘tildi. O‘quvchilar {selectedReport.tasksCompleted} ta topshiriq topshirishdi. {selectedReport.mentoringHours} soat bepul mentorlik sessiyasi tashkil etildi.</p>
              </div>
              <div>
                <strong>Moliyaviy yakun:</strong>
                <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>
                  Yig‘ilgan xayriya: <strong>${selectedReport.totalRaisedUSD}</strong>. Sarflangan xarajat: <strong>${selectedReport.totalSpentUSD}</strong>. Oy yakunidagi qoldiq summasi: <strong>${selectedReport.endingBalanceUSD}</strong>.
                </p>
              </div>
              <div>
                <strong>Asosiy xaridlar:</strong>
                <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>{selectedReport.mainPurchases}</p>
              </div>
              <div>
                <strong>Keyingi oy rejasi & Ehtiyojlar:</strong>
                <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>{selectedReport.nextMonthPlans}. {selectedReport.newsNeeds}.</p>
              </div>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                Hisobot administrator va auditor Jahongir Rustamov tomonidan tasdiqlangan. Shaxsiy PII ma’lumotlar kiritilmagan.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 14. INVENTAR SAHIFASI (NIMALAR OLINDI)
// ==========================================
const InventoryView: React.FC<{ db: VarzikDB }> = ({ db }) => {
  const assets = db.getAssets();

  // Filter into categories
  const realAssets = assets.filter(a => a.status !== 'natura yordami' && a.status !== 'rejalashtirilgan');
  const nativeAssets = assets.filter(a => a.status === 'natura yordami');
  const plannedAssets = assets.filter(a => a.status === 'rejalashtirilgan');

  return (
    <div className="container section">
      <div className="section-title">
        <h2>Mavjud Jihozlar va Natura Hissalari</h2>
        <p>Markazda mavjud kompyuterlar, tarmoq jihozlari hamda asoschi tomondan natura ko‘rinishida ajratilgan resurslar ro‘yxati.</p>
      </div>

      {/* Real Assets Purchased */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '16px' }}>💻 Sotib olingan yoki taqdim qilingan moddiy jihozlar</h3>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Jihoz nomi</th>
                <th>Kategoriya</th>
                <th>Soni</th>
                <th>Mablag‘ manbasi</th>
                <th>Holati</th>
                <th>Oxirgi tekshiruv</th>
                <th>Holat</th>
              </tr>
            </thead>
            <tbody>
              {realAssets.map(a => (
                <tr key={a.id}>
                  <td><strong>{a.name}</strong></td>
                  <td>{a.category}</td>
                  <td>{a.quantity} ta</td>
                  <td>{a.fundingSource}</td>
                  <td>
                    <span className={`badge ${
                      a.status === 'sotib olingan' || a.status === 'foydalanishda' ? 'badge-success' : 
                      a.status === 'ta’mirda' ? 'badge-danger' : 'badge-warning'
                    }`}>{a.status}</span>
                  </td>
                  <td>{a.lastChecked || 'Tekshirilmagan'}</td>
                  <td>{a.condition}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Native Aid Assistance (Natura Yordami) */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '16px' }}>🏠 Natura ko‘rinishidagi doimiy yordamlar</h3>
        <div className="grid-2">
          {nativeAssets.map(na => (
            <div className="card" key={na.id} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span className="badge badge-success">NATURA HISSA</span>
              <h4>{na.name}</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}><strong>Tavsif / Manbasi:</strong> {na.fundingSource}</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}><strong>Holati:</strong> {na.condition}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Planned Inventory */}
      <div>
        <h3 style={{ marginBottom: '16px' }}>⏳ Kelgusi rejalashtirilgan xaridlar (byudjet tasdiqlangach olinadi)</h3>
        <div className="grid-3">
          {plannedAssets.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>Hozirda rejalashtirilgan yangi sotib olinadigan buyurtmalar yo‘q.</p>
          ) : (
            plannedAssets.map(pa => (
              <div className="card" key={pa.id} style={{ opacity: 0.8 }}>
                <span className="badge badge-info">REJALASHTIRILGAN</span>
                <h4 style={{ marginTop: '8px' }}>{pa.name}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>Taxminiy narxi: ${pa.price}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 15. HOZIR NIMA KERAK (NEEDS)
// ==========================================
const NeedsView: React.FC<{ db: VarzikDB; setView: (v: string) => void }> = ({ db, setView }) => {
  const needs = db.getNeeds();

  // Group by priority
  const critical = needs.filter(n => n.priority === 'juda zarur');
  const important = needs.filter(n => n.priority === 'muhim');
  const development = needs.filter(n => n.priority === 'rivojlanish uchun');
  const longTerm = needs.filter(n => n.priority === 'uzoq muddatli');

  const renderNeedCard = (need: Need) => (
    <div className="card" key={need.id} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span className={`badge ${
            need.priority === 'juda zarur' ? 'badge-danger' : 
            need.priority === 'muhim' ? 'badge-warning' : 'badge-info'
          }`}>{need.priority}</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Muddati: {need.targetDate}</span>
        </div>
        <h3>{need.name}</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '10px 0' }}>{need.description}</p>
        <p style={{ color: 'var(--text-main)', fontSize: '0.9rem', fontWeight: 600 }}>🌟 Ta’siri: {need.impactDescription}</p>
      </div>

      <div style={{ marginTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
          <span>Yig‘ilgan summa: ${need.raisedAmountUSD}</span>
          <span>Maqsad: ${need.targetAmountUSD}</span>
        </div>
        <div style={{ backgroundColor: 'var(--border)', height: '8px', borderRadius: '4px', overflow: 'hidden', marginBottom: '16px' }}>
          <div style={{ backgroundColor: 'var(--secondary)', width: `${(need.raisedAmountUSD / need.targetAmountUSD) * 100}%`, height: '100%' }}></div>
        </div>
        <button className="btn btn-primary btn-sm" style={{ width: '100%' }} onClick={() => setView('sponsor-us')}>Homiy bo‘lish</button>
      </div>
    </div>
  );

  return (
    <div className="container section">
      <div className="section-title">
        <h2>Hozirgi ehtiyojlarimiz</h2>
        <p>Varzik AI Lab yoshlarining keyingi guruhlari uchun zarur bo‘lgan jihozlar va moliyaviy ehtiyojlar.</p>
      </div>

      {critical.length > 0 && (
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ color: 'var(--danger)', marginBottom: '16px' }}>🚨 Juda Zarur (Kechiktirib bo‘lmas ehtiyojlar)</h3>
          <div className="grid-2">{critical.map(renderNeedCard)}</div>
        </div>
      )}

      {important.length > 0 && (
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ color: 'var(--warning)', marginBottom: '16px' }}>⚠️ Muhim (Yaqin 1-2 oy ichida kerakli)</h3>
          <div className="grid-2">{important.map(renderNeedCard)}</div>
        </div>
      )}

      {development.length > 0 && (
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ color: 'var(--secondary)', marginBottom: '16px' }}>📈 Rivojlanish uchun (Kelajak o‘sishi uchun)</h3>
          <div className="grid-2">{development.map(renderNeedCard)}</div>
        </div>
      )}

      {longTerm.length > 0 && (
        <div>
          <h3 style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>🔮 Uzoq muddatli maqsadli ehtiyojlar</h3>
          <div className="grid-2">{longTerm.map(renderNeedCard)}</div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 17. HOMIY BO‘LISH JARAYONI (SPONSOR US)
// ==========================================
const SponsorUsView: React.FC<{ db: VarzikDB; refreshDB: () => void }> = ({ db, refreshDB }) => {
  const campaigns = db.getDonationCampaigns();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState<number>(100);
  const [currency, setCurrency] = useState<'USD' | 'UZS'>('USD');
  const [campaignId, setCampaignId] = useState(campaigns[0]?.id || '');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [method, setMethod] = useState('Bank o‘tkazmasi');
  const [comment, setComment] = useState('');
  const [agreement, setAgreement] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreement) {
      alert("Homiylik shartnomasi va shaffoflik farqi shartlarini tasdiqlashingiz kerak!");
      return;
    }

    db.addDonation({
      donorId: 'u_donor1', // mock donor account
      amount,
      currency,
      donorName: isAnonymous ? 'Anonim Homiy' : name,
      isAnonymous,
      targetCampaignId: campaignId,
      purpose: comment || 'Varzik AI Lab qo‘llab-quvvatlash fondi',
      paymentMethod: method,
      paymentProofUrl: 'manual_receipt_uploaded.jpg'
    }, 'kutilmoqda'); // status kutilmoqda - requires admin approval

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setName('');
      setPhone('');
      setEmail('');
      setAmount(100);
      setComment('');
      setAgreement(false);
      refreshDB();
    }, 4000);
  };

  return (
    <div className="container section" style={{ maxWidth: '700px' }}>
      <div className="section-title">
        <h2>Homiy Bo‘lish</h2>
        <p>Varziklik yoshlarning zamonaviy ta’lim olishlariga o‘z hissangizni qo‘shing.</p>
      </div>

      <div className="alert-box alert-box-warning" style={{ marginBottom: '24px' }}>
        <div>
          <strong>📌 Homiylik va Investitsiya Farqi:</strong>
          <p style={{ fontSize: '0.85rem', marginTop: '6px' }}>
            Homiylik — Varzik yoshlarining ta’limi va rivojlanishi uchun beriladigan ko‘makdir. Bu qarz emas va mablag‘ning qaytarilishi kafolatlanmaydi. Markazga berilgan homiylik biror o‘quvchi loyihasi yoki startupidan avtomatik ulush bermaydi. Bolalar yaratgan kod, loyiha yoki g‘oyalar homiyga avtomatik tarzda o‘tmaydi.
          </p>
        </div>
      </div>

      {success ? (
        <div className="card text-gradient" style={{ textAlign: 'center', padding: '40px' }}>
          <h3>Arizangiz muvaffaqiyatli jo‘natildi!</h3>
          <p style={{ marginTop: '12px', color: 'var(--text-main)' }}>
            Homiylik to‘lov tasdiqnomangiz administrator tomonidan tekshirilgandan so‘ng ochiq moliyaviy hisobotda “kelib tushgan” sifatida aks etadi. Shaxsiy kabinetingiz orqali kuzatib borishingiz mumkin.
          </p>
        </div>
      ) : (
        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Ism yoki Tashkilot nomi</label>
                <input type="text" className="form-control" required value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Telefon raqam</label>
                <input type="text" className="form-control" required value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email manzil</label>
              <input type="email" className="form-control" required value={email} onChange={e => setEmail(e.target.value)} />
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Homiylik summasi</label>
                <input type="number" className="form-control" required value={amount} onChange={e => setAmount(Number(e.target.value))} />
              </div>
              <div className="form-group">
                <label className="form-label">Valyuta</label>
                <select className="form-control" value={currency} onChange={e => setCurrency(e.target.value as any)}>
                  <option value="USD">AQSH dollari (USD)</option>
                  <option value="UZS">O‘zbekiston so‘mi (UZS)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Maqsadli Kampaniya</label>
              <select className="form-control" value={campaignId} onChange={e => setCampaignId(e.target.value)}>
                {campaigns.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">To‘lov usuli</label>
              <select className="form-control" value={method} onChange={e => setMethod(e.target.value)}>
                <option>Bank o‘tkazmasi (Biznes hisob raqamiga)</option>
                <option>Payme / Click / Apelsin (Ekran rasmini yuklash orqali)</option>
                <option>Natura yordami (Jihoz yoki kompyuter topshirish)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Qisqa izoh yoki niyat (ixtiyoriy)</label>
              <textarea className="form-control" rows={3} value={comment} onChange={e => setComment(e.target.value)} placeholder="Masalan, noutbuk sotib olishga hissa, internet to‘lovi uchun va hk."></textarea>
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input type="checkbox" checked={isAnonymous} onChange={e => setIsAnonymous(e.target.checked)} />
                <span>Ommaviy sahifada “Anonim homiy” sifatida ko‘rsatilsin. (Ma’lumotlaringiz audit uchun admin panelda saqlanadi, ammo ommaviy ochiq hisobotda ko‘rinmaydi)</span>
              </label>
            </div>

            <div className="form-group" style={{ backgroundColor: 'var(--bg-main)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <label className="checkbox-label" style={{ fontWeight: 600 }}>
                <input type="checkbox" required checked={agreement} onChange={e => setAgreement(e.target.checked)} />
                <span>
                  Ushbu xayriya notijorat ta’lim loyihasi uchun qaytarib olinmaydigan yordam ekanligini, startuplardan ulush kafolatlamasligini va bolalar yaratgan kodga egalik huquqi bermasligini tasdiqlayman.
                </span>
              </label>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Homiylik arizasini jo‘natish</button>
          </form>
        </div>
      )}
    </div>
  );
};

// ==========================================
// NEWS VIEW
// ==========================================
const NewsView: React.FC<{ db: VarzikDB }> = ({ db }) => {
  const news = db.getNews();

  return (
    <div className="container section">
      <div className="section-title">
        <h2>Bugun Varzik AI Lab’da nima bo‘lyapti?</h2>
        <p>Loyiha yangiliklari, amaliyot natijalari va yangi xaridlar bo‘yicha hisobotlar.</p>
      </div>

      <div className="grid-2">
        {news.map(post => (
          <div className="card" key={post.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span className="badge badge-info">{post.category}</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{post.date}</span>
            </div>
            <h3>{post.title}</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// EVENTS VIEW
// ==========================================
const EventsView: React.FC<{ db: VarzikDB }> = ({ db }) => {
  const events = db.getEvents();

  return (
    <div className="container section">
      <div className="section-title">
        <h2>Tadbirlar va Demo Day kunlari</h2>
        <p>Kelgusi ochiq darslar, hakatonlar va o‘quvchi loyihalari taqdimot kunlari.</p>
      </div>

      <div className="grid-2">
        {events.map(ev => (
          <div className="card" key={ev.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span className="badge badge-success">{ev.type}</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sana: {ev.eventDate.split('T')[0]}</span>
            </div>
            <h3>{ev.title}</h3>
            <p style={{ color: 'var(--text-muted)', margin: '12px 0' }}>{ev.description}</p>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600 }}>
              📍 Joylashuv: {ev.location} <br />
              👥 Kimlar uchun: {ev.targetAudience}
            </div>
            <button className="btn btn-secondary btn-sm" style={{ width: '100%', marginTop: '16px' }} onClick={() => alert("Ushbu tadbirga ro‘yxatdan o‘tish administrator tomonidan tasdiqlandi.")}>Ro‘yxatdan o‘tish</button>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// ARIZA TOPSHIRISH (APPLY)
// ==========================================
const ApplyView: React.FC<{ db: VarzikDB; refreshDB: () => void }> = ({ db, refreshDB }) => {
  const [applyType, setApplyType] = useState<'student' | 'mentor' | 'sponsor'>('student');
  const [success, setSuccess] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [extra, setExtra] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate application processing
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setName('');
      setPhone('');
      setExtra('');
    }, 3000);
  };

  return (
    <div className="container section" style={{ maxWidth: '650px' }}>
      <div className="section-title">
        <h2>Ariza Topsirish</h2>
        <p>Varzik AI Lab jamoasiga qo‘shilish uchun ariza shaklini to‘ldiring.</p>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        <button className={`btn ${applyType === 'student' ? 'btn-primary' : 'btn-secondary'}`} style={{ flex: 1 }} onClick={() => setApplyType('student')}>O‘quvchi</button>
        <button className={`btn ${applyType === 'mentor' ? 'btn-primary' : 'btn-secondary'}`} style={{ flex: 1 }} onClick={() => setApplyType('mentor')}>Mentor</button>
        <button className={`btn ${applyType === 'sponsor' ? 'btn-primary' : 'btn-secondary'}`} style={{ flex: 1 }} onClick={() => setApplyType('sponsor')}>Homiy / Hamkor</button>
      </div>

      {success ? (
        <div className="card alert-box-info" style={{ textAlign: 'center', padding: '40px' }}>
          <h3>Arizangiz muvaffaqiyatli qabul qilindi!</h3>
          <p style={{ marginTop: '8px' }}>Yaqin kunlarda mas’ul mentorlar yoki asoschi siz bilan telefon orqali bog‘lanishadi.</p>
        </div>
      ) : (
        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">F.I.Sh (To‘liq ism-sharifingiz)</label>
              <input type="text" className="form-control" required value={name} onChange={e => setName(e.target.value)} />
            </div>

            <div className="form-group">
              <label className="form-label">Aloqa telefoni (Ota-ona yoki shaxsiy)</label>
              <input type="text" className="form-control" required value={phone} onChange={e => setPhone(e.target.value)} />
            </div>

            {applyType === 'student' && (
              <>
                <div className="form-group">
                  <label className="form-label">Tug‘ilgan yilingiz va sinfingiz</label>
                  <input type="text" className="form-control" placeholder="Masalan: 2011-yil, 8-sinf" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Nima sababdan Sun’iy Intellektni o‘rganmoqchisiz?</label>
                  <textarea className="form-control" rows={3} value={extra} onChange={e => setExtra(e.target.value)} placeholder="O‘zingiz haqingizda qisqacha ma’lumot berishingiz mumkin..."></textarea>
                </div>
                <div className="form-group">
                  <label className="checkbox-label">
                    <input type="checkbox" required />
                    <span>Darslarga vaqtida kelishga va ota-onam markazda ta’lim olishimga roziligini tasdiqlayman.</span>
                  </label>
                </div>
              </>
            )}

            {applyType === 'mentor' && (
              <>
                <div className="form-group">
                  <label className="form-label">Mutaxassisligingiz va tajribangiz</label>
                  <input type="text" className="form-control" placeholder="Masalan: Python ML Developer, 3 yil tajriba" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Haftasiga qancha vaqt ajrata olasiz va qaysi yo‘nalishda?</label>
                  <textarea className="form-control" rows={3} value={extra} onChange={e => setExtra(e.target.value)}></textarea>
                </div>
                <div className="form-group">
                  <label className="checkbox-label">
                    <input type="checkbox" required />
                    <span>Bolalar bilan ishlash mas’uliyatini tushunaman va AI etikasi tamoyillariga sodiq qolaman.</span>
                  </label>
                </div>
              </>
            )}

            {applyType === 'sponsor' && (
              <>
                <div className="form-group">
                  <label className="form-label">Yordam shakli (Jihoz, mablag‘, server yoki bepul darslar)</label>
                  <input type="text" className="form-control" placeholder="Masalan: 3 ta biznes noutbuk naturaviy yordami" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Batafsil taklif / izoh</label>
                  <textarea className="form-control" rows={3} value={extra} onChange={e => setExtra(e.target.value)}></textarea>
                </div>
              </>
            )}

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Ariza yuborish</button>
          </form>
        </div>
      )}
    </div>
  );
};

// ==========================================
// CONTACT VIEW
// ==========================================
const ContactView: React.FC = () => {
  return (
    <div className="container section" style={{ maxWidth: '800px' }}>
      <div className="section-title">
        <h2>Biz bilan bog‘laning</h2>
        <p>Sizda taklif, savol yoki hamkorlik niyati bormi? Aloqadamiz.</p>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3>📍 Manzilimiz</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
            Namangan viloyati, Chust tumani, Varzik qishlog‘i markazi, Varzik AI Lab xonasi.
          </p>

          <h3 style={{ marginTop: '20px' }}>📞 Telefon & Telegram</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
            +998 90 123 45 67 <br />
            Telegram: @VarzikAILab_robot
          </p>

          <h3 style={{ marginTop: '20px' }}>✉️ Email</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
            info@varzik.ai
          </p>
        </div>

        <div className="card">
          <h3>Sizga yozishimizni xohlaysizmi?</h3>
          <form style={{ marginTop: '16px' }} onSubmit={e => { e.preventDefault(); alert("Xabaringiz yuborildi. Rahmat!"); }}>
            <div className="form-group">
              <label className="form-label">Ismingiz</label>
              <input type="text" className="form-control" required />
            </div>
            <div className="form-group">
              <label className="form-label">Telefon yoki Telegram username</label>
              <input type="text" className="form-control" required />
            </div>
            <div className="form-group">
              <label className="form-label">Xabar matni</label>
              <textarea className="form-control" rows={3} required></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Xabar yuborish</button>
          </form>
        </div>
      </div>
    </div>
  );
};
