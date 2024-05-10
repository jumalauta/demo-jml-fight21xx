in vec2 texCoord;
out vec4 fragColor;

uniform sampler2D texture0;
uniform float time;// = 1.0;
uniform float speedX;// = 1.0;
uniform float speedY;// = 1.0;
//uniform float video;// = 0.0;
void main()
{
	float t = time;
    
	 vec2 uv = texCoord.xy;
    uv.x += step(uv.x, 0.5) * (0.5-uv.x) * 2.0;
    uv.y += step(uv.y, 0.5) * (0.5-uv.y) * 2.0;
    
    uv.x -= t * speedX; //step(sin(t),0.2);
    uv.y -= t * speedY; //step(sin(t),0.2);

	fragColor = texture2D(texture0, uv);   
}