in vec2 texCoord;
out vec4 fragColor;


uniform sampler2D texture0;

uniform float time;// = 1.0;
uniform float alphaBlending;// = 1.0;
//uniform vec2 resolution;
float rand(vec2 co){
  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453*time);
}

void main()
{
	vec4 c;
	c=texture2D(texture0,texCoord.st)+rand(vec2(floor(texCoord.s*256.)/128.,floor(texCoord.t*256.)/128.));
	c=vec4(c.r,c.g,c.b,alphaBlending);
	fragColor = c;

}
