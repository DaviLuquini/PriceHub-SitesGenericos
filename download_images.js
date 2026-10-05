const fs = require('fs');
const path = require('path');

const medications = [
  {
    id: 1,
    name: 'metformina.jpg',
    url: 'https://drogariasp.vteximg.com.br/arquivos/ids/456722/521434---metformina-500mg-generico-30-capsulas.jpg?v=638298015324000000'
  },
  {
    id: 2,
    name: 'losartana.jpg',
    url: 'https://drogariasp.vteximg.com.br/arquivos/ids/455858/196991---losartana-potassica-50mg-generico-ems-30-comprimidos.jpg?v=639234616079070000'
  },
  {
    id: 3,
    name: 'dipirona.jpg',
    url: 'https://drogariasp.vteximg.com.br/arquivos/ids/2210661/883646---dipirona-monoidratada-500mg-ml-generico-neo-quimica-abacaxi-20ml-gotas-1.jpg?v=639257787811000000'
  },
  {
    id: 4,
    name: 'omeprazol.jpg',
    url: 'https://drogariasp.vteximg.com.br/arquivos/ids/1295654/895318---pratiprazol-20mg-prati-donaduzzi-84-capsulas-1.jpg?v=638907969018130000'
  },
  {
    id: 5,
    name: 'hidroclorotiazida.jpg',
    url: 'https://drogariasp.vteximg.com.br/arquivos/ids/931050/VSPM-G.jpg?v=638300380232130000'
  },
  {
    id: 6,
    name: 'nimesulida.jpg',
    url: 'https://drogariasp.vteximg.com.br/arquivos/ids/443395/53350---nimesilam-100mg-ems-12-comprimidos.jpg?v=638298008531670000'
  },
  {
    id: 7,
    name: 'tadalafila.jpg',
    url: 'https://drogariasp.vteximg.com.br/arquivos/ids/1519119/906000---tadalafila-5mg-generico-prati-donaduzzi-30-comprimidos-revestidos-1.jpg?v=639004667188530000'
  },
  {
    id: 8,
    name: 'sinvastatina.jpg',
    url: 'https://drogariasp.vteximg.com.br/arquivos/ids/459625/674737---sinvastatina-20mg-generico-multilab-30-comprimidos.jpg?v=637829704146870000'
  },
  {
    id: 9,
    name: 'ibuprofeno.jpg',
    url: 'https://drogariasp.vteximg.com.br/arquivos/ids/1998448/948349---Iburofeno-600mg-Generico-Althaia-20-Capsulas-1.jpg?v=639173887003700000'
  },
  {
    id: 10,
    name: 'simeticona.jpg',
    url: 'https://drogariasp.vteximg.com.br/arquivos/ids/2105281/711594---antigases-simeticona-75mg-ml-generico-medley-gotas-15ml-1.jpg?v=639205305661170000'
  }
];

const targetDirs = [
  path.join(__dirname, 'frontend', 'site1', 'images'),
  path.join(__dirname, 'frontend', 'site2-azul', 'images'),
  path.join(__dirname, 'frontend', 'site3-vermelho', 'images')
];

async function downloadAndDistribute() {
  targetDirs.forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });

  for (const med of medications) {
    try {
      console.log(`Downloading ${med.name}...`);
      const res = await fetch(med.url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buffer = Buffer.from(await res.arrayBuffer());

      targetDirs.forEach(dir => {
        fs.writeFileSync(path.join(dir, med.name), buffer);
      });
      console.log(`Saved ${med.name} (${buffer.length} bytes) to all 3 sites!`);
    } catch (e) {
      console.error(`Error downloading ${med.name}:`, e.message);
    }
  }
}

downloadAndDistribute();
