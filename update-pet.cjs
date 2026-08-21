
const fs = require("fs");
let i18nCode = fs.readFileSync("src/lib/i18n.ts", "utf8");

const newEn = `
    petNotFound: "Pet Not Found",
    petNotFoundDesc: "This pet profile doesn't exist or has been removed.",
    goBackHome: "Go back home",
    age: "Age",
    weight: "Weight",
    healthy: "Healthy",
    status: "Status",
    medicalReports: "Medical Reports",
    vaccinations: "Vaccinations",
    noMedicalRecords: "No Medical Records",
    noMedicalRecordsDesc: "This pet hasn't had any clinic visits recorded yet.",
    noVaccinations: "No Vaccinations",
    noVaccinationsDesc: "No vaccination records found.",
    given: "Given",
    nextDue: "Next Due",
`;

const newAr = `
    petNotFound: "الحيوان غير موجود",
    petNotFoundDesc: "هذا الملف الشخصي غير موجود أو تم حذفه.",
    goBackHome: "العودة للرئيسية",
    age: "العمر",
    weight: "الوزن",
    healthy: "بصحة جيدة",
    status: "الحالة",
    medicalReports: "التقارير الطبية",
    vaccinations: "التطعيمات",
    noMedicalRecords: "لا يوجد سجلات طبية",
    noMedicalRecordsDesc: "لم يتم تسجيل أي زيارات للعيادة لهذا الحيوان الأليف بعد.",
    noVaccinations: "لا يوجد تطعيمات",
    noVaccinationsDesc: "لم يتم العثور على سجلات تطعيم.",
    given: "تاريخ التطعيم",
    nextDue: "الجرعة القادمة",
`;

i18nCode = i18nCode.replace(/(\s*cart:\s*"Cart",)/, `$1\n${newEn}`);
i18nCode = i18nCode.replace(/(\s*cart:\s*"السلة",)/, `$1\n${newAr}`);
fs.writeFileSync("src/lib/i18n.ts", i18nCode);

let petCode = fs.readFileSync("src/routes/pets/$petId.tsx", "utf8");

petCode = petCode.replace(/import \{ useAppStore \} from "..\/..\/lib\/store";/, `import { useAppStore } from "../../lib/store";\nimport { copy } from "../../lib/i18n";`);
petCode = petCode.replace(/const lang = useAppStore\(\(state\) => state\.lang\);/, `const lang = useAppStore((state) => state.lang);\n  const t = copy[lang];`);

petCode = petCode.replace(/>Pet Not Found</g, ">{t.petNotFound}<");
petCode = petCode.replace(/>\s*This pet profile doesn't exist or has been removed\.\s*</g, ">\n          {t.petNotFoundDesc}\n        <");
petCode = petCode.replace(/>\s*Go back home\s*</g, ">\n          {t.goBackHome}\n        <");
petCode = petCode.replace(/>Age</g, ">{t.age}<");
petCode = petCode.replace(/>Weight</g, ">{t.weight}<");
petCode = petCode.replace(/>Gender</g, ">{t.gender}<");
petCode = petCode.replace(/>Male</g, ">{t.male}<");
petCode = petCode.replace(/>Female</g, ">{t.female}<");
petCode = petCode.replace(/>Status</g, ">{t.status}<");
petCode = petCode.replace(/>Healthy</g, ">{t.healthy}<");
petCode = petCode.replace(/>\s*Medical Reports\s*/g, ">\n            {t.medicalReports}\n            ");
petCode = petCode.replace(/>\s*Vaccinations\s*/g, ">\n            {t.vaccinations}\n            ");
petCode = petCode.replace(/>No Medical Records</g, ">{t.noMedicalRecords}<");
petCode = petCode.replace(/>\s*This pet hasn't had any clinic visits recorded yet\.\s*</g, ">\n                    {t.noMedicalRecordsDesc}\n                  <");
petCode = petCode.replace(/>No Vaccinations</g, ">{t.noVaccinations}<");
petCode = petCode.replace(/>No vaccination records found\.</g, ">{t.noVaccinationsDesc}<");
petCode = petCode.replace(/Given:/g, "{t.given}:");
petCode = petCode.replace(/>Next Due</g, ">{t.nextDue}<");

fs.writeFileSync("src/routes/pets/$petId.tsx", petCode);
console.log("pet page updated");
