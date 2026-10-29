'use client';

import { type RefObject, useEffect } from 'react';

/** Pointer travel (px) after which a press counts as a drag, not a click. */
const DRAG_THRESHOLD = 4;
/** A pull of this share of a card is enough to move to the next one. */
const SNAP_SHARE = 0.35;
const FINE_POINTER = '(hover: hover) and (pointer: fine)';

const ARROW_LEFT = 'M9 6l-6 6 6 6';
const ARROW_RIGHT = 'M15 6l6 6-6 6';

function arrow(path: string): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  const shape = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  shape.setAttribute('d', path);
  svg.append(shape);
  return svg;
}

/** The round orange "← Drag →" cursor that follows the mouse over a draggable track. */
function createCursor(label: string): HTMLDivElement {
  const cursor = document.createElement('div');
  cursor.className = 'drag-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  const text = document.createElement('span');
  text.textContent = label;
  cursor.append(arrow(ARROW_LEFT), text, arrow(ARROW_RIGHT));
  document.body.append(cursor);
  return cursor;
}

/**
 * Drag to scroll with the mouse (touch screens keep their native swipe): press and pull the
 * track, a round cursor follows the pointer (hidden over links and buttons), on release the
 * track lands on the nearest card (a third of a card is enough to move on). A drag never
 * triggers a link click. Scroll-snap is given back after the landing.
 */
export function useDragScroll(track: RefObject<HTMLElement | null>, label: string): void {
  useEffect(() => {
    const element = track.current;
    if (!element || !window.matchMedia(FINE_POINTER).matches) return;
    const cursor = createCursor(label);
    element.classList.add('is-draggable');

    let down = false;
    let moved = false;
    let startX = 0;
    let startLeft = 0;
    let pointerId = 0;
    const place = (event: PointerEvent) => {
      cursor.style.transform = `translate(${event.clientX}px,${event.clientY}px)`;
    };
    const overControl = (event: PointerEvent) =>
      Boolean((event.target as Element).closest('a, button'));

    const onEnter = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      place(event);
      cursor.classList.add('is-on');
    };
    const onLeave = () => {
      if (!down) cursor.classList.remove('is-on');
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      place(event);
      cursor.classList.toggle('is-hidden', !down && overControl(event));
      if (!down) return;
      const dx = event.clientX - startX;
      if (!moved && Math.abs(dx) > DRAG_THRESHOLD) {
        moved = true;
        element.classList.add('is-dragging');
        element.setPointerCapture(pointerId);
      }
      if (moved) element.scrollLeft = startLeft - dx;
    };
    const onDown = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || event.button !== 0) return;
      down = true;
      moved = false;
      startX = event.clientX;
      startLeft = element.scrollLeft;
      pointerId = event.pointerId;
      cursor.classList.add('is-down');
    };
    const onEnd = () => {
      if (!down) return;
      down = false;
      cursor.classList.remove('is-down');
      if (!moved) return;
      // land on the nearest card, then give scroll-snap back
      const cards = Array.from(element.children) as HTMLElement[];
      const padding = parseFloat(getComputedStyle(element).scrollPaddingLeft) || 0;
      const width = cards[0]?.offsetWidth ?? 0;
      const aim =
        element.scrollLeft + (element.scrollLeft > startLeft ? SNAP_SHARE : -SNAP_SHARE) * width;
      let best = 0;
      let bestDistance = Infinity;
      for (const card of cards) {
        const distance = Math.abs(card.offsetLeft - padding - aim);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = card.offsetLeft - padding;
        }
      }
      element.classList.remove('is-dragging');
      element.scrollTo({ left: best, behavior: 'smooth' });
      window.setTimeout(() => {
        moved = false;
      }, 0);
    };
    const onClickCapture = (event: MouseEvent) => {
      if (!moved) return;
      event.preventDefault();
      event.stopPropagation();
    };
    const onDragStart = (event: Event) => event.preventDefault(); // no ghost images or links

    element.addEventListener('pointerenter', onEnter);
    element.addEventListener('pointerleave', onLeave);
    element.addEventListener('pointermove', onMove);
    element.addEventListener('pointerdown', onDown);
    element.addEventListener('pointerup', onEnd);
    element.addEventListener('pointercancel', onEnd);
    element.addEventListener('lostpointercapture', onEnd);
    element.addEventListener('click', onClickCapture, true);
    element.addEventListener('dragstart', onDragStart);
    return () => {
      element.removeEventListener('pointerenter', onEnter);
      element.removeEventListener('pointerleave', onLeave);
      element.removeEventListener('pointermove', onMove);
      element.removeEventListener('pointerdown', onDown);
      element.removeEventListener('pointerup', onEnd);
      element.removeEventListener('pointercancel', onEnd);
      element.removeEventListener('lostpointercapture', onEnd);
      element.removeEventListener('click', onClickCapture, true);
      element.removeEventListener('dragstart', onDragStart);
      element.classList.remove('is-draggable', 'is-dragging');
      cursor.remove();
    };
  }, [track, label]);
}
