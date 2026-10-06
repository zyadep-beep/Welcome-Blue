/* ===== One Arise — config (edit these) ===== */
const CONFIG = {
  phone: '01044765911',
  whatsapp: '201044765911',
  email: 'zyadep@gmail.com',
  calendar: 'https://calendar.app.google/Mbg9yc14ADiPC1vn6',
  sheetEndpoint: 'https://script.google.com/macros/s/AKfycbxrEDOD9-C1MtdvDiyQJKTTTridGQlnHd8t5jHikrm73OMhxmeR_IYbuB0r073QDJmC/exec'
};

const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
let lang = 'en';
try { const q = new URLSearchParams(location.search).get('lang'); if (q === 'ar') lang = 'ar'; } catch (e) {}
const T = (en, ar) => lang === 'ar' ? ar : en;
const wait = ms => new Promise(r => setTimeout(r, reduce ? 0 : ms));
function toast(t) { const e = $('#toast'); e.textContent = t; e.classList.add('on'); clearTimeout(toast.t); toast.t = setTimeout(() => e.classList.remove('on'), 4000); }

/* ===== Dictionary ===== */
const D = {
  skip: ['Skip to content', 'تخطَّ إلى المحتوى'], scroll: ['Scroll', 'مرّر'],
  ch1: ['WhatsApp', 'واتساب'], ch2: ['Instagram', 'إنستغرام'], ch3: ['Website', 'الموقع'],
  triA: ['Three channels.', 'ثلاث قنوات.'], triB: ['One mind behind them.', 'وعقل واحد خلفها.'],
  triEnd: ['Every message, on every channel, answered by one AI that knows your business.', 'كل رسالة، على كل قناة، يرد عليها ذكاء اصطناعي واحد يعرف عملك جيداً.'],
  abEye: ['Who we are', 'من نحن'], flowCap: ['Your business, on autopilot.', 'عملك يعمل تلقائياً.'],
  stText: ['One Arise is an AI automation studio for Kuwait and the Gulf. We turn missed messages, no-shows and slow follow-ups into systems that run themselves, so your team can focus on the work only people can do.', 'One Arise استوديو أتمتة بالذكاء الاصطناعي للكويت والخليج. نحوّل الرسائل الفائتة والمواعيد الضائعة والمتابعات البطيئة إلى أنظمة تعمل وحدها، ليتفرغ فريقك للعمل الذي لا يقوم به إلا البشر.'],
  bb1: ['WhatsApp', 'واتساب'], bb2: ['Booking', 'الحجز'], bb3: ['CRM', 'العملاء'], bb4: ['Analytics', 'التحليلات'],
  bigL: ['Always<br>awake', 'دائماً<br>مستيقظ'], bigR: ['Never misses<br>a customer', 'لا يفوّت<br>أي عميل'],
  nSvc: ['Services', 'الخدمات'], nDemo: ['Live demo', 'عرض مباشر'], nProc: ['Process', 'طريقة العمل'], nRes: ['Results', 'النتائج'], nBook: ['Book a call', 'احجز مكالمة'],
  pill: ['AI automation · Kuwait &amp; the Gulf', 'أتمتة بالذكاء الاصطناعي · الكويت والخليج'],
  h1a: ['One system.', 'نظام واحد.'], h1b: ['Every customer answered.', 'وكل عميل يُرَدّ عليه.'],
  hlead: ["One Arise builds WhatsApp AI agents, booking systems and lead engines that reply in seconds, in Arabic and English, around the clock. You sleep. Your business doesn't.", 'تبني One Arise وكلاء ذكاء اصطناعي على واتساب وأنظمة حجز ومحركات لجذب العملاء، تردّ خلال ثوانٍ بالعربية والإنجليزية على مدار الساعة. أنت ترتاح، وعملك لا يتوقف.'],
  bDemo: ['Try the live demo', 'جرّب العرض المباشر'], bBook2: ['Book a free call', 'احجز مكالمة مجانية'],
  st1: ['Always on, every day', 'يعمل دائماً، كل يوم'], st2: ['Reply to every new lead', 'ثوانٍ للرد على كل عميل جديد'], st3: ['Fluent in both languages', 'بطلاقة في اللغتين'], sec: ['s', ''],
  m: [['WhatsApp AI agents', 'Booking', 'Lead capture', 'CRM', 'Reminders', 'Invoicing', 'Analytics', 'Any business'], ['وكلاء واتساب الذكيون', 'الحجوزات', 'جذب العملاء', 'إدارة العملاء', 'التذكيرات', 'الفواتير', 'التحليلات', 'لأي نشاط تجاري']],
  svEye: ['What we automate', 'ما نقوم بأتمتته'], svH: ['One partner. <em>Every repetitive task</em> handled.', 'شريك واحد. <em>وكل مهمة متكررة</em> تُنجَز.'],
  svLead: ['Your team stops answering the same questions and chasing the same follow-ups. One Arise handles it, and every action is logged where you can see it.', 'يتوقف فريقك عن الإجابة على نفس الأسئلة وملاحقة نفس المتابعات. تتولى One Arise ذلك، وكل إجراء مسجَّل أمامك.'],
  svc: [
    ['AI auto-reply', 'Instant WhatsApp and Instagram replies in Arabic and English, trained on your business.', 'رد آلي ذكي', 'ردود فورية على واتساب وإنستغرام بالعربية والإنجليزية، مدرّبة على نشاطك.'],
    ['Appointment booking', 'Customers book, change and cancel on their own, synced with your calendar.', 'حجز المواعيد', 'يحجز العملاء ويعدّلون ويلغون بأنفسهم، مع مزامنة تقويمك.'],
    ['Customer records', 'Every conversation becomes a clean record in your CRM, with no manual entry.', 'سجلات العملاء', 'كل محادثة تصبح سجلاً منظماً في نظام العملاء دون أي إدخال يدوي.'],
    ['Smart reminders', 'Automatic reminders cut no-shows and bring past customers back.', 'تذكيرات ذكية', 'تذكيرات تلقائية تقلل الغياب وتعيد العملاء السابقين.'],
    ['Billing &amp; payments', 'Invoices and KNET payment links sent automatically, with follow-up on unpaid ones.', 'الفواتير والمدفوعات', 'إرسال الفواتير وروابط الدفع عبر كي نت تلقائياً مع متابعة غير المسدد.'],
    ['Lead follow-up', 'Every enquiry is qualified, tagged and followed up until it books or says no.', 'متابعة العملاء المحتملين', 'كل استفسار يُصنَّف ويُتابَع حتى يحجز أو يعتذر.'],
    ['Reviews &amp; referrals', 'Happy customers are asked for a Google review at exactly the right moment.', 'التقييمات والإحالات', 'نطلب من العملاء الراضين تقييماً على جوجل في الوقت المناسب تماماً.'],
    ['Live analytics', 'See leads, bookings and revenue in one live dashboard.', 'تحليلات مباشرة', 'شاهد العملاء والحجوزات والإيرادات في لوحة واحدة مباشرة.']
  ],
  dmEye: ['Live demo', 'عرض مباشر'], dmH: ['Pick an industry. <em>Watch it work.</em>', 'اختر مجالك. <em>وشاهده يعمل.</em>'],
  dmLead: ['Talk to the AI like a real customer. Tap a reply or type your own, and the panel beside the chat shows the automations firing behind every answer.', 'تحدّث مع الذكاء الاصطناعي كأنك عميل حقيقي. اختر رداً أو اكتب رسالتك، وستعرض اللوحة بجانب المحادثة الأتمتة التي تعمل خلف كل إجابة.'],
  tabC: ['Clinics', 'العيادات'], tabE: ['Real estate', 'العقارات'], tabS: ['E-commerce', 'المتاجر الإلكترونية'],
  online: ['online · AI assistant', 'متصل · مساعد ذكي'], restart: ['Restart', 'إعادة'], ph: ['Type your own message…', 'اكتب رسالتك…'],
  pnH: ['Behind the scenes', 'خلف الكواليس'], pnP: ['Every reply triggers real automation: bookings, CRM records, reminders and alerts.', 'كل رد يشغّل أتمتة حقيقية: حجوزات وسجلات عملاء وتذكيرات وتنبيهات.'],
  k1l: ['Messages handled', 'رسائل عولجت'], k2l: ['Tasks automated', 'مهام مؤتمتة'], k3l: ['Avg. reply time', 'متوسط الرد'], k3v: ['0.8s', '0.8 ث'],
  note: ['Demo uses sample businesses and prices. Your system is built around your own services, calendar and catalog.', 'العرض يستخدم أنشطة وأسعاراً تجريبية. نظامك يُبنى حول خدماتك وتقويمك وكتالوجك.'],
  prEye: ['How we work', 'كيف نعمل'], prH: ['From first call to <em>live system</em> in weeks.', 'من أول مكالمة إلى <em>نظام يعمل</em> خلال أسابيع.'],
  p1t: ['Audit', 'التشخيص'], p1d: ['We map where you lose time and money: missed messages, no-shows, slow follow-ups. You get a clear list of what to automate first.', 'نحدد أين تخسر الوقت والمال: رسائل فائتة وغياب ومتابعات بطيئة. وتحصل على قائمة واضحة بما يجب أتمتته أولاً.'],
  p2t: ['Build', 'البناء'], p2d: ['We design your AI agent, booking flow and CRM pipeline around your services, tone and languages, then connect everything to your tools.', 'نصمم وكيلك الذكي ومسار الحجز ونظام العملاء حول خدماتك وأسلوبك ولغاتك، ثم نربط كل شيء بأدواتك.'],
  p3t: ['Launch', 'الإطلاق'], p3d: ['We test with real conversations, train your team in an hour, and go live on WhatsApp, Instagram and your website.', 'نختبر بمحادثات حقيقية، وندرّب فريقك خلال ساعة، ثم ننطلق على واتساب وإنستغرام وموقعك.'],
  p4t: ['Optimize', 'التحسين'], p4d: ['We review conversations and analytics every month, then tune replies and flows so results keep improving.', 'نراجع المحادثات والتحليلات شهرياً ونضبط الردود والمسارات لتستمر النتائج في التحسن.'],
  rsEye: ['The One Arise standard', 'معيار One Arise'], rsH: ['Built to <em>never miss</em> a customer.', 'مصمم كي <em>لا يفوتك</em> أي عميل.'],
  r1: ['hours a day, 7 days a week', 'ساعة يومياً، 7 أيام في الأسبوع'], r2: ['seconds to answer a new lead', 'ثوانٍ للرد على عميل جديد'], r3: ['messages left on read', 'رسائل تُترك بلا رد'], r4: ['of actions logged and visible', 'من الإجراءات مسجلة وظاهرة'],
  ctEye: ["Let's talk", 'لنتحدث'], ctH: ['Ready to <em>rise</em> above the busywork?', 'جاهز <em>لتنهض</em> فوق الأعمال الروتينية؟'],
  ctLead: ["Book a free 20-minute call and we'll show you exactly what we would automate in your business.", 'احجز مكالمة مجانية مدتها 20 دقيقة وسنريك بالضبط ما الذي سنؤتمته في عملك.'],
  ctBtn: ['Book a free call', 'احجز مكالمة مجانية'], ctWa: ['Message us on WhatsApp', 'راسلنا على واتساب'], cCall: ['Call', 'اتصل'], cMail: ['Email', 'البريد'],
  foot: ['AI automation for any business · Kuwait &amp; the Gulf', 'أتمتة بالذكاء الاصطناعي لأي نشاط · الكويت والخليج'],
  bkEye: ['Book a call', 'احجز مكالمة'], bkH: ['Tell us about <em>your business.</em>', 'أخبرنا عن <em>عملك.</em>'], bkS1: ['Your details', 'بياناتك'], bkS2: ['Pick a time', 'اختر الوقت'],
  fName: ['Full name', 'الاسم الكامل'], fPhone: ['Phone / WhatsApp', 'الهاتف / واتساب'], fEmail: ['Email', 'البريد الإلكتروني'], fBiz: ['Business type', 'نوع النشاط'], fWeb: ['Website or Instagram', 'الموقع أو إنستغرام'],
  fNotes: ['What would you like to automate?', 'ما الذي تريد أتمتته؟'], opt: ['(optional)', '(اختياري)'],
  o1: ['Clinic', 'عيادة'], o2: ['Real estate', 'عقارات'], o3: ['E-commerce', 'متجر إلكتروني'], o4: ['Restaurant / café', 'مطعم / مقهى'], o5: ['Other', 'أخرى'],
  phName: ['Your name', 'اسمك'], phPhone: ['+965 …', '+965 …'],
  fSub: ['Continue', 'متابعة'], dnP: ['Your details are saved. Pick a time that suits you from our calendar.', 'تم حفظ بياناتك. اختر الوقت المناسب لك من تقويمنا.'], dnBtn: ['Open the booking calendar', 'افتح تقويم الحجز']
};
const tr = k => (D[k] ? D[k][lang === 'ar' ? 1 : 0] : '');

