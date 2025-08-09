const fs = require('fs');
const path = require('path');

// 确保目标目录存在
const sourceDir = path.join(process.cwd(), 'public', 'source');
if (!fs.existsSync(sourceDir)) {
  fs.mkdirSync(sourceDir, { recursive: true });
}

// 要复制的源文件映射
const sourceFiles = [
  { from: 'app/lightning-sticker/page.tsx', to: 'lightning-sticker.txt' },
  { from: 'app/OG-Sticker/page.tsx', to: 'OG-Sticker.txt' },
  { from: 'app/lawted-sticker/page.tsx', to: 'lawted-sticker.txt' }
];

// 复制源代码文件
sourceFiles.forEach(({ from, to }) => {
  try {
    const sourcePath = path.join(process.cwd(), from);
    const destPath = path.join(sourceDir, to);
    
    if (fs.existsSync(sourcePath)) {
      const content = fs.readFileSync(sourcePath, 'utf-8');
      fs.writeFileSync(destPath, content);
      console.log(`✅ Copied ${from} → public/source/${to}`);
    } else {
      console.warn(`⚠️  Source file not found: ${from}`);
    }
  } catch (error) {
    console.error(`❌ Error copying ${from}:`, error.message);
  }
});

console.log('📁 Source code files copied to public/source/');