import sys,os
from PIL import Image,ImageChops
src=sys.argv[1];dst=sys.argv[2];os.makedirs(dst,exist_ok=True)
CREAM=(246,236,220)
for f in sorted(os.listdir(src)):
    if not f.endswith('.png'):continue
    im=Image.open(os.path.join(src,f)).convert('RGB')
    w,h=im.size;bg=im.getpixel((2,2))
    # background is a soft gradient: compare against a blurred estimate using the corner colour
    diff=ImageChops.difference(im,Image.new('RGB',im.size,bg)).convert('L').point(lambda v:255 if v>18 else 0)
    box=diff.getbbox() or (0,0,w,h)
    x0,y0,x1,y1=box;cx,cy=(x0+x1)/2,(y0+y1)/2;side=max(x1-x0,y1-y0)*1.12
    crop=im.crop((int(cx-side/2),int(cy-side/2),int(cx+side/2),int(cy+side/2)))
    m=diff.crop((int(cx-side/2),int(cy-side/2),int(cx+side/2),int(cy+side/2)))
    # soft mask: keep the figure, replace the backdrop with cream
    from PIL import ImageFilter
    m=m.filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.GaussianBlur(1.2))
    out=Image.composite(crop,Image.new('RGB',crop.size,CREAM),m).resize((192,192),Image.LANCZOS)
    out.save(os.path.join(dst,f[:-4]+'.webp'),'WEBP',quality=78,method=6)
