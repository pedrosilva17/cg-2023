
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
varying float altimetryPosition;
uniform sampler2D uSampler2;

void main() {
	vec3 offset=vec3(0.0,0.0,0.0);

    vTextureCoord = aTextureCoord;
    vec4 tex = texture2D(uSampler2, vTextureCoord);
    offset = aVertexNormal * tex.b * 0.28;

    altimetryPosition = 1.0 - (aVertexPosition + offset).z * 3.6;
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);
}