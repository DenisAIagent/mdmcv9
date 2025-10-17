#!/usr/bin/env python3
import os
import subprocess
from pathlib import Path

def convert_to_webp(input_path, output_path, quality=85):
    """Convert image to WebP format using ImageMagick"""
    try:
        # Using magick command with quality optimization
        result = subprocess.run([
            'magick', str(input_path),
            '-quality', str(quality),
            '-define', 'webp:method=6',  # Better compression
            '-define', 'webp:alpha-quality=100',
            str(output_path)
        ], capture_output=True, text=True)

        if result.returncode == 0:
            # Get file sizes
            original_size = os.path.getsize(input_path)
            new_size = os.path.getsize(output_path)
            reduction = ((original_size - new_size) / original_size) * 100

            print(f"✅ {input_path.name} → {output_path.name}")
            print(f"   {original_size/1024:.1f}KB → {new_size/1024:.1f}KB (-{reduction:.1f}%)")
            return True
        else:
            print(f"❌ Error converting {input_path}: {result.stderr}")
            return False
    except Exception as e:
        print(f"❌ Exception converting {input_path}: {e}")
        return False

def main():
    public_dir = Path("/Users/denisadam/Downloads/mdmcv9-main/public")

    # Images to convert
    images_to_convert = [
        "og-image.jpg",
        "assets/images/Stream.png",
        "assets/images/Falling In Reverse-6 - Grande.jpeg",
        "assets/images/logo-picto.png",
        "favicon.png",
        "assets/images/favicon.png",
        "assets/images/campagne-youtube.png",
        "assets/images/fans-loyalty.jpg",
        "assets/images/partner/FMM_Logo_Rough_White_Horizontal.png",
        "assets/images/partner/Partner-CMYK.jpg",
        "assets/images/partner/logo-vertical-algorythmes.png",
        "assets/images/partner/logo-mhl-agency.png"
    ]

    total_original = 0
    total_new = 0

    print("🔄 Converting remaining images to WebP...")
    print("=" * 60)

    for image_path in images_to_convert:
        full_path = public_dir / image_path
        if full_path.exists():
            # Create WebP version
            webp_path = full_path.with_suffix('.webp')

            if convert_to_webp(full_path, webp_path):
                total_original += os.path.getsize(full_path)
                total_new += os.path.getsize(webp_path)
            print()
        else:
            print(f"⚠️  File not found: {full_path}")

    print("=" * 60)
    if total_original > 0:
        total_reduction = ((total_original - total_new) / total_original) * 100
        print(f"📊 TOTAL: {total_original/1024:.1f}KB → {total_new/1024:.1f}KB (-{total_reduction:.1f}%)")
        print(f"💾 Space saved: {(total_original - total_new)/1024:.1f}KB")

if __name__ == "__main__":
    main()