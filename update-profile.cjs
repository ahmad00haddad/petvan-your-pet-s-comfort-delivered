const fs = require('fs');
let code = fs.readFileSync('src/routes/profile.tsx', 'utf8');

code = code.replace(/>customer</g, '>{t.customer}<');
code = code.replace(/>Pets</g, '>{t.petsCount}<');
code = code.replace(/>Orders</g, '>{t.ordersCount}<');
code = code.replace(/>Points</g, '>{t.pointsCount}<');
code = code.replace(/>\s*Your Family\s*<PawPrint/g, '> {t.yourFamily} <PawPrint');
code = code.replace(/>No pets added yet\.</g, '>{t.noPets}<');
code = code.replace(/>List for Adoption</g, '>{t.listAdoption}<');
code = code.replace(/>\s*Are you sure you want to list this pet for adoption\? Please provide a brief description to help them find a loving home\.\s*</g, '>\n              {t.listAdoptionDesc}\n            <');
code = code.replace(/>Confirm Listing</g, '>{t.confirmListing}<');
code = code.replace(/>Cancel</g, '>{t.cancel}<');
code = code.replace(/"Listing\.\.\."/g, 't.listing');
code = code.replace(/"Confirm Listing"/g, 't.confirmListing');
code = code.replace(/>\s*Add a New Pet\s*</g, '>\n              {t.addNewPet}\n            <');
code = code.replace(/>\s*Fill in the details to add your pet to your profile\.\s*</g, '>\n              {t.addNewPetDesc}\n            <');
code = code.replace(/>\s*Pet Name\s*</g, '>\n                    {t.petName}\n                  <');
code = code.replace(/>\s*Pet Type\s*</g, '>\n                      {t.petType}\n                    <');
code = code.replace(/>\s*Gender\s*</g, '>\n                      {t.gender}\n                    <');
code = code.replace(/>Male</g, '>{t.male}<');
code = code.replace(/>Female</g, '>{t.female}<');
code = code.replace(/"Adding\.\.\."/g, 't.adding');
code = code.replace(/"Add Pet"/g, 't.addNewPet');
code = code.replace(/>\s*Photo\s*<Plus/g, '> {t.photo} <Plus');
code = code.replace(/>Add Pet</g, '>{t.addPet}<'); // Fix Add Pet button at top

fs.writeFileSync('src/routes/profile.tsx', code);
console.log('profile.tsx updated');
