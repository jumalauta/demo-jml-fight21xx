in vec2 texCoord;
out vec4 fragColor;

vec3 sample2(vec2 tc);
vec3 blur(vec2 tc, float offs);
vec3 highlights(vec3 pixel, float thres);
uniform float time;// = 1.0;
uniform float syncmultiplier;// = 1.0;
uniform sampler2D texture0;
void main()
{
	vec2 tc = texCoord.st;
	vec3 color = blur(tc, 4.99);

	 color += blur(tc, 4.98);
	 color += blur(tc, 4.96);
	 color += blur(tc, 4.95);
	 color /= 4.0;
	
	 color += sample2(tc);
//color=blur(tc,4.9);
	float div_pos = 0.0;
	float divider = smoothstep(div_pos - 0.01, div_pos + 0.01, tc.x);
	fragColor.xyz = mix(sample2(tc), color, divider) * (divider * divider + (1.0 - divider) * (1.0 - divider));
	fragColor.w = 1.0;

}

vec3 sample2(vec2 tc)
{
	return pow(texture2D(texture0, tc).xyz, vec3(2.2, 2.2, 2.2));
}

vec3 hsample(vec2 tc)
{
	return highlights(sample2(tc), 0.5);
}

vec3 blur(vec2 tc, float offs)
{
	vec4 xoffs = offs * vec4(-3.0, -2.0, 2.0, 2.0) * .3+0.01*sin(time*5.)-.005;
	vec4 yoffs = offs * vec4(-3.0, -2.0, 2.0, 2.0) * .3+0.01*cos(time*5.);
	
	vec3 color = vec3(0.0, 0.0, 0.0);
	color += hsample(tc + vec2(xoffs.x, yoffs.x)) * 0.00366;
	color += hsample(tc + vec2(xoffs.y, yoffs.x)) * 0.01465;
	color += hsample(tc + vec2(    0.0, yoffs.x)) * 0.02564;
	color += hsample(tc + vec2(xoffs.z, yoffs.x)) * 0.01465;
	color += hsample(tc + vec2(xoffs.w, yoffs.x)) * 0.00366;
	
	color += hsample(tc + vec2(xoffs.x, yoffs.y)) * 0.01465;
	color += hsample(tc + vec2(xoffs.y, yoffs.y)) * 0.05861;
	color += hsample(tc + vec2(    0.0, yoffs.y)) * 0.09524;
	color += hsample(tc + vec2(xoffs.z, yoffs.y)) * 0.05861;
	color += hsample(tc + vec2(xoffs.w, yoffs.y)) * 0.01465;
	
	color += hsample(tc + vec2(xoffs.x, 0.0)) * 0.02564;
	color += hsample(tc + vec2(xoffs.y, 0.0)) * 0.09524;
	color += hsample(tc + vec2(    0.0, 0.0)) * 0.15018;
	color += hsample(tc + vec2(xoffs.z, 0.0)) * 0.09524;
	color += hsample(tc + vec2(xoffs.w, 0.0)) * 0.02564;
	
	color += hsample(tc + vec2(xoffs.x, yoffs.z)) * 0.01465;
	color += hsample(tc + vec2(xoffs.y, yoffs.z)) * 0.05861;
	color += hsample(tc + vec2(    0.0, yoffs.z)) * 0.09524;
	color += hsample(tc + vec2(xoffs.z, yoffs.z)) * 0.05861;
	color += hsample(tc + vec2(xoffs.w, yoffs.z)) * 0.01465;
	
	color += hsample(tc + vec2(xoffs.x, yoffs.w)) * 0.00366;
	color += hsample(tc + vec2(xoffs.y, yoffs.w)) * 0.01465;
	color += hsample(tc + vec2(    0.0, yoffs.w)) * 0.02564;
	color += hsample(tc + vec2(xoffs.z, yoffs.w)) * 0.01465;
	color += hsample(tc + vec2(xoffs.w, yoffs.w)) * 0.00366;

	return color*2.0*syncmultiplier;
}

vec3 highlights(vec3 pixel, float thres)
{
	float val = (pixel.x + pixel.y + pixel.z) / 1.0;
	return pixel * smoothstep(thres - 0.5, thres + 0.5, val);
}