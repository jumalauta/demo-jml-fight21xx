in vec2 texCoord;
out vec4 fragColor;


uniform sampler2D texture0;
uniform sampler2D noiseTexture;

uniform float time;// = 1.0;
uniform float distortionResolutionX;// = 1280.0;
uniform float distortionResolutionY;// = 720.0;
uniform float distortionX;// = 0.01;
uniform float distortionY;// = 0.01;
uniform float noiseAlpha;// = 0.1;
uniform float shakeSizeY;// = 0.005;
uniform float glitchSize;// = 0.001;
uniform float iterations;// = 8;
uniform float speed;// = 10.0;
uniform float displacement;// = 0.05;
uniform float tightness;// = 11.0;
uniform float yoffset;// = 0.1;
uniform float yscale;// = 0.25;
uniform vec3 flametone;// = vec3(50.0, 5.0, 1.0);

float getDistortionFactor(vec2 coord)
{
	//pixelize distortion
	vec2 d = vec2(1.0,1.0)/vec2(distortionResolutionX, distortionResolutionY);
	coord.s = floor(coord.s/d.s)*d.s+time;
	coord.t = floor(coord.t/d.t)*d.t+time;
	
	return texture2D(noiseTexture,coord).r;
}

float getRandomNoise(vec2 coord)
{
	return texture2D(noiseTexture,coord).r;
}

float noise( in vec3 x ) // iq noise function
{
	vec3 p = floor(x);
    vec3 f = fract(x);
	f = f*f*(3.0-2.0*f);
	vec2 uv = (p.xy+vec2(37.0,17.0)*p.z) + f.xy;
	vec2 rg = texture2D( noiseTexture, (uv+ 0.5)/256.0, -100.0 ).yx;
	return mix( rg.x, rg.y, f.z ) * 2.0 - 1.0;
}

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(tan(time/10.),tan(time/10.)))) * tan(time));
}
float shape(in vec2 pos) // a blob shape to distort
{
	return clamp( sin(pos.x*1.1416) - pos.y+yoffset, 0.0, 1.0 );
}

vec4 distortion()
{
	vec2 coord = texCoord.st;

	float nx = -10.0;
float ny = 0.2;
for (int i=1; i<iterations+1; i++)
{
		float ii = pow(float(i), 3.0);
		float ifrac = float(i)/float(iterations);
		float t = ifrac * time * speed*0.5;
		float d = (1.0-ifrac) * displacement;
		nx += noise( vec3(coord.x*ii-time*ifrac, coord.y*yscale*ii-t, 0.0)) * d * 2.0;
		ny += noise( vec3(coord.x*ii+time*ifrac, coord.y*yscale*ii-t, time*ifrac/ii)) * d;
	}
	float flame = shape( vec2(coord.x+nx, coord.y*.5+ny) );
	vec3 col = pow(flame, tightness) * flametone;
    
    // tonemapping
    col = col / (1.0+col);
    col = pow(col, vec3(1.0/1.2));
    col = clamp(col, 0.0, 1.0);
	

/*
	 float brightness = sqrt(
        0.299* (col.r*col.r) +
        0.587* (col.g*col.g) +
        0.114* (col.b*col.b) );
		
	float target_c = .25*floor(brightness/.25);
		return vec4(target_c*col.r,target_c*col.g,target_c*col.b, );
		*/
		
return vec4(0.55*floor(sqrt(0.299*(col.r*col.r))/.25), 0.55*floor(sqrt(0.587*(col.g*col.g))/.25),0.55*floor(sqrt(0.114*(col.b*col.b))/.25), col.r);
}

void main()
{
	fragColor = distortion();
}