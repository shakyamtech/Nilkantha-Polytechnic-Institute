/**
 * Nilkantha Polytechnic Institute (NPI), Dhading
 * Multi-Step Online Admission Application & Admit Slip Generator
 * Programs: Diploma in Civil Engineering (Hydropower) & Diploma in Automobile Engineering
 */

let currentStep = 1;
const totalSteps = 4;

document.addEventListener('DOMContentLoaded', () => {
  initAdmissionWizard();
});

function initAdmissionWizard() {
  const wizardForm = document.getElementById('onlineAdmissionForm');
  if (!wizardForm) return;

  // Next and Back buttons
  document.getElementById('wizardNextBtn')?.addEventListener('click', () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        goToStep(currentStep + 1);
      } else {
        submitApplication();
      }
    }
  });

  document.getElementById('wizardBackBtn')?.addEventListener('click', () => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  });

  // Reset form button
  document.getElementById('btnNewApplication')?.addEventListener('click', () => {
    resetAdmissionForm();
  });
}

function goToStep(step) {
  currentStep = step;

  // Update step indicators
  document.querySelectorAll('.wizard-step-node').forEach((node, idx) => {
    const stepNum = idx + 1;
    node.classList.remove('active', 'completed');
    if (stepNum === currentStep) {
      node.classList.add('active');
    } else if (stepNum < currentStep) {
      node.classList.add('completed');
    }
  });

  // Update step views
  document.querySelectorAll('.wizard-step-panel').forEach((panel, idx) => {
    panel.style.display = (idx + 1 === currentStep) ? 'block' : 'none';
  });

  // Update navigation buttons
  const backBtn = document.getElementById('wizardBackBtn');
  const nextBtn = document.getElementById('wizardNextBtn');

  if (backBtn) backBtn.style.display = currentStep > 1 ? 'inline-flex' : 'none';
  if (nextBtn) {
    nextBtn.innerHTML = currentStep === totalSteps 
      ? '<i class="fa-solid fa-check"></i> फाराम पेश गर्नुहोस् (Submit Application)' 
      : 'अर्को चरण (Next) <i class="fa-solid fa-arrow-right"></i>';
  }

  // If entering review step (Step 4), populate review summary
  if (currentStep === 4) {
    populateReviewStep();
  }
}

function validateStep(step) {
  if (step === 1) {
    const prog = document.getElementById('admProgram')?.value;
    const quota = document.getElementById('admQuota')?.value;
    if (!prog || !quota) {
      alert('कृपया शैक्षिक कार्यक्रम र छात्रवृत्ति/कोटा छनोट गर्नुहोस्।');
      return false;
    }
  } else if (step === 2) {
    const nameNe = document.getElementById('admFullNameNe')?.value.trim();
    const nameEn = document.getElementById('admFullNameEn')?.value.trim();
    const phone = document.getElementById('admPhone')?.value.trim();
    const district = document.getElementById('admDistrict')?.value.trim();

    if (!nameNe || !nameEn || !phone || !district) {
      alert('कृपया सबै अनिवार्य व्यक्तिगत विवरणहरू (नाम, फोन, ठेगाना) भर्नुहोस्।');
      return false;
    }
  } else if (step === 3) {
    const school = document.getElementById('admSchool')?.value.trim();
    const symbol = document.getElementById('admSymbolNo')?.value.trim();
    const gpa = document.getElementById('admGpa')?.value.trim();

    if (!school || !symbol || !gpa) {
      alert('कृपया शैक्षिक विवरण (विद्यालयको नाम, सिम्बोल नं, GPA) प्रविष्ट गर्नुहोस्।');
      return false;
    }
  }
  return true;
}

