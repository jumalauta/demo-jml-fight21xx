in vec2 texCoord;
out vec4 fragColor;


uniform sampler2D texture0;
uniform vec4 color;// = vec4(1.0, 1.0, 1.0, 1.0);
uniform vec2 direction;// = vec2(1,0);
uniform int samples;// = 20;
uniform float spread;// = 1.01;
uniform float intensity;// = 5.5;
uniform int showOnlyGlow;// = 1;
uniform float alpha;// = 2.0;

vec4 glow()
{
	vec4 sum = vec4(0.,0.,0.,0.);
	vec2 coord = texCoord.st;

	for (int i = -samples; i <= samples; i++)
	{
		vec4 texel = texture2D(texture0, coord + i * direction * spread);
		sum += texel * (1-abs(float(i))/float(samples)) * texel.a;
	}

	if (showOnlyGlow == 0)
	{
		sum += texture2D(texture0, coord);
	}

	sum *= intensity;
	sum.a = alpha;
	
	return sum * color;
}

void main()
{   
	vec4 c = glow();
	
	c.rgb = ((c.rgb - 0.5) * max(1.5, 0.0)) + 0.5;
       
	fragColor = c;
}