/* ===== Static UI ===== */
const IC = {
  chat: 'M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z', cal: 'M7 3v4M17 3v4M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z',
  users: 'M16 19v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 17.5V19M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM20 19v-1.5a3.5 3.5 0 0 0-2.5-3.3M15.5 4.2a3.5 3.5 0 0 1 0 6.6',
  bell: 'M18 16v-5a6 6 0 1 0-12 0v5l-2 2h16l-2-2zM10 21h4', card: 'M3 6h18v12H3zM3 10h18M7 15h3', target: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 12h.01',
  star: 'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z', chart: 'M4 20V10M10 20V4M16 20v-8M22 20H2'
};
const icons = ['chat', 'cal', 'users', 'bell', 'card', 'target', 'star', 'chart'];

function renderStatic() {
  document.documentElement.lang = lang; document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  $$('[data-i]').forEach(e => { const v = tr(e.dataset.i); if (v) e.innerHTML = v; });
  $$('[data-ph]').forEach(e => { const v = tr(e.dataset.ph); if (v) e.placeholder = v; });
  $('#langBtn').textContent = lang === 'ar' ? 'English' : 'عربي';
  $('#svcs').innerHTML = D.svc.map((s, i) => `<li class="st-row" style="--i:${i}" data-cursor="${T('Automate', 'أتمتة')}"><span class="st-n">0${i + 1}</span><span class="st-ic"><svg viewBox="0 0 24 24"><path d="${IC[icons[i]]}"/></svg></span><h3 class="st-t">${lang === 'ar' ? s[2] : s[0]}</h3><p class="st-d">${lang === 'ar' ? s[3] : s[1]}</p></li>`).join('');
  const words = D.m[lang === 'ar' ? 1 : 0];
  $('#mq').innerHTML = Array.from({ length: 4 }, () => words.map(w => `<span>${w}</span><span>✦</span>`).join('')).join('');
  document.title = T('One Arise — AI Automation for Kuwait & the Gulf', 'One Arise — أتمتة بالذكاء الاصطناعي للكويت والخليج');
}

