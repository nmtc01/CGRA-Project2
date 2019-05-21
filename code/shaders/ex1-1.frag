#ifdef GL_ES
precision highp float;
#endif

varying vec4 position;

void main() {
    if (position.y > 0.5)
        gl_FragColor =  vec4(1,1,0.0, 1.0);
    else
		gl_FragColor =  vec4(0.0,0.0,1, 1.0);
}