#version 300 es

precision mediump float;
in vec3 fsPos;
in vec3 fsNormal;
in vec2 uvCoord;
out vec4 outColor;
uniform sampler2D sampler;


uniform vec3 mDiffColor; //material diffuse color 
uniform vec3 lightPosition; // directional light direction vec
uniform vec3 lightColor; //directional light color 

void main() {

  vec3 nNormal = normalize(fsNormal);
  vec3 textureCol = texture(sampler, uvCoord).rgb;

  // COmpute spot light direction
  vec3 direction = normalize(lightPosition - fsPos);

  float dotN = clamp(dot(nNormal, direction), 0.0, 1.0);
  vec3 diffColor = mDiffColor * 0.1 + textureCol * 0.9;

  // COmpute lambrt diffuse color
  vec3 lambertColor = dotN * diffColor * lightColor;

  outColor = vec4(clamp(lambertColor, 0.0, 1.0), 1.0);
}