// contacts
(function () {
  const tel = '+20' + CONFIG.phone.replace(/\D/g, '').replace(/^0/, '');
  $$('.js-phone').forEach(e => e.textContent = tel.replace(/(\+20)(\d{2})(\d{4})(\d{4})/, '$1 $2 $3 $4'));
  $$('.js-email').forEach(e => e.textContent = CONFIG.email);
  $$('a.js-tel').forEach(a => a.href = 'tel:' + tel);
  $$('a.js-mail').forEach(a => a.href = 'mailto:' + CONFIG.email);
  $$('a.js-wa').forEach(a => a.href = 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent('Hi One Arise, I would like to automate my business.'));
  $('#proceed').href = CONFIG.calendar;
})();

// nav
const nav = $('.nav');
const onScroll = () => nav.classList.toggle('solid', scrollY > 40);
addEventListener('scroll', onScroll, { passive: true }); onScroll();

// reveal + counters
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return; e.target.classList.add('in'); io.unobserve(e.target);
  $$('.cnt', e.target).forEach(countUp);
}), { threshold: .15, rootMargin: '0px 0px -40px 0px' });
function countUp(el) {
  const to = +el.dataset.to; if (reduce || !to) { el.textContent = to; return; }
  const t0 = performance.now(), dur = 1400;
  (function f(t) { const p = Math.min(1, (t - t0) / dur); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f); })(t0);
}
window.countUp = countUp;
function observe() { $$('.rv:not(.in)').forEach(e => io.observe(e)); }

