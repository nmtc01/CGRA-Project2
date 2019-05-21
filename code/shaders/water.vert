
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;

uniform sampler2D uSampler2;

varying vec2 vTextureCoord;

uniform float normScale;

void main() {
	vec3 offset=vec3(0.0,0.0,0.0);

	vec4 filter=texture2D(uSampler2,vec2(0.0,0.1)+vec2(mod(aTextureCoord.x + 0.02*timeFactor, 1.0), mod(aTextureCoord.y + 0.02*timeFactor, 1.0)));
	
	vTextureCoord = aTextureCoord;

	offset=aVertexNormal*normScale*0.02*filter.b;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);
}

