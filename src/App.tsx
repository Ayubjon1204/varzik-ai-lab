import React, { useState, useEffect } from 'react';
import { VarzikDB, User } from './db/db';
import { PublicViews } from './pages/PublicViews';
import { Portals } from './portals/Portals';

function App() {
  const [db, setDb] = useState(() => new VarzikDB());
  const [currentUser, setCurrentUser] = useState<User | null>(db.getCurrentUser());
  const [currentView, setView] = useState<string>('home');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Click outside listener for custom dropdown
  useEffect(() => {
    if (!dropdownOpen) return;
    const handleOutsideClick = () => setDropdownOpen(false);
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [dropdownOpen]);

  // Force database state reload and re-render
  const refreshDB = () => {
    const updatedDb = new VarzikDB();
    setDb(updatedDb);
    setCurrentUser(updatedDb.getCurrentUser());
  };

  // Toggle theme
  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  // Handle Developer Switch Role
  const handleRoleSwitch = (username: string) => {
    if (username === 'GUEST') {
      db.logout();
      refreshDB();
      setView('home');
    } else {
      const logged = db.login(username);
      if (logged) {
        refreshDB();
        setView('dashboard'); // Go to Portal Dashboard
      }
    }
  };

  const menuItems = [
    { id: 'home', label: 'Bosh sahifa' },
    { id: 'about', label: 'Biz haqimizda' },
    { id: 'how-we-work', label: 'Qanday ishlaymiz' },
    { id: 'curriculum', label: 'O‘quv dasturi' },
    { id: 'projects', label: 'O‘quvchi loyihalari' },
    { id: 'startups', label: 'Startuplar' },
    { id: 'open-report', label: 'Ochiq hisobot' },
    { id: 'needs', label: 'Hozir nima kerak' },
    { id: 'inventory', label: 'Nimalar olindi' },
    { id: 'sponsor-us', label: 'Homiy bo‘lish' },
    { id: 'news', label: 'Yangiliklar' },
    { id: 'events', label: 'Tadbirlar' },
    { id: 'apply', label: 'Ariza topshirish' },
    { id: 'contact', label: 'Bog‘lanish' }
  ];

  return (
    <div className="app-container">
      {/* 29. DEVELOPER DEMO ROLE SWITCHER BAR */}
      <div className="user-switch-bar no-print">
        <div className="container user-switch-container">
          <div>
            <strong>👨‍💻 DEMO TEKSHIRISH PANEL: </strong>
            <span style={{ opacity: 0.8 }}>Rollar bo‘yicha tizim ishlashini sinash uchun tanlang:</span>
          </div>
          <select 
            className="user-switch-select"
            value={currentUser ? currentUser.username : 'GUEST'}
            onChange={(e) => handleRoleSwitch(e.target.value)}
          >
            <option value="GUEST">Mehmon (Ommaviy Tashrif buyuruvchi)</option>
            <option value="stud_ali">Alijon (STUDENT - Barqaror o‘qiydi)</option>
            <option value="stud_jasur">Jasurbek (STUDENT - Yordam rejasi bor & Ball &lt; 60)</option>
            <option value="parent_vali">Vali (PARENT - Alijonning otasi, Roziliklarni boshqaradi)</option>
            <option value="mentor_bobur">Bobur (MENTOR - Guruhlarni baholaydi, davomat oladi)</option>
            <option value="donor_sherzod">Sherzod (SPONSOR - Xayriya ta’siri va uskunalar)</option>
            <option value="auditor1">Jahongir (AUDITOR - Read-only moliyaviy hisobot &amp; logs)</option>
            <option value="admin">Asadbek (ADMIN - To‘liq tizim sozlamalari, audit va valyuta)</option>
          </select>
        </div>
      </div>

      {/* Header */}
      <header className="header no-print">
        <div className="container nav-container">
          <div className="logo" style={{ cursor: 'pointer' }} onClick={() => setView('home')}>
            <div className="logo-icon">V</div>
            <div>
              <div style={{ fontSize: '1.2rem', lineHeight: 1 }}>Varzik AI Lab</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--secondary)', letterSpacing: '1px' }}>AI &amp; INNOVATION CENTER</div>
            </div>
          </div>

          <nav style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Desktop Navigation Links */}
            <div className="nav-links" style={{ display: window.innerWidth > 992 ? 'flex' : 'none' }}>
              <button 
                className={`nav-link ${currentView === 'home' ? 'active' : ''}`}
                onClick={() => setView('home')}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Bosh sahifa
              </button>
              
              <div className="custom-dropdown-container">
                <button 
                  className={`custom-dropdown-trigger ${dropdownOpen ? 'open' : ''}`}
                  onClick={(e) => { e.stopPropagation(); setDropdownOpen(!dropdownOpen); }}
                >
                  {menuItems.some(i => i.id === currentView && i.id !== 'home') 
                    ? menuItems.find(i => i.id === currentView)?.label 
                    : 'Bo‘limlar...'}
                </button>
                {dropdownOpen && (
                  <div className="custom-dropdown-menu">
                    {menuItems.slice(1).map(item => (
                      <button
                        key={item.id}
                        className={`custom-dropdown-item ${currentView === item.id ? 'active' : ''}`}
                        onClick={() => {
                          setView(item.id);
                          setDropdownOpen(false);
                        }}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Theme Toggle */}
            <button className="btn btn-secondary" style={{ padding: '8px 12px' }} onClick={toggleTheme}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

            {/* Portal Dashboard Button */}
            {currentUser ? (
              <button 
                className={`btn ${currentView === 'dashboard' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setView('dashboard')}
              >
                Shaxsiy kabinet ({currentUser.role})
              </button>
            ) : (
              <button 
                className="btn btn-secondary" 
                onClick={() => handleRoleSwitch('admin')}
              >
                Kirish (Shaxsiy kabinet)
              </button>
            )}

            {/* Mobile menu icon */}
            <button 
              className="btn btn-secondary" 
              style={{ display: window.innerWidth <= 992 ? 'block' : 'none', padding: '8px 12px' }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              ☰
            </button>
          </nav>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div style={{ padding: '16px', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '8px', backgroundColor: 'var(--bg-card)' }}>
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => { setView(item.id); setMobileMenuOpen(false); }}
                style={{ textAlign: 'left', padding: '10px', background: 'none', border: 'none', borderBottom: '1px solid var(--border)', cursor: 'pointer', width: '100%', color: 'var(--text-main)' }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="main-content">
        {currentView === 'dashboard' && currentUser ? (
          <Portals db={db} currentUser={currentUser} refreshDB={refreshDB} setView={setView} />
        ) : (
          <PublicViews db={db} currentView={currentView} setView={setView} refreshDB={refreshDB} />
        )}
      </main>

      {/* Footer */}
      <footer className="no-print" style={{ backgroundColor: 'var(--primary)', color: '#fff', padding: '60px 0', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="container">
          <div className="grid-3" style={{ marginBottom: '40px' }}>
            <div>
              <h3 style={{ color: '#fff', marginBottom: '16px' }}>Varzik AI Lab</h3>
              <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>
                “Varzikdan — dunyo uchun AI mahsulotlari” <br />
                Iqtidorli bolalarni AI, dasturlash va startup sohalarida bepul o‘qitish markazi.
              </p>
            </div>
            <div>
              <h4 style={{ color: '#fff', marginBottom: '16px' }}>Xavfsizlik &amp; Maxfiylik</h4>
              <p style={{ opacity: 0.7, fontSize: '0.85rem' }}>
                Biz yosh o‘quvchilarimiz shaxsiy va aloqa ma’lumotlarini ommaviy tarqatmaymiz. Ommaviy yangiliklarda faqat ota-ona ruxsatnomasi (consent) asosidagi portfolios chiqadi.
              </p>
            </div>
            <div>
              <h4 style={{ color: '#fff', marginBottom: '16px' }}>Moliyaviy Shaffoflik</h4>
              <p style={{ opacity: 0.7, fontSize: '0.85rem' }}>
                Tizimdagi barcha moliyaviy hisobotlar, xayriyalar va xarid cheklari doimiy ravishda kengash va auditorlar tomonidan tasdiqlanib e’lon qilinadi.
              </p>
            </div>
          </div>
          <div style={{ textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', opacity: 0.5, fontSize: '0.8rem' }}>
            &copy; 2026 Varzik AI Lab. Varzik Sun’iy Intellekt va Innovatsiya Markazi. Barcha huquqlar himoyalangan.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
