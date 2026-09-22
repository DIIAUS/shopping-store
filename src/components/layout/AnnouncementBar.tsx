'use client';

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'framer-motion';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

type AnnouncementBarProps = {
  messages: string[];
  interval?: number;
};

const Bar = styled.aside`
  width: 100%;
  height: var(--announcement-height, 34px);
  overflow: hidden;
  color: var(--color-emerald-950);
  background: var(--color-gold-300);
`;

const MessageViewport = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Message = styled(motion.p)`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  margin: 0;
  padding-inline: 48px;
  overflow: hidden;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  line-height: 1;
  text-align: center;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;

  @media (max-width: 480px) {
    padding-inline: 16px;
    font-size: 10px;
    letter-spacing: 0.08em;
  }
`;

export function AnnouncementBar({
  messages,
  interval = 4500,
}: AnnouncementBarProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (messages.length <= 1 || isPaused) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => {
        return (currentIndex + 1) % messages.length;
      });
    }, interval);

    return () => {
      window.clearInterval(timer);
    };
  }, [interval, isPaused, messages.length]);

  if (messages.length === 0) {
    return null;
  }

  return (
    <Bar
      aria-label="Store announcements"
      onPointerEnter={() => setIsPaused(true)}
      onPointerLeave={() => setIsPaused(false)}
    >
      <MessageViewport aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <Message
            key={`${activeIndex}-${messages[activeIndex]}`}
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    y: 14,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    y: -14,
                  }
            }
            transition={{
              duration: prefersReducedMotion ? 0.15 : 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {messages[activeIndex]}
          </Message>
        </AnimatePresence>
      </MessageViewport>
    </Bar>
  );
}