in vec2 texCoord;
out vec4 fragColor;


uniform sampler2D texture0;
uniform float colorPercent;// = 0.0;
uniform vec4 color;// = vec4(1.0, 1.0, 1.0, 1.0);

vec4 desaturate(vec4 tex, float colorPercent)
{
	float grey = (tex.r+tex.g+tex.b)/3.*(1.-colorPercent);
	vec4 color1 = vec4(tex.r*colorPercent+grey, tex.g*colorPercent+grey, tex.b*colorPercent+grey, color.a);
	return color1;
}

void main()
{
	fragColor = desaturate(texture2D(texture0, texCoord.xy), colorPercent);
}
