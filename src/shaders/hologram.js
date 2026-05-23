export const hologramVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const hologramFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    float scan = sin((vUv.y + uTime * 0.42) * 80.0) * 0.5 + 0.5;
    float rim = smoothstep(0.56, 0.0, length(vUv - 0.5));
    float pulse = sin(uTime * 2.2 + vPosition.y * 4.0) * 0.18 + 0.82;
    float alpha = (0.16 + scan * 0.18) * rim * pulse;
    gl_FragColor = vec4(uColor, alpha);
  }
`;
