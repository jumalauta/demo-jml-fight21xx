in vec2 texCoord;
out vec4 fragColor;
uniform sampler2D texture0;
uniform float time;// = 1.0;

void main() 
{
   	vec2 coord = texCoord.xy*vec2((sin(time)+1.1)*10.0,(sin(time)+1.1)*10.0)-vec2((sin(time)+1.0)*5.0,(sin(time)+1.0)*5.0);
   



	fragColor = texture2D(texture0,coord);
}