function populateReviewStep() {
  const progText = document.getElementById('admProgram')?.options[document.getElementById('admProgram').selectedIndex]?.text;
  const quotaText = document.getElementById('admQuota')?.options[document.getElementById('admQuota').selectedIndex]?.text;
  const nameEn = document.getElementById('admFullNameEn')?.value;
  const nameNe = document.getElementById('admFullNameNe')?.value;
  const phone = document.getElementById('admPhone')?.value;
  const gpa = document.getElementById('admGpa')?.value;
  const school = document.getElementById('admSchool')?.value;
  const district = document.getElementById('admDistrict')?.value;

  const reviewBox = document.getElementById('admissionReviewContent');
  if (reviewBox) {
    reviewBox.innerHTML = `
      <div style="background: var(--bg-alt); padding: 1.5rem; border-radius: var(--radius-lg); border: 1px solid var(--border);">
        <h4 style="margin-bottom: 1rem; color: var(--primary);"><i class="fa-solid fa-list-check"></i> फारामको सारांश विवरण (Application Summary)</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; font-size: 0.92rem;">
          <div><strong>इच्छित कार्यक्रम:</strong> ${progText || '-'}</div>
          <div><strong>कोटा/छात्रवृत्ति:</strong> ${quotaText || '-'}</div>
          <div><strong>उम्मेदवारको नाम (नेपाली):</strong> ${nameNe || '-'}</div>
          <div><strong>Full Name (English):</strong> ${nameEn || '-'}</div>
          <div><strong>सम्पर्क मोबाइल:</strong> ${phone || '-'}</div>
          <div><strong>स्थायी ठेगाना:</strong> ${district || '-'}</div>
          <div><strong>माध्यमिक विद्यालय:</strong> ${school || '-'}</div>
          <div><strong>प्राप्त SEE GPA:</strong> ${gpa || '-'}</div>
        </div>
        <p style="margin-top: 1.25rem; font-size: 0.84rem; color: var(--text-muted); border-top: 1px dashed var(--border); padding-top: 0.75rem;">
          <i class="fa-solid fa-circle-info"></i> पेश गर्नु अघि माथिका सबै विवरणहरू आफ्नो SEE प्रमाणपत्र अनुसार ठिक भए नभएको रुजु गर्नुहोस्।
        </p>
      </div>
    `;
  }
}