/* ===== Demo engine ===== */
const mini = (title, rows, badge) => ({ mini: { title, rows, badge } });
const KWD = n => lang === 'ar' ? n + ' د.ك' : 'KWD ' + n;
const BIZ = { clinic: ['Smile Dental Clinic', 'عيادة سمايل للأسنان', 'S', 'س'], estate: ['Gulf Heights Realty', 'غلف هايتس العقارية', 'G', 'غ'], ecom: ['Noor Store', 'متجر نور', 'N', 'ن'] };

const FLOWS = {
  clinic: {
    kw: [[/book|appoint|clean|check|موعد|حجز|احجز|تنظيف/i, 'treat'], [/price|cost|how much|whiten|سعر|كم|تبييض/i, 'price'], [/hour|open|where|locat|ساعات|موقع|وين|أين|متى/i, 'hours'], [/pain|ache|hurt|urgent|ألم|وجع|طارئ/i, 'urgent'], [/human|person|staff|موظف|استقبال/i, 'human']],
    menuChoices: () => [{ t: T('I want to book an appointment', 'أريد حجز موعد'), go: 'treat' }, { t: T('How much is teeth whitening?', 'كم سعر تبييض الأسنان؟'), go: 'price' }, { t: T('Where are you and when are you open?', 'أين موقعكم ومتى تفتحون؟'), go: 'hours' }, { t: T('I have a toothache', 'عندي ألم في أسناني'), go: 'urgent' }],
    nodes: {
      menu: { say: () => [T("Hello, welcome to Smile Dental Clinic. I'm the clinic's AI assistant, here 24/7. How can I help you today?", 'أهلاً بك في عيادة سمايل للأسنان. أنا المساعد الذكي للعيادة ومتاح على مدار الساعة. كيف أقدر أساعدك اليوم؟')], menu: 1 },
      treat: { intent: () => T('Book appointment', 'حجز موعد'), say: () => [T('Happy to help. What would you like to book?', 'بكل سرور. ماذا تود أن تحجز؟')], choices: () => [[T('Cleaning & check-up', 'تنظيف وفحص')], [T('Teeth whitening', 'تبييض الأسنان')], [T('Braces consultation', 'استشارة تقويم')]].map(([k]) => ({ t: k, go: 'day', set: { tr: k } })) },
      day: { say: s => [T(`${s.tr}, noted. Which day suits you?`, `${s.tr}، تم. أي يوم يناسبك؟`)], choices: () => [T('Tomorrow', 'غداً'), T('Tuesday', 'الثلاثاء'), T('Wednesday', 'الأربعاء')].map(k => ({ t: k, go: 'time', set: { day: k } })) },
      time: { log: () => [T('Calendar checked: 3 free slots found', 'تم فحص التقويم: 3 مواعيد متاحة')], say: () => [T('Here is what is open. Which time works for you?', 'هذه المواعيد المتاحة. أي وقت يناسبك؟')], choices: () => [T('10:00 AM', '10:00 ص'), T('1:30 PM', '1:30 م'), T('6:00 PM', '6:00 م')].map(k => ({ t: k, go: 'confirm', set: { time: k } })) },
      confirm: {
        log: () => [T('Appointment created in calendar', 'تم إنشاء الموعد في التقويم'), T('Patient record created in CRM', 'تم إنشاء ملف المريض'), T('Reminders scheduled (24h + 2h)', 'تمت جدولة التذكيرات (قبل 24 ساعة وساعتين)'), T('Confirmation sent on WhatsApp', 'تم إرسال التأكيد عبر واتساب')],
        say: s => [T("You're booked. Here are your details:", 'تم حجز موعدك. هذه التفاصيل:'), mini(T('Appointment', 'الموعد'), [[T('Treatment', 'العلاج'), s.tr], [T('Day', 'اليوم'), s.day], [T('Time', 'الوقت'), s.time], [T('Doctor', 'الطبيبة'), T('Dr. Hessa', 'د. حصة')]], T('Confirmed', 'مؤكد')), T("I'll remind you 24 hours and 2 hours before. See you soon.", 'سأذكّرك قبل 24 ساعة وقبل ساعتين. نراك قريباً.')],
        choices: () => [{ t: T('Change the time', 'تغيير الوقت'), go: 'day' }, { t: T("That's all, thanks", 'هذا كل شيء، شكراً'), go: 'bye' }]
      },
      price: { intent: () => T('Price enquiry', 'استفسار أسعار'), log: () => [T('Price list sent', 'تم إرسال قائمة الأسعار'), T('Lead tagged: whitening interest', 'تصنيف العميل: مهتم بالتبييض')], say: () => [T('Teeth whitening starts from KWD 60 for a 60-minute in-clinic session.', 'يبدأ تبييض الأسنان من 60 د.ك لجلسة مدتها 60 دقيقة في العيادة.'), mini(T('Prices', 'الأسعار'), [[T('Cleaning & check-up', 'تنظيف وفحص'), KWD(15)], [T('Teeth whitening', 'تبييض الأسنان'), T('from ', 'من ') + KWD(60)], [T('Braces consultation', 'استشارة تقويم'), T('Free', 'مجاناً')]])], choices: () => [{ t: T('Book whitening', 'احجز تبييض'), go: 'day', set: { tr: T('Teeth whitening', 'تبييض الأسنان') } }, { t: T('Back to menu', 'القائمة الرئيسية'), go: 'home' }] },
      hours: { intent: () => T('Hours & location', 'الساعات والموقع'), log: () => [T('Google Maps pin sent', 'تم إرسال الموقع على الخريطة')], say: () => [T("We're open Sunday to Thursday 9 AM – 9 PM, Saturday 10 AM – 4 PM. Closed Fridays.", 'نعمل من الأحد إلى الخميس 9 ص – 9 م، والسبت 10 ص – 4 م. الجمعة إجازة.'), T("We're in Salmiya. I've sent you the map pin.", 'نحن في السالمية، وأرسلت لك موقعنا على الخريطة.')], choices: () => [{ t: T('Book an appointment', 'احجز موعداً'), go: 'treat' }, { t: T('Back to menu', 'القائمة الرئيسية'), go: 'home' }] },
      urgent: { intent: () => T('Urgent pain', 'ألم طارئ'), log: () => [T('Case flagged as urgent', 'تم تصنيف الحالة كطارئة'), T('Emergency slot held for 10 min', 'تم حجز موعد طارئ مؤقتاً لمدة 10 دقائق')], say: () => [T("I'm sorry you're in pain. I can get you seen today at 4:30 PM with Dr. Hessa.", 'آسف على ألمك. أقدر أحجز لك اليوم الساعة 4:30 م مع د. حصة.')], choices: () => [{ t: T('Take 4:30 PM today', 'احجز 4:30 م اليوم'), go: 'confirm', set: { tr: T('Urgent pain visit', 'زيارة ألم طارئة'), day: T('Today', 'اليوم'), time: T('4:30 PM', '4:30 م') } }, { t: T('Talk to reception', 'التحدث مع الاستقبال'), go: 'human' }] },
      human: { log: () => [T('Escalated to reception', 'تم التحويل إلى الاستقبال'), T('Chat summary sent to staff', 'تم إرسال ملخص المحادثة للفريق')], say: () => [T("Connecting you to reception now. I've sent them a summary so you won't need to repeat yourself.", 'أحوّلك الآن إلى الاستقبال، وأرسلت لهم ملخصاً حتى لا تضطر للتكرار.')], choices: () => [{ t: T('Back to menu', 'القائمة الرئيسية'), go: 'home' }] }
    }
  },
  estate: {
    kw: [[/value|worth|valu|قيمة|تقييم|يسوى/i, 'val'], [/rent|إيجار|ايجار|استئجار/i, 'rent'], [/buy|sale|apartment|villa|listing|شقة|شقق|فيلا|بيع|شراء/i, 'list'], [/view|visit|tour|معاينة|زيارة/i, 'visit'], [/agent|human|وسيط|موظف/i, 'agent']],
    menuChoices: () => [{ t: T('Show me apartments for sale', 'أرني شققاً للبيع'), go: 'list' }, { t: T('I want to rent', 'أريد الإيجار'), go: 'rent' }, { t: T('What is my property worth?', 'كم قيمة عقاري؟'), go: 'val' }, { t: T('Talk to an agent', 'التحدث مع وسيط'), go: 'agent' }],
    nodes: {
      menu: { say: () => [T("Hi, I'm the AI assistant at Gulf Heights Realty. Are you looking to buy, rent, or value a property?", 'مرحباً، أنا المساعد الذكي في غلف هايتس العقارية. هل تبحث عن شراء أو إيجار أو تقييم عقار؟')], menu: 1 },
      list: { intent: () => T('Buyer lead', 'عميل شراء'), log: () => [T('Listings matched from inventory', 'تمت مطابقة العقارات من المخزون'), T('Buyer lead created in CRM', 'تم تسجيل عميل شراء')], say: () => [T('Here are three options available this week:', 'هذه ثلاثة خيارات متاحة هذا الأسبوع:'), mini(T('For sale', 'للبيع'), [[T('2BR · Salmiya', 'غرفتان · السالمية'), KWD('98,000')], [T('3BR · Jabriya', '3 غرف · الجابرية'), KWD('132,000')], [T('Villa · Mishref', 'فيلا · مشرف'), KWD('410,000')]])], choices: () => [{ t: T('Book a viewing', 'احجز معاينة'), go: 'visit' }, { t: T('Back to menu', 'القائمة الرئيسية'), go: 'home' }] },
      rent: { intent: () => T('Rental lead', 'عميل إيجار'), say: () => [T("What's your monthly budget?", 'ما ميزانيتك الشهرية؟')], choices: () => [[T('Under KWD 350', 'أقل من 350 د.ك'), T('1BR · Hawally', 'غرفة · حولي'), 320], [T('KWD 350 – 600', '350 – 600 د.ك'), T('2BR · Salmiya', 'غرفتان · السالمية'), 480], [T('KWD 600+', 'أكثر من 600 د.ك'), T('3BR sea view · Salmiya', '3 غرف بإطلالة بحرية · السالمية'), 750]].map(([t, u, p]) => ({ t, go: 'rentRes', set: { u, p } })) },
      rentRes: { log: () => [T('Budget saved to lead profile', 'تم حفظ الميزانية في ملف العميل')], say: s => [T('Best match for you:', 'أفضل خيار لك:'), mini(T('For rent', 'للإيجار'), [[T('Unit', 'الوحدة'), s.u], [T('Rent', 'الإيجار'), KWD(s.p) + T(' / month', ' / شهرياً')], [T('Available', 'متاح'), T('Now', 'الآن')]])], choices: () => [{ t: T('Book a viewing', 'احجز معاينة'), go: 'visit' }, { t: T('Back to menu', 'القائمة الرئيسية'), go: 'home' }] },
      visit: { say: () => [T('When would you like to visit?', 'متى تود المعاينة؟')], choices: () => [T('Today evening', 'مساء اليوم'), T('Tomorrow', 'غداً'), T('This weekend', 'نهاية الأسبوع')].map(k => ({ t: k, go: 'visitOk', set: { day: k } })) },
      visitOk: { log: () => [T('Viewing booked in agent calendar', 'تم حجز المعاينة في تقويم الوسيط'), T('Agent notified on WhatsApp', 'تم إبلاغ الوسيط عبر واتساب'), T('Location + reminder sent', 'تم إرسال الموقع والتذكير')], say: s => [mini(T('Viewing', 'المعاينة'), [[T('When', 'الموعد'), s.day], [T('Agent', 'الوسيط'), T('Faisal', 'فيصل')]], T('Booked', 'محجوز')), T("Done. Faisal will meet you there, and I'll send a reminder with the location.", 'تم. سيقابلك فيصل هناك، وسأرسل لك تذكيراً مع الموقع.')], choices: () => [{ t: T('Back to menu', 'القائمة الرئيسية'), go: 'home' }] },
      val: { intent: () => T('Valuation', 'تقييم عقار'), say: () => [T('Which area is your property in?', 'في أي منطقة عقارك؟')], choices: () => [[T('Salmiya', 'السالمية'), 88], [T('Hawally', 'حولي'), 72], [T('Kuwait City', 'مدينة الكويت'), 110]].map(([a, v]) => ({ t: a, go: 'valRes', set: { a, v } })) },
      valRes: { log: () => [T('Recent sales compared (12 comps)', 'تمت مقارنة 12 صفقة حديثة'), T('Seller lead created', 'تم تسجيل عميل بيع')], say: s => [mini(T('Estimate · 2BR', 'تقدير · غرفتان'), [[T('Area', 'المنطقة'), s.a], [T('Range', 'النطاق'), KWD((s.v - 6) + ',000') + ' – ' + (s.v + 6) + ',000']]), T('Want an agent to give you an exact valuation on site?', 'هل تود أن يقدّم لك وسيط تقييماً دقيقاً في الموقع؟')], choices: () => [{ t: T('Yes, book it', 'نعم، احجز'), go: 'visit' }, { t: T('Back to menu', 'القائمة الرئيسية'), go: 'home' }] },
      agent: { log: () => [T('Escalated to on-duty agent', 'تم التحويل للوسيط المناوب')], say: () => [T('Faisal, our senior agent, will message you within 10 minutes.', 'سيتواصل معك فيصل، كبير الوسطاء، خلال 10 دقائق.')], choices: () => [{ t: T('Back to menu', 'القائمة الرئيسية'), go: 'home' }] }
    }
  },
  ecom: {
    kw: [[/order|buy|product|perfume|طلب|اطلب|منتج|عطر/i, 'cat'], [/where|track|deliver|أين|وين|تتبع|توصيل/i, 'track'], [/return|refund|إرجاع|ارجاع|استرجاع/i, 'ret'], [/offer|discount|sale|عرض|عروض|خصم/i, 'off']],
    menuChoices: () => [{ t: T('I want to order', 'أريد أن أطلب'), go: 'cat' }, { t: T("Where's my order?", 'أين طلبي؟'), go: 'track' }, { t: T('Return an item', 'إرجاع منتج'), go: 'ret' }, { t: T('Any offers?', 'هل لديكم عروض؟'), go: 'off' }],
    nodes: {
      menu: { say: () => [T("Welcome to Noor Store. I can take your order, track a delivery or handle a return. What do you need?", 'أهلاً بك في متجر نور. أقدر آخذ طلبك أو أتتبع شحنتك أو أرتّب الإرجاع. ماذا تحتاج؟')], menu: 1 },
      cat: { intent: () => T('New order', 'طلب جديد'), say: () => [T('Our bestsellers this week:', 'الأكثر مبيعاً هذا الأسبوع:')], choices: () => [[T('Oud perfume 100 ml', 'عطر عود 100 مل'), 39], [T('Leather tote', 'حقيبة جلدية'), 38], [T('Smart watch', 'ساعة ذكية'), 45]].map(([n, p]) => ({ t: n + ' · ' + KWD(p), go: 'pay', set: { n, p } })) },
      pay: { log: () => [T('Stock reserved', 'تم حجز المخزون')], say: () => [T('How would you like to pay?', 'كيف تفضل الدفع؟')], choices: () => [T('KNET', 'كي نت'), T('Credit card', 'بطاقة ائتمان'), T('Cash on delivery', 'الدفع عند الاستلام')].map(k => ({ t: k, go: 'done', set: { pm: k } })) },
      done: { log: () => [T('Order #4821 created', 'تم إنشاء الطلب #4821'), T('Payment link sent', 'تم إرسال رابط الدفع'), T('Courier booked for tomorrow', 'تم حجز المندوب لغدٍ'), T('Inventory updated', 'تم تحديث المخزون')], say: s => [mini(T('Order #4821', 'الطلب #4821'), [[T('Item', 'المنتج'), s.n], [T('Total', 'الإجمالي'), KWD(s.p + 1)], [T('Payment', 'الدفع'), s.pm], [T('Delivery', 'التوصيل'), T('Tomorrow', 'غداً')]], T('Placed', 'تم')), T('Thank you. Delivery fee is KWD 1, and you will get live tracking on WhatsApp.', 'شكراً لك. رسوم التوصيل 1 د.ك، وستصلك متابعة الشحنة على واتساب.')], choices: () => [{ t: T('Back to menu', 'القائمة الرئيسية'), go: 'home' }] },
      track: { intent: () => T('Order tracking', 'تتبع طلب'), log: () => [T('Order looked up by phone number', 'تم إيجاد الطلب برقم الهاتف')], say: () => [mini(T('Order #4790', 'الطلب #4790'), [[T('Status', 'الحالة'), T('Out for delivery', 'خرج للتوصيل')], [T('ETA', 'الوصول'), T('Today, 5–7 PM', 'اليوم 5–7 م')]], T('On the way', 'في الطريق')), T("I'll message you when the driver is 10 minutes away.", 'سأرسل لك عندما يكون المندوب على بعد 10 دقائق.')], choices: () => [{ t: T('Back to menu', 'القائمة الرئيسية'), go: 'home' }] },
      ret: { intent: () => T('Return request', 'طلب إرجاع'), log: () => [T('Return #R-118 opened', 'تم فتح طلب الإرجاع #R-118'), T('Pickup scheduled', 'تمت جدولة الاستلام'), T('Refund queued', 'تم جدولة الاسترداد')], say: () => [T("No problem. I've opened a return and booked a free pickup for tomorrow. Your refund goes out once it's collected.", 'لا مشكلة. فتحت طلب إرجاع وحجزت استلاماً مجانياً غداً، ويُرسَل المبلغ بعد الاستلام.')], choices: () => [{ t: T('Back to menu', 'القائمة الرئيسية'), go: 'home' }] },
      off: { intent: () => T('Offers', 'عروض'), log: () => [T('Promo code generated', 'تم إنشاء كود خصم')], say: () => [T('This week: 15% off all perfumes with code NOOR15, valid until Thursday.', 'هذا الأسبوع: خصم 15% على كل العطور بكود NOOR15 حتى الخميس.')], choices: () => [{ t: T('Order now', 'اطلب الآن'), go: 'cat' }, { t: T('Back to menu', 'القائمة الرئيسية'), go: 'home' }] }
    }
  }
};

