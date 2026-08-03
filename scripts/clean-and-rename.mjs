import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();

// 1. Rename public/Aditya sharma resume.pdf to public/Aditya_Sharma_Resume.pdf
const oldResume = path.join(rootDir, 'public', 'Aditya sharma resume.pdf');
const newResume = path.join(rootDir, 'public', 'Aditya_Sharma_Resume.pdf');

if (fs.existsSync(oldResume)) {
  fs.copyFileSync(oldResume, newResume);
  fs.unlinkSync(oldResume);
  console.log('Successfully renamed resume to Aditya_Sharma_Resume.pdf');
} else if (fs.existsSync(newResume)) {
  console.log('Aditya_Sharma_Resume.pdf already exists');
}

// 2. Remove src/components/supabaseClient.js and src/components/supabaseClient.d.ts
const oldSupaJs = path.join(rootDir, 'src', 'components', 'supabaseClient.js');
const oldSupaDts = path.join(rootDir, 'src', 'components', 'supabaseClient.d.ts');

if (fs.existsSync(oldSupaJs)) {
  fs.unlinkSync(oldSupaJs);
  console.log('Removed old supabaseClient.js');
}

if (fs.existsSync(oldSupaDts)) {
  fs.unlinkSync(oldSupaDts);
  console.log('Removed old supabaseClient.d.ts');
}
