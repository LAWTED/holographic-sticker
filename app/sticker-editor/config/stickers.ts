import { StickerConfig } from '../types/editor';

export const stickerConfigs: Record<string, StickerConfig> = {
  'lightning-sticker': {
    id: 'lightning-sticker',
    name: 'Lightning Sticker',
    description: 'Lightning holographic effect with mask patterns and refraction.',
    layers: [
      {
        id: 'background-image',
        type: 'ImageLayer',
        name: 'Background Image',
        visible: true,
        props: {
          src: '/light.png',
          alt: 'Lightning',
          objectFit: 'contain'
        },
        editableProps: ['src', 'alt', 'objectFit']
      },
      {
        id: 'pattern',
        type: 'Pattern',
        name: 'Holographic Pattern',
        visible: true,
        props: {
          maskUrl: '/light.png',
          maskSize: 'contain',
          texture: 'https://assets.codepen.io/605876/figma-texture.png',
          textureSize: '6cqi',
          mixBlendMode: 'hard-light',
          opacity: 0.7,
          intensity: 2
        },
        editableProps: ['maskUrl', 'texture', 'textureSize', 'opacity', 'intensity', 'mixBlendMode']
      },
      {
        id: 'overlay-image',
        type: 'ImageLayer',
        name: 'Overlay Image',
        visible: true,
        props: {
          src: '/light.png',
          alt: '',
          opacity: 0.2,
          objectFit: 'contain'
        },
        editableProps: ['src', 'opacity', 'objectFit']
      }
    ]
  },
  'lawted-sticker': {
    id: 'lawted-sticker',
    name: 'Lawted Sticker',
    description: 'This is me, @lawted',
    layers: [
      {
        id: 'base-image',
        type: 'ImageLayer',
        name: 'Base Image',
        visible: true,
        props: {
          src: '/Smoke.jpeg',
          alt: 'Smoke Background',
          parallax: true
        },
        editableProps: ['src', 'alt', 'parallax']
      },
      {
        id: 'pattern',
        type: 'Pattern',
        name: 'Holographic Pattern',
        visible: true,
        props: {
          texture: 'https://assets.codepen.io/605876/figma-texture.png',
          textureSize: '4cqi',
          opacity: 0.4,
          mixBlendMode: 'multiply',
          intensity: 1
        },
        editableProps: ['texture', 'textureSize', 'opacity', 'intensity', 'mixBlendMode']
      },
      {
        id: 'watermark',
        type: 'Watermark',
        name: 'Watermark',
        visible: true,
        props: {
          imageUrl: '/Stanford.svg',
          opacity: 1,
          intensity: 1
        },
        editableProps: ['imageUrl', 'opacity', 'intensity']
      },
      {
        id: 'content',
        type: 'Content',
        name: 'Content Layer',
        visible: true,
        props: {
          title: 'Lawted Wu',
          subtitle: 'Research Assistant',
          copyright: 'Research © 2025',
          stanfordLogo: '/Stanford_Cardinal_logo.svg',
          signature: '/lawted.svg',
          portraitImage: '/Smoke-transparent.png'
        },
        editableProps: ['title', 'subtitle', 'copyright', 'stanfordLogo', 'signature', 'portraitImage']
      },
      {
        id: 'spotlight',
        type: 'Spotlight',
        name: 'Spotlight',
        visible: true,
        props: {
          intensity: 1
        },
        editableProps: ['intensity']
      },
      {
        id: 'glare',
        type: 'Glare',
        name: 'Glare',
        visible: true,
        props: {},
        editableProps: []
      }
    ]
  }
};