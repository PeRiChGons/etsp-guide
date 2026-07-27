import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const iconoFuente = path.resolve("assets/app-icon-master.png");
const recursos = path.resolve("android/app/src/main/res");
const densidades = {
  mdpi: 48,
  hdpi: 72,
  xhdpi: 96,
  xxhdpi: 144,
  xxxhdpi: 192,
};

for (const [densidad, tamano] of Object.entries(densidades)) {
  const carpeta = path.join(recursos, `mipmap-${densidad}`);
  await fs.mkdir(carpeta, { recursive: true });

  for (const nombre of ["ic_launcher.png", "ic_launcher_round.png", "ic_launcher_foreground.png"]) {
    await sharp(iconoFuente)
      .resize(tamano, tamano, { fit: "cover" })
      .png()
      .toFile(path.join(carpeta, nombre));
  }
}

const nombresLocalizados = {
  "values-es": "EtSwPact Guía",
  "values-de": "EtSwPact Guide",
  "values-pl": "EtSwPact Poradnik",
};

for (const [carpetaIdioma, nombre] of Object.entries(nombresLocalizados)) {
  const carpeta = path.join(recursos, carpetaIdioma);
  await fs.mkdir(carpeta, { recursive: true });
  await fs.writeFile(
    path.join(carpeta, "strings.xml"),
    `<?xml version="1.0" encoding="utf-8"?>\n<resources>\n    <string name="app_name">${nombre}</string>\n    <string name="title_activity_main">${nombre}</string>\n</resources>\n`,
    "utf8",
  );
}

console.log("Iconos Android generados desde el libro mágico de la guía.");
