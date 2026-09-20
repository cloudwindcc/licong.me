import { useCallback } from 'react';
import type { Engine } from 'tsparticles-engine';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

export default function NetworkBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);
  return (
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            opacity: 0
          },
          fpsLimit: 60,
          interactivity: {
            events: {
              onClick: { 
                enable: true, 
                mode: "push" 
              },
              onHover: { 
                enable: true, 
                mode: "repulse",
                parallax: {
                  enable: true,
                  force: 20,
                  smooth: 20
                }
              },
              resize: true
            },
            modes: {
              push: { 
                quantity: 2
              },
              repulse: { 
                distance: 100, 
                duration: 0.8,
                factor: 3,
                speed: 0.5,
                maxSpeed: 20,
                easing: "ease-out-cubic"
              }
            }
          },
          particles: {
            color: {
              value: ["#FF6B6B", "#4ECDC4", "#45B7D1"],
              animation: {
                enable: true,
                speed: 20,
                sync: false
              }
            },
            links: {
              enable: true,
              distance: 150,
              color: ["#45B7D1", "#4ECDC4"],
              opacity: 0.2,
              width: 1
            },
            move: {
              enable: true,
              direction: "none",
              outModes: {
                default: "out",
                bottom: "out",
                left: "out",
                right: "out",
                top: "out"
              },
              random: false,
              speed: 0.3,
              straight: false,
              bounce: false,
              attract: {
                enable: true,
                distance: 200,
                rotate: {
                  x: 600,
                  y: 600
                }
              }
            },
            number: {
              density: {
                enable: true,
                area: 800
              },
              value: 86
            },
            opacity: {
              value: 0.5,
              random: false,
              animation: {
                enable: false
              }
            },
            shape: {
              type: "circle"
            },
            size: {
              value: { min: 1, max: 2 },
              random: true,
              animation: {
                enable: false
              }
            }
          },
          detectRetina: true
        }}
        className="absolute inset-0 opacity-70"
      />
  );
}
