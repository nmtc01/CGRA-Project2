attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;
uniform float normScale;

uniform sampler2D uSampler2;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;

void main() {
	vec3 offset=vec3(0.0,0.0,0.0);

	vec4 filter=texture2D(uSampler2,aTextureCoord);

	vTextureCoord = aTextureCoord;

	offset=aVertexNormal*0.3*filter.b;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);
}