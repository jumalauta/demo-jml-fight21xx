in vec2 texCoord;
out vec4 fragColor;

/*
	this.loader.addAnimation([
	{
		 "start": 0, "duration": 300
		,"image": "distortionShaderFbo.color.fbo"
		,"layer": 5001
		,"shader":{"name":"data/shader/distortion.fs",
			"variable":[
				 {"name":"time","value":["{return getSceneTimeFromStart();}"]}
				,{"name":"timeMultiplier","value":[0.0001]}
				,{"name":"pixelSize","value":[0.05,0.05]}
				,{"name":"noiseWaveSpeed","value":[-3]}
				,{"name":"noiseWaveSize","value":[5]}
				,{"name":"noiseLuminance","value":[1]}
				,{"name":"noiseAlpha","value":[0.2]}
				,{"name":"colorComponentDistortionX","value":[0.02,0.02,0.0,0.0]}
				,{"name":"colorComponentDistortionY","value":[0.02,0.02,0.0,0.0]}
			]
		}
	}]);
*/

uniform sampler2D texture0;
uniform vec4 color;// = vec4(1.0, 1.0, 1.0, 1.0);
uniform float time;// = 1.0;
uniform float timeMultiplier;// = 0.0002;
uniform vec2 pixelSize;// = vec2(0.005,0.005);
#define canvasSize vec2(1280.,720.)
uniform float noiseWaveSpeed;// = -3;
uniform float noiseWaveSize;// = 5;
uniform float noiseLuminance;// = 1;
uniform float noiseAlpha;// = 0.2;
uniform vec4 colorComponentDistortionX;// = vec4(0.02,0.02,0.02,0.02);
uniform vec4 colorComponentDistortionY;// = vec4(0.02,0.02,0.02,0.02);

vec2 pixelate(vec2 coord)
{
	vec2 d = vec2(1.0,1.0)/(canvasSize*pixelSize);
	coord.s = floor(coord.s/d.s)*d.s;
	coord.t = floor(coord.t/d.t)*d.t;
	return coord;	
}


float rand(vec2 coord)
{
	return fract(sin(dot(coord.st,vec2(12.9898,78.233)+time*timeMultiplier)) * 43758.5453);
}

vec2 coordDistortion(vec2 coord, vec2 strength)
{
	vec2 randCoord = pixelate(coord);

	coord.s += rand(vec2(randCoord.t,0.))*strength.s-strength.s/2.;
	coord.t += rand(vec2(0.,randCoord.s))*strength.t-strength.t/2.;
	return coord;	
}

vec4 rgbaDistortion(sampler2D texture0, vec2 texCoord, vec4 colorComponentDistortionX, vec4 colorComponentDistortionY)
{

	vec2 texCoordR = coordDistortion(texCoord, vec2(.01-colorComponentDistortionX.r*sin(time*15.), colorComponentDistortionY.r));
	vec2 texCoordG = coordDistortion(texCoord, vec2(colorComponentDistortionX.g, colorComponentDistortionY.g));
	vec2 texCoordB = coordDistortion(texCoord, vec2(colorComponentDistortionX.b*sin(time*15.), colorComponentDistortionY.b));
	vec2 texCoordA = coordDistortion(texCoord, vec2(colorComponentDistortionX.a, colorComponentDistortionY.a));

	return vec4(texture2D(texture0, texCoordR).r, texture2D(texture0, texCoordG).g, texture2D(texture0, texCoordB).b, texture2D(texture0, texCoordA).a);
}

void main()
{
	float noiseWave = ((sin(noiseWaveSpeed*time+texCoord.t*noiseWaveSize)+1.)/2.);
	float n = (rand(texCoord)*(noiseAlpha*noiseWave))*noiseLuminance;
	vec4 noise = vec4(n,n,n,1.);

	vec4 uv = rgbaDistortion(texture0, texCoord, colorComponentDistortionX, colorComponentDistortionY);
	fragColor = uv * color + noise;
	
}