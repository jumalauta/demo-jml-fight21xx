in vec2 texCoord;
out vec4 fragColor;

uniform sampler2D texture0;
uniform float time;// = 1.0;
//uniform float speedX;// = 1.0;
//uniform float speedY;// = 1.0;
//uniform float video;// = 0.0;

void main()
{
	vec2 uv = texCoord.xy;
    
    float y = mod(-time / 4., 1.9) - 0.4;
    float str = -pow((uv.y - y) * 10., 2.) + .8;
    uv.x -= clamp(str * .02, 0., 1.);
    fragColor = texture2D(texture, uv); 
    
    float colorAdd = pow(1. - pow(abs(uv.y - y), .3), 3.);
    fragColor.r += colorAdd * .25;
    fragColor.b += colorAdd * 0.5;
}