function submitApplication() {
  const prog = document.getElementById('admProgram')?.value || 'civil';
  const progText = document.getElementById('admProgram')?.options[document.getElementById('admProgram').selectedIndex]?.text || 'Diploma in Civil Engineering (Hydropower)';
  const quotaText = document.getElementById('admQuota')?.options[document.getElementById('admQuota').selectedIndex]?.text || 'Open Merit';
  const nameEn = document.getElementById('admFullNameEn')?.value.trim() || '';
  const nameNe = document.getElementById('admFullNameNe')?.value.trim() || '';
  const phone = document.getElementById('admPhone')?.value.trim() || '';
  const gpa = document.getElementById('admGpa')?.value.trim() || '3.20';
  const symbol = document.getElementById('admSymbolNo')?.value.trim() || '';
  const district = document.getElementById('admDistrict')?.value.trim() || 'Nilkantha-4, Dhading';
  const school = document.getElementById('admSchool')?.value.trim() || '';
  const father = document.getElementById('admFatherName')?.value.trim() || 'N/A';
  const gradeSci = document.getElementById('admGradeSci')?.value || 'B+';
  const dobBs = document.getElementById('admDobBs')?.value.trim() || '';
  const gender = document.getElementById('admGender')?.value || 'male';
  const examCenter = document.getElementById('admCenter')?.value || 'npi_campus';

  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const progCode = (prog === 'auto') ? 'AUTO' : 'CIVIL';
  const appId = `NPI-2083-${progCode}-${randomNum}`;
  const now = new Date();
  const appliedDate = `२०८३ आश्विन १४ (${now.toISOString().slice(0, 10)})`;

  // Construct applicant object and persist to localStorage for admin panel sync
  const newApplicant = {
    app_id: appId,
    program: progText,
    quota: quotaText,
    name_ne: nameNe || 'विद्यार्थी',
    name_en: (nameEn || 'STUDENT').toUpperCase(),
    phone: phone,
    district: district,
    school: school || 'Secondary School',
    symbol_no: symbol || '08001000A',
    gpa: gpa,
    grade_sci: gradeSci,
    father: father,
    status: 'Pending',
    date: appliedDate,
    dob_bs: dobBs,
    gender: gender,
    center: examCenter === 'npi_campus' ? 'निलकण्ठ बहुप्राविधिक शिक्षालय क्याम्पस, खानीगाउँ, धादिङ' : 'CTEVT बागमती प्रदेश कार्यालय'
  };

  try {
    const stored = localStorage.getItem('npi_admissions');
    let admissionsList = [];
    if (stored) {
      admissionsList = JSON.parse(stored);
    } else {
      // Default initial mock applicants
      admissionsList = [
        {
          app_id: "NPI-2083-CIVIL-8842",
          program: "Diploma in Civil Engineering (Hydropower)",
          quota: "नीलकण्ठ नगरपालिका वडा नं. ४ पूर्ण छात्रवृत्ति",
          name_ne: "विवेक श्रेष्ठ",
          name_en: "BIBEK SHRESTHA",
          phone: "9849123456",
          district: "निलकण्ठ-४, खानीगाउँ, धादिङ",
          school: "श्री नीलकण्ठ मा.वि., धादिङ",
          symbol_no: "0790124A",
          gpa: "3.45",
          grade_sci: "A",
          father: "रामचन्द्र श्रेष्ठ",
          status: "Verified",
          date: "२०८३ आश्विन १२"
        },
        {
          app_id: "NPI-2083-AUTO-7219",
          program: "Diploma in Automobile Engineering",
          quota: "पालिकास्तरीय पूर्ण छात्रवृत्ति (गल्छी गापा)",
          name_ne: "पूजा थापा",
          name_en: "POOJA THAPA",
          phone: "9851987654",
          district: "गल्छी गाउँपालिका, धादिङ",
          school: "श्री बागेश्वरी मा.वि., धादिङ",
          symbol_no: "0790456B",
          gpa: "3.60",
          grade_sci: "A+",
          father: "हरि बहादुर थापा",
          status: "Approved",
          date: "२०८३ आश्विन १०"
        },
        {
          app_id: "NPI-2083-CIVIL-4310",
          program: "Diploma in Civil Engineering (Hydropower)",
          quota: "CTEVT वर्गीकृत निःशुल्क छात्रवृत्ति",
          name_ne: "रोहन तामाङ",
          name_en: "ROHAN TAMANG",
          phone: "9808334455",
          district: "बेनीघाट रोराङ, धादिङ",
          school: "श्री चन्द्रोदय मा.वि., विशालटार",
          symbol_no: "0790890C",
          gpa: "3.15",
          grade_sci: "B+",
          father: "सोम बहादुर तामाङ",
          status: "Pending",
          date: "२०८३ आश्विन ०८"
        }
      ];
    }
    admissionsList.unshift(newApplicant);
    localStorage.setItem('npi_admissions', JSON.stringify(admissionsList));
  } catch (e) {
    console.warn('Local storage error in saving admission', e);
  }

  // Generate and render official Admit Slip preview
  renderAdmitSlip(newApplicant);
}

