def Rgb2hsl(r, g, b):
    r /= 255
    g /= 255
    b /= 255
    maxcolor = max(r, g, b)
    mincolor = min(r, g, b)
    L = (maxcolor + mincolor) / 2
    if L < 0.5:
        S = (maxcolor-mincolor)/(maxcolor+mincolor)
    else:
        S = (maxcolor-mincolor)/(2 - maxcolor - mincolor)
    if r == maxcolor:
        H = (g - b) / (maxcolor - mincolor)
    elif g == maxcolor:
        H = 2 + (b - r) / (maxcolor - mincolor)
    else:
        H = 4 + (r - g) / (maxcolor - mincolor)
    H *= 60
    if H < 0:
        H += 360
    L *= 100
    S *= 100
    return H, S, L

def rgb2rgba(r, g, b, alp):
    r = (r - 255*(1-alp)) / alp
    g = (g - 255*(1-alp)) / alp
    b = (b - 255*(1-alp)) / alp
    return r, g, b