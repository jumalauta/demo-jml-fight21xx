in vec2 texCoord;
out vec4 fragColor;

uniform float time;// = 1.0;
uniform sampler2D texture0;

float d = (sin(time * 1.0)*0.005)+0.005; // kernel offset

float lookup(vec2 p, float dx, float dy)
{
 
   vec2 uv = (p.xy + vec2(dx * d, dy * d))/vec2(1.,1.);
	vec4 c = texture2D(texture0,uv.xy);
    
	// return as luma
    return 0.2126*c.r + 0.7152*c.g + 0.0722*c.b;
}

void main()
{

    vec2 p =  texCoord.st;
    
	// simple sobel edge detection
    float gx = 0.0;
    gx += -1.0 * lookup(p, -1.0, -1.0);
    gx += -2.0 * lookup(p, -1.0,  0.0);
    gx += -1.0 * lookup(p, -1.0,  1.0);
    gx +=  1.0 * lookup(p,  1.0, -1.0);
    gx +=  2.0 * lookup(p,  1.0,  0.0);
    gx +=  1.0 * lookup(p,  1.0,  1.0);
    
    float gy = 0.0;
    gy += -1.0 * lookup(p, -1.0, -1.0);
    gy += -2.0 * lookup(p,  0.0, -1.0);
    gy += -1.0 * lookup(p,  1.0, -1.0);
    gy +=  1.0 * lookup(p, -1.0,  1.0);
    gy +=  2.0 * lookup(p,  0.0,  1.0);
    gy +=  1.0 * lookup(p,  1.0,  1.0);
    
	// hack: use g^2 to conceal noise in the video
    float g = gx*gx + gy*gy;
    float g2 = g * (sin(time) / 2.0 + 0.5);
    
	vec4 col = texture2D(texture0,p);
    col += vec4(g*.1, g*.1, g*.1, 1.0);
    
	fragColor = col;
}