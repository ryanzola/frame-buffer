# Frame Buffer Object

## Intro

The frame buffer object architecture (FBO) is an extension to OpenGL for doing flexible off-screen rendering, including rendering to a texture. By capturing images that would normally be drawn to the screen, it can be used to implement a large variety of image filters, and post-processing effects. The FBO is analogous to the render targets model in DirectX. It is used in OpenGL for its efficiency and ease of use. The use of FBOs doesn't suffer from the overhead associated with OpenGL drawing context switching, and has largely superseded the pbuffer and other methods involving context switches.

## Setup

Download [Node.js](https://nodejs.org/en/download/).
Run this followed commands:

``` bash
# Install dependencies (only the first time)
npm install

# Run the local server at localhost:8080
npm run dev

# Build for production in the dist/ directory
npm run build
```
