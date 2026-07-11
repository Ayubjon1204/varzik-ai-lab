// Varzik AI Lab - Simulated Relational Database Engine
// Saved in localStorage to persist modifications, including full role-based access controls and audit logs.

export interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  phone: string;
  role: 'OMMAVIY' | 'STUDENT' | 'PARENT' | 'MENTOR' | 'ADMIN' | 'SPONSOR' | 'AUDITOR' | 'VOLUNTEER' | 'INVESTOR';
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface StudentProfile {
  id: string; // matches User.id
  alias: string; // for public views
  ageRange: string; // e.g. "13-15", "16-18"
  birthDate: string;
  address: string;
  schoolName: string;
  gradeLevel: string;
  familyStatus: string;
  financialStatus: string;
  strengths: string[];
  growthAreas: string[];
  averageScore: number;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface GuardianProfile {
  id: string; // matches User.id
  fullName: string;
  email: string;
  phone: string;
  relationship: string; // 'ota' | 'ona' | 'vasiy'
  status: 'active';
  created_at: string;
}

export interface StudentGuardian {
  studentId: string;
  guardianId: string;
}

export interface MentorProfile {
  id: string; // matches User.id
  specialty: string;
  experience: string;
  bio: string;
  weeklyHours: number;
  status: 'active';
  created_at: string;
}

export interface DonorProfile {
  id: string; // matches User.id
  organizationName: string;
  isAnonymous: boolean;
  preferredDisplayName: string;
  status: 'active';
  created_at: string;
}

export interface Cohort {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed';
  created_at: string;
}

export interface CohortMember {
  cohortId: string;
  studentId: string;
  status: 'active' | 'completed' | 'dropped';
  created_at: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  status: 'active';
  created_at: string;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  status: 'active';
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  content: string;
  order: number;
  status: 'active';
}

export interface Assignment {
  id: string;
  lessonId: string;
  cohortId: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly';
  dueDate: string;
  maxPoints: number;
  status: 'active';
  created_at: string;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  submissionContent: string;
  files: string[];
  codeRepoUrl?: string;
  videoUrl?: string;
  status: 'berildi' | 'boshlandi' | 'topshirildi' | 'kechikdi' | 'mentor tekshirmoqda' | 'qayta ishlash kerak' | 'qabul qilindi';
  submittedAt?: string;
  pointsAwarded?: number;
  mentorFeedback?: string;
  created_at: string;
  updated_at: string;
}

export interface Evaluation {
  id: string;
  submissionId: string;
  studentId: string;
  evaluatorId: string;
  attendancePoints: number; // Max 15
  dailyTasksPoints: number; // Max 20
  weeklyTasksPoints: number; // Max 15
  monthlyProjectPoints: number; // Max 30
  presentationPoints: number; // Max 10
  teamworkPoints: number; // Max 10
  totalPoints: number; // Max 100
  comments: string;
  status: 'draft' | 'approved';
  created_at: string;
  updated_at: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  cohortId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  reason?: string;
  status_change_by: string;
  created_at: string;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  category: string;
}

export interface StudentSkill {
  studentId: string;
  skillId: string;
  proficiencyLevel: number; // 1-5
  status: 'active';
}

export interface StudentGoal {
  id: string;
  studentId: string;
  description: string;
  targetDate: string;
  status: 'in_progress' | 'achieved' | 'deferred';
  feedback?: string;
  created_at: string;
}

export interface MentorNote {
  id: string;
  studentId: string;
  mentorId: string;
  content: string;
  isPrivate: boolean; // if true, parents & student cannot see
  created_at: string;
}

export interface SupportPlan {
  id: string;
  studentId: string;
  mentorId: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'failed';
  reviewDate: string;
  created_at: string;
}

export interface Reward {
  id: string;
  name: string;
  category: string; // e.g. "Oyning eng yaxshi loyihasi", "Eng katta o‘sish", "Eng yaxshi jamoaviy yordam"
  description: string;
  icon: string; // emoji or SVG name
  status: 'active';
}

export interface StudentReward {
  id: string;
  studentId: string;
  rewardId: string;
  dateAwarded: string;
  details: string; // e.g. "Kitob", "Internet paketi", "Loyihaga mikrogrant"
}

export interface Project {
  id: string;
  name: string;
  description: string;
  problemSolved: string;
  stage: 'g‘oya' | 'tadqiqot' | 'prototip' | 'test' | 'MVP' | 'foydalanuvchilar bilan sinov' | 'faol mahsulot' | 'startup';
  techStack: string[];
  videoUrl?: string;
  demoUrl?: string;
  repoUrl?: string;
  fundingReceivedUSD: number;
  results?: string;
  status: 'active';
  created_at: string;
  updated_at: string;
}

export interface ProjectMember {
  projectId: string;
  studentId: string;
  role: string;
}

export interface ProjectUpdate {
  id: string;
  projectId: string;
  title: string;
  content: string;
  date: string;
  status: 'active';
}

export interface Startup {
  id: string;
  projectId: string;
  name: string;
  problem: string;
  solution: string;
  team: string; // descriptive
  mentorId: string;
  stage: 'prototip' | 'MVP' | 'foydalanuvchilar' | 'faol';
  prototypeUrl?: string;
  userCount: number;
  metrics: string;
  currentNeeds: string;
  investmentSoughtUSD: number;
  demoUrl?: string;
  status: 'active';
  created_at: string;
}

export interface StartupUpdate {
  id: string;
  startupId: string;
  title: string;
  content: string;
  date: string;
  status: 'active';
}

export interface InvestorInterest {
  id: string;
  startupId: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  amountRangeUSD: string;
  comments: string;
  status: 'pending' | 'reviewed';
  created_at: string;
}

export interface Consent {
  id: string;
  studentId: string;
  consentType: 'profile' | 'name' | 'photo' | 'video' | 'project' | 'demoday';
  isGranted: boolean;
  grantedBy: string; // Parent User ID
  grantedAt: string;
  status: 'active';
  created_at: string;
}

export interface MediaFile {
  id: string;
  targetType: 'project' | 'news' | 'event' | 'student';
  targetId: string;
  fileUrl: string;
  fileType: 'image' | 'video' | 'document';
  isPublic: boolean;
  created_at: string;
}

export interface Donation {
  id: string;
  donorId: string;
  amount: number;
  currency: 'UZS' | 'USD';
  exchangeRateAtDonation: number;
  amountInUSD: number;
  amountInUZS: number;
  donorName: string;
  isAnonymous: boolean;
  targetCampaignId?: string;
  purpose: string;
  paymentMethod: string;
  paymentProofUrl?: string;
  status: 'va’da qilindi' | 'kutilmoqda' | 'kelib tushdi' | 'qisman ajratildi' | 'to‘liq ajratildi' | 'ishlatildi' | 'qaytarildi yoki bekor qilindi';
  adminNotes?: string;
  created_at: string;
  updated_at: string;
}

export interface DonationCampaign {
  id: string;
  name: string;
  description: string;
  targetAmountUSD: number;
  raisedAmountUSD: number;
  spentAmountUSD: number;
  status: 'active' | 'completed' | 'draft';
  startDate: string;
  endDate: string;
  created_at: string;
}

export interface DonationAllocation {
  id: string;
  donationId: string;
  campaignId: string;
  amountUSD: number;
  created_at: string;
}

export interface Expense {
  id: string;
  name: string;
  category: 'noutbuk va kompyuter' | 'internet' | 'elektr va UPS' | 'o‘quv vositalari' | 'mentor to‘lovi' | 'o‘quvchi mukofoti' | 'loyiha mikrogranti' | 'tadbir' | 'transport' | 'ta’mirlash' | 'xavfsizlik' | 'huquqiy va buxgalteriya' | 'boshqa';
  purchaseDate: string;
  vendor: string;
  amount: number;
  currency: 'UZS' | 'USD';
  exchangeRateAtExpense: number;
  amountInUSD: number;
  amountInUZS: number;
  targetCampaignId?: string;
  approvedBy: string; // Admin User ID
  invoiceUrl?: string; // with hidden details
  photoUrl?: string;
  comments?: string;
  linkedAssetId?: string;
  status: 'rejalashtirilgan' | 'tasdiqlandi' | 'sotib olindi' | 'bekor qilindi';
  created_at: string;
  updated_at: string;
}

export interface ExpenseDocument {
  expenseId: string;
  docUrl: string;
  isReceiptVerified: boolean;
  status: 'active';
}

export interface Asset {
  id: string;
  name: string;
  category: string;
  quantity: number;
  status: 'mavjud' | 'natura yordami' | 'rejalashtirilgan' | 'buyurtma berilgan' | 'sotib olingan' | 'foydalanishda' | 'ta’mirda' | 'vaqtincha ishlamaydi' | 'hisobdan chiqarilgan';
  purchaseDate?: string;
  price: number; // in USD
  currency: 'USD' | 'UZS';
  fundingSource: string;
  photoUrl?: string;
  location: string;
  responsiblePerson: string;
  condition: string;
  lastChecked?: string;
  nextServiceDate?: string;
  linkedExpenseId?: string;
  serialNumber?: string; // ONLY visible to admin
  created_at: string;
}

export interface AssetMaintenance {
  id: string;
  assetId: string;
  maintenanceDate: string;
  details: string;
  costUSD: number;
  status: 'completed' | 'scheduled';
}

export interface Need {
  id: string;
  name: string;
  description: string;
  priority: 'juda zarur' | 'muhim' | 'rivojlanish uchun' | 'uzoq muddatli';
  targetAmountUSD: number;
  raisedAmountUSD: number;
  quantityNeeded: number;
  quantityFunded: number;
  targetDate: string;
  impactDescription: string;
  status: 'active' | 'fulfilled';
  created_at: string;
}

export interface ImpactUnit {
  id: string;
  amountUSD: number;
  unitName: string;
  impactDescription: string;
  priority: number;
  status: 'active';
}

export interface MonthlyReport {
  id: string;
  reportMonth: string; // e.g. "2026-06"
  activeStudentsCount: number;
  averageAttendance: number;
  tasksCompleted: number;
  projectsCreated: number;
  prototypesBuilt: number;
  mentoringHours: number;
  eventsHeld: number;
  totalRaisedUSD: number;
  totalSpentUSD: number;
  endingBalanceUSD: number;
  mainPurchases: string;
  newsNeeds: string;
  nextMonthPlans: string;
  photoUrls: string[];
  projectIds: string[];
  status: 'draft' | 'approved';
  approvedBy?: string;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  title: string;
  eventDate: string;
  location: string;
  type: 'ochiq dars' | 'saralash bootcampi' | 'Demo Day' | 'hackathon' | 'ota-onalar uchrashuvi' | 'mentorlik sessiyasi' | 'homiylar uchrashuvi' | 'startup pitch';
  description: string;
  targetAudience: string;
  registrationLimit: number;
  registeredCount: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  created_at: string;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  attendeeName: string;
  email: string;
  phone: string;
  role: string;
  status: 'registered' | 'attended' | 'cancelled';
  created_at: string;
}

export interface NewsPost {
  id: string;
  title: string;
  content: string;
  category: 'yangilik' | 'dars' | 'xarid' | 'loyiha' | 'homiylik' | 'tadbir';
  imageUrl?: string;
  date: string;
  linkedProjectId?: string;
  linkedExpenseId?: string;
  status: 'published' | 'draft';
  created_at: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  content: string;
  isRead: boolean;
  created_at: string;
}

export interface AuditLog {
  id: string;
  executorId: string;
  executorName: string;
  actionType: string; // e.g. "ADD_DONATION", "APPROVE_DONATION", "UPDATE_CONSENT", etc.
  tableName: string;
  recordId: string;
  oldValues: string;
  newValues: string;
  justification: string;
  created_at: string;
}

export interface Setting {
  key: string;
  value: string;
  description: string;
}

export interface ExchangeRate {
  id: string;
  rate: number; // e.g. 12800 UZS = 1 USD
  effectiveDate: string;
  setBy: string; // Admin User ID
  status: 'active' | 'historical';
  created_at: string;
}

export interface DatabaseState {
  users: User[];
  student_profiles: StudentProfile[];
  guardian_profiles: GuardianProfile[];
  student_guardians: StudentGuardian[];
  mentor_profiles: MentorProfile[];
  donor_profiles: DonorProfile[];
  cohorts: Cohort[];
  cohort_members: CohortMember[];
  courses: Course[];
  modules: Module[];
  lessons: Lesson[];
  assignments: Assignment[];
  assignment_submissions: AssignmentSubmission[];
  evaluations: Evaluation[];
  attendance: Attendance[];
  skills: Skill[];
  student_skills: StudentSkill[];
  student_goals: StudentGoal[];
  mentor_notes: MentorNote[];
  support_plans: SupportPlan[];
  rewards: Reward[];
  student_rewards: StudentReward[];
  projects: Project[];
  project_members: ProjectMember[];
  project_updates: ProjectUpdate[];
  startups: Startup[];
  startup_updates: StartupUpdate[];
  investor_interest: InvestorInterest[];
  consents: Consent[];
  media_files: MediaFile[];
  donations: Donation[];
  donation_campaigns: DonationCampaign[];
  donation_allocations: DonationAllocation[];
  expenses: Expense[];
  expense_documents: ExpenseDocument[];
  assets: Asset[];
  asset_maintenance: AssetMaintenance[];
  needs: Need[];
  impact_units: ImpactUnit[];
  monthly_reports: MonthlyReport[];
  events: Event[];
  event_registrations: EventRegistration[];
  news_posts: NewsPost[];
  notifications: Notification[];
  audit_logs: AuditLog[];
  settings: Setting[];
  exchange_rates: ExchangeRate[];
}

// Initial Demo Data Setup
const getInitialDemoData = (): DatabaseState => {
  const users: User[] = [
    { id: 'u_admin', username: 'admin', fullName: 'Asadbek Varziki', email: 'asadbek@varzik.ai', phone: '+998901234567', role: 'ADMIN', status: 'active', created_at: '2026-01-01T00:00:00Z', updated_at: '2026-01-01T00:00:00Z' },
    { id: 'u_mentor1', username: 'mentor_bobur', fullName: 'Bobur Akbarov', email: 'bobur@varzik.ai', phone: '+998902223344', role: 'MENTOR', status: 'active', created_at: '2026-01-02T00:00:00Z', updated_at: '2026-01-02T00:00:00Z' },
    { id: 'u_mentor2', username: 'mentor_nodira', fullName: 'Nodira To‘rayeva', email: 'nodira@varzik.ai', phone: '+998905556677', role: 'MENTOR', status: 'active', created_at: '2026-01-02T00:00:00Z', updated_at: '2026-01-02T00:00:00Z' },
    
    // 6 Students
    { id: 'u_stud1', username: 'stud_ali', fullName: 'Alijon Karimov (DEMO)', email: 'ali@varzik.ai', phone: '+998931110001', role: 'STUDENT', status: 'active', created_at: '2026-02-01T00:00:00Z', updated_at: '2026-02-01T00:00:00Z' },
    { id: 'u_stud2', username: 'stud_lobar', fullName: 'Lobar Soliyeva (DEMO)', email: 'lobar@varzik.ai', phone: '+998931110002', role: 'STUDENT', status: 'active', created_at: '2026-02-01T00:00:00Z', updated_at: '2026-02-01T00:00:00Z' },
    { id: 'u_stud3', username: 'stud_jasur', fullName: 'Jasurbek Usmonov (DEMO)', email: 'jasur@varzik.ai', phone: '+998931110003', role: 'STUDENT', status: 'active', created_at: '2026-02-01T00:00:00Z', updated_at: '2026-02-01T00:00:00Z' },
    { id: 'u_stud4', username: 'stud_malika', fullName: 'Malika Ergasheva (DEMO)', email: 'malika@varzik.ai', phone: '+998931110004', role: 'STUDENT', status: 'active', created_at: '2026-02-01T00:00:00Z', updated_at: '2026-02-01T00:00:00Z' },
    { id: 'u_stud5', username: 'stud_botir', fullName: 'Botir Rahmonov (DEMO)', email: 'botir@varzik.ai', phone: '+998931110005', role: 'STUDENT', status: 'active', created_at: '2026-02-01T00:00:00Z', updated_at: '2026-02-01T00:00:00Z' },
    { id: 'u_stud6', username: 'stud_sevara', fullName: 'Sevara Azimova (DEMO)', email: 'sevara@varzik.ai', phone: '+998931110006', role: 'STUDENT', status: 'active', created_at: '2026-02-01T00:00:00Z', updated_at: '2026-02-01T00:00:00Z' },
    
    // Parents
    { id: 'u_parent1', username: 'parent_vali', fullName: 'Vali Karimov', email: 'vali@mail.uz', phone: '+998991112233', role: 'PARENT', status: 'active', created_at: '2026-02-02T00:00:00Z', updated_at: '2026-02-02T00:00:00Z' },
    { id: 'u_parent2', username: 'parent_sarvar', fullName: 'Sarvar Soliyev', email: 'sarvar@mail.uz', phone: '+998993334455', role: 'PARENT', status: 'active', created_at: '2026-02-02T00:00:00Z', updated_at: '2026-02-02T00:00:00Z' },
    { id: 'u_parent3', username: 'parent_ulug', fullName: 'Ulugbek Usmonov', email: 'ulug@mail.uz', phone: '+998995556677', role: 'PARENT', status: 'active', created_at: '2026-02-02T00:00:00Z', updated_at: '2026-02-02T00:00:00Z' },
    
    // Sponsors
    { id: 'u_donor1', username: 'donor_sherzod', fullName: 'Sherzod Mamatkulov', email: 'sherzod@m-group.uz', phone: '+998909998877', role: 'SPONSOR', status: 'active', created_at: '2026-02-05T00:00:00Z', updated_at: '2026-02-05T00:00:00Z' },
    { id: 'u_auditor', username: 'auditor1', fullName: 'Jahongir Rustamov', email: 'jahongir@audit.uz', phone: '+998907778899', role: 'AUDITOR', status: 'active', created_at: '2026-02-10T00:00:00Z', updated_at: '2026-02-10T00:00:00Z' }
  ];

  const student_profiles: StudentProfile[] = [
    { id: 'u_stud1', alias: 'Ali_AILab', ageRange: '13-15', birthDate: '2012-05-14', address: 'Varzik qishlog‘i, Yangi hayot ko‘chasi, 12-uy', schoolName: '1-sonli umumta’lim maktabi', gradeLevel: '8-sinf', familyStatus: 'To‘liq oila', financialStatus: 'Kam ta’minlangan', strengths: ['Matematika', 'Mantiq', 'Qiziquvchanlik'], growthAreas: ['Ingliz tili', 'Taqdimot qilish ko‘nikmasi'], averageScore: 84, status: 'active', created_at: '2026-02-01T00:00:00Z', updated_at: '2026-02-01T00:00:00Z' },
    { id: 'u_stud2', alias: 'Lobar_AI', ageRange: '16-18', birthDate: '2009-08-20', address: 'Varzik qishlog‘i, Alisher Navoiy ko‘chasi, 45-uy', schoolName: '1-sonli umumta’lim maktabi', gradeLevel: '10-sinf', familyStatus: 'To‘liq oila', financialStatus: 'O‘rta', strengths: ['Python', 'Ma’lumotlar tahlili', 'Mehnatsevarlik'], growthAreas: ['Jamoada ishlash'], averageScore: 92, status: 'active', created_at: '2026-02-01T00:00:00Z', updated_at: '2026-02-01T00:00:00Z' },
    { id: 'u_stud3', alias: 'Jasur_Dev', ageRange: '13-15', birthDate: '2011-11-03', address: 'Varzik qishlog‘i, Chinor ko‘chasi, 8-uy', schoolName: '2-sonli maktab', gradeLevel: '9-sinf', familyStatus: 'Yolg‘iz ona qaramog‘ida', financialStatus: 'Ijtimoiy yordam oladi', strengths: ['Dasturlash', 'Robototexnika'], growthAreas: ['AI etikasi', 'Hujjatlashtirish'], averageScore: 58, status: 'active', created_at: '2026-02-01T00:00:00Z', updated_at: '2026-02-01T00:00:00Z' }, // < 60 for support plan test
    { id: 'u_stud4', alias: 'Malika_PM', ageRange: '16-18', birthDate: '2008-03-29', address: 'Varzik qishlog‘i, Do‘stlik ko‘chasi, 3-uy', schoolName: 'Kollej 2-kurs', gradeLevel: '11-sinf ekvivalenti', familyStatus: 'To‘liq oila', financialStatus: 'Kam ta’minlangan', strengths: ['Product management', 'Dizayn', 'Taqdimot'], growthAreas: ['Matematika', 'Python chuqur bilimi'], averageScore: 78, status: 'active', created_at: '2026-02-01T00:00:00Z', updated_at: '2026-02-01T00:00:00Z' },
    { id: 'u_stud5', alias: 'Botir_ML', ageRange: '16-18', birthDate: '2009-01-10', address: 'Varzik qishlog‘i, Navro‘z ko‘chasi, 19-uy', schoolName: '1-sonli maktab', gradeLevel: '10-sinf', familyStatus: 'To‘liq oila', financialStatus: 'O‘rta', strengths: ['Statistika', 'Pandas', 'Matematika'], growthAreas: ['Git', 'Ingliz tili'], averageScore: 81, status: 'active', created_at: '2026-02-01T00:00:00Z', updated_at: '2026-02-01T00:00:00Z' },
    { id: 'u_stud6', alias: 'Sevara_CV', ageRange: '13-15', birthDate: '2012-12-25', address: 'Varzik qishlog‘i, Guliston ko‘chasi, 7-uy', schoolName: '2-sonli maktab', gradeLevel: '7-sinf', familyStatus: 'Vasiylikda (buvisi qaramog‘ida)', financialStatus: 'Kam ta’minlangan', strengths: ['Ijodkorlik', 'Computer Vision', 'Mantiq'], growthAreas: ['Tizimli ishlash', 'Matematika'], averageScore: 73, status: 'active', created_at: '2026-02-01T00:00:00Z', updated_at: '2026-02-01T00:00:00Z' }
  ];

  const guardian_profiles: GuardianProfile[] = [
    { id: 'u_parent1', fullName: 'Vali Karimov', email: 'vali@mail.uz', phone: '+998991112233', relationship: 'ota', status: 'active', created_at: '2026-02-02T00:00:00Z' },
    { id: 'u_parent2', fullName: 'Sarvar Soliyev', email: 'sarvar@mail.uz', phone: '+998993334455', relationship: 'ota', status: 'active', created_at: '2026-02-02T00:00:00Z' },
    { id: 'u_parent3', fullName: 'Ulugbek Usmonov', email: 'ulug@mail.uz', phone: '+998995556677', relationship: 'ota', status: 'active', created_at: '2026-02-02T00:00:00Z' }
  ];

  const student_guardians: StudentGuardian[] = [
    { studentId: 'u_stud1', guardianId: 'u_parent1' },
    { studentId: 'u_stud2', guardianId: 'u_parent2' },
    { studentId: 'u_stud3', guardianId: 'u_parent3' }
  ];

  const mentor_profiles: MentorProfile[] = [
    { id: 'u_mentor1', specialty: 'Machine Learning & Python', experience: '5 yil senior ML dasturchi', bio: 'Varzik farzandi, hozirda Toshkentda masofaviy ishlaydi. Sun’iy intellekt ta’limini rivojlantirishga hissa qo‘shmoqda.', weeklyHours: 12, status: 'active', created_at: '2026-01-02T00:00:00Z' },
    { id: 'u_mentor2', specialty: 'Full-stack & Computer Vision', experience: '3 yil web-dasturchi, amaliyotchi', bio: 'Web texnologiyalar va computer vision bo‘yicha mentor. Bolalarga MVP yaratishni o‘rgatadi.', weeklyHours: 10, status: 'active', created_at: '2026-01-02T00:00:00Z' }
  ];

  const donor_profiles: DonorProfile[] = [
    { id: 'u_donor1', organizationName: 'M-Group Consulting (DEMO)', isAnonymous: false, preferredDisplayName: 'M-Group Consulting LLC', status: 'active', created_at: '2026-02-05T00:00:00Z' }
  ];

  const cohorts: Cohort[] = [
    { id: 'c_pilot', name: 'Varzik AI Lab Pilot Cohort', description: 'Birinchi 13-18 yoshli yoshlar guruhi', startDate: '2026-02-15', endDate: '2027-02-15', status: 'active', created_at: '2026-01-10T00:00:00Z' }
  ];

  const cohort_members: CohortMember[] = [
    { cohortId: 'c_pilot', studentId: 'u_stud1', status: 'active', created_at: '2026-02-15T00:00:00Z' },
    { cohortId: 'c_pilot', studentId: 'u_stud2', status: 'active', created_at: '2026-02-15T00:00:00Z' },
    { cohortId: 'c_pilot', studentId: 'u_stud3', status: 'active', created_at: '2026-02-15T00:00:00Z' },
    { cohortId: 'c_pilot', studentId: 'u_stud4', status: 'active', created_at: '2026-02-15T00:00:00Z' },
    { cohortId: 'c_pilot', studentId: 'u_stud5', status: 'active', created_at: '2026-02-15T00:00:00Z' },
    { cohortId: 'c_pilot', studentId: 'u_stud6', status: 'active', created_at: '2026-02-15T00:00:00Z' }
  ];

  const courses: Course[] = [
    { id: 'course_ai_base', title: 'Sun’iy Intellekt va Startup Yo‘nalishi', description: 'Python, Machine Learning, Web AI va Product Management asoslari', status: 'active', created_at: '2026-01-15T00:00:00Z' }
  ];

  const modules: Module[] = [
    { id: 'mod_1', courseId: 'course_ai_base', title: '1-chorak: Python va AI Etikasi', description: 'Kompyuter savodxonligi, Python dasturlash va git', order: 1, status: 'active' },
    { id: 'mod_2', courseId: 'course_ai_base', title: '2-chorak: Ma’lumotlar Tahlili va Machine Learning', description: 'Pandas, Vizualizatsiya, ML modellar va computer vision', order: 2, status: 'active' }
  ];

  const lessons: Lesson[] = [
    { id: 'les_1', moduleId: 'mod_1', title: 'Python asoslari va ma’lumot turlari', content: 'Ozgaruvchilar, list, dict va conditional logic.', order: 1, status: 'active' },
    { id: 'les_2', moduleId: 'mod_1', title: 'Git va GitHub bilan ishlash', content: 'Repository ochish, commit va push qilish.', order: 2, status: 'active' }
  ];

  const assignments: Assignment[] = [
    { id: 'ass_daily', lessonId: 'les_1', cohortId: 'c_pilot', title: 'Python Loop va List amaliyoti', description: '1 dan 100 gacha bo‘lgan sonlar orasidan tub sonlarni topadigan algoritm yozing.', type: 'daily', dueDate: '2026-07-15T23:59:59Z', maxPoints: 20, status: 'active', created_at: '2026-07-10T10:00:00Z' },
    { id: 'ass_weekly', lessonId: 'les_2', cohortId: 'c_pilot', title: 'O‘z loyihangizni GitHub’ga yuklash', description: 'Hafta davomida yozgan kodingizni GitHub repo yaratib yuklang va havolasini yuboring.', type: 'weekly', dueDate: '2026-07-18T23:59:59Z', maxPoints: 15, status: 'active', created_at: '2026-07-10T10:00:00Z' },
    { id: 'ass_monthly', lessonId: 'les_2', cohortId: 'c_pilot', title: 'Oylik Loyiha: Mahalliy qishloq muammosiga AI yechim', description: 'Varzikdagi muammoni tanlab, unga o‘qitilgan model yoki generator loyihalash.', type: 'monthly', dueDate: '2026-07-28T23:59:59Z', maxPoints: 30, status: 'active', created_at: '2026-07-01T10:00:00Z' }
  ];

  const assignment_submissions: AssignmentSubmission[] = [
    { id: 'sub_1', assignmentId: 'ass_daily', studentId: 'u_stud1', submissionContent: 'Ajoyib dastur yozdim. 2 soat sarfladim.', files: [], status: 'qabul qilindi', submittedAt: '2026-07-11T12:00:00Z', pointsAwarded: 18, mentorFeedback: 'Yaxshi yondashuv, optimal kod yozilganki, tez ishlaydi.', created_at: '2026-07-11T12:00:00Z', updated_at: '2026-07-11T13:00:00Z' },
    { id: 'sub_2', assignmentId: 'ass_daily', studentId: 'u_stud2', submissionContent: 'GitHub havolasi yordamida ishlangan loop misoli.', files: [], codeRepoUrl: 'https://github.com/lobar/loop-examples', status: 'mentor tekshirmoqda', submittedAt: '2026-07-11T14:00:00Z', created_at: '2026-07-11T14:00:00Z', updated_at: '2026-07-11T14:00:00Z' },
    { id: 'sub_3', assignmentId: 'ass_daily', studentId: 'u_stud3', submissionContent: 'Kechikib topshirildi, menda chiroq yo‘q edi.', files: [], status: 'kechikdi', submittedAt: '2026-07-12T01:00:00Z', created_at: '2026-07-11T15:00:00Z', updated_at: '2026-07-11T15:00:00Z' }
  ];

  const evaluations: Evaluation[] = [
    { id: 'ev_1', submissionId: 'sub_1', studentId: 'u_stud1', evaluatorId: 'u_mentor1', attendancePoints: 15, dailyTasksPoints: 18, weeklyTasksPoints: 13, monthlyProjectPoints: 26, presentationPoints: 8, teamworkPoints: 9, totalPoints: 89, comments: 'Barqaror rivojlanmoqda, darsda faol va boshqalarga yordam beryapti.', status: 'approved', created_at: '2026-06-30T18:00:00Z', updated_at: '2026-06-30T18:00:00Z' },
    { id: 'ev_2', submissionId: 'sub_3', studentId: 'u_stud3', evaluatorId: 'u_mentor1', attendancePoints: 5, dailyTasksPoints: 10, weeklyTasksPoints: 8, monthlyProjectPoints: 15, presentationPoints: 5, teamworkPoints: 5, totalPoints: 48, comments: 'Kompyuter va chiroq muammolari tufayli dars qoldirdi. Rivojlanish sust.', status: 'approved', created_at: '2026-06-30T18:00:00Z', updated_at: '2026-06-30T18:00:00Z' }
  ];

  const attendance: Attendance[] = [
    { id: 'att_1', studentId: 'u_stud1', cohortId: 'c_pilot', date: '2026-07-10', status: 'present', status_change_by: 'u_mentor1', created_at: '2026-07-10T09:00:00Z' },
    { id: 'att_2', studentId: 'u_stud2', cohortId: 'c_pilot', date: '2026-07-10', status: 'present', status_change_by: 'u_mentor1', created_at: '2026-07-10T09:00:00Z' },
    { id: 'att_3', studentId: 'u_stud3', cohortId: 'c_pilot', date: '2026-07-10', status: 'absent', reason: 'Elektr uzilishi va oilaviy yumushlar', status_change_by: 'u_mentor1', created_at: '2026-07-10T09:00:00Z' }
  ];

  const skills: Skill[] = [
    { id: 'sk_py', name: 'Python Basics', description: 'Variables, loops, functions, lists', category: 'Programming' },
    { id: 'sk_ml', name: 'Machine Learning Basics', description: 'Scikit-learn, regression, classification', category: 'AI' }
  ];

  const student_skills: StudentSkill[] = [
    { studentId: 'u_stud1', skillId: 'sk_py', proficiencyLevel: 4, status: 'active' },
    { studentId: 'u_stud2', skillId: 'sk_py', proficiencyLevel: 5, status: 'active' },
    { studentId: 'u_stud2', skillId: 'sk_ml', proficiencyLevel: 3, status: 'active' }
  ];

  const student_goals: StudentGoal[] = [
    { id: 'g_1', studentId: 'u_stud1', description: 'Birinchi oylik modelni mustaqil o‘qitish va test qilish', targetDate: '2026-08-30', status: 'in_progress', created_at: '2026-07-01T00:00:00Z' }
  ];

  const mentor_notes: MentorNote[] = [
    { id: 'mn_1', studentId: 'u_stud1', mentorId: 'u_mentor1', content: 'Matematik mantiqi kuchli, ammo inglizcha terminlarda qiynalyapti. Qo‘shimcha so‘z boyligi kerak.', isPrivate: false, created_at: '2026-07-05T15:00:00Z' },
    { id: 'mn_2', studentId: 'u_stud3', mentorId: 'u_mentor1', content: 'Maxfiy eslatma: Uyida sharoiti juda og‘ir, noutbuki bo‘lmagani uchun darsda bevosita amaliyot qilolmaydi.', isPrivate: true, created_at: '2026-07-05T15:00:00Z' }
  ];

  const support_plans: SupportPlan[] = [
    { id: 'sp_1', studentId: 'u_stud3', mentorId: 'u_mentor1', description: 'Qo‘shimcha kompyuter vaqti ajratish, markaz noutbugidan foydalanish jadvalini tuzish va mentor bilan 1-ga-1 ishlash.', startDate: '2026-07-01', endDate: '2026-08-01', status: 'active', reviewDate: '2026-07-15', created_at: '2026-07-01T10:00:00Z' }
  ];

  const rewards: Reward[] = [
    { id: 'rew_loy', name: 'Oyning eng yaxshi loyihasi', category: 'Loyiha', description: 'Eng foydali va yaxshi tayyorlangan oylik MVP loyiha.', icon: '🏆', status: 'active' },
    { id: 'rew_grow', name: 'Eng katta o‘sish', category: 'O‘sish', description: 'Oy davomida natijalarini eng yuqori darajada yaxshilagan o‘quvchiga.', icon: '📈', status: 'active' },
    { id: 'rew_team', name: 'Eng yaxshi jamoaviy yordam', category: 'Etika', description: 'Sinfdoshlariga eng ko‘p yordam bergan va AI etikasiga rioya qilgan o‘quvchi.', icon: '🤝', status: 'active' }
  ];

  const student_rewards: StudentReward[] = [
    { id: 'sr_1', studentId: 'u_stud2', rewardId: 'rew_loy', dateAwarded: '2026-06-30', details: 'Kitob va loyiha mikrogranti' }
  ];

  const projects: Project[] = [
    { id: 'proj_water', name: 'Varzik Smart Irrigation (E-Sug‘orish)', description: 'Qishloqdagi ekin maydonlarini namlik sensorlari va AI yordamida tejamkor sug‘orish tizimi.', problemSolved: 'Qishloq xo‘jaligida suv yetishmovchiligi va ortiqcha isrof.', stage: 'prototip', techStack: ['Python', 'Arduino', 'TensorFlow Lite', 'Flask'], fundingReceivedUSD: 100, results: 'Suv sarfini 35% gacha tejash imkoni isbotlandi.', status: 'active', created_at: '2026-05-10T10:00:00Z', updated_at: '2026-06-30T10:00:00Z' },
    { id: 'proj_school', name: 'Varzik Maktab AI Kutubxonachisi', description: 'Kutubxonadagi kitoblarni skanerlab, o‘quvchilarga qaysi kitob kerakligini tavsiya beruvchi OCR tizimi.', problemSolved: 'Kitob qidirish va kutubxona jurnallarini qo‘lda to‘ldirishdagi kechikishlar.', stage: 'MVP', techStack: ['Python', 'OpenCV', 'PyTesseract', 'React'], fundingReceivedUSD: 50, results: 'Kutubxona xizmati tezligi 2 barobar oshdi.', status: 'active', created_at: '2026-05-20T10:00:00Z', updated_at: '2026-06-30T10:00:00Z' },
    { id: 'proj_soil', name: 'Tuproq Tahlili va Hosildorlik Bashorati', description: 'Tuproq tarkibini tahlil qilib, qaysi turdagi ekin eng ko‘p hosil berishini bashorat qiluvchi AI model.', problemSolved: 'Dehqonlarning noto‘g‘ri ekin ekib, kam hosil olishlari.', stage: 'g‘oya', techStack: ['Python', 'Pandas', 'Scikit-learn'], fundingReceivedUSD: 0, status: 'active', created_at: '2026-07-05T10:00:00Z', updated_at: '2026-07-05T10:00:00Z' }
  ];

  const project_members: ProjectMember[] = [
    { projectId: 'proj_water', studentId: 'u_stud1', role: 'Hardware & ML model' },
    { projectId: 'proj_water', studentId: 'u_stud2', role: 'Frontend & Data collection' },
    { projectId: 'proj_school', studentId: 'u_stud4', role: 'UI/UX & OCR integrate' },
    { projectId: 'proj_school', studentId: 'u_stud6', role: 'Computer vision developer' }
  ];

  const project_updates: ProjectUpdate[] = [
    { id: 'pu_1', projectId: 'proj_water', title: 'Namlik datchigi bilan sinov muvaffaqiyatli yakunlandi', content: 'Datchik ko‘rsatkichlari modelga uzatildi va sug‘orish klapani avtomatik ochilib yopildi.', date: '2026-06-15', status: 'active' }
  ];

  const startups: Startup[] = [
    { id: 'st_water', projectId: 'proj_water', name: 'E-Sug‘orish Agro Tech LLC (DEMO)', problem: 'Qishloq xo‘jaligida suv taqsimotining samarasizligi.', solution: 'AI boshqaruvli namlik sensorlari va klapanlari bilan aqlli sug‘orish.', team: 'Alijon Karimov, Lobar Soliyeva. Mentor: Bobur Akbarov.', mentorId: 'u_mentor1', stage: 'MVP', prototypeUrl: 'https://demo.varzik.ai/smart-irrigation', userCount: 15, metrics: 'Varzikdagi 3 ta bog‘da faol sinovda. Suv sarfi 30% kamaygan.', currentNeeds: 'Zaxira sensorlar va 5 ta sug‘orish klapanlarini sotib olish uchun mablag‘.', investmentSoughtUSD: 2000, demoUrl: 'https://demo.varzik.ai/smart-irrigation', status: 'active', created_at: '2026-06-20T10:00:00Z' }
  ];

  const startup_updates: StartupUpdate[] = [
    { id: 'su_1', startupId: 'st_water', title: 'Investorlar bilan birinchi muzokara', content: 'Varzikdagi sinov maydonlarini ko‘rgan agro-investorlar MVP loyihaga qiziqish bildirdi.', date: '2026-07-02', status: 'active' }
  ];

  const investor_interest: InvestorInterest[] = [
    { id: 'ii_1', startupId: 'st_water', name: 'Akmal Karimov', email: 'akmal@agroholding.uz', phone: '+998909991122', organization: 'AgroHolding Uzbekistan', amountRangeUSD: '$1,000 - $5,000', comments: 'Loyiha juda istiqbolli. Demo dayda batafsil gaplashamiz.', status: 'pending', created_at: '2026-07-05T12:00:00Z' }
  ];

  const consents: Consent[] = [
    // u_parent1 consents for u_stud1
    { id: 'con_1', studentId: 'u_stud1', consentType: 'profile', isGranted: true, grantedBy: 'u_parent1', grantedAt: '2026-02-20T10:00:00Z', status: 'active', created_at: '2026-02-20T10:00:00Z' },
    { id: 'con_2', studentId: 'u_stud1', consentType: 'name', isGranted: true, grantedBy: 'u_parent1', grantedAt: '2026-02-20T10:00:00Z', status: 'active', created_at: '2026-02-20T10:00:00Z' },
    { id: 'con_3', studentId: 'u_stud1', consentType: 'photo', isGranted: true, grantedBy: 'u_parent1', grantedAt: '2026-02-20T10:00:00Z', status: 'active', created_at: '2026-02-20T10:00:00Z' },
    { id: 'con_4', studentId: 'u_stud1', consentType: 'project', isGranted: true, grantedBy: 'u_parent1', grantedAt: '2026-02-20T10:00:00Z', status: 'active', created_at: '2026-02-20T10:00:00Z' },
    
    // u_parent2 consents for u_stud2
    { id: 'con_5', studentId: 'u_stud2', consentType: 'profile', isGranted: true, grantedBy: 'u_parent2', grantedAt: '2026-02-22T10:00:00Z', status: 'active', created_at: '2026-02-22T10:00:00Z' },
    { id: 'con_6', studentId: 'u_stud2', consentType: 'name', isGranted: true, grantedBy: 'u_parent2', grantedAt: '2026-02-22T10:00:00Z', status: 'active', created_at: '2026-02-22T10:00:00Z' },
    { id: 'con_7', studentId: 'u_stud2', consentType: 'photo', isGranted: false, grantedBy: 'u_parent2', grantedAt: '2026-02-22T10:00:00Z', status: 'active', created_at: '2026-02-22T10:00:00Z' } // Photo denied!
  ];

  const media_files: MediaFile[] = [];

  const donations: Donation[] = [
    {
      id: 'don_1',
      donorId: 'u_admin',
      amount: 4000,
      currency: 'USD',
      exchangeRateAtDonation: 12800,
      amountInUSD: 4000,
      amountInUZS: 51200000,
      donorName: 'Asadbek (Asoschi)',
      isAnonymous: false,
      targetCampaignId: 'camp_pilot',
      purpose: 'Varzik AI Lab pilot loyihasini moliyalashtirish rejalashtirilgan budjeti',
      paymentMethod: 'Bank o‘tkazmasi',
      status: 'va’da qilindi', // Default founder promised funds
      adminNotes: 'Ushbu mablag‘ asoschi tomonidan ajratilishi rejalashtirilgan.',
      created_at: '2026-02-01T00:00:00Z',
      updated_at: '2026-02-01T00:00:00Z'
    },
    {
      id: 'don_2',
      donorId: 'u_donor1',
      amount: 25000000, // 25 mln UZS
      currency: 'UZS',
      exchangeRateAtDonation: 12800,
      amountInUSD: 1953.125,
      amountInUZS: 25000000,
      donorName: 'M-Group Consulting LLC (DEMO)',
      isAnonymous: false,
      targetCampaignId: 'camp_year1',
      purpose: 'Uskunalar va Internet xarajatlari uchun homiylik yordami',
      paymentMethod: 'Payme / Korporativ Karta',
      paymentProofUrl: 'receipt_demo_1.jpg',
      status: 'kelib tushdi', // Already approved and processed
      adminNotes: 'Mablag‘ hisob raqamiga kelib tushdi va tasdiqlandi.',
      created_at: '2026-03-01T10:00:00Z',
      updated_at: '2026-03-01T12:00:00Z'
    },
    {
      id: 'don_3',
      donorId: 'u_donor1',
      amount: 500,
      currency: 'USD',
      exchangeRateAtDonation: 12800,
      amountInUSD: 500,
      amountInUZS: 6400000,
      donorName: 'Sherzod Mamatkulov (DEMO)',
      isAnonymous: true, // Anonymous
      targetCampaignId: 'camp_year1',
      purpose: 'O‘quvchilar mikrogranti fondiga yordam',
      paymentMethod: 'Bank o‘tkazmasi',
      paymentProofUrl: 'receipt_demo_2.jpg',
      status: 'kutilmoqda', // Awaiting admin approval
      adminNotes: 'Valyuta o‘tkazmasi, tekshiruv kutilmoqda.',
      created_at: '2026-07-11T12:00:00Z',
      updated_at: '2026-07-11T12:00:00Z'
    }
  ];

  const donation_campaigns: DonationCampaign[] = [
    { id: 'camp_pilot', name: 'Pilot Cohort Jihozlanishi', description: 'Dastlabki 8 noutbuk, tarmoq va xavfsizlik jihozlarini xarid qilish.', targetAmountUSD: 4000, raisedAmountUSD: 0, spentAmountUSD: 0, status: 'active', startDate: '2026-02-01', endDate: '2026-05-01', created_at: '2026-02-01T00:00:00Z' },
    { id: 'camp_year1', name: 'Varzik AI Lab 1 yillik barqaror faoliyati', description: 'Yillik internet xarajati, stipendiyalar, mukofotlar va mikrograntlarni qoplash.', targetAmountUSD: 15500, raisedAmountUSD: 1953.125, spentAmountUSD: 1100, status: 'active', startDate: '2026-05-01', endDate: '2027-05-01', created_at: '2026-02-01T00:00:00Z' }
  ];

  const donation_allocations: DonationAllocation[] = [
    { id: 'alloc_1', donationId: 'don_2', campaignId: 'camp_year1', amountUSD: 1953.125, created_at: '2026-03-01T12:00:00Z' }
  ];

  const expenses: Expense[] = [
    // Target Pilot expenses in status "rejalashtirilgan"
    { id: 'exp_p1', name: '8 ta ishlatilgan biznes noutbuk (ThinkPad L390/T480)', category: 'noutbuk va kompyuter', purchaseDate: '2026-02-10', vendor: 'LaptopMarket, Toshkent', amount: 1920, currency: 'USD', exchangeRateAtExpense: 12800, amountInUSD: 1920, amountInUZS: 24576000, targetCampaignId: 'camp_pilot', approvedBy: 'u_admin', comments: 'Sinflar uchun asosiy noutbuklar', status: 'rejalashtirilgan', created_at: '2026-02-01T00:00:00Z', updated_at: '2026-02-01T00:00:00Z' },
    { id: 'exp_p2', name: 'Router, switch va tarmoq kabellari', category: 'internet', purchaseDate: '2026-02-10', vendor: 'Elmakon', amount: 130, currency: 'USD', exchangeRateAtExpense: 12800, amountInUSD: 130, amountInUZS: 1664000, targetCampaignId: 'camp_pilot', approvedBy: 'u_admin', status: 'rejalashtirilgan', created_at: '2026-02-01T00:00:00Z', updated_at: '2026-02-01T00:00:00Z' },
    { id: 'exp_p3', name: 'UPS va elektr kuchlanish stabilizatori', category: 'elektr va UPS', purchaseDate: '2026-02-10', vendor: 'Tehnouz', amount: 250, currency: 'USD', exchangeRateAtExpense: 12800, amountInUSD: 250, amountInUZS: 3200000, targetCampaignId: 'camp_pilot', approvedBy: 'u_admin', status: 'rejalashtirilgan', created_at: '2026-02-01T00:00:00Z', updated_at: '2026-02-01T00:00:00Z' },
    { id: 'exp_p4', name: 'Televizor / Proyektor taqdimotlar uchun', category: 'o‘quv vositalari', purchaseDate: '2026-02-10', vendor: 'Mediapark', amount: 250, currency: 'USD', exchangeRateAtExpense: 12800, amountInUSD: 250, amountInUZS: 3200000, targetCampaignId: 'camp_pilot', approvedBy: 'u_admin', status: 'rejalashtirilgan', created_at: '2026-02-01T00:00:00Z', updated_at: '2026-02-01T00:00:00Z' },
    { id: 'exp_p5', name: 'Internet o‘rnatish va 6 oylik to‘lov', category: 'internet', purchaseDate: '2026-02-10', vendor: 'Uzonline', amount: 150, currency: 'USD', exchangeRateAtExpense: 12800, amountInUSD: 150, amountInUZS: 1920000, targetCampaignId: 'camp_pilot', approvedBy: 'u_admin', status: 'rejalashtirilgan', created_at: '2026-02-01T00:00:00Z', updated_at: '2026-02-01T00:00:00Z' },
    { id: 'exp_p6', name: 'Huquqiy hujjatlar, xavfsizlik va birinchi yordam qutisi', category: 'xavfsizlik', purchaseDate: '2026-02-10', vendor: 'Aps-Garant', amount: 250, currency: 'USD', exchangeRateAtExpense: 12800, amountInUSD: 250, amountInUZS: 3200000, targetCampaignId: 'camp_pilot', approvedBy: 'u_admin', status: 'rejalashtirilgan', created_at: '2026-02-01T00:00:00Z', updated_at: '2026-02-01T00:00:00Z' },
    { id: 'exp_p7', name: 'Asosiy mentor stipendiyasi (3 oy uchun)', category: 'mentor to‘lovi', purchaseDate: '2026-02-10', vendor: 'Varzik AI mentors', amount: 600, currency: 'USD', exchangeRateAtExpense: 12800, amountInUSD: 600, amountInUZS: 7680000, targetCampaignId: 'camp_pilot', approvedBy: 'u_admin', status: 'rejalashtirilgan', created_at: '2026-02-01T00:00:00Z', updated_at: '2026-02-01T00:00:00Z' },
    { id: 'exp_p8', name: 'O‘quvchilar rag‘batlantirish jamg‘armasi', category: 'o‘quvchi mukofoti', purchaseDate: '2026-02-10', vendor: 'Varzik Books', amount: 300, currency: 'USD', exchangeRateAtExpense: 12800, amountInUSD: 300, amountInUZS: 3840000, targetCampaignId: 'camp_pilot', approvedBy: 'u_admin', status: 'rejalashtirilgan', created_at: '2026-02-01T00:00:00Z', updated_at: '2026-02-01T00:00:00Z' },
    { id: 'exp_p9', name: 'Ta’mirlash va kutilmagan zaxira', category: 'ta’mirlash', purchaseDate: '2026-02-10', vendor: 'StroyVarzik', amount: 150, currency: 'USD', exchangeRateAtExpense: 12800, amountInUSD: 150, amountInUZS: 1920000, targetCampaignId: 'camp_pilot', approvedBy: 'u_admin', status: 'rejalashtirilgan', created_at: '2026-02-01T00:00:00Z', updated_at: '2026-02-01T00:00:00Z' },

    // Real spent expenses from camp_year1
    {
      id: 'exp_real_1',
      name: 'Mentor stipendiyasi (Iyun oyi)',
      category: 'mentor to‘lovi',
      purchaseDate: '2026-06-30',
      vendor: 'Bobur Akbarov',
      amount: 2560000, // 200 USD equivalent
      currency: 'UZS',
      exchangeRateAtExpense: 12800,
      amountInUSD: 200,
      amountInUZS: 2560000,
      targetCampaignId: 'camp_year1',
      approvedBy: 'u_admin',
      invoiceUrl: 'invoice_exp_1.pdf',
      comments: 'Bobur Akbarov iyun oyi o‘tilgan mentorlik soatlari uchun stipendiya.',
      status: 'sotib olindi',
      created_at: '2026-06-30T10:00:00Z',
      updated_at: '2026-06-30T10:00:00Z'
    },
    {
      id: 'exp_real_2',
      name: 'Varzik Smart Irrigation Mikrogranti',
      category: 'loyiha mikrogranti',
      purchaseDate: '2026-06-30',
      vendor: 'Alijon Karimov (Student)',
      amount: 100,
      currency: 'USD',
      exchangeRateAtExpense: 12800,
      amountInUSD: 100,
      amountInUZS: 1280000,
      targetCampaignId: 'camp_year1',
      approvedBy: 'u_admin',
      invoiceUrl: 'microgrant_receipt.pdf',
      comments: 'Datchik va klapan xaridlari uchun Alijon Karimov jamoasiga ajratilgan mikrogrant.',
      status: 'sotib olindi',
      created_at: '2026-06-30T10:00:00Z',
      updated_at: '2026-06-30T10:00:00Z'
    }
  ];

  const expense_documents: ExpenseDocument[] = [
    { expenseId: 'exp_real_1', docUrl: 'invoice_exp_1.pdf', isReceiptVerified: true, status: 'active' },
    { expenseId: 'exp_real_2', docUrl: 'microgrant_receipt.pdf', isReceiptVerified: true, status: 'active' }
  ];

  const assets: Asset[] = [
    // 4 assets (2 purchased, 1 native study room, 1 desks/chairs)
    { id: 'as_room', name: 'Varzik AI Lab O‘quv Xonasi', category: 'Xona / Joy', quantity: 1, status: 'natura yordami', price: 0, currency: 'USD', fundingSource: 'Asoschi tomondan ajratilgan joy', location: 'Varzik qishlog‘i markazi', responsiblePerson: 'Asadbek Varziki', condition: 'A’lo, ta’mirlangan, yorug‘', created_at: '2026-02-01T00:00:00Z' },
    { id: 'as_furniture', name: 'O‘quv stollari va stullar (12 kishilik)', category: 'Mebel', quantity: 12, status: 'natura yordami', price: 0, currency: 'USD', fundingSource: 'Asoschi tomondan ajratilgan', location: 'O‘quv xonasi', responsiblePerson: 'Asadbek Varziki', condition: 'Yaxshi', created_at: '2026-02-01T00:00:00Z' },
    { id: 'as_laptop1', name: 'Lenovo ThinkPad L390 (DEMO)', category: 'Noutbuk va kompyuter', quantity: 1, status: 'sotib olingan', purchaseDate: '2026-02-25', price: 240, currency: 'USD', fundingSource: 'Homiy M-Group', photoUrl: 'laptop_lenovo.jpg', location: 'O‘quv xonasi', responsiblePerson: 'Alijon Karimov', condition: 'Yaxshi, ishchi holatda', lastChecked: '2026-07-01', nextServiceDate: '2026-10-01', linkedExpenseId: 'exp_p1', serialNumber: 'L3N9X8A1B2', created_at: '2026-02-25T10:00:00Z' },
    { id: 'as_router', name: 'TP-Link Archer AX53 Wi-Fi 6 Router (DEMO)', category: 'Tarmoq jihozi', quantity: 1, status: 'sotib olingan', purchaseDate: '2026-02-25', price: 80, currency: 'USD', fundingSource: 'Homiy M-Group', photoUrl: 'router_tp.jpg', location: 'O‘quv xonasi', responsiblePerson: 'Asadbek Varziki', condition: 'A’lo', lastChecked: '2026-07-01', serialNumber: 'TP882233AA', created_at: '2026-02-25T10:00:00Z' }
  ];

  const asset_maintenance: AssetMaintenance[] = [];

  const needs: Need[] = [
    { id: 'n_laptops', name: 'Yana 6 ta biznes noutbuk ( ThinkPad )', description: 'Yangi saralab olingan o‘quvchilar darsda to‘liq amaliyot qila olishlari uchun.', priority: 'juda zarur', targetAmountUSD: 1440, raisedAmountUSD: 0, quantityNeeded: 6, quantityFunded: 0, targetDate: '2026-09-01', impactDescription: 'Darsdagi 6 ta o‘quvchining shaxsiy kompyutersiz qolishini oldini oladi.', status: 'active', created_at: '2026-07-01T00:00:00Z' },
    { id: 'n_ups', name: 'UPS batareyalari zaxirasi', description: 'Elektr o‘chganda router va kamida 4 ta kompyuterning ishlashini 2 soat ta’minlash.', priority: 'muhim', targetAmountUSD: 250, raisedAmountUSD: 0, quantityNeeded: 2, quantityFunded: 0, targetDate: '2026-10-15', impactDescription: 'Elektr uzilishlarida internet va ish to‘xtamasligini ta’minlaydi.', status: 'active', created_at: '2026-07-01T00:00:00Z' },
    { id: 'n_internet', name: 'Yillik cheksiz internet xarajati', description: 'Markazdagi yuqori tezlikdagi internet uchun 12 oylik abonent to‘lovi.', priority: 'rivojlanish uchun', targetAmountUSD: 300, raisedAmountUSD: 100, quantityNeeded: 12, quantityFunded: 4, targetDate: '2026-12-31', impactDescription: 'O‘quvchilar va mentorlarning global resurslar bilan ishlashini ta’minlaydi.', status: 'active', created_at: '2026-07-01T00:00:00Z' }
  ];

  const impact_units: ImpactUnit[] = [
    { id: 'iu_1', amountUSD: 25, unitName: 'Material / Internet', impactDescription: 'Bitta o‘quvchining o‘quv materiallari va bir oylik internet xarajatini qoplaydi.', priority: 1, status: 'active' },
    { id: 'iu_2', amountUSD: 100, unitName: 'Kichik Loyiha Mikrogranti', impactDescription: 'O‘quvchining sinov loyihasi yoki MVP qurilmalari (sensor, mikrokontroller) uchun grant.', priority: 2, status: 'active' },
    { id: 'iu_3', amountUSD: 250, unitName: 'Biznes Noutbuk', impactDescription: 'Varzikda kompyuteri yo‘q bolalarga darsda foydalanish uchun beriladigan bitta ThinkPad noutbug‘i.', priority: 3, status: 'active' },
    { id: 'iu_4', amountUSD: 450, unitName: 'Bosh Mentor Stipendiyasi', impactDescription: 'Malakali mentorning bolalarga dars berishi va loyihalarni boshqarishi uchun 1 oylik yordami.', priority: 4, status: 'active' },
    { id: 'iu_5', amountUSD: 1000, unitName: '1 Bola Yillik Ta’limi', impactDescription: 'Bir nafar bolaning 1 yillik ta’lim, mentorlik, uskuna, server va Demo Day xarajatlarini to‘liq qoplaydi.', priority: 5, status: 'active' }
  ];

  const monthly_reports: MonthlyReport[] = [
    {
      id: 'rep_2026_06',
      reportMonth: '2026-06',
      activeStudentsCount: 6,
      averageAttendance: 92,
      tasksCompleted: 48,
      projectsCreated: 3,
      prototypesBuilt: 2,
      mentoringHours: 40,
      eventsHeld: 1,
      totalRaisedUSD: 1953.125,
      totalSpentUSD: 300,
      endingBalanceUSD: 1653.125,
      mainPurchases: 'Noutbuk, simlar, sug‘orish datchigi, mentor to‘lovi',
      newsNeeds: 'Yana noutbuklar va UPS batareyalari zaxirasi',
      nextMonthPlans: 'Bootcamp saralashi va machine learning darslarining yakuni.',
      photoUrls: ['room_demo.jpg', 'presentation_demo.jpg'],
      projectIds: ['proj_water', 'proj_school'],
      status: 'approved',
      approvedBy: 'u_admin',
      created_at: '2026-07-01T10:00:00Z',
      updated_at: '2026-07-01T11:00:00Z'
    }
  ];

  const events: Event[] = [
    { id: 'ev_demoday1', title: '1-Chorak Demo Day: Varzik Yoshlarining AI Loyihalari', eventDate: '2026-08-20T10:00:00Z', location: 'Varzik AI Lab xonasi', type: 'Demo Day', description: 'O‘quvchilar 3 oy davomida yaratgan namlik sensorlari va OCR kitob skanerlari loyihalarini homiylar hamda kengash oldida taqdim qiladilar. Pitch sessiya va savol-javoblar.', targetAudience: 'Homiylar, Ota-onalar, Dehqonlar, Kengash a’zolari', registrationLimit: 40, registeredCount: 12, status: 'upcoming', created_at: '2026-07-01T00:00:00Z' }
  ];

  const event_registrations: EventRegistration[] = [];

  const news_posts: NewsPost[] = [
    { id: 'news_1', title: 'Varzik AI Lab Pilot loyihasiga start berildi!', content: 'Qishloq joyida o‘smir yoshlar uchun bepul AI va startup maktabi o‘z faoliyatini boshladi. 6 nafar eng iqtidorli o‘quvchilar sinov bootcampidan muvaffaqiyatli o‘tib, birinchi darslarga kirishishdi. Loyiha faqat homiylik va ko‘ngilli yordam asosida tashkil qilindi.', category: 'yangilik', imageUrl: 'news_start.jpg', date: '2026-02-20', status: 'published', created_at: '2026-02-20T12:00:00Z' },
    { id: 'news_2', title: 'Smart Irrigation (E-Sug‘orish) loyihasi ilk sinovdan o‘tdi', content: 'Varzikdagi sinov maydonida aqlli datchik yordamida tuproq namligi avtomatik o‘lchandi va natija Telegram bot orqali jo‘natildi. Bolalar birinchi oylik amaliy loyihasini muvaffaqiyatli yakunlashdi.', category: 'loyiha', imageUrl: 'news_irrigation.jpg', date: '2026-06-18', linkedProjectId: 'proj_water', status: 'published', created_at: '2026-06-18T12:00:00Z' }
  ];

  const notifications: Notification[] = [];

  const audit_logs: AuditLog[] = [
    { id: 'al_1', executorId: 'u_admin', executorName: 'Asadbek Varziki', actionType: 'CONFIRM_DONATION', tableName: 'donations', recordId: 'don_2', oldValues: '{"status":"kutilmoqda"}', newValues: '{"status":"kelib tushdi"}', justification: 'M-Group consulting LLC bank to‘lovi tasdiqlandi.', created_at: '2026-03-01T12:00:00Z' }
  ];

  const settings: Setting[] = [
    { key: 'site_title', value: 'Varzik AI Lab', description: 'Tizim nomi' },
    { key: 'usd_uzs_rate', value: '12800', description: '1 USD ning UZS dagi joriy qiymati' }
  ];

  const exchange_rates: ExchangeRate[] = [
    { id: 'er_1', rate: 12800, effectiveDate: '2026-07-01', setBy: 'u_admin', status: 'active', created_at: '2026-07-01T00:00:00Z' }
  ];

  return {
    users,
    student_profiles,
    guardian_profiles,
    student_guardians,
    mentor_profiles,
    donor_profiles,
    cohorts,
    cohort_members,
    courses,
    modules,
    lessons,
    assignments,
    assignment_submissions,
    evaluations,
    attendance,
    skills,
    student_skills,
    student_goals,
    mentor_notes,
    support_plans,
    rewards,
    student_rewards,
    projects,
    project_members,
    project_updates,
    startups,
    startup_updates,
    investor_interest,
    consents,
    media_files,
    donations,
    donation_campaigns,
    donation_allocations,
    expenses,
    expense_documents,
    assets,
    asset_maintenance,
    needs,
    impact_units,
    monthly_reports,
    events,
    event_registrations,
    news_posts,
    notifications,
    audit_logs,
    settings,
    exchange_rates
  };
};

export class VarzikDB {
  private state: DatabaseState;
  private currentUser: User | null = null;

  constructor() {
    this.state = this.loadState();
    this.restoreSession();
  }

  private loadState(): DatabaseState {
    const saved = localStorage.getItem('varzik_db_state');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse localStorage db state, resetting', e);
      }
    }
    const initial = getInitialDemoData();
    this.saveToStorage(initial);
    return initial;
  }

  private saveToStorage(state: DatabaseState) {
    localStorage.setItem('varzik_db_state', JSON.stringify(state));
  }

  private restoreSession() {
    const savedSession = localStorage.getItem('varzik_session');
    if (savedSession) {
      try {
        const user = JSON.parse(savedSession);
        // Verify user still exists
        const verified = this.state.users.find(u => u.id === user.id);
        if (verified) {
          this.currentUser = verified;
        } else {
          localStorage.removeItem('varzik_session');
        }
      } catch (e) {
        localStorage.removeItem('varzik_session');
      }
    }
  }

  // --- Auth Methods ---
  public login(username: string): User | null {
    const user = this.state.users.find(u => u.username.toLowerCase() === username.toLowerCase().trim());
    if (user && user.status === 'active') {
      this.currentUser = user;
      localStorage.setItem('varzik_session', JSON.stringify(user));
      return user;
    }
    return null;
  }

  public logout() {
    this.currentUser = null;
    localStorage.removeItem('varzik_session');
  }

  public getCurrentUser(): User | null {
    return this.currentUser;
  }

  // --- Database Settings & Exchange Rates ---
  public getExchangeRate(): number {
    const rateSetting = this.state.exchange_rates.find(r => r.status === 'active');
    return rateSetting ? rateSetting.rate : 12800;
  }

  public setExchangeRate(rate: number, justification: string): boolean {
    if (!this.currentUser || this.currentUser.role !== 'ADMIN') return false;
    const oldRate = this.getExchangeRate();
    
    // Set all other rates as historical
    this.state.exchange_rates.forEach(r => r.status = 'historical');
    
    const newRate: ExchangeRate = {
      id: 'er_' + Date.now(),
      rate,
      effectiveDate: new Date().toISOString().split('T')[0],
      setBy: this.currentUser.id,
      status: 'active',
      created_at: new Date().toISOString()
    };
    this.state.exchange_rates.push(newRate);
    
    // Also update settings key
    const setting = this.state.settings.find(s => s.key === 'usd_uzs_rate');
    if (setting) setting.value = String(rate);

    // Audit Log
    this.addAuditLog(
      'SET_EXCHANGE_RATE',
      'exchange_rates',
      newRate.id,
      JSON.stringify({ rate: oldRate }),
      JSON.stringify({ rate }),
      justification
    );

    this.saveToStorage(this.state);
    return true;
  }

  // --- Donations (Sponsorships) ---
  public getDonations(): Donation[] {
    const user = this.currentUser;
    let donations = [...this.state.donations];

    if (user?.role === 'SPONSOR') {
      donations = donations.filter(d => d.donorId === user.id);
    } else if (!user || (user.role !== 'ADMIN' && user.role !== 'AUDITOR')) {
      // Filter/Anonymize for public/student/parents
      donations = donations.map(d => {
        if (d.isAnonymous) {
          return { ...d, donorName: 'Anonim Homiy', email: '', phone: '' } as Donation;
        }
        return d;
      });
    }
    return donations;
  }

  public addDonation(data: Omit<Donation, 'id' | 'created_at' | 'updated_at' | 'amountInUSD' | 'amountInUZS' | 'exchangeRateAtDonation' | 'status'>, status: Donation['status'] = 'va’da qilindi'): Donation {
    const rate = this.getExchangeRate();
    const id = 'don_' + Date.now();
    const now = new Date().toISOString();

    let amountInUSD = 0;
    let amountInUZS = 0;

    if (data.currency === 'USD') {
      amountInUSD = data.amount;
      amountInUZS = data.amount * rate;
    } else {
      amountInUZS = data.amount;
      amountInUSD = data.amount / rate;
    }

    const newDonation: Donation = {
      ...data,
      id,
      exchangeRateAtDonation: rate,
      amountInUSD,
      amountInUZS,
      status,
      created_at: now,
      updated_at: now
    };

    this.state.donations.push(newDonation);

    // If campaign id exists and donation is already 'kelib tushdi', update campaign progress
    if (status === 'kelib tushdi') {
      this.allocateDonationToCampaign(newDonation, data.targetCampaignId);
    }

    // Audit Log
    this.addAuditLog(
      'ADD_DONATION',
      'donations',
      id,
      '',
      JSON.stringify(newDonation),
      `Homiylik arizasi yuklandi: ${data.donorName}`
    );

    this.saveToStorage(this.state);
    return newDonation;
  }

  public approveDonation(id: string, justification: string): boolean {
    if (!this.currentUser || this.currentUser.role !== 'ADMIN') return false;
    const donation = this.state.donations.find(d => d.id === id);
    if (!donation) return false;

    const oldStatus = donation.status;
    if (oldStatus === 'kelib tushdi') return false; // already approved

    donation.status = 'kelib tushdi';
    donation.updated_at = new Date().toISOString();

    // Allocate to campaign
    this.allocateDonationToCampaign(donation, donation.targetCampaignId);

    // Audit Log
    this.addAuditLog(
      'APPROVE_DONATION',
      'donations',
      id,
      JSON.stringify({ status: oldStatus }),
      JSON.stringify({ status: 'kelib tushdi' }),
      justification
    );

    this.saveToStorage(this.state);
    return true;
  }

  private allocateDonationToCampaign(donation: Donation, campaignId?: string) {
    if (!campaignId) return;
    const campaign = this.state.donation_campaigns.find(c => c.id === campaignId);
    if (campaign) {
      campaign.raisedAmountUSD += donation.amountInUSD;
      // Add Allocation record
      this.state.donation_allocations.push({
        id: 'alloc_' + Date.now(),
        donationId: donation.id,
        campaignId,
        amountUSD: donation.amountInUSD,
        created_at: new Date().toISOString()
      });
    }
  }

  // --- Expenses ---
  public getExpenses(): Expense[] {
    return this.state.expenses;
  }

  public addExpense(data: Omit<Expense, 'id' | 'created_at' | 'updated_at' | 'amountInUSD' | 'amountInUZS' | 'exchangeRateAtExpense'>): Expense | null {
    if (!this.currentUser || this.currentUser.role !== 'ADMIN') return null;
    const rate = this.getExchangeRate();
    const id = 'exp_' + Date.now();
    const now = new Date().toISOString();

    let amountInUSD = 0;
    let amountInUZS = 0;

    if (data.currency === 'USD') {
      amountInUSD = data.amount;
      amountInUZS = data.amount * rate;
    } else {
      amountInUZS = data.amount;
      amountInUSD = data.amount / rate;
    }

    // Safety: Check budget limit
    const totalRemaining = this.getFinancialStats().remainingUSD;
    if (data.status !== 'rejalashtirilgan' && amountInUSD > totalRemaining) {
      throw new Error(`Yetarli mablag' mavjud emas. Qoldiq: $${totalRemaining.toFixed(2)}, Xarajat: $${amountInUSD.toFixed(2)}`);
    }

    const newExpense: Expense = {
      ...data,
      id,
      exchangeRateAtExpense: rate,
      amountInUSD,
      amountInUZS,
      created_at: now,
      updated_at: now
    };

    this.state.expenses.push(newExpense);

    // If real expense is confirmed/purchased, update campaign spentAmount
    if (data.status === 'sotib olindi' && data.targetCampaignId) {
      const camp = this.state.donation_campaigns.find(c => c.id === data.targetCampaignId);
      if (camp) {
        camp.spentAmountUSD += amountInUSD;
      }
    }

    // Audit Log
    this.addAuditLog(
      'ADD_EXPENSE',
      'expenses',
      id,
      '',
      JSON.stringify(newExpense),
      `Xarajat qo'shildi: ${data.name}`
    );

    this.saveToStorage(this.state);
    return newExpense;
  }

  public updateExpenseStatus(id: string, status: Expense['status'], invoiceUrl?: string, linkedAssetId?: string, justification: string = ''): boolean {
    if (!this.currentUser || this.currentUser.role !== 'ADMIN') return false;
    const expense = this.state.expenses.find(e => e.id === id);
    if (!expense) return false;

    const oldValues = JSON.stringify({ status: expense.status, invoiceUrl: expense.invoiceUrl, linkedAssetId: expense.linkedAssetId });
    
    // If transitioning to "sotib olindi" now, apply to campaign spent
    if (status === 'sotib olindi' && expense.status !== 'sotib olindi' && expense.targetCampaignId) {
      const camp = this.state.donation_campaigns.find(c => c.id === expense.targetCampaignId);
      if (camp) {
        camp.spentAmountUSD += expense.amountInUSD;
      }
    }

    expense.status = status;
    if (invoiceUrl) expense.invoiceUrl = invoiceUrl;
    if (linkedAssetId) expense.linkedAssetId = linkedAssetId;
    expense.updated_at = new Date().toISOString();

    const newValues = JSON.stringify({ status: expense.status, invoiceUrl: expense.invoiceUrl, linkedAssetId: expense.linkedAssetId });

    this.addAuditLog(
      'UPDATE_EXPENSE',
      'expenses',
      id,
      oldValues,
      newValues,
      justification || `Xarajat holati o'zgartirildi: ${status}`
    );

    this.saveToStorage(this.state);
    return true;
  }

  // --- Assets (Inventory) ---
  public getAssets(): Asset[] {
    return this.state.assets;
  }

  public addAsset(data: Omit<Asset, 'id' | 'created_at'>): Asset | null {
    if (!this.currentUser || this.currentUser.role !== 'ADMIN') return null;
    const id = 'as_' + Date.now();
    const newAsset: Asset = {
      ...data,
      id,
      created_at: new Date().toISOString()
    };
    this.state.assets.push(newAsset);

    // Audit Log
    this.addAuditLog(
      'ADD_ASSET',
      'assets',
      id,
      '',
      JSON.stringify(newAsset),
      `Inventarga jihoz qo'shildi: ${data.name}`
    );

    this.saveToStorage(this.state);
    return newAsset;
  }

  public updateAssetStatus(id: string, status: Asset['status'], responsiblePerson?: string, condition?: string, justification: string = ''): boolean {
    if (!this.currentUser || this.currentUser.role !== 'ADMIN') return false;
    const asset = this.state.assets.find(a => a.id === id);
    if (!asset) return false;

    const oldValues = JSON.stringify({ status: asset.status, responsiblePerson: asset.responsiblePerson, condition: asset.condition });
    
    asset.status = status;
    if (responsiblePerson) asset.responsiblePerson = responsiblePerson;
    if (condition) asset.condition = condition;
    asset.lastChecked = new Date().toISOString().split('T')[0];

    const newValues = JSON.stringify({ status: asset.status, responsiblePerson: asset.responsiblePerson, condition: asset.condition });

    this.addAuditLog(
      'UPDATE_ASSET',
      'assets',
      id,
      oldValues,
      newValues,
      justification || `Jihoz holati yangilandi: ${status}`
    );

    this.saveToStorage(this.state);
    return true;
  }

  // --- Needs ---
  public getNeeds(): Need[] {
    return this.state.needs;
  }

  public addNeed(data: Omit<Need, 'id' | 'created_at' | 'raisedAmountUSD' | 'quantityFunded'>): Need | null {
    if (!this.currentUser || this.currentUser.role !== 'ADMIN') return null;
    const id = 'n_' + Date.now();
    const newNeed: Need = {
      ...data,
      id,
      raisedAmountUSD: 0,
      quantityFunded: 0,
      created_at: new Date().toISOString()
    };
    this.state.needs.push(newNeed);
    this.saveToStorage(this.state);
    return newNeed;
  }

  public updateNeed(id: string, raised: number, fundedCount: number): boolean {
    if (!this.currentUser || this.currentUser.role !== 'ADMIN') return false;
    const need = this.state.needs.find(n => n.id === id);
    if (!need) return false;

    need.raisedAmountUSD = raised;
    need.quantityFunded = fundedCount;
    if (need.raisedAmountUSD >= need.targetAmountUSD || need.quantityFunded >= need.quantityNeeded) {
      need.status = 'fulfilled';
    }
    this.saveToStorage(this.state);
    return true;
  }

  // --- Projects & Startups ---
  public getProjects(): Project[] {
    return this.state.projects;
  }

  public getStartups(): Startup[] {
    return this.state.startups;
  }

  public addProject(data: Omit<Project, 'id' | 'created_at' | 'updated_at' | 'fundingReceivedUSD' | 'status'>, members: string[]): Project {
    const id = 'proj_' + Date.now();
    const now = new Date().toISOString();
    const newProj: Project = {
      ...data,
      id,
      fundingReceivedUSD: 0,
      status: 'active',
      created_at: now,
      updated_at: now
    };
    this.state.projects.push(newProj);

    // Link members
    members.forEach(mId => {
      this.state.project_members.push({
        projectId: id,
        studentId: mId,
        role: 'Jamoa a’zosi'
      });
    });

    this.saveToStorage(this.state);
    return newProj;
  }

  public addStartup(data: Omit<Startup, 'id' | 'created_at' | 'status'>): Startup {
    const id = 'st_' + Date.now();
    const newStartup: Startup = {
      ...data,
      id,
      status: 'active',
      created_at: new Date().toISOString()
    };
    this.state.startups.push(newStartup);
    this.saveToStorage(this.state);
    return newStartup;
  }

  public addInvestorInterest(interest: Omit<InvestorInterest, 'id' | 'created_at' | 'status'>): InvestorInterest {
    const id = 'ii_' + Date.now();
    const newInterest: InvestorInterest = {
      ...interest,
      id,
      status: 'pending',
      created_at: new Date().toISOString()
    };
    this.state.investor_interest.push(newInterest);
    this.saveToStorage(this.state);
    return newInterest;
  }

  public getInvestorInterests(): InvestorInterest[] {
    if (!this.currentUser || (this.currentUser.role !== 'ADMIN' && this.currentUser.role !== 'MENTOR')) return [];
    return this.state.investor_interest;
  }

  // --- Assignments & Submissions ---
  public getAssignments(): Assignment[] {
    return this.state.assignments;
  }

  public createAssignment(data: Omit<Assignment, 'id' | 'created_at' | 'status'>): Assignment | null {
    if (!this.currentUser || this.currentUser.role !== 'MENTOR') return null;
    const id = 'ass_' + Date.now();
    const newAss: Assignment = {
      ...data,
      id,
      status: 'active',
      created_at: new Date().toISOString()
    };
    this.state.assignments.push(newAss);
    this.saveToStorage(this.state);
    return newAss;
  }

  public getAssignmentSubmissions(): AssignmentSubmission[] {
    const user = this.currentUser;
    if (!user) return [];
    if (user.role === 'STUDENT') {
      return this.state.assignment_submissions.filter(s => s.studentId === user.id);
    }
    if (user.role === 'PARENT') {
      const childrenIds = this.state.student_guardians.filter(sg => sg.guardianId === user.id).map(sg => sg.studentId);
      return this.state.assignment_submissions.filter(s => childrenIds.includes(s.studentId));
    }
    if (user.role === 'MENTOR' || user.role === 'ADMIN' || user.role === 'AUDITOR') {
      return this.state.assignment_submissions;
    }
    return [];
  }

  public submitAssignment(assignmentId: string, submissionContent: string, codeRepoUrl?: string, videoUrl?: string): AssignmentSubmission | null {
    if (!this.currentUser || this.currentUser.role !== 'STUDENT') return null;
    const id = 'sub_' + Date.now();
    const now = new Date().toISOString();

    const assignment = this.state.assignments.find(a => a.id === assignmentId);
    const isLate = assignment ? new Date() > new Date(assignment.dueDate) : false;

    const newSub: AssignmentSubmission = {
      id,
      assignmentId,
      studentId: this.currentUser.id,
      submissionContent,
      files: [],
      codeRepoUrl,
      videoUrl,
      status: isLate ? 'kechikdi' : 'topshirildi',
      submittedAt: now,
      created_at: now,
      updated_at: now
    };

    this.state.assignment_submissions.push(newSub);
    this.saveToStorage(this.state);
    return newSub;
  }

  public gradeSubmission(submissionId: string, pointsAwarded: number, feedback: string): boolean {
    if (!this.currentUser || this.currentUser.role !== 'MENTOR') return false;
    const sub = this.state.assignment_submissions.find(s => s.id === submissionId);
    if (!sub) return false;

    sub.pointsAwarded = pointsAwarded;
    sub.mentorFeedback = feedback;
    sub.status = 'qabul qilindi';
    sub.updated_at = new Date().toISOString();

    // Re-evaluate student average score
    this.recalculateStudentAverage(sub.studentId);

    this.saveToStorage(this.state);
    return true;
  }

  public requestRevision(submissionId: string, feedback: string): boolean {
    if (!this.currentUser || this.currentUser.role !== 'MENTOR') return false;
    const sub = this.state.assignment_submissions.find(s => s.id === submissionId);
    if (!sub) return false;

    sub.status = 'qayta ishlash kerak';
    sub.mentorFeedback = feedback;
    sub.updated_at = new Date().toISOString();

    this.saveToStorage(this.state);
    return true;
  }

  private recalculateStudentAverage(studentId: string) {
    const studentSubs = this.state.assignment_submissions.filter(s => s.studentId === studentId && s.pointsAwarded !== undefined);
    if (studentSubs.length === 0) return;

    let totalPoints = 0;
    let maxPossible = 0;

    studentSubs.forEach(s => {
      const assignment = this.state.assignments.find(a => a.id === s.assignmentId);
      if (assignment) {
        totalPoints += s.pointsAwarded!;
        maxPossible += assignment.maxPoints;
      }
    });

    const profile = this.state.student_profiles.find(p => p.id === studentId);
    if (profile && maxPossible > 0) {
      profile.averageScore = Math.round((totalPoints / maxPossible) * 100);
      profile.updated_at = new Date().toISOString();
    }
  }

  // --- Evaluations (Monthly 100-Point Grading) ---
  public getEvaluations(studentId?: string): Evaluation[] {
    const user = this.currentUser;
    let evs = [...this.state.evaluations];

    if (studentId) {
      evs = evs.filter(e => e.studentId === studentId);
    }

    if (!user || user.role === 'OMMAVIY') {
      return [];
    }

    if (user.role === 'STUDENT') {
      return evs.filter(e => e.studentId === user.id);
    }

    if (user.role === 'PARENT') {
      const childrenIds = this.state.student_guardians.filter(sg => sg.guardianId === user.id).map(sg => sg.studentId);
      return evs.filter(e => childrenIds.includes(e.studentId));
    }

    return evs;
  }

  public addEvaluation(data: Omit<Evaluation, 'id' | 'created_at' | 'updated_at' | 'totalPoints' | 'status'>): Evaluation | null {
    if (!this.currentUser || this.currentUser.role !== 'MENTOR') return null;
    
    const id = 'ev_' + Date.now();
    const totalPoints = data.attendancePoints + data.dailyTasksPoints + data.weeklyTasksPoints + 
                        data.monthlyProjectPoints + data.presentationPoints + data.teamworkPoints;
    
    const newEv: Evaluation = {
      ...data,
      id,
      totalPoints,
      status: 'approved',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    this.state.evaluations.push(newEv);

    // Update student average in profile
    const profile = this.state.student_profiles.find(p => p.id === data.studentId);
    if (profile) {
      profile.averageScore = totalPoints;
      profile.updated_at = new Date().toISOString();
    }

    this.addAuditLog(
      'ADD_EVALUATION',
      'evaluations',
      id,
      '',
      JSON.stringify(newEv),
      `Oylik baho kiritildi: Student ID ${data.studentId}`
    );

    this.saveToStorage(this.state);
    return newEv;
  }

  // --- Attendance ---
  public getAttendance(cohortId: string): Attendance[] {
    return this.state.attendance.filter(a => a.cohortId === cohortId);
  }

  public saveAttendance(records: Omit<Attendance, 'id' | 'created_at' | 'status_change_by'>[]): boolean {
    if (!this.currentUser || this.currentUser.role !== 'MENTOR') return false;
    const now = new Date().toISOString();

    records.forEach(r => {
      const existing = this.state.attendance.find(a => a.studentId === r.studentId && a.date === r.date);
      if (existing) {
        existing.status = r.status;
        existing.reason = r.reason;
        existing.status_change_by = this.currentUser!.id;
      } else {
        this.state.attendance.push({
          ...r,
          id: 'att_' + Math.random().toString(36).substring(2, 9),
          status_change_by: this.currentUser!.id,
          created_at: now
        });
      }
    });

    this.saveToStorage(this.state);
    return true;
  }

  // --- Consents ---
  public getConsents(studentId?: string): Consent[] {
    const user = this.currentUser;
    if (!user) return [];

    let list = [...this.state.consents];
    if (studentId) {
      list = list.filter(c => c.studentId === studentId);
    }

    if (user.role === 'PARENT') {
      const childrenIds = this.state.student_guardians.filter(sg => sg.guardianId === user.id).map(sg => sg.studentId);
      return list.filter(c => childrenIds.includes(c.studentId));
    }

    if (user.role === 'ADMIN' || user.role === 'MENTOR') {
      return list;
    }

    return [];
  }

  public saveConsent(studentId: string, consentType: Consent['consentType'], isGranted: boolean): boolean {
    if (!this.currentUser || this.currentUser.role !== 'PARENT') return false;
    
    const isParent = this.state.student_guardians.some(sg => sg.guardianId === this.currentUser!.id && sg.studentId === studentId);
    if (!isParent) return false;

    const existing = this.state.consents.find(c => c.studentId === studentId && c.consentType === consentType);
    const oldVal = existing ? existing.isGranted : false;

    if (existing) {
      existing.isGranted = isGranted;
      existing.grantedAt = new Date().toISOString();
    } else {
      this.state.consents.push({
        id: 'con_' + Date.now(),
        studentId,
        consentType,
        isGranted,
        grantedBy: this.currentUser.id,
        grantedAt: new Date().toISOString(),
        status: 'active',
        created_at: new Date().toISOString()
      });
    }

    this.addAuditLog(
      'UPDATE_CONSENT',
      'consents',
      studentId + '_' + consentType,
      JSON.stringify({ isGranted: oldVal }),
      JSON.stringify({ isGranted }),
      `Ota-ona roziligi o‘zgartirildi (${consentType}): ${isGranted ? 'Ruxsat etildi' : 'Taqiqlandi'}`
    );

    this.saveToStorage(this.state);
    return true;
  }

  // --- Support Plans ---
  public getSupportPlans(): SupportPlan[] {
    return this.state.support_plans;
  }

  public saveSupportPlan(plan: Omit<SupportPlan, 'id' | 'created_at'>): SupportPlan | null {
    if (!this.currentUser || this.currentUser.role !== 'MENTOR') return null;
    const id = 'sp_' + Date.now();
    const newPlan: SupportPlan = {
      ...plan,
      id,
      created_at: new Date().toISOString()
    };
    this.state.support_plans.push(newPlan);
    this.saveToStorage(this.state);
    return newPlan;
  }

  // --- Rewards ---
  public getRewards(): Reward[] {
    return this.state.rewards;
  }

  public getStudentRewards(studentId?: string): StudentReward[] {
    if (studentId) {
      return this.state.student_rewards.filter(r => r.studentId === studentId);
    }
    return this.state.student_rewards;
  }

  public awardReward(studentId: string, rewardId: string, details: string): StudentReward | null {
    if (!this.currentUser || this.currentUser.role !== 'MENTOR') return null;
    const id = 'sr_' + Date.now();
    const newAward: StudentReward = {
      id,
      studentId,
      rewardId,
      dateAwarded: new Date().toISOString().split('T')[0],
      details
    };
    this.state.student_rewards.push(newAward);
    this.saveToStorage(this.state);
    return newAward;
  }

  // --- News & Events ---
  public getNews(): NewsPost[] {
    return this.state.news_posts.filter(n => n.status === 'published');
  }

  public getEvents(): Event[] {
    return this.state.events;
  }

  // --- Monthly Report Generator & Manager ---
  public getMonthlyReports(): MonthlyReport[] {
    const user = this.currentUser;
    if (user?.role === 'ADMIN' || user?.role === 'AUDITOR') {
      return this.state.monthly_reports;
    }
    return this.state.monthly_reports.filter(r => r.status === 'approved');
  }

  public createMonthlyReport(reportMonth: string): MonthlyReport | null {
    if (!this.currentUser || this.currentUser.role !== 'ADMIN') return null;
    
    const existing = this.state.monthly_reports.find(r => r.reportMonth === reportMonth);
    if (existing) return existing;

    const activeStudentsCount = this.state.student_profiles.filter(p => p.status === 'active').length;
    
    const monthPrefix = reportMonth;
    const monthAtt = this.state.attendance.filter(a => a.date.startsWith(monthPrefix));
    let averageAttendance = 90;
    if (monthAtt.length > 0) {
      const presents = monthAtt.filter(a => a.status === 'present' || a.status === 'late').length;
      averageAttendance = Math.round((presents / monthAtt.length) * 100);
    }

    const tasksCompleted = this.state.assignment_submissions.filter(s => s.submittedAt?.startsWith(monthPrefix) && s.status === 'qabul qilindi').length;
    const projectsCreated = this.state.projects.length;
    const prototypesBuilt = this.state.projects.filter(p => p.stage === 'prototip' || p.stage === 'MVP').length;
    const mentoringHours = 36;
    const eventsHeld = this.state.events.filter(e => e.eventDate.startsWith(monthPrefix)).length;

    const stats = this.getFinancialStats();
    const totalRaisedUSD = stats.totalRaisedUSD;
    const totalSpentUSD = stats.totalSpentUSD;
    const endingBalanceUSD = stats.remainingUSD;

    const newReport: MonthlyReport = {
      id: 'rep_' + reportMonth.replace('-', '_'),
      reportMonth,
      activeStudentsCount,
      averageAttendance,
      tasksCompleted,
      projectsCreated,
      prototypesBuilt,
      mentoringHours,
      eventsHeld,
      totalRaisedUSD,
      totalSpentUSD,
      endingBalanceUSD,
      mainPurchases: 'Noutbuklar, sensorlar va o‘quv jihozlari',
      newsNeeds: 'Qo‘shimcha ishlatilgan noutbuklar',
      nextMonthPlans: 'Darslarni keyingi bosqichga o‘tkazish, Demo Day ga tayyorgarlik',
      photoUrls: [],
      projectIds: this.state.projects.slice(0, 2).map(p => p.id),
      status: 'draft',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    this.state.monthly_reports.push(newReport);
    this.saveToStorage(this.state);
    return newReport;
  }

  public approveMonthlyReport(id: string): boolean {
    if (!this.currentUser || this.currentUser.role !== 'ADMIN') return false;
    const report = this.state.monthly_reports.find(r => r.id === id);
    if (!report) return false;

    report.status = 'approved';
    report.approvedBy = this.currentUser.id;
    report.updated_at = new Date().toISOString();

    this.addAuditLog(
      'APPROVE_REPORT',
      'monthly_reports',
      id,
      '{"status":"draft"}',
      '{"status":"approved"}',
      `Oylik ochiq hisobot tasdiqlandi va ommaga e’lon qilindi: ${report.reportMonth}`
    );

    this.saveToStorage(this.state);
    return true;
  }

  // --- Financial Statistics Calculation ---
  public getFinancialStats() {
    const rate = this.getExchangeRate();
    
    const approvedDonations = this.state.donations.filter(d => d.status === 'kelib tushdi');
    const totalRaisedUSD = approvedDonations.reduce((sum, d) => sum + d.amountInUSD, 0);
    const totalRaisedUZS = approvedDonations.reduce((sum, d) => sum + d.amountInUZS, 0);

    const promisedDonations = this.state.donations.filter(d => d.status === 'va’da qilindi' || d.status === 'kutilmoqda');
    const totalPromisedUSD = promisedDonations.reduce((sum, d) => sum + d.amountInUSD, 0);

    const spentExpenses = this.state.expenses.filter(e => e.status === 'sotib olindi');
    const totalSpentUSD = spentExpenses.reduce((sum, e) => sum + e.amountInUSD, 0);
    const totalSpentUZS = spentExpenses.reduce((sum, e) => sum + e.amountInUZS, 0);

    const remainingUSD = totalRaisedUSD - totalSpentUSD;
    const remainingUZS = totalRaisedUZS - totalSpentUZS;

    return {
      totalRaisedUSD,
      totalRaisedUZS,
      totalPromisedUSD,
      totalSpentUSD,
      totalSpentUZS,
      remainingUSD,
      remainingUZS,
      rate
    };
  }

  // --- System Alerts for Admin Panel ---
  public getAdminAlerts() {
    const alerts: { type: 'warning' | 'danger' | 'info'; message: string; actionUrl?: string }[] = [];

    const missingReceipts = this.state.expenses.filter(e => e.status === 'sotib olindi' && !e.invoiceUrl);
    if (missingReceipts.length > 0) {
      alerts.push({
        type: 'warning',
        message: `${missingReceipts.length} ta sotib olingan xarajat uchun chek yoki hisob-faktura biriktirilmagan.`,
        actionUrl: 'expenses'
      });
    }

    const pendingDonations = this.state.donations.filter(d => d.status === 'kutilmoqda');
    if (pendingDonations.length > 0) {
      alerts.push({
        type: 'danger',
        message: `${pendingDonations.length} ta homiylik kelib tushgan to‘lovni tasdiqlash kutilmoqda.`,
        actionUrl: 'donations'
      });
    }

    const repairAssets = this.state.assets.filter(a => a.status === 'ta’mirda');
    if (repairAssets.length > 0) {
      alerts.push({
        type: 'info',
        message: `${repairAssets.length} ta o‘quv kompyuteri ta’mirlash holatida.`,
        actionUrl: 'inventory'
      });
    }

    const lowPerfStudents = this.state.student_profiles.filter(p => p.averageScore < 60 && p.status === 'active');
    lowPerfStudents.forEach(s => {
      const user = this.state.users.find(u => u.id === s.id);
      alerts.push({
        type: 'danger',
        message: `O‘quvchi ${user?.fullName || s.alias}ning oylik balli past (ball: ${s.averageScore}). Mentor va ota-ona bilan yordam rejasini ko‘rib chiqing.`,
        actionUrl: 'students'
      });
    });

    return alerts;
  }

  // --- Audit Log Manager ---
  private addAuditLog(actionType: string, tableName: string, recordId: string, oldValues: string, newValues: string, justification: string) {
    const id = 'al_' + Date.now() + Math.random().toString(36).substring(2, 5);
    const newLog: AuditLog = {
      id,
      executorId: this.currentUser ? this.currentUser.id : 'system',
      executorName: this.currentUser ? this.currentUser.fullName : 'Tizim',
      actionType,
      tableName,
      recordId,
      oldValues,
      newValues,
      justification,
      created_at: new Date().toISOString()
    };
    this.state.audit_logs.push(newLog);
  }

  public getAuditLogs(): AuditLog[] {
    if (!this.currentUser || (this.currentUser.role !== 'ADMIN' && this.currentUser.role !== 'AUDITOR')) return [];
    return this.state.audit_logs;
  }

  // --- Data Management (Backup & Reset) ---
  public backupExport(): string {
    return JSON.stringify(this.state, null, 2);
  }

  public backupImport(jsonData: string): boolean {
    if (!this.currentUser || this.currentUser.role !== 'ADMIN') return false;
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed.users && parsed.donations && parsed.expenses) {
        this.state = parsed;
        this.saveToStorage(parsed);
        return true;
      }
    } catch (e) {
      console.error('Backup import parsing failed', e);
    }
    return false;
  }

  public resetDB() {
    localStorage.removeItem('varzik_db_state');
    this.state = getInitialDemoData();
    this.saveToStorage(this.state);
  }

  // --- General PII Privacy Filter ---
  public filterStudentPII(profile: StudentProfile, studentUser: User): any {
    const user = this.currentUser;
    
    const isMentorOrAdmin = user && (user.role === 'ADMIN' || user.role === 'MENTOR');
    const isChildsParent = user && user.role === 'PARENT' && this.state.student_guardians.some(sg => sg.guardianId === user.id && sg.studentId === profile.id);
    const isSelf = user && user.role === 'STUDENT' && user.id === profile.id;

    if (isMentorOrAdmin || isChildsParent || isSelf) {
      return {
        ...profile,
        fullName: studentUser.fullName,
        email: studentUser.email,
        phone: studentUser.phone
      };
    }

    const nameConsent = this.state.consents.find(c => c.studentId === profile.id && c.consentType === 'name' && c.isGranted);
    const profileConsent = this.state.consents.find(c => c.studentId === profile.id && c.consentType === 'profile' && c.isGranted);

    if (!profileConsent) {
      return null;
    }

    return {
      id: profile.id,
      alias: profile.alias,
      fullName: nameConsent ? studentUser.fullName : profile.alias,
      ageRange: profile.ageRange,
      strengths: profile.strengths,
      averageScore: 0,
      growthAreas: [],
      status: 'active'
    };
  }

  public getPublicStudents(): any[] {
    const list: any[] = [];
    this.state.student_profiles.forEach(p => {
      const studentUser = this.state.users.find(u => u.id === p.id);
      if (studentUser) {
        const filtered = this.filterStudentPII(p, studentUser);
        if (filtered) list.push(filtered);
      }
    });
    return list;
  }

  public getUsers(): User[] {
    if (!this.currentUser || (this.currentUser.role !== 'ADMIN' && this.currentUser.role !== 'MENTOR')) return [];
    return this.state.users;
  }

  public updateUserRole(userId: string, role: User['role'], justification: string): boolean {
    if (!this.currentUser || this.currentUser.role !== 'ADMIN') return false;
    const user = this.state.users.find(u => u.id === userId);
    if (!user) return false;

    const oldRole = user.role;
    user.role = role;
    user.updated_at = new Date().toISOString();

    this.addAuditLog(
      'UPDATE_USER_ROLE',
      'users',
      userId,
      JSON.stringify({ role: oldRole }),
      JSON.stringify({ role }),
      justification
    );

    this.saveToStorage(this.state);
    return true;
  }

  public getDonationCampaigns(): DonationCampaign[] {
    return this.state.donation_campaigns;
  }

  public addDonationCampaign(data: Omit<DonationCampaign, 'id' | 'created_at' | 'raisedAmountUSD' | 'spentAmountUSD'>): DonationCampaign | null {
    if (!this.currentUser || this.currentUser.role !== 'ADMIN') return null;
    const id = 'camp_' + Date.now();
    const newCamp: DonationCampaign = {
      ...data,
      id,
      raisedAmountUSD: 0,
      spentAmountUSD: 0,
      created_at: new Date().toISOString()
    };
    this.state.donation_campaigns.push(newCamp);
    this.saveToStorage(this.state);
    return newCamp;
  }

  public getImpactUnits(): ImpactUnit[] {
    return this.state.impact_units;
  }

  public updateImpactUnit(id: string, amountUSD: number, unitName: string, impactDescription: string): boolean {
    if (!this.currentUser || this.currentUser.role !== 'ADMIN') return false;
    const unit = this.state.impact_units.find(u => u.id === id);
    if (!unit) return false;

    unit.amountUSD = amountUSD;
    unit.unitName = unitName;
    unit.impactDescription = impactDescription;
    this.saveToStorage(this.state);
    return true;
  }
}
