# HEIC test fixture

`original.heic` is an original synthetic 240×160 image: a blue rounded rectangle
on white, generated for this repository. No third-party photograph or personal
metadata is included. It exercises libheif's HEVC decoder and original-file retention.

Reproduce using Python, Pillow 12.3.0 and pillow-heif 1.7.0:

```python
from PIL import Image, ImageDraw
import pillow_heif
pillow_heif.register_heif_opener()
image = Image.new("RGB", (240, 160), "white")
ImageDraw.Draw(image).rounded_rectangle((40, 20, 200, 140), radius=16, fill="#2563EB")
image.save("original.heic", format="HEIF", quality=70)
```
