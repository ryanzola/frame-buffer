uniform vec3 iResolution;
uniform sampler2D uMaskTexture;

varying float vAlpha;

void main() {
  float mask = texture2D(uMaskTexture, gl_PointCoord).r;

  gl_FragColor = vec4(vec3(1.0), mask * vAlpha);
}
