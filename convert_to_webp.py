#!/usr/bin/env python3
"""
Script pour convertir les images en WebP et les redimensionner correctement
pour optimiser les performances web
"""

import os
import subprocess
from pathlib import Path
import shutil

def check_imagemagick():
    """Vérifie si ImageMagick est installé"""
    try:
        subprocess.run(['magick', '-version'], capture_output=True, check=True)
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        return False

def convert_image_to_webp(input_path, output_path, max_width=None, quality=85):
    """Convertit une image en WebP avec redimensionnement optionnel"""
    try:
        cmd = ['magick', str(input_path)]

        # Redimensionner si nécessaire
        if max_width:
            cmd.extend(['-resize', f'{max_width}x'])

        # Optimiser et convertir en WebP
        cmd.extend([
            '-quality', str(quality),
            '-define', 'webp:lossless=false',
            '-define', 'webp:method=6',
            str(output_path)
        ])

        result = subprocess.run(cmd, capture_output=True, text=True)

        if result.returncode == 0:
            return True
        else:
            print(f"Erreur lors de la conversion: {result.stderr}")
            return False

    except Exception as e:
        print(f"Erreur: {e}")
        return False

def main():
    """Fonction principale"""
    print("🔄 Conversion des images en WebP pour optimisation performance")
    print("=" * 60)

    if not check_imagemagick():
        print("❌ ImageMagick n'est pas installé.")
        print("💡 Installez-le avec: brew install imagemagick")
        return

    # Configuration des tailles optimales
    image_configs = {
        # Logo principal - garder la taille originale
        'public/assets/images/logo.png': {'quality': 90},

        # Images hero - optimiser pour les différentes tailles
        'public/assets/concert-hero-1873e159.jpg': {'max_width': 1200, 'quality': 80},
        'public/assets/images/Falling In Reverse-6 - Grande.jpeg': {'max_width': 800, 'quality': 80},

        # Images partenaires - petites tailles
        'public/assets/images/partner/FMM_Logo_Rough_White_Horizontal.png': {'max_width': 200, 'quality': 90},
        'public/assets/images/partner/Partner-CMYK.jpg': {'max_width': 150, 'quality': 85},
        'public/assets/images/partner/logo-mhl-agency.png': {'max_width': 150, 'quality': 90},
        'public/assets/images/partner/logo-vertical-algorythmes.png': {'max_width': 150, 'quality': 90},

        # Autres images
        'public/assets/images/campagne-youtube.png': {'max_width': 600, 'quality': 85},
        'public/assets/images/fans-loyalty.jpg': {'max_width': 400, 'quality': 85},
        'public/assets/images/logo-picto.png': {'max_width': 100, 'quality': 90},
    }

    success_count = 0
    total_original_size = 0
    total_webp_size = 0

    for image_path, config in image_configs.items():
        input_path = Path(image_path)

        if not input_path.exists():
            print(f"⚠️  Fichier introuvable: {image_path}")
            continue

        # Créer le nom de fichier WebP
        webp_path = input_path.with_suffix('.webp')

        # Calculer la taille originale
        original_size = input_path.stat().st_size
        total_original_size += original_size

        print(f"🔄 Conversion: {input_path.name}")
        print(f"   Taille max: {config.get('max_width', 'originale')}px")
        print(f"   Qualité: {config['quality']}%")

        # Convertir l'image
        if convert_image_to_webp(
            input_path,
            webp_path,
            config.get('max_width'),
            config['quality']
        ):
            webp_size = webp_path.stat().st_size
            total_webp_size += webp_size
            reduction = ((original_size - webp_size) / original_size) * 100

            print(f"   ✅ Converti avec succès!")
            print(f"   📦 {original_size:,} → {webp_size:,} bytes (-{reduction:.1f}%)")
            success_count += 1
        else:
            print(f"   ❌ Échec de la conversion")
            total_webp_size += original_size

        print()

    # Résumé
    print("=" * 60)
    print("📊 RÉSUMÉ DE LA CONVERSION")
    print(f"✅ Images converties: {success_count}/{len(image_configs)}")
    print(f"📦 Taille originale totale: {total_original_size:,} bytes")
    print(f"📦 Taille WebP totale: {total_webp_size:,} bytes")

    if total_original_size > 0:
        total_reduction = ((total_original_size - total_webp_size) / total_original_size) * 100
        print(f"💾 Économie totale: {total_reduction:.1f}% ({total_original_size - total_webp_size:,} bytes)")

    print("\n💡 N'oubliez pas de mettre à jour le code pour utiliser les fichiers .webp")

if __name__ == "__main__":
    main()