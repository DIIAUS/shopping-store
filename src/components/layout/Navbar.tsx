'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import styled from 'styled-components';

const Nav = styled.nav`
  position: relative;
  z-index: 50;
  width: 100%;
  color: var(--color-ivory, #f7f0e5);
  background: var(--color-emerald-950, #082f28);
  border-bottom: 1px solid rgb(213 185 133 / 20%);
`;

const NavInner = styled.div`
  width: min(
    calc(100% - (var(--page-padding, 24px) * 2)),
    var(--page-max-width, 1440px)
  );
  margin-inline: auto;

  @media (max-width: 768px) {
    width: calc(100% - 32px);
  }
`;

const BrandRow = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 72px;

  @media (max-width: 480px) {
    min-height: 62px;
  }
`;

const Brand = styled(Link)`
  color: var(--color-gold-300, #d5b985);
  font-family: var(--font-editorial, Georgia, serif);
  font-size: clamp(27px, 2.4vw, 36px);
  letter-spacing: 0.1em;
  line-height: 1;
  text-decoration: none;
`;

const Actions = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  gap: clamp(12px, 2vw, 22px);
`;

const ActionLink = styled(Link)`
  color: inherit;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-decoration: none;
  text-transform: uppercase;
  transition: color 180ms ease;

  &:hover,
  &:focus-visible {
    color: var(--color-gold-300, #d5b985);
  }

  @media (max-width: 560px) {
    &[data-search-link] {
      display: none;
    }
  }
`;

const CartCount = styled(motion.span)`
  display: inline-grid;
  width: 19px;
  height: 19px;
  margin-left: 5px;
  place-items: center;
  color: var(--color-emerald-950, #082f28);
  background: var(--color-gold-300, #d5b985);
  border-radius: 50%;
  font-size: 14px;
`;

const NavigationRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 42px;
  border-top: 1px solid rgb(213 185 133 / 12%);

  @media (max-width: 480px) {
    justify-content: flex-start;
    margin-inline: -16px;
    padding-inline: 16px;
    overflow-x: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const NavigationLinks = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(22px, 4vw, 56px);

  @media (max-width: 480px) {
    width: max-content;
    min-width: 100%;
    justify-content: center;
  }
`;

const NavLink = styled(Link)`
  position: relative;
  padding-block: 14px;
  color: inherit;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-decoration: none;
  text-transform: uppercase;
  white-space: nowrap;

  &::after {
    position: absolute;
    right: 0;
    bottom: 8px;
    left: 0;
    height: 1px;
    background: var(--color-gold-300, #d5b985);
    content: '';
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 250ms ease;
  }

  &:hover::after,
  &:focus-visible::after {
    transform: scaleX(1);
    transform-origin: left;
  }

  @media (max-width: 480px) {
    font-size: 10px;
    letter-spacing: 0.1em;
  }
`;

export function Navbar() {
  const cartCount = 2;

  return (
    <Nav aria-label="Main navigation">
      <NavInner>
        <BrandRow>
          <Brand href="/" aria-label="DIIAUS home">
            DIIAUS
          </Brand>

          <Actions>
            <ActionLink href="/search" data-search-link>
              Search
            </ActionLink>

            <ActionLink href="/cart">
              Cart

              {cartCount > 0 && (
                <CartCount
                  key={cartCount}
                  initial={{ scale: 0.6 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 18,
                  }}
                >
                  {cartCount}
                </CartCount>
              )}
            </ActionLink>
          </Actions>
        </BrandRow>

        <NavigationRow>
          <NavigationLinks>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/collections">Collections</NavLink>
            <NavLink href="/products">Shop</NavLink>
          </NavigationLinks>
        </NavigationRow>
      </NavInner>
    </Nav>
  );
}