in vec2 texCoord;
out vec4 fragColor;


uniform sampler2D texture0;


uniform float time;// = 1.0;



void main()
{
	vec2 coord = texCoord.st;

    vec2 position = ( coord.xy)-vec2(0.5,0.01);

        // 256 angle steps
        float angle = atan(position.y,position.x)/(2.*3.14159265359);
        angle -= floor(angle);
        float rad = length(position);
        
        float color = 0.0;
        for (int i = 0; i < 2; i++) {
            float angleFract = fract(angle*36.);
            float angleRnd = floor(angle*360.)+1.;
            float angleRnd1 = fract(angleRnd*fract(angleRnd*.7235)*45.1);
            float angleRnd2 = fract(angleRnd*fract(angleRnd*.82657)*13.724);
            float t = time+angleRnd1*100.;
            float radDist = sqrt(angleRnd2+float(i));
            
            float adist = radDist/rad*1.5;
            float dist = (t*.2+adist);
            dist = abs(fract(dist)-.1);
            color += max(0.,.8-dist*100./adist)*(.5-abs(angleFract-.5))*5./adist/radDist;
            
            angle = fract(angle);
        }
    
    
    
    
    
    


	fragColor = vec4(color,color,color,color);
}