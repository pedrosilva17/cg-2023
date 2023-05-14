#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float timeFactor;

void main() {
	vec4 color = texture2D(uSampler, vTextureCoord);
	vec4 filter = texture2D(uSampler2, vTextureCoord);

	color=vec4(color.r-(filter.r*0.25), color.g-(filter.g*0.25), color.b-(filter.b*0.25), 1.0);
	
	gl_FragColor = color;
}