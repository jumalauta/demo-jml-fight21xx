in vec2 texCoord;
out vec4 fragColor;

uniform sampler2D texture0;
uniform float contrast;// = 1.0;
uniform float brightness;// = 1.0;



void main() 
{
   	vec2 coord = texCoord.xy;
   
	vec4 colors = texture2D(texture0,coord);
	colors.rgb /= colors.a;
	  colors.rgb += brightness;
	colors.rgb = ((colors.rgb - 0.5) * max(contrast + 1.0, 0.0)) + 0.5;
	
	colors.rgb *= colors.a;





	fragColor = colors;
}