#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float timeFactor;

void main() {
	vec4 color = texture2D(uSampler, vTextureCoord+vec2(timeFactor*.01,0.0));
	vec4 filter = texture2D(uSampler2, vec2(0.2,0.2)+vTextureCoord);

	if (filter.b > 0.5)
		color=vec4(0.9*color.r, 0.9*color.g, 0.9*color.b, 1.0);
	
	gl_FragColor = color;
}