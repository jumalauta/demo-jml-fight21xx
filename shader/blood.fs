in vec2 texCoord;
out vec4 fragColor;

uniform sampler2D texture0;
uniform float y; // = 1.0;
uniform float time; // = 1.0;

void main()
{
	vec2 uv = texCoord;
	float y2 = y + (sin(time*2.+uv.x*2.)*0.2 + sin(time*3.+uv.x*1.5)*0.1 + sin(time+uv.x*20.)*0.1 + sin(time+uv.x*10.)*0.2) * 0.2;

	vec4 tex0 = texture2D(texture0, uv);
	vec4 color = tex0;


	if (uv.y < 1.0-y2)
	{
		color = vec4(0,0,0,0);
	}

	fragColor = color;
}
