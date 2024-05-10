in vec2 texCoord;
out vec4 fragColor;

uniform sampler2D texture0;
uniform float time;// = 1.0;
uniform float speedX;// = 1.0;
uniform float speedY;// = 1.0;
//uniform float video;// = 0.0;
//uniform float colorR;// = 1.0;
//uniform float colorG;// = 1.0;

void main()
{
	float t = time;
    
	 vec2 uv = texCoord.xy;

    uv.x -= t * speedX; //step(sin(t),0.1);
    uv.y -= t * speedY; //step(sin(t),0.2);
	vec4 color = texture2D(texture0, uv);
	color=vec4(color.r*sin(4.*time), color.g*sin(8.*time),color.b,color.a);

	fragColor = color;

}