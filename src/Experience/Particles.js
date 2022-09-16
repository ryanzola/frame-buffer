import * as THREE from 'three'

import Experience from './Experience'
import FlowField from './FlowField';

import vertex from './shaders/particles/vertex.glsl'
import fragment from './shaders/particles/fragment.glsl'

export default class Canvas
{
    constructor(_options)
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.config = this.experience.config
        this.resources = this.experience.resources
        this.count = 10000
        this.coeff = 1
        this.debug = this.experience.debug

        if(this.debug) {
          this.debugFolder = this.debug.addFolder({
            title: 'Particles'
          })

          this.debugFolder.addInput(
            this, 'coeff', { min: 1, max: 10, step: 1, label: 'coefficient' }
          ).on('change', () => {
            this.reset()
          })
        }

        this.setAttributes()
        this.setFlowField()
        this.setGeometry()
        this.setMaterial()
        this.setPoints()
    }

    reset() {
      this.flowField.dispose()
      this.geometry.dispose()

      this.setAttributes()
      this.setFlowField()
      this.setGeometry()

      this.points.geometry = this.geometry
    }

    setAttributes() {
      this.positions = {}
      this.positions.data = new Float32Array(this.count * 3)

      this.sizes = {}
      this.sizes.data = new Float32Array(this.count)

      this.alpha = {}
      this.alpha.data = new Float32Array(this.count)

      for(let i = 0; i < this.count; i++) {
        // this.positions.data[i * 3 + 0] = this.coeff * (Math.random() - 0.5)
        // this.positions.data[i * 3 + 1] = this.coeff * (Math.random() - 0.5)
        // this.positions.data[i * 3 + 2] = this.coeff * (Math.random() - 0.5)

        const angle = Math.random() * Math.PI * 2
        const radius = Math.pow(Math.random(), 2) * 1
  
        this.positions.data[i * 3 + 0] = Math.sin(angle) * radius + Math.random() * 0.2
        this.positions.data[i * 3 + 1] =  Math.cos(angle) * radius + Math.random() * 0.2
        this.positions.data[i * 3 + 2] = 0

        this.sizes.data[i] = 0.2 + Math.random() * 0.8

        this.alpha.data[i] = 0.2 + Math.random() * 0.8
      }

      this.positions.attribute = new THREE.BufferAttribute(this.positions.data, 3)
      this.sizes.attribute = new THREE.BufferAttribute(this.sizes.data, 1)
      this.alpha.attribute = new THREE.BufferAttribute(this.alpha.data, 1)
      console.log(this.positions)
    }

    setFlowField() {
      this.flowField = new FlowField({ positions: this.positions.data })
    }

    setGeometry() {
      this.geometry = new THREE.BufferGeometry()
      this.geometry.setAttribute('position', this.positions.attribute)
      this.geometry.setAttribute('aSize', this.sizes.attribute)
      this.geometry.setAttribute('aAlpha', this.alpha.attribute)
    }

    setMaterial() {
      this.material = new THREE.ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        uniforms: {
          iResolution: { value: new THREE.Vector3(this.config.width, this.config.height, 1) },
          uMaskTexture: { value: this.resources.items.particleMask },
          uSize: { value: 10 * this.config.pixelRatio }
        }
      })
    }

    setPoints() {
      this.points = new THREE.Points(this.geometry, this.material)
      this.scene.add(this.points)
    }

    update() {
      if(this.flowField)
        this.flowField.update()
    }
}