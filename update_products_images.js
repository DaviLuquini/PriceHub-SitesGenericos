const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, 'frontend', 'site1', 'products.js'),
  path.join(__dirname, 'frontend', 'site2-azul', 'products.js'),
  path.join(__dirname, 'frontend', 'site3-vermelho', 'products.js')
];

const imgMap = {
  1: 'images/metformina.jpg',
  2: 'images/losartana.jpg',
  3: 'images/dipirona.jpg',
  4: 'images/omeprazol.jpg',
  5: 'images/hidroclorotiazida.jpg',
  6: 'images/nimesulida.jpg',
  7: 'images/tadalafila.jpg',
  8: 'images/sinvastatina.jpg',
  9: 'images/ibuprofeno.jpg',
  10: 'images/simeticona.jpg'
};

for (const filePath of files) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Replace unsplash images for each medication id
  // Each object has `id: X,` and later `imagem: "...",`
  const lines = content.split('\n');
  let currentId = null;
  const newLines = lines.map(line => {
    const idMatch = line.match(/id:\s*(\d+),/);
    if (idMatch) {
      currentId = parseInt(idMatch[1], 10);
    }
    if (currentId && line.includes('imagem:') && imgMap[currentId]) {
      return line.replace(/imagem:\s*"[^"]+"/, `imagem: "${imgMap[currentId]}"`);
    }
    return line;
  });

  fs.writeFileSync(filePath, newLines.join('\n'), 'utf-8');
  console.log(`Updated ${filePath}`);
}
