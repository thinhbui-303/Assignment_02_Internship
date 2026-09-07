const fs = require('fs');
const path = require('path');

const filesToProcess = [
  path.join(__dirname, 'html/product.html'),
  path.join(__dirname, 'html/category.html'),
  path.join(__dirname, 'html/cart.html')
];

for (const file of filesToProcess) {
  let content = fs.readFileSync(file, 'utf8');

  // Replace Header
  const headerStartRegex = /<!-- TOP PROMO -->/;
  const headerEndRegex = /<\/header>/;
  const headerStartMatch = content.match(headerStartRegex);
  const headerEndMatch = content.match(headerEndRegex);
  
  if (headerStartMatch && headerEndMatch) {
    const startIndex = headerStartMatch.index;
    const endIndex = headerEndMatch.index + headerEndMatch[0].length;
    content = content.substring(0, startIndex) + '<app-header></app-header>' + content.substring(endIndex);
  }

  // Replace Footer
  const footerStartRegex = /<!-- FOOTER -->/;
  const footerEndRegex = /<\/footer>/;
  const footerStartMatch = content.match(footerStartRegex);
  const footerEndMatch = content.match(footerEndRegex);
  
  if (footerStartMatch && footerEndMatch) {
    const startIndex = footerStartMatch.index;
    const endIndex = footerEndMatch.index + footerEndMatch[0].length;
    content = content.substring(0, startIndex) + '<app-footer></app-footer>' + content.substring(endIndex);
  }

  // Add component script tag before global.js
  if (!content.includes('components.js')) {
    content = content.replace(/<script src="\.\.\/js\/global\.js"><\/script>/, '<script src="../js/components.js"></script>\n  <script src="../js/global.js"></script>');
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated ${file}`);
}