let ind = 'clinic', st = {}, run = 0, kMsg = 0, kTask = 0;
const chat = $('#chat'), chips = $('#chips'), logEl = $('#log');
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const scroll = () => chat.scrollTo({ top: chat.scrollHeight, behavior: reduce ? 'auto' : 'smooth' });
function bubble(content, who) {
  const b = document.createElement('div'); b.className = 'b ' + who;
  if (content && content.mini) {
    const m = content.mini;
    b.innerHTML = `<div class="mini"><h4>${esc(m.title)}${m.badge ? `<em>${esc(m.badge)}</em>` : ''}</h4>${m.rows.map(r => `<div><span>${esc(r[0])}</span><b>${esc(r[1])}</b></div>`).join('')}</div>`;
  } else b.textContent = content;
  chat.appendChild(b); scroll(); return b;
}
function addLog(t) {
  const em = $('.empty', logEl); if (em) em.remove();
  const li = document.createElement('li'); const d = new Date();
  li.innerHTML = `<span>${esc(t)}</span><time>${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}</time>`;
  logEl.prepend(li); kTask++; $('#k2').textContent = kTask;
}
async function go(key) {
  const my = ++run; const F = FLOWS[ind]; const n = key === 'home' ? { say: () => [T('Of course. What else can I help with?', 'بالتأكيد. بماذا أقدر أساعدك أيضاً؟')], menu: 1 } : F.nodes[key];
  chips.innerHTML = '';
  if (n.intent) $('#intent').innerHTML = T('Detected intent', 'النية المكتشفة') + `<b>${esc(n.intent())}</b>`;
  for (const m of n.say(st)) {
    const ty = bubble('', 'bot typing'); ty.innerHTML = '<i></i><i></i><i></i>';
    await wait(650); if (my !== run) return; ty.remove(); bubble(m, 'bot');
    kMsg++; $('#k1').textContent = kMsg;
  }
  if (n.log) for (const l of n.log()) { await wait(220); if (my !== run) return; addLog(l); }
  const ch = n.menu ? F.menuChoices() : (n.choices ? n.choices() : []);
  chips.innerHTML = ''; ch.forEach(c => { const b = document.createElement('button'); b.className = 'chip'; b.textContent = c.t; b.onclick = () => pick(c); chips.appendChild(b); });
}
function pick(c) { bubble(c.t, 'me'); if (c.set) Object.assign(st, c.set); go(c.go); }
function startDemo() {
  run++; st = {}; chat.innerHTML = ''; chips.innerHTML = ''; $('#intent').innerHTML = '';
  logEl.innerHTML = `<li class="empty">${T('Automations will appear here as you chat.', 'ستظهر الأتمتة هنا أثناء المحادثة.')}</li>`;
  const b = BIZ[ind]; $('#bizName').textContent = lang === 'ar' ? b[1] : b[0]; $('#av').textContent = lang === 'ar' ? b[3] : b[2];
  go('menu');
}
$$('.tab').forEach(t => t.addEventListener('click', () => { $$('.tab').forEach(x => x.classList.toggle('on', x === t)); ind = t.dataset.ind; startDemo(); }));
$('#restart').addEventListener('click', startDemo);
$('#inp').addEventListener('submit', e => {
  e.preventDefault(); const v = $('#msg').value.trim(); if (!v) return; $('#msg').value = '';
  bubble(v, 'me'); const hit = FLOWS[ind].kw.find(([re]) => re.test(v));
  if (hit) {
    const k = hit[1];
    if (k === 'day' || k === 'treat') st = {};
    go(k);
  } else { run++; (async () => { const my = run; await wait(600); if (my !== run) return; bubble(T("I can help with that. Here's what I can do right now:", 'أقدر أساعدك في ذلك. هذا ما أستطيع فعله الآن:'), 'bot'); kMsg++; $('#k1').textContent = kMsg; addLog(T('Free-text message understood and routed', 'تم فهم الرسالة وتوجيهها')); go('home'); })(); }
});

