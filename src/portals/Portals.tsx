import React, { useState } from 'react';
import { VarzikDB, User, StudentProfile, Assignment, AssignmentSubmission, Evaluation, Attendance, Consent, SupportPlan, Donation, Expense, Asset, AuditLog } from '../db/db';

interface PortalsProps {
  db: VarzikDB;
  currentUser: User;
  refreshDB: () => void;
  setView: (view: string) => void;
}

export const Portals: React.FC<PortalsProps> = ({ db, currentUser, refreshDB, setView }) => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  const renderSidebar = (menuItems: { id: string; label: string; icon: string }[]) => (
    <div className="portal-sidebar no-print">
      <div>
        <div style={{ marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
          <h4 style={{ fontSize: '1rem', color: 'var(--secondary)' }}>Kabinet</h4>
          <h3 style={{ fontSize: '1.2rem', marginTop: '4px' }}>{currentUser.fullName}</h3>
          <span className="badge badge-info" style={{ marginTop: '6px' }}>{currentUser.role}</span>
        </div>
        <div className="portal-menu">
          {menuItems.map(item => (
            <div
              key={item.id}
              className={`portal-menu-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      <button className="btn btn-secondary" style={{ width: '100%', marginTop: '40px' }} onClick={() => { db.logout(); refreshDB(); setView('home'); }}>
        Tizimdan chiqish
      </button>
    </div>
  );

  switch (currentUser.role) {
    case 'STUDENT':
      return (
        <div className="portal-layout">
          {renderSidebar([
            { id: 'dashboard', label: 'Dashboard', icon: '📊' },
            { id: 'tasks', label: 'Vazifalar', icon: '📝' },
            { id: 'grades', label: 'Baholar & Davomat', icon: '🎓' },
            { id: 'portfolio', label: 'Sertifikatlar & Portfolio', icon: '🏆' }
          ])}
          <div className="portal-main">
            <StudentPortal db={db} studentId={currentUser.id} activeTab={activeTab} refreshDB={refreshDB} />
          </div>
        </div>
      );

    case 'PARENT':
      return (
        <div className="portal-layout">
          {renderSidebar([
            { id: 'dashboard', label: 'Farzand Rivojlanishi', icon: '📊' },
            { id: 'consents', label: 'Ruxsatnomalar (Roziliklar)', icon: '🛡️' },
            { id: 'contact', label: 'Mentor bilan aloqa', icon: '✉️' }
          ])}
          <div className="portal-main">
            <ParentPortal db={db} parentUser={currentUser} activeTab={activeTab} refreshDB={refreshDB} />
          </div>
        </div>
      );

    case 'MENTOR':
      return (
        <div className="portal-layout">
          {renderSidebar([
            { id: 'dashboard', label: 'Guruhlar & Baholar', icon: '📊' },
            { id: 'attendance', label: 'Davomat olish', icon: '📅' },
            { id: 'assignments', label: 'Topshiriq yaratish', icon: '📝' },
            { id: 'support', label: 'Yordam rejalari (<60)', icon: '🩺' }
          ])}
          <div className="portal-main">
            <MentorPortal db={db} mentorUser={currentUser} activeTab={activeTab} refreshDB={refreshDB} />
          </div>
        </div>
      );

    case 'SPONSOR':
      return (
        <div className="portal-layout">
          {renderSidebar([
            { id: 'dashboard', label: 'Homiyliklarim ta’siri', icon: '📊' },
            { id: 'history', label: 'To‘lovlar tarixi', icon: '📥' },
            { id: 'reports', label: 'Oylik PDF hisobotlar', icon: '📄' }
          ])}
          <div className="portal-main">
            <SponsorPortal db={db} sponsorUser={currentUser} activeTab={activeTab} />
          </div>
        </div>
      );

    case 'AUDITOR':
      return (
        <div className="portal-layout">
          {renderSidebar([
            { id: 'dashboard', label: 'Moliyaviy Hisobotlar', icon: '📊' },
            { id: 'donations', label: 'Homiyliklar jurnali', icon: '📥' },
            { id: 'expenses', label: 'Xarajatlar jurnali', icon: '📤' },
            { id: 'audit_logs', label: 'Audit tarixi (Logs)', icon: '🛡️' }
          ])}
          <div className="portal-main">
            <AuditorPortal db={db} activeTab={activeTab} />
          </div>
        </div>
      );

    case 'ADMIN':
      return (
        <div className="portal-layout">
          {renderSidebar([
            { id: 'dashboard', label: 'Admin Dashboard', icon: '📊' },
            { id: 'users', label: 'Foydalanuvchilar', icon: '👥' },
            { id: 'donations', label: 'Homiylik tasdiqlash', icon: '💰' },
            { id: 'expenses', label: 'Xarajatlarni boshqarish', icon: '💸' },
            { id: 'assets', label: 'Jihozlar & Inventar', icon: '💻' },
            { id: 'campaigns', label: 'Kampaniyalar', icon: '📢' },
            { id: 'needs', label: 'Ehtiyoj sozlamalari', icon: '🛠️' },
            { id: 'audit_logs', label: 'Audit Loglari', icon: '🛡️' },
            { id: 'settings', label: 'Tizim Sozlamalari', icon: '⚙️' }
          ])}
          <div className="portal-main">
            <AdminPortal db={db} activeTab={activeTab} refreshDB={refreshDB} />
          </div>
        </div>
      );

    default:
      return <div className="portal-main">Ruxsatsiz kirish</div>;
  }
};

// ==========================================
// STUDENT PORTAL
// ==========================================
const StudentPortal: React.FC<{ db: VarzikDB; studentId: string; activeTab: string; refreshDB: () => void }> = ({ db, studentId, activeTab, refreshDB }) => {
  const submissions = db.getAssignmentSubmissions();
  const assignments = db.getAssignments();
  const evaluations = db.getEvaluations(studentId);
  const rewards = db.getStudentRewards(studentId);

  const [selectedTask, setSelectedTask] = useState<Assignment | null>(null);
  const [submissionContent, setSubmissionContent] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [success, setSuccess] = useState(false);

  // Find student profile to check support plan
  const profile = db.filterStudentPII(db.getPublicStudents().find(s => s.id === studentId) || { id: studentId } as any, db.getCurrentUser()!);
  const fullProfile = db.getUsers().find(u => u.id === studentId); // complete detailed view

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTask) return;

    db.submitAssignment(selectedTask.id, submissionContent, repoUrl);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setSubmissionContent('');
      setRepoUrl('');
      setSelectedTask(null);
      refreshDB();
    }, 2000);
  };

  const getSubmissionForAssignment = (assId: string) => {
    return submissions.find(s => s.assignmentId === assId);
  };

  if (activeTab === 'dashboard') {
    const latestEval = evaluations[evaluations.length - 1];
    return (
      <div>
        <h2>Salom, Alijon! Bugungi o‘quv holatingiz:</h2>
        
        {/* Support Plan Warning Alert */}
        {latestEval && latestEval.totalPoints < 60 && (
          <div className="alert-box alert-box-danger" style={{ marginTop: '20px' }}>
            <div>
              <h3>🩺 Maxsus tiklanish / Qo‘shimcha yordam rejasi faollashtirildi</h3>
              <p style={{ marginTop: '6px' }}>
                Oxirgi oylik baholashda ballingiz past bo‘lganligi sababli, mentorlar sizga bepul qo‘shimcha mentorlik vaqtlari va markaz noutbugidan foydalanish jadvalini tuzib berishdi. Maqsad — kursdan chiqarish emas, balki qiyinchiliklarni birgalikda yengish.
              </p>
            </div>
          </div>
        )}

        <div className="grid-2" style={{ marginTop: '24px' }}>
          <div className="card">
            <h3>📈 Oylik Baholash Balansingiz</h3>
            {latestEval ? (
              <div style={{ marginTop: '16px' }}>
                <div style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--secondary)' }}>
                  {latestEval.totalPoints} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/ 100 ball</span>
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '10px' }}>
                  • Davomat va vaqtida kelish: <strong>{latestEval.attendancePoints} / 15 ball</strong><br />
                  • Kundalik vazifalar: <strong>{latestEval.dailyTasksPoints} / 20 ball</strong><br />
                  • Haftalik test va amaliyot: <strong>{latestEval.weeklyTasksPoints} / 15 ball</strong><br />
                  • Oylik loyiha sifati: <strong>{latestEval.monthlyProjectPoints} / 30 ball</strong><br />
                  • Taqdimot va hujjatlar: <strong>{latestEval.presentationPoints} / 10 ball</strong><br />
                  • Jamoaga yordam & AI etika: <strong>{latestEval.teamworkPoints} / 10 ball</strong>
                </div>
                <p style={{ borderTop: '1px solid var(--border)', paddingTop: '10px', marginTop: '14px', fontStyle: 'italic' }}>
                  Mentor izohi: "{latestEval.comments}"
                </p>
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)', marginTop: '16px' }}>Baholar hali kiritilmagan.</p>
            )}
          </div>

          <div className="card">
            <h3>🎯 Kuchli va zaif tomonlaringiz (Mentor xulosasi)</h3>
            <div style={{ marginTop: '16px' }}>
              <h4>💪 Kuchli tomonlar:</h4>
              <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Matematika asoslari, mantiqiy fikrlash, Python loop/arrays tushunchalari.</p>
              <h4>📈 Rivojlantirilishi kerak bo‘lgan sohalar:</h4>
              <p style={{ color: 'var(--text-muted)' }}>Ingliz tili terminlari, Git commit qoidalari va loyiha hujjatlarini to‘ldirish.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'tasks') {
    return (
      <div>
        <h2>Topshiriqlar Ro‘yxati</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
          {assignments.map(ass => {
            const sub = getSubmissionForAssignment(ass.id);
            return (
              <div className="card" key={ass.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="badge badge-info">{ass.type}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Muddati: {ass.dueDate.split('T')[0]}</span>
                </div>
                <h3>{ass.title}</h3>
                <p style={{ color: 'var(--text-muted)', margin: '8px 0' }}>{ass.description}</p>
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '12px', marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    {sub ? (
                      <span className="badge badge-success">Holati: {sub.status} (Ball: {sub.pointsAwarded ?? 'Kutilmoqda'})</span>
                    ) : (
                      <span className="badge badge-warning">Topshirilmagan</span>
                    )}
                  </div>
                  {!sub && (
                    <button className="btn btn-primary btn-sm" onClick={() => setSelectedTask(ass)}>Vazifani topshirish</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {selectedTask && (
          <div className="no-print" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '20px' }}>
            <div className="card" style={{ maxWidth: '500px', width: '100%' }}>
              <h3>Topshiriqni yuborish: {selectedTask.title}</h3>
              {success ? (
                <div className="alert-box alert-box-info" style={{ marginTop: '20px', textAlign: 'center' }}>
                  Vazifa yuborildi. Mentor tekshiruvi kutilmoqda.
                </div>
              ) : (
                <form onSubmit={handleTaskSubmit} style={{ marginTop: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Yechim tavsifi yoki matni</label>
                    <textarea className="form-control" required rows={4} value={submissionContent} onChange={e => setSubmissionContent(e.target.value)} placeholder="Yozgan kodingiz yoki javobingizni qisqacha tushuntiring..."></textarea>
                  </div>
                  <div className="form-group">
                    <label className="form-label">GitHub Repository havolasi (ixtiyoriy)</label>
                    <input type="text" className="form-control" value={repoUrl} onChange={e => setRepoUrl(e.target.value)} placeholder="https://github.com/username/project" />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Yuborish</button>
                  <button type="button" className="btn btn-secondary" style={{ width: '100%', marginTop: '8px' }} onClick={() => setSelectedTask(null)}>Bekor qilish</button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (activeTab === 'grades') {
    return (
      <div>
        <h2>Baholar va Davomat Trendi</h2>
        
        {/* Growth compare simulation */}
        <div className="card" style={{ margin: '20px 0' }}>
          <h3>📈 Rivojlanish ko‘rsatkichi (Oylik Trend)</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', height: '200px', gap: '30px', padding: '20px 0', borderBottom: '1px solid var(--border)' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ backgroundColor: 'var(--border)', width: '40px', height: '140px', borderRadius: '4px 4px 0 0', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                <div style={{ backgroundColor: 'var(--text-muted)', width: '100%', height: '70%' }}></div>
              </div>
              <span style={{ fontSize: '0.8rem', marginTop: '6px' }}>Aprel (70)</span>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ backgroundColor: 'var(--border)', width: '40px', height: '140px', borderRadius: '4px 4px 0 0', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                <div style={{ backgroundColor: 'var(--text-muted)', width: '100%', height: '78%' }}></div>
              </div>
              <span style={{ fontSize: '0.8rem', marginTop: '6px' }}>May (78)</span>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ backgroundColor: 'var(--border)', width: '40px', height: '140px', borderRadius: '4px 4px 0 0', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                <div style={{ backgroundColor: 'var(--secondary)', width: '100%', height: '89%' }}></div>
              </div>
              <span style={{ fontSize: '0.8rem', marginTop: '6px', fontWeight: 'bold', color: 'var(--secondary)' }}>Iyun (89) 📈</span>
            </div>
          </div>
          <p style={{ marginTop: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Oxirgi oyda natijalaringiz <strong>+11% ga o‘sgan</strong>. Jamoa bilan ishlash va darslarni o‘z vaqtida topshirish yaxshilandi.
          </p>
        </div>

        <h3>📅 Davomat Tarixi (Oxirgi darslar)</h3>
        <div className="table-wrapper" style={{ marginTop: '16px' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Sana</th>
                <th>Dars nomi</th>
                <th>Holat</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2026-07-10</td>
                <td>Git push/pull amaliyoti</td>
                <td><span className="badge badge-success">Ishtirok etdi</span></td>
              </tr>
              <tr>
                <td>2026-07-08</td>
                <td>Python list comprehension</td>
                <td><span className="badge badge-success">Ishtirok etdi</span></td>
              </tr>
              <tr>
                <td>2026-07-05</td>
                <td>AI etikasi va bias misollari</td>
                <td><span className="badge badge-warning">Kechikib keldi</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (activeTab === 'portfolio') {
    return (
      <div>
        <h2>Sertifikatlar va Mukofotlar</h2>
        <div className="grid-2" style={{ marginTop: '20px' }}>
          {rewards.map(rew => (
            <div className="card" key={rew.id} style={{ borderLeft: '4px solid var(--secondary)' }}>
              <div style={{ fontSize: '2.5rem' }}>🏆</div>
              <h3 style={{ marginTop: '12px' }}>{rew.rewardId === 'rew_loy' ? 'Oyning eng yaxshi loyihasi' : 'Eng katta o‘sish'}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '8px' }}>{rew.details}</p>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Berilgan sana: {rew.dateAwarded}</span>
            </div>
          ))}
          <div className="card" style={{ borderStyle: 'dashed', opacity: 0.7, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <div>
              <h3>Yangi mukofotlar kutish...</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Darslarda faol bo‘ling va navbatdagi mukofot egasiga aylaning.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

// ==========================================
// PARENT PORTAL
// ==========================================
const ParentPortal: React.FC<{ db: VarzikDB; parentUser: User; activeTab: string; refreshDB: () => void }> = ({ db, parentUser, activeTab, refreshDB }) => {
  // Find linked student u_stud1
  const student = db.getUsers().find(u => u.id === 'u_stud1')!;
  const consents = db.getConsents('u_stud1');

  const handleConsentToggle = (type: Consent['consentType'], currentVal: boolean) => {
    db.saveConsent('u_stud1', type, !currentVal);
    refreshDB();
  };

  if (activeTab === 'dashboard') {
    const ev = db.getEvaluations('u_stud1')[0];
    return (
      <div>
        <h2>Farzandingiz: {student.fullName} (O‘quv holati)</h2>
        <div className="grid-2" style={{ marginTop: '20px' }}>
          <div className="card">
            <h3>📈 Oylik Baholari</h3>
            {ev ? (
              <div style={{ marginTop: '12px' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--secondary)' }}>
                  {ev.totalPoints} / 100 ball
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '8px' }}>
                  Hamma topshiriqlarni o‘z vaqtida topshirgan. Davomat 100%.
                </p>
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '10px', marginTop: '16px' }}>
                  <strong>Mentor fikri:</strong>
                  <p style={{ fontStyle: 'italic', marginTop: '4px' }}>"{ev.comments}"</p>
                </div>
              </div>
            ) : (
              <p>Hali baholanmagan</p>
            )}
          </div>

          <div className="card">
            <h3>📅 Davomat ko‘rsatkichi</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--secondary)', marginTop: '12px' }}>
              100%
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Farzandingiz iyun-iyul oylarida barcha darslarda to‘liq ishtirok etgan.</p>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'consents') {
    const getConsentVal = (type: Consent['consentType']) => {
      const found = consents.find(c => c.consentType === type);
      return found ? found.isGranted : false;
    };

    return (
      <div>
        <h2>Farzandingiz xavfsizligi va roziliklarni boshqarish</h2>
        <p style={{ color: 'var(--text-muted)' }}>Ota-ona yoki qonuniy vakil sifatida ommaviy saytda bolaning ism-familiyasi yoki loyihalari aks etishini real vaqtda cheklashingiz yoki ruxsat berishingiz mumkin.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
          {[
            { type: 'profile', title: 'Ommaviy sahifada profil ochishga rozilik', desc: 'Agar ruxsat bermasangiz, o‘quvchilar ro‘yxatida farzandingiz umuman chiqmaydi.' },
            { type: 'name', title: 'Ism-familiyasini ko‘rsatishga rozilik', desc: 'Ruxsat berilmasa, bola ism-familiyasi o‘rniga uning taxallusi (alias) chiqadi.' },
            { type: 'photo', title: 'Dars rasmlariga rozilik', desc: 'Ommaviy yangiliklar va tadbir rasmlarida bolaning rasmi chiqishiga ruxsat.' },
            { type: 'project', title: 'Loyiha kodlari va tavsifiga rozilik', desc: 'Bolaning yozgan amaliy AI loyihalari portfoliosini ommaga ko‘rsatish.' }
          ].map(item => {
            const val = getConsentVal(item.type as any);
            return (
              <div className="card" key={item.type} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: 1, paddingRight: '20px' }}>
                  <h4>{item.title}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>{item.desc}</p>
                </div>
                <div>
                  <button
                    className={`btn ${val ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => handleConsentToggle(item.type as any, val)}
                  >
                    {val ? 'Ruxsat berilgan ✓' : 'Taqiqlangan ✗'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (activeTab === 'contact') {
    return (
      <div>
        <h2>Mentor bilan aloqa bog‘lash</h2>
        <div className="card" style={{ marginTop: '20px' }}>
          <form onSubmit={e => { e.preventDefault(); alert("Xabaringiz mentor Bobur Akbarovga yuborildi. Tez orada javob olasiz."); }}>
            <div className="form-group">
              <label className="form-label">Kimga yuborilmoqda</label>
              <select className="form-control">
                <option>Bobur Akbarov (Asosiy Mentor)</option>
                <option>Nodira To‘rayeva (Computer Vision mentori)</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Murojaat matni</label>
              <textarea className="form-control" rows={4} required placeholder="Farzandingizning darsi, chiroq o‘chishi yoki yordam rejalari haqida yozing..."></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Xabar yuborish</button>
          </form>
        </div>
      </div>
    );
  }

  return null;
};

// ==========================================
// MENTOR PORTAL
// ==========================================
const MentorPortal: React.FC<{ db: VarzikDB; mentorUser: User; activeTab: string; refreshDB: () => void }> = ({ db, mentorUser, activeTab, refreshDB }) => {
  const students = db.getPublicStudents(); // filtered
  const assignments = db.getAssignments();
  const submissions = db.getAssignmentSubmissions().filter(s => s.status === 'mentor tekshirmoqda' || s.status === 'topshirildi');
  const supportPlans = db.getSupportPlans();

  // Evaluation states
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [attP, setAttP] = useState(15);
  const [dailyP, setDailyP] = useState(20);
  const [weeklyP, setWeeklyP] = useState(15);
  const [monthlyP, setMonthlyP] = useState(30);
  const [presP, setPresP] = useState(10);
  const [teamP, setTeamP] = useState(10);
  const [evalComment, setEvalComment] = useState('');
  const [evalSuccess, setEvalSuccess] = useState(false);

  // New assignment states
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newType, setNewType] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [newMax, setNewMax] = useState(20);
  const [newDate, setNewDate] = useState('2026-07-20');
  const [assSuccess, setAssSuccess] = useState(false);

  const handleEvaluationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentId) return;

    db.addEvaluation({
      submissionId: 'sub_manual_' + Date.now(),
      studentId: selectedStudentId,
      evaluatorId: mentorUser.id,
      attendancePoints: attP,
      dailyTasksPoints: dailyP,
      weeklyTasksPoints: weeklyP,
      monthlyProjectPoints: monthlyP,
      presentationPoints: presP,
      teamworkPoints: teamP,
      comments: evalComment
    });

    setEvalSuccess(true);
    setTimeout(() => {
      setEvalSuccess(false);
      setSelectedStudentId('');
      setEvalComment('');
      refreshDB();
    }, 2500);
  };

  const handleNewAssignmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    db.createAssignment({
      lessonId: 'les_1',
      cohortId: 'c_pilot',
      title: newTitle,
      description: newDesc,
      type: newType,
      dueDate: newDate + 'T23:59:59Z',
      maxPoints: newMax
    });
    setAssSuccess(true);
    setTimeout(() => {
      setAssSuccess(false);
      setNewTitle('');
      setNewDesc('');
      refreshDB();
    }, 2000);
  };

  if (activeTab === 'dashboard') {
    return (
      <div>
        <h2>Varzik AI Lab talabalari (Guruhlar baholash paneli)</h2>
        <div className="grid-3" style={{ marginTop: '20px' }}>
          {students.map(stud => (
            <div className="card" key={stud.id} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h4>{stud.fullName}</h4>
                <span className="badge badge-info" style={{ marginTop: '4px' }}>{stud.ageRange} yosh</span>
                <p style={{ marginTop: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <strong>Qiziqishlari:</strong> {stud.strengths.join(', ')}
                </p>
              </div>
              <button className="btn btn-secondary btn-sm" style={{ marginTop: '16px', width: '100%' }} onClick={() => { setSelectedStudentId(stud.id); setAttP(15); setDailyP(20); setWeeklyP(15); setMonthlyP(30); setPresP(10); setTeamP(10); }}>
                Baholash (100 ballik)
              </button>
            </div>
          ))}
        </div>

        {selectedStudentId && (
          <div className="no-print" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '20px' }}>
            <div className="card" style={{ maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
              <h3>Oylik baholash shakli</h3>
              {evalSuccess ? (
                <div className="alert-box alert-box-info" style={{ marginTop: '20px', textAlign: 'center' }}>
                  Baho muvaffaqiyatli saqlandi va ota-onaga yuborildi.
                </div>
              ) : (
                <form onSubmit={handleEvaluationSubmit} style={{ marginTop: '16px' }}>
                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label">Davomat va kelish (Max 15)</label>
                      <input type="number" className="form-control" max={15} required value={attP} onChange={e => setAttP(Number(e.target.value))} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Kundalik vazifalar (Max 20)</label>
                      <input type="number" className="form-control" max={20} required value={dailyP} onChange={e => setDailyP(Number(e.target.value))} />
                    </div>
                  </div>

                  <div className="grid-3">
                    <div className="form-group">
                      <label className="form-label">Haftalik test (Max 15)</label>
                      <input type="number" className="form-control" max={15} required value={weeklyP} onChange={e => setWeeklyP(Number(e.target.value))} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Oylik loyiha (Max 30)</label>
                      <input type="number" className="form-control" max={30} required value={monthlyP} onChange={e => setMonthlyP(Number(e.target.value))} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Taqdimot (Max 10)</label>
                      <input type="number" className="form-control" max={10} required value={presP} onChange={e => setPresP(Number(e.target.value))} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Jamoaviy yordam & Etika (Max 10)</label>
                    <input type="number" className="form-control" max={10} required value={teamP} onChange={e => setTeamP(Number(e.target.value))} />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Mentor tavsiyalari va izohi</label>
                    <textarea className="form-control" rows={3} required value={evalComment} onChange={e => setEvalComment(e.target.value)}></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Baholashni tasdiqlash</button>
                  <button type="button" className="btn btn-secondary" style={{ width: '100%', marginTop: '8px' }} onClick={() => setSelectedStudentId('')}>Bekor qilish</button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (activeTab === 'attendance') {
    return (
      <div>
        <h2>Kunlik Davomat Olish</h2>
        <p style={{ color: 'var(--text-muted)' }}>Bugungi sana: 2026-07-11</p>
        <div className="table-wrapper" style={{ marginTop: '20px' }}>
          <table className="table">
            <thead>
              <tr>
                <th>O‘quvchi</th>
                <th>Status</th>
                <th>Sabab (agar qoldirgan bo‘lsa)</th>
              </tr>
            </thead>
            <tbody>
              {students.map(stud => (
                <tr key={stud.id}>
                  <td><strong>{stud.fullName}</strong></td>
                  <td>
                    <select className="form-control" style={{ width: '150px' }} onChange={e => alert(`${stud.fullName} davomati saqlandi.`)}>
                      <option>Keldi ✓</option>
                      <option>Kelmagan ✗</option>
                      <option>Kechikdi ⏳</option>
                    </select>
                  </td>
                  <td>
                    <input type="text" className="form-control" placeholder="Sarmoya yoki kasal..." />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (activeTab === 'assignments') {
    return (
      <div style={{ maxWidth: '600px' }}>
        <h2>Yangi topshiriq va dars yaratish</h2>
        {assSuccess ? (
          <div className="alert-box alert-box-info" style={{ marginTop: '20px' }}>
            Yangi topshiriq muvaffaqiyatli e’lon qilindi.
          </div>
        ) : (
          <form onSubmit={handleNewAssignmentSubmit} style={{ marginTop: '20px' }}>
            <div className="form-group">
              <label className="form-label">Topshiriq nomi</label>
              <input type="text" className="form-control" required value={newTitle} onChange={e => setNewTitle(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Batafsil talablar</label>
              <textarea className="form-control" rows={3} required value={newDesc} onChange={e => setNewDesc(e.target.value)}></textarea>
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Turi</label>
                <select className="form-control" value={newType} onChange={e => setNewType(e.target.value as any)}>
                  <option value="daily">Kunlik (Mantiq/Kod)</option>
                  <option value="weekly">Haftalik amaliyot</option>
                  <option value="monthly">Oylik loyiha MVP</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Maksimal Ball</label>
                <input type="number" className="form-control" required value={newMax} onChange={e => setNewMax(Number(e.target.value))} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Muddat (Due Date)</label>
              <input type="date" className="form-control" required value={newDate} onChange={e => setNewDate(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Topshiriqni e’lon qilish</button>
          </form>
        )}
      </div>
    );
  }

  if (activeTab === 'support') {
    return (
      <div>
        <h2>Maxsus Tiklanish va Qo‘shimcha Yordam Rejalari (&lt;60)</h2>
        <p style={{ color: 'var(--text-muted)' }}>Oylik balli 60 balldan past bo‘lgan o‘quvchilar avtomatik kursdan haydalmaydi. Ular uchun maxsus mentor ko‘magi rejasi tuziladi.</p>

        <div className="table-wrapper" style={{ marginTop: '20px' }}>
          <table className="table">
            <thead>
              <tr>
                <th>O‘quvchi</th>
                <th>Oylik balli</th>
                <th>Yordam rejasi tavsifi</th>
                <th>Muddati</th>
                <th>Holati</th>
              </tr>
            </thead>
            <tbody>
              {supportPlans.map(sp => (
                <tr key={sp.id}>
                  <td><strong>Jasurbek Usmonov (DEMO)</strong></td>
                  <td><span className="badge badge-danger">48 ball</span></td>
                  <td>{sp.description}</td>
                  <td>{sp.startDate} dan {sp.endDate} gacha</td>
                  <td><span className="badge badge-warning">{sp.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return null;
};

// ==========================================
// SPONSOR PORTAL
// ==========================================
const SponsorPortal: React.FC<{ db: VarzikDB; sponsorUser: User; activeTab: string }> = ({ db, sponsorUser, activeTab }) => {
  const donations = db.getDonations();
  const stats = db.getFinancialStats();

  if (activeTab === 'dashboard') {
    return (
      <div>
        <h2>Homiyligingiz ta’siri (Sponsor Dashboard)</h2>
        <p style={{ color: 'var(--text-muted)' }}>Siz tomondan yo‘naltirilgan moliyaviy yordamlarning natijalari:</p>

        <div className="grid-2" style={{ marginTop: '24px' }}>
          <div className="card" style={{ borderLeft: '4px solid var(--secondary)' }}>
            <h3>💻 Sotib olingan uskunalar</h3>
            <p style={{ marginTop: '12px' }}>
              M-Group xayriyasi evaziga markazga <strong>1 ta Lenovo ThinkPad noutbug‘i</strong> va <strong>1 ta Wi-Fi 6 Router</strong> sotib olindi. Hozirda ushbu kompyuter Alijon Karimov tomonidan amaliy loyihalar va model o‘qitish uchun foydalanilmoqda.
            </p>
          </div>
          <div className="card" style={{ borderLeft: '4px solid var(--success)' }}>
            <h3>📈 O‘quvchi natijalari</h3>
            <p style={{ marginTop: '12px' }}>
              Homiy qilgan mablag‘ingiz qishloqdagi yoshlarning <strong>3 ta amaliy AI loyihasini</strong> yaratishga zaxira bo‘ldi. Varzik Smart Irrigation prototipi Demo Day ga tayyorlanmoqda.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'history') {
    return (
      <div>
        <h2>Xayriyalar Tarixi</h2>
        <div className="table-wrapper" style={{ marginTop: '20px' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Sana</th>
                <th>Summa</th>
                <th>USD ekvivalenti</th>
                <th>Kampaniya</th>
                <th>Hujjat</th>
                <th>Holati</th>
              </tr>
            </thead>
            <tbody>
              {donations.map(d => (
                <tr key={d.id}>
                  <td>{d.created_at.split('T')[0]}</td>
                  <td>{d.amount.toLocaleString()} {d.currency}</td>
                  <td>${d.amountInUSD.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                  <td>{d.targetCampaignId === 'camp_year1' ? '1 yillik barqaror faoliyat' : 'Pilot Cohort'}</td>
                  <td>
                    {d.paymentProofUrl ? (
                      <span className="badge badge-success">✓ Kvitansiya</span>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td><span className="badge badge-success">{d.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (activeTab === 'reports') {
    return (
      <div>
        <h2>Oylik PDF hisobotlar va yangiliklarnomalar</h2>
        <div className="grid-2" style={{ marginTop: '20px' }}>
          <div className="card">
            <h4>📄 Varzik AI Lab Yillik hisobot (Qoralama)</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '6px' }}>Yillik moliyaviy audit va foydalanuvchilar o‘sish ko‘rsatkichi.</p>
            <button className="btn btn-secondary btn-sm" style={{ width: '100%', marginTop: '12px' }} onClick={() => alert("PDF generatsiya qilinmoqda...")}>Yuklab olish</button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

// ==========================================
// AUDITOR PORTAL
// ==========================================
const AuditorPortal: React.FC<{ db: VarzikDB; activeTab: string }> = ({ db, activeTab }) => {
  const donations = db.getDonations();
  const expenses = db.getExpenses();
  const auditLogs = db.getAuditLogs();
  const stats = db.getFinancialStats();

  if (activeTab === 'dashboard') {
    return (
      <div>
        <h2>Auditor va Kuzatuv Kengashi (Faqat O‘qish rejimi)</h2>
        <p style={{ color: 'var(--text-muted)' }}>Tashkilotning to‘liq moliyaviy auditi. Yozuvlarni o‘zgartirish taqiqlangan.</p>

        <div className="grid-3" style={{ marginTop: '24px' }}>
          <div className="card">
            <h4>Tasdiqlangan homiyliklar</h4>
            <div className="stat-value" style={{ color: 'var(--secondary)' }}>${stats.totalRaisedUSD.toFixed(1)}</div>
          </div>
          <div className="card">
            <h4>Real xarajatlar</h4>
            <div className="stat-value" style={{ color: 'var(--danger)' }}>${stats.totalSpentUSD.toFixed(1)}</div>
          </div>
          <div className="card">
            <h4>Naqd pul qoldig‘i</h4>
            <div className="stat-value" style={{ color: 'var(--success)' }}>${stats.remainingUSD.toFixed(1)}</div>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'donations') {
    return (
      <div>
        <h2>Homiyliklar Jurnali</h2>
        <div className="table-wrapper" style={{ marginTop: '20px' }}>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Sana</th>
                <th>Homiy nomi</th>
                <th>Summa</th>
                <th>USD Ekvivalenti</th>
                <th>To‘lov usuli</th>
                <th>Holat</th>
              </tr>
            </thead>
            <tbody>
              {donations.map(d => (
                <tr key={d.id}>
                  <td>{d.id}</td>
                  <td>{d.created_at.split('T')[0]}</td>
                  <td>{d.donorName}</td>
                  <td>{d.amount.toLocaleString()} {d.currency}</td>
                  <td>${d.amountInUSD.toFixed(2)}</td>
                  <td>{d.paymentMethod}</td>
                  <td><span className="badge badge-success">{d.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (activeTab === 'expenses') {
    return (
      <div>
        <h2>Xarajatlar Jurnali</h2>
        <div className="table-wrapper" style={{ marginTop: '20px' }}>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Sana</th>
                <th>Xarajat nomi</th>
                <th>Kategoriya</th>
                <th>Summa</th>
                <th>USD Ekv.</th>
                <th>Tasdiqlovchi Admin</th>
                <th>Chek</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map(e => (
                <tr key={e.id}>
                  <td>{e.id}</td>
                  <td>{e.purchaseDate}</td>
                  <td>{e.name}</td>
                  <td>{e.category}</td>
                  <td>{e.amount.toLocaleString()} {e.currency}</td>
                  <td>${e.amountInUSD.toFixed(2)}</td>
                  <td>{e.approvedBy}</td>
                  <td>{e.invoiceUrl ? '✓ Chek bor' : '✗ Yo‘q'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (activeTab === 'audit_logs') {
    return (
      <div>
        <h2>Tizim o‘zgarishlari audit tarixi (Audit logs)</h2>
        <div className="table-wrapper" style={{ marginTop: '20px' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Vaqt</th>
                <th>Amalni bajardi</th>
                <th>Harakat turi</th>
                <th>Jadval</th>
                <th>Eski qiymat</th>
                <th>Yangi qiymat</th>
                <th>Sabab</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map(log => (
                <tr key={log.id} style={{ fontSize: '0.85rem' }}>
                  <td>{log.created_at.split('T')[0]}</td>
                  <td>{log.executorName}</td>
                  <td><span className="badge badge-info">{log.actionType}</span></td>
                  <td>{log.tableName}</td>
                  <td style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{log.oldValues}</td>
                  <td style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{log.newValues}</td>
                  <td>{log.justification}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return null;
};

// ==========================================
// ADMIN PORTAL
// ==========================================
const AdminPortal: React.FC<{ db: VarzikDB; activeTab: string; refreshDB: () => void }> = ({ db, activeTab, refreshDB }) => {
  const users = db.getUsers();
  const alerts = db.getAdminAlerts();
  const stats = db.getFinancialStats();
  const donations = db.getDonations();
  const expenses = db.getExpenses();
  const assets = db.getAssets();
  const campaigns = db.getDonationCampaigns();
  const needs = db.getNeeds();
  const auditLogs = db.getAuditLogs();

  // Exchange rate update state
  const [newRate, setNewRate] = useState(db.getExchangeRate());
  const [rateJustification, setRateJustification] = useState('');
  const [rateSuccess, setRateSuccess] = useState(false);

  // New campaign state
  const [campName, setCampName] = useState('');
  const [campDesc, setCampDesc] = useState('');
  const [campTarget, setCampTarget] = useState(15000);
  const [campStart, setCampStart] = useState('2026-07-01');
  const [campEnd, setCampEnd] = useState('2027-07-01');
  const [campSuccess, setCampSuccess] = useState(false);

  // New Expense state
  const [expName, setExpName] = useState('');
  const [expCat, setExpCat] = useState<any>('noutbuk va kompyuter');
  const [expAmt, setExpAmt] = useState(100);
  const [expCur, setExpCur] = useState<'USD' | 'UZS'>('USD');
  const [expCamp, setExpCamp] = useState(campaigns[0]?.id || '');
  const [expVendor, setExpVendor] = useState('');
  const [expComment, setExpComment] = useState('');
  const [expSuccess, setExpSuccess] = useState(false);

  const handleRateUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rateJustification) {
      alert("Kursni o‘zgartirish sababini yozishingiz shart!");
      return;
    }
    db.setExchangeRate(newRate, rateJustification);
    setRateSuccess(true);
    setRateJustification('');
    setTimeout(() => {
      setRateSuccess(false);
      refreshDB();
    }, 2000);
  };

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    db.addDonationCampaign({
      name: campName,
      description: campDesc,
      targetAmountUSD: campTarget,
      status: 'active',
      startDate: campStart,
      endDate: campEnd
    });
    setCampSuccess(true);
    setCampName('');
    setCampDesc('');
    setTimeout(() => {
      setCampSuccess(false);
      refreshDB();
    }, 2000);
  };

  const handleCreateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      db.addExpense({
        name: expName,
        category: expCat,
        purchaseDate: new Date().toISOString().split('T')[0],
        vendor: expVendor,
        amount: expAmt,
        currency: expCur,
        targetCampaignId: expCamp,
        approvedBy: db.getCurrentUser()!.id,
        comments: expComment,
        status: 'sotib olindi', // immediate purchase
        invoiceUrl: 'invoice_uploaded.pdf'
      });
      setExpSuccess(true);
      setExpName('');
      setExpVendor('');
      setExpComment('');
      setTimeout(() => {
        setExpSuccess(false);
        refreshDB();
      }, 2000);
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (activeTab === 'dashboard') {
    return (
      <div>
        <h2>Tizim Ogohlantirishlari (System Alerts)</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
          {alerts.map((al, idx) => (
            <div className={`alert-box ${al.type === 'danger' ? 'alert-box-danger' : al.type === 'warning' ? 'alert-box-warning' : 'alert-box-info'}`} key={idx}>
              <div>
                <strong>{al.type === 'danger' ? '🚨 MUAMMO:' : al.type === 'warning' ? '⚠️ OGOHLANTIRISH:' : 'ℹ️ MA’LUMOT:'}</strong> {al.message}
              </div>
            </div>
          ))}
          {alerts.length === 0 && (
            <div className="alert-box alert-box-info">Tizimda ogohlantirishlar va xatoliklar mavjud emas. Hammasi a’lo holatda ✓</div>
          )}
        </div>

        <div className="grid-3" style={{ marginTop: '24px' }}>
          <div className="card">
            <h4>Faol foydalanuvchilar</h4>
            <div style={{ fontSize: '2rem', fontWeight: 800 }}>{users.length} ta</div>
          </div>
          <div className="card">
            <h4>Jami yig‘ilgan mablag‘</h4>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--secondary)' }}>${stats.totalRaisedUSD.toFixed(1)}</div>
          </div>
          <div className="card">
            <h4>Joriy valyuta kursi</h4>
            <div style={{ fontSize: '2rem', fontWeight: 800 }}>{stats.rate} UZS</div>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'users') {
    return (
      <div>
        <h2>Foydalanuvchilar va Rollarni boshqarish</h2>
        <div className="table-wrapper" style={{ marginTop: '20px' }}>
          <table className="table">
            <thead>
              <tr>
                <th>F.I.Sh</th>
                <th>Username</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Holat</th>
                <th>Rol tahrirlash</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td><strong>{u.fullName}</strong></td>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td><span className="badge badge-info">{u.role}</span></td>
                  <td><span className="badge badge-success">{u.status}</span></td>
                  <td>
                    <select
                      className="form-control"
                      value={u.role}
                      onChange={e => {
                        const justification = prompt("Ushbu foydalanuvchi rolini o‘zgartirish sababini yozing:");
                        if (justification) {
                          db.updateUserRole(u.id, e.target.value as any, justification);
                          refreshDB();
                        }
                      }}
                      style={{ padding: '4px 8px', fontSize: '0.85rem' }}
                    >
                      <option value="ADMIN">ADMIN</option>
                      <option value="MENTOR">MENTOR</option>
                      <option value="STUDENT">STUDENT</option>
                      <option value="PARENT">PARENT</option>
                      <option value="SPONSOR">SPONSOR</option>
                      <option value="AUDITOR">AUDITOR</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (activeTab === 'donations') {
    const pendingDonations = donations.filter(d => d.status === 'kutilmoqda');
    return (
      <div>
        <h2>Kutilayotgan Homiyliklarni tasdiqlash</h2>
        <p style={{ color: 'var(--text-muted)' }}>Bank o‘tkazmasi orqali to‘lov qilgan homiy kvitansiyalarini solishtirib, hisobga kiriting.</p>
        
        {pendingDonations.length === 0 ? (
          <div className="alert-box alert-box-info" style={{ marginTop: '20px' }}>Kutilayotgan tasdiqlanmagan homiyliklar yo‘q.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
            {pendingDonations.map(d => (
              <div className="card" key={d.id}>
                <h4>{d.donorName} tomonidan homiylik arizasi</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '8px 0' }}>
                  Summa: <strong>{d.amount.toLocaleString()} {d.currency}</strong> (Kurs bo‘yicha: ${d.amountInUSD.toFixed(2)})<br />
                  Maqsadi: {d.purpose} <br />
                  To‘lov usuli: {d.paymentMethod}
                </p>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    const justification = prompt("Homiylikni tasdiqlash uchun izoh (audit log uchun):");
                    if (justification) {
                      db.approveDonation(d.id, justification);
                      refreshDB();
                    }
                  }}
                >
                  Tasdiqlash (Kelib tushdi holatiga o‘tkazish)
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (activeTab === 'expenses') {
    return (
      <div>
        <h2>Yangi xarajat yaratish (Chek yuklash bilan)</h2>
        {expSuccess ? (
          <div className="alert-box alert-box-info" style={{ marginTop: '20px' }}>Xarajat muvaffaqiyatli qo‘shildi. Kampaniya byudjeti yangilandi.</div>
        ) : (
          <form onSubmit={handleCreateExpense} style={{ maxWidth: '600px', marginTop: '20px' }}>
            <div className="form-group">
              <label className="form-label">Xarajat nomi</label>
              <input type="text" className="form-control" required value={expName} onChange={e => setExpName(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Kategoriya</label>
              <select className="form-control" value={expCat} onChange={e => setExpCat(e.target.value as any)}>
                <option value="noutbuk va kompyuter">noutbuk va kompyuter</option>
                <option value="internet">internet</option>
                <option value="elektr va UPS">elektr va UPS</option>
                <option value="o‘quv vositalari">o‘quv vositalari</option>
                <option value="mentor to‘lovi">mentor to‘lovi</option>
                <option value="loyiha mikrogranti">loyiha mikrogranti</option>
                <option value="transport">transport</option>
                <option value="ta’mirlash">ta’mirlash</option>
                <option value="boshqa">boshqa</option>
              </select>
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Summa</label>
                <input type="number" className="form-control" required value={expAmt} onChange={e => setExpAmt(Number(e.target.value))} />
              </div>
              <div className="form-group">
                <label className="form-label">Valyuta</label>
                <select className="form-control" value={expCur} onChange={e => setExpCur(e.target.value as any)}>
                  <option value="USD">USD ($)</option>
                  <option value="UZS">UZS (so‘m)</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Maqsadli Kampaniya</label>
              <select className="form-control" value={expCamp} onChange={e => setExpCamp(e.target.value)}>
                {campaigns.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Sotuvchi (Vendor / Kimga to‘landi)</label>
              <input type="text" className="form-control" required value={expVendor} onChange={e => setExpVendor(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Izoh</label>
              <textarea className="form-control" rows={3} value={expComment} onChange={e => setExpComment(e.target.value)}></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Xarajatni saqlash</button>
          </form>
        )}
      </div>
    );
  }

  if (activeTab === 'assets') {
    return (
      <div>
        <h2>Jihozlar & Inventar boshqaruvi</h2>
        <div className="table-wrapper" style={{ marginTop: '20px' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Jihoz nomi</th>
                <th>Kategoriya</th>
                <th>Soni</th>
                <th>Manbasi</th>
                <th>Serial raqam (Faqat Admin)</th>
                <th>Holat</th>
              </tr>
            </thead>
            <tbody>
              {assets.map(a => (
                <tr key={a.id}>
                  <td><strong>{a.name}</strong></td>
                  <td>{a.category}</td>
                  <td>{a.quantity} ta</td>
                  <td>{a.fundingSource}</td>
                  <td><code style={{ backgroundColor: 'var(--border)', padding: '2px 6px', borderRadius: '4px' }}>{a.serialNumber || 'N/A'}</code></td>
                  <td>
                    <select
                      className="form-control"
                      value={a.status}
                      onChange={e => {
                        db.updateAssetStatus(a.id, e.target.value as any);
                        refreshDB();
                      }}
                      style={{ padding: '4px', fontSize: '0.85rem' }}
                    >
                      <option value="mavjud">mavjud</option>
                      <option value="natura yordami">natura yordami</option>
                      <option value="ta’mirda">ta’mirda</option>
                      <option value="vaqtincha ishlamaydi">vaqtincha ishlamaydi</option>
                      <option value="hisobdan chiqarilgan">hisobdan chiqarilgan</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (activeTab === 'campaigns') {
    return (
      <div style={{ maxWidth: '600px' }}>
        <h2>Yangi Homiylik Kampaniyasi yaratish</h2>
        {campSuccess ? (
          <div className="alert-box alert-box-info" style={{ marginTop: '20px' }}>Kampaniya muvaffaqiyatli saqlandi.</div>
        ) : (
          <form onSubmit={handleCreateCampaign} style={{ marginTop: '20px' }}>
            <div className="form-group">
              <label className="form-label">Kampaniya nomi</label>
              <input type="text" className="form-control" required value={campName} onChange={e => setCampName(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Tavsif</label>
              <textarea className="form-control" rows={3} required value={campDesc} onChange={e => setCampDesc(e.target.value)}></textarea>
            </div>
            <div className="form-group">
              <label className="form-label">Maqsad (USD)</label>
              <input type="number" className="form-control" required value={campTarget} onChange={e => setCampTarget(Number(e.target.value))} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Kampaniyani saqlash</button>
          </form>
        )}
      </div>
    );
  }

  if (activeTab === 'needs') {
    return (
      <div>
        <h2>Ehtiyoj sozlamalari</h2>
        <div className="table-wrapper" style={{ marginTop: '20px' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Ehtiyoj</th>
                <th>Ustuvorlik</th>
                <th>Maqsad ($)</th>
                <th>Soni</th>
                <th>Holat</th>
              </tr>
            </thead>
            <tbody>
              {needs.map(n => (
                <tr key={n.id}>
                  <td><strong>{n.name}</strong></td>
                  <td><span className="badge badge-info">{n.priority}</span></td>
                  <td>${n.targetAmountUSD}</td>
                  <td>{n.quantityNeeded} ta</td>
                  <td><span className="badge badge-success">{n.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (activeTab === 'audit_logs') {
    return (
      <div>
        <h2>Tizim o‘zgarishlari audit tarixi (Audit logs)</h2>
        <div className="table-wrapper" style={{ marginTop: '20px' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Vaqt</th>
                <th>Amalni bajardi</th>
                <th>Harakat turi</th>
                <th>Jadval</th>
                <th>Eski qiymat</th>
                <th>Yangi qiymat</th>
                <th>Sabab</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map(log => (
                <tr key={log.id} style={{ fontSize: '0.85rem' }}>
                  <td>{log.created_at.split('T')[0]}</td>
                  <td>{log.executorName}</td>
                  <td><span className="badge badge-info">{log.actionType}</span></td>
                  <td>{log.tableName}</td>
                  <td style={{ maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{log.oldValues}</td>
                  <td style={{ maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{log.newValues}</td>
                  <td>{log.justification}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (activeTab === 'settings') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        {/* Exchange Rate Update */}
        <div className="card" style={{ maxWidth: '600px' }}>
          <h3>💵 Valyuta kursini boshqarish</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
            Hozirgi tizim valyuta kursi: <strong>1 USD = {db.getExchangeRate()} UZS</strong>. Bu kurs homiyliklarni hisoblashda ishlatiladi.
          </p>

          {rateSuccess ? (
            <div className="alert-box alert-box-info" style={{ marginTop: '20px' }}>Valyuta kursi muvaffaqiyatli yangilandi va audit logiga yozildi.</div>
          ) : (
            <form onSubmit={handleRateUpdate} style={{ marginTop: '20px' }}>
              <div className="form-group">
                <label className="form-label">Yangi kurs (1 USD = ? UZS)</label>
                <input type="number" className="form-control" required value={newRate} onChange={e => setNewRate(Number(e.target.value))} />
              </div>
              <div className="form-group">
                <label className="form-label">Kursni o‘zgartirish sababi (Audit uchun majburiy)</label>
                <input type="text" className="form-control" required value={rateJustification} onChange={e => setRateJustification(e.target.value)} placeholder="Markaziy bank kursi yangilanishi..." />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Valyuta kursini saqlash</button>
            </form>
          )}
        </div>

        {/* Database Management & Backups */}
        <div className="card" style={{ maxWidth: '600px' }}>
          <h3>💾 Zaxira nusxa (Backup) va Tizimni qayta sozlash</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
            Tizimdagi barcha 49 ta jadval ma’lumotlarini JSON fayl ko‘rinishida yuklab oling yoki qayta tiklang.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
            <button className="btn btn-secondary" onClick={() => {
              const data = db.backupExport();
              const blob = new Blob([data], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = `varzik_ai_lab_backup_${new Date().toISOString().split('T')[0]}.json`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}>
              Zaxira faylini eksport qilish (JSON)
            </button>

            <button className="btn btn-secondary" onClick={() => {
              const fileInput = document.createElement('input');
              fileInput.type = 'file';
              fileInput.accept = '.json';
              fileInput.onchange = (e: any) => {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (evt: any) => {
                  const success = db.backupImport(evt.target.result);
                  if (success) {
                    alert("Zaxira nusxasi muvaffaqiyatli yuklandi!");
                    refreshDB();
                  } else {
                    alert("Yuklashda xatolik yuz berdi. JSON formatini tekshiring.");
                  }
                };
                reader.readAsText(file);
              };
              fileInput.click();
            }}>
              Zaxira faylidan ma’lumotlarni qayta tiklash
            </button>

            <button
              className="btn btn-secondary"
              style={{ backgroundColor: 'var(--danger-bg)', color: 'var(--danger)', borderColor: 'var(--danger)' }}
              onClick={() => {
                if (confirm("Haqiqatan ham ma’lumotlarni qayta tiklamoqchimisiz? Barcha kiritilgan o‘zgarishlar o‘chib ketadi!")) {
                  db.resetDB();
                  alert("Ma’lumotlar bazasi boshlang‘ich demo holatiga qaytarildi!");
                  refreshDB();
                }
              }}
            >
              Ma’lumotlarni boshlang‘ich demo holatiga qaytarish (Reset)
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
