import numpy as np,sys
from PIL import Image
for n in ['pull','push','legs','core','skill']:
    a=np.asarray(Image.open(f'wh/{n}.png').convert('RGBA')).astype(float)
    r,g,b,al=a[...,0],a[...,1],a[...,2],a[...,3]
    lum=(0.3*r+0.59*g+0.11*b)/255
    act=np.clip(((r-g)-90)/60,0,1)*(r>150)
    base=np.stack([70+90*lum,32+40*lum,26+30*lum],-1)          # dark muscle red-brown
    s=np.clip((r-140)/115,0,1)**1.4
    hot=np.stack([150+105*s,80+95*s,10+40*s],-1)           # gold / orange, shaded
    rgb=base*(1-act[...,None])+hot*act[...,None]
    out=np.dstack([rgb,al]).clip(0,255).astype(np.uint8)
    Image.fromarray(out,'RGBA').resize((340,340),Image.LANCZOS).save(f'wh/{n}.webp','WEBP',quality=80,method=6)
