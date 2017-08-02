/*
  An example of statically inlining GLSL
  with glslify for source transforms, such as
  "import" statements and hex colors.
  
  The "three-hmr" boilerplate will eventually
  be removed, and instrumented automatically by
  a babel transform.
 */
import { RawShaderMaterial } from 'three'

const hmr = require('../lib/three-hmr')
const cache = hmr.cache(__filename)
const glslify = require('glslify')


// const vertexShader = glslify.file('./shaders/noise.vert')
// const fragmentShader = glslify.file('./shaders/noise.frag')
const vertexShader = glslify('./shaders/noise.vert')
const fragmentShader = glslify('./shaders/noise.frag')

module.exports = function(opt) {
    const material = new RawShaderMaterial({
        uniforms: {
            time: {
                type: 'f',
                value: opt
            }
        },
        vertexShader,
        fragmentShader
    })
    hmr.enable(cache, material)
    return material
}

if (module.hot) {
    module.hot.accept(err => {
        if (err) throw errr
    })
    hmr.update(cache, {
        vertexShader,
        fragmentShader
    })
}