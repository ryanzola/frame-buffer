varying vec2 vUv;
varying float vAlpha;

uniform float uSize;

attribute float aSize;
attribute float aAlpha;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  gl_Position = projectionMatrix * viewPosition;

  gl_PointSize = uSize * aSize * 2.0;
  gl_PointSize *= (1.0 / - viewPosition.z);
  vUv = uv;
  vAlpha = aAlpha;
}