function renderAdmitSlip(app) {
  const container = document.getElementById('admitSlipPrintContainer');
  if (!container) return;

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=110x110&data=NPI-DHADING-ADMISSION:${app.app_id}:${encodeURIComponent(app.name_en)}`;

  container.innerHTML = `
    <div class="admit-slip-card" style="background:#FFFFFF; border:2px solid #0F3870; border-radius:12px; padding:2rem; margin:2rem auto; max-width:760px; box-shadow:0 12px 36px rgba(0,0,0,0.12); position:relative; color:#1E293B;">
      <!-- Watermark Crest -->
      <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.05; pointer-events: none; z-index: 0;">
        <svg viewBox="0 0 90 90" width="300" height="300" xmlns="http://www.w3.org/2000/svg">
          <circle cx="45" cy="45" r="42" fill="#0F3870"/>
        </svg>
      </div>

      <div style="position: relative; z-index: 1;">
        <!-- Slip Header -->
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #0F3870; padding-bottom: 1rem; margin-bottom: 1.25rem;">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <svg viewBox="0 0 100 95" width="55" height="55" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 5 L60 25 L85 25 L65 40 L73 65 L50 50 L27 65 L35 40 L15 25 L40 25 Z" fill="#C8102E" stroke="#0F3870" stroke-width="2"/>
              <path d="M20 70 Q50 90 80 70 Q50 82 20 70" fill="#003893"/>
              <circle cx="50" cy="40" r="18" fill="#F8FAFC" stroke="#C8102E" stroke-width="2.5"/>
            </svg>
            <div>
              <div style="font-size: 0.76rem; font-weight: 700; color: #C8102E; text-transform: uppercase;">प्राविधिक शिक्षा तथा व्यावसायिक तालिम परिषद् (CTEVT)</div>
              <div style="font-size: 1.2rem; font-weight: 800; color: #0F3870; line-height: 1.2;">नीलकण्ठ बहुप्राविधिक शिक्षालय</div>
              <div style="font-size: 0.95rem; font-weight: 700; color: #1E293B;">Nilkantha Polytechnic Institute, Dhading</div>
              <div style="font-size: 0.74rem; color: #64748B;">नीलकण्ठ-४, खानीगाउँ, धादिङ, बागमती प्रदेश • Website: npsdhading.edu.np</div>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="background: #0F3870; color: #FFFFFF; font-size: 0.75rem; font-weight: 800; padding: 4px 10px; border-radius: 4px; display: inline-block;">
              प्रवेश परीक्षा स्लिप (ADMIT SLIP)
            </div>
            <div style="font-size: 0.75rem; color: #64748B; margin-top: 5px;">शैक्षिक सत्र २०८३/०८४</div>
          </div>
        </div>

        <!-- Slip Body Grid -->
        <div style="display: grid; grid-template-columns: 1fr 140px; gap: 1.5rem; margin-bottom: 1.5rem;">
          <div>
            <table style="width: 100%; font-size: 0.88rem; line-height: 1.8; border-collapse: collapse;">
              <tr>
                <td style="width: 38%; color: #64748B; font-weight: 600;">आवेदन दर्ता नं (App ID):</td>
                <td><strong style="color: #C8102E; font-size: 1rem; font-family: monospace;">${app.app_id}</strong></td>
              </tr>
              <tr>
                <td style="color: #64748B; font-weight: 600;">इच्छित कार्यक्रम (Program):</td>
                <td><strong>${app.program}</strong></td>
              </tr>
              <tr>
                <td style="color: #64748B; font-weight: 600;">छात्रवृत्ति / कोटा (Quota):</td>
                <td><span style="background:#DCFCE7; color:#166534; padding:2px 8px; border-radius:4px; font-weight:600;">${app.quota}</span></td>
              </tr>
              <tr>
                <td style="color: #64748B; font-weight: 600;">आवेदकको नाम (Full Name):</td>
                <td><strong>${app.name_en}</strong> (${app.name_ne})</td>
              </tr>
              <tr>
                <td style="color: #64748B; font-weight: 600;">बुवाको नाम (Father's Name):</td>
                <td>${app.father}</td>
              </tr>
              <tr>
                <td style="color: #64748B; font-weight: 600;">सम्पर्क मोबाइल (Phone):</td>
                <td>${app.phone}</td>
              </tr>
              <tr>
                <td style="color: #64748B; font-weight: 600;">स्थायी ठेगाना (Address):</td>
                <td>${app.district}</td>
              </tr>
              <tr>
                <td style="color: #64748B; font-weight: 600;">SEE सिम्बोल नं / GPA:</td>
                <td>${app.symbol_no} / <strong>GPA ${app.gpa}</strong></td>
              </tr>
              <tr>
                <td style="color: #64748B; font-weight: 600;">परीक्षा केन्द्र (Exam Center):</td>
                <td><strong>${app.center || 'नीलकण्ठ बहुप्राविधिक शिक्षालय क्याम्पस, खानीगाउँ, धादिङ'}</strong></td>
              </tr>
            </table>
          </div>

          <!-- Photo & QR Code Placeholder -->
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: space-between;">
            <div style="width: 110px; height: 130px; border: 1.5px dashed #94A3B8; border-radius: 6px; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #F8FAFC; text-align: center; padding: 6px;">
              <i class="fa-solid fa-camera" style="font-size: 1.8rem; color: #94A3B8; margin-bottom: 4px;"></i>
              <span style="font-size: 0.68rem; color: #64748B;">उम्मेदवारको PP साइज फोटो टाँस्नुहोस्</span>
            </div>
            <div style="margin-top: 10px; text-align: center;">
              <img src="${qrUrl}" alt="QR Slip Verification" width="85" height="85" style="border: 1px solid #E2E8F0; border-radius: 4px;" />
              <div style="font-size: 0.65rem; color: #64748B; margin-top: 2px;">CTEVT • NPI 2083</div>
            </div>
          </div>
        </div>

        <!-- Instructions & Signatures -->
        <div style="border-top: 1px dashed #CBD5E1; padding-top: 1rem; font-size: 0.78rem; color: #475569;">
          <strong>परीक्षार्थीका लागि मुख्य निर्देशनहरू:</strong>
          <ul style="margin: 0.35rem 0 1.25rem 1.2rem; line-height: 1.5;">
            <li>प्रवेश परीक्षा दिन आउँदा यो प्रवेश पत्र र SEE को मूल लब्धांक पत्र (Marksheet) अनिवार्य रूपमा साथमा ल्याउनुपर्नेछ।</li>
            <li>परीक्षा हलमा क्यालकुलेटर बाहेक कुनै पनि मोबाइल, स्मार्ट घडी वा इलेक्ट्रोनिक उपकरण लैजान पूर्णतया निषेध छ।</li>
            <li>परीक्षा तोकिएको समयभन्दा कम्तिमा ३० मिनेट अगावै परीक्षा केन्द्रमा उपस्थित हुनुपर्नेछ।</li>
          </ul>

          <div style="display: flex; justify-content: space-between; margin-top: 2rem; padding: 0 1rem;">
            <div style="text-align: center; border-top: 1px solid #1E293B; width: 180px; padding-top: 4px;">
              <span style="font-size: 0.76rem; font-weight: 600;">आवेदकको हस्ताक्षर (Applicant)</span>
            </div>
            <div style="text-align: center; border-top: 1px solid #1E293B; width: 200px; padding-top: 4px;">
              <div style="font-size: 0.82rem; font-weight: 700; color: #0F3870;">नरेश बराल</div>
              <span style="font-size: 0.74rem; font-weight: 600; color: #64748B;">शिक्षालय प्रमुख (Campus Chief)</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Print Action Buttons -->
    <div style="text-align: center; margin: 1.5rem 0; display: flex; gap: 1rem; justify-content: center;">
      <button class="btn btn-primary" onclick="window.print()">
        <i class="fa-solid fa-print"></i> प्रवेश पत्र प्रिन्ट गर्नुहोस् (Print Admit Slip)
      </button>
      <button class="btn btn-secondary" id="btnNewApplication" onclick="resetAdmissionForm()">
        <i class="fa-solid fa-rotate-left"></i> नयाँ फाराम भर्नुहोस्
      </button>
    </div>
  `;

  // Hide wizard panels and show admit slip view
  document.querySelectorAll('.wizard-step-panel').forEach(p => p.style.display = 'none');
  const wizardNav = document.querySelector('.wizard-navigation');
  if (wizardNav) wizardNav.style.display = 'none';
  const wizardNodes = document.querySelector('.wizard-steps-header');
  if (wizardNodes) wizardNodes.style.display = 'none';

  container.scrollIntoView({ behavior: 'smooth' });
}

function resetAdmissionForm() {
  const wizardForm = document.getElementById('onlineAdmissionForm');
  if (wizardForm) wizardForm.reset();

  const container = document.getElementById('admitSlipPrintContainer');
  if (container) container.innerHTML = '';

  const wizardNav = document.querySelector('.wizard-navigation');
  if (wizardNav) wizardNav.style.display = 'flex';
  const wizardNodes = document.querySelector('.wizard-steps-header');
  if (wizardNodes) wizardNodes.style.display = 'flex';

  goToStep(1);
}
