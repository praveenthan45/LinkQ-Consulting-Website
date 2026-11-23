import { useEffect, useRef, type ReactNode, type CSSProperties } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { Photo } from './Common';

export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const node = ref.current;
    if (!node || reduced || !('IntersectionObserver' in window)) return;
    if (node.getBoundingClientRect().top < window.innerHeight * 0.95) return;
    node.classList.add('reveal-pending');
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          node.classList.remove('reveal-pending');
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      node.classList.remove('reveal-pending');
    };
  }, [reduced]);
  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
      onFocusCapture={() => ref.current?.classList.remove('reveal-pending')}
    >
      {children}
    </div>
  );
}

export function DepthImage({
  name,
  alt,
  className = '',
  caption,
  eager = false,
  reverse = false,
}: {
  name: string;
  alt: string;
  className?: string;
  caption?: string;
  eager?: boolean;
  reverse?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [12, 0, -12]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [3, 0, -2]);
  const rotateY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [reverse ? 3 : -3, 0, reverse ? -2 : 2],
  );
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.03, 1.01, 1.03]);
  return (
    <div ref={ref} className={`depth-image ${className}`}>
      <figure>
        <motion.div
          className="depth-media"
          style={{
            y: reduced ? 0 : y,
            rotateX: reduced ? 0 : rotateX,
            rotateY: reduced ? 0 : rotateY,
            scale: reduced ? 1 : scale,
            transformPerspective: 1400,
          }}
        >
          <Photo name={name} alt={alt} eager={eager} />
        </motion.div>
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    </div>
  );
}

export function PerspectiveStack() {
  return (
    <div
      className="connection-gallery"
      role="group"
      aria-label="Connected perspectives across people, operations, and technology"
    >
      {[
        { image: 'manufacturing', label: 'Operations', alt: 'Automated manufacturing line' },
        { image: 'data-center', label: 'Technology', alt: 'Enterprise server infrastructure' },
        { image: 'advisory', label: 'People', alt: 'Colleagues discussing a business process' },
      ].map((item, index) => (
        <Reveal
          key={item.label}
          className={`connection-card connection-card-${index}`}
          delay={index * 80}
        >
          <DepthImage name={item.image} alt={item.alt} caption={item.label} reverse={index === 1} />
        </Reveal>
      ))}
    </div>
  );
}

export function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  // Fractional scroll positions can exceed 1 and create a horizontal scrollbar.
  const progress = useTransform(scrollYProgress, (value) => Math.min(1, Math.max(0, value)));
  if (reduced) return null;
  return (
    <motion.div className="reading-progress" aria-hidden="true" style={{ scaleX: progress }} />
  );
}
