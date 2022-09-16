import * as THREE from 'three'

import Experience from './Experience'
import Particles from './Particles'

export default class World
{
    constructor(_options)
    {
        this.experience = new Experience()
        this.config = this.experience.config
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        
        this.resources.on('groupEnd', (_group) =>
        {
            if(_group.name === 'base')
            {
                this.setParticles()
            }
        })
    }

    setParticles() {
        this.particles = new Particles()
    }

    resize()
    {
    }

    update()
    {
        if(this.particles)
            this.particles.update()
    }

    destroy()
    {
    }
}