/* ===== Booking dialog ===== */
const dlg = $('#book');
function resetBook() { $('#bkForm').hidden = false; $('#bkDone').hidden = true; $('#st2').classList.remove('on'); $('#bkErr').textContent = ''; }
$$('.js-book').forEach(b => b.addEventListener('click', () => { resetBook(); dlg.showModal(); document.dispatchEvent(new Event('modalopen')); setTimeout(() => $('#bkForm input').focus(), 50); }));
$('#bkClose').addEventListener('click', () => dlg.close());
dlg.addEventListener('close', () => document.dispatchEvent(new Event('modalclose')));
dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
$('#bkForm').addEventListener('submit', async e => {
  e.preventDefault();
  const f = e.target, fd = new FormData(f), err = $('#bkErr');
  const d = { name: (fd.get('name') || '').trim(), phone: (fd.get('phone') || '').trim(), email: (fd.get('email') || '').trim(), website: (fd.get('website') || '').trim(), notes: (fd.get('notes') || '').trim(), lang, source: 'one-arise-website' };
  $$('input', f).forEach(i => i.classList.remove('bad'));
  const bad = [];
  if (!d.name) bad.push('name'); if (!d.phone) bad.push('phone'); if (!/^\S+@\S+\.\S+$/.test(d.email)) bad.push('email');
  if (bad.length) { bad.forEach(n => f.elements[n].classList.add('bad')); err.textContent = T('Please add your name, phone and a valid email.', 'يرجى إدخال الاسم والهاتف وبريد إلكتروني صحيح.'); f.elements[bad[0]].focus(); return; }
  err.textContent = ''; const btn = $('#bkSub'), bt = $('.bt', btn); btn.disabled = true; btn.classList.add('loading'); bt.textContent = T('Saving…', 'جارٍ الحفظ…');
  try { await Promise.race([fetch(CONFIG.sheetEndpoint, { method: 'POST', mode: 'no-cors', keepalive: true, body: new URLSearchParams(d) }), wait(3500)]); } catch (x) {}
  let framed = false; try { framed = window.self !== window.top; } catch (x) { framed = true; }
  if (!framed) {
    bt.textContent = T('Opening calendar…', 'جارٍ فتح التقويم…');
    window.addEventListener('pageshow', ev => { if (ev.persisted) location.reload(); }, { once: true });
    window.location.href = CONFIG.calendar; return;
  }
  btn.disabled = false; btn.classList.remove('loading'); bt.textContent = tr('fSub');
  f.hidden = true; $('#bkDone').hidden = false; $('#st2').classList.add('on'); f.reset();
});

/* ===== Language ===== */
$('#langBtn').addEventListener('click', () => {
  document.dispatchEvent(new Event('langbefore'));
  lang = lang === 'ar' ? 'en' : 'ar';
  renderStatic(); startDemo();
  document.dispatchEvent(new Event('langchange'));
});

renderStatic(); startDemo(); observe();
