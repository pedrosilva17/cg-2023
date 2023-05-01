#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying float altimetryPosition;
uniform sampler2D uSampler;
uniform sampler2D uSampler3;

void main() {
    vec3 texColor = texture2D(uSampler, vTextureCoord).rgb;
    vec3 altimetryColor = texture2D(uSampler3, vec2(0.0, altimetryPosition)).rgb;
    gl_FragColor = vec4(texColor * 0.7 + altimetryColor * 0.3, 1.0);
}