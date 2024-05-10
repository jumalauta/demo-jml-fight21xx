in vec2 texCoord;
out vec4 fragColor;
uniform sampler2D texture0;
uniform sampler2D texture1;
uniform float time;// = 1.0;

void main()
{


	vec2 p = vec2((texCoord.s*256./128.)*0.5,(texCoord.t*256./128.)*5.0);
  
	vec2 q = p - vec2(0.45, 5.5);

	
	float len = length(q);

	float a = atan(q.y, q.x) + time * 0.3;
	float b = atan(q.y, q.x) + time * 0.3;
	float r1 = 0.3 / len + time * 0.5;
	float r2 = 0.2 / len + time * 0.5;

	float m = (1.0 + sin(time * 0.5)) / 2.0;
	vec4 tex1 = texture2D(texture0, vec2(a + 0.1 / len, r1 ));
	vec4 tex2 = texture2D(texture1, vec2(b + 0.1 / len, r2 ));
	vec3 col = vec3(mix(tex1, tex2, m));
	fragColor = vec4(col * len * 2.5, 1.0);
}