import { isNil } from 'lodash';

/** White at 25% opacity */
const DEFAULT_COLOR = 'rgb(255 255 255 / 25%)';

/** Keep track of what to style */
type RippleElements = 'rippleHost' | 'rippleContainer' | 'rippleElement';

type CssStyleDeclaration = {
  [key: string]: string;
};

const rippleStyles: Record<RippleElements, CssStyleDeclaration> = {
  rippleHost: {
    position: 'relative',
  },
  rippleContainer: {
    'position': 'absolute',
    'inset': '0',
    'overflow': 'hidden',
    'border-radius': 'inherit',
  },
  rippleElement: {
    'position': 'absolute',
    'pointer-events': 'none',
    'width': '1px',
    'height': '1px',
    'border-radius': '50%',
    'transition': 'all 200ms linear',
    'will-change': 'transform',
  },
};

const getStyles = (obj: CssStyleDeclaration): string =>
  Object.entries(obj)
    .map(([key, value]) => `${key}:${value}`)
    .join(';');

/**
 * Transforms the the CssStyleDeclarations to a single string for each element,
 * to be used in `element.style.cssText`
 */
export const generatedStyles: Record<RippleElements, string> = {
  rippleHost: getStyles(rippleStyles.rippleHost),
  rippleContainer: getStyles(rippleStyles.rippleContainer),
  rippleElement: getStyles(rippleStyles.rippleElement),
};

export type RippleOptions = Partial<{
  color: string;
  centered: boolean;
}>;

const calculateDiameter = (width: number, height: number, posX: number, posY: number): number => {
  const hypot = Math.hypot(width, height);
  return width > height
    ? (Math.max(width - posX, posX) + (hypot - width)) * 2
    : (Math.max(height - posY, posY) + (hypot - height)) * 2;
};

const listenTimes = (
  times: number,
  element: HTMLElement,
  eventNames: string | Array<string>,
  func: EventListener,
): void => {
  const eventList = Array.isArray(eventNames) ? eventNames : [eventNames];
  // eslint-disable-next-line functional/no-let
  let timesToExecute = times;
  const execute = (event: Event): void => {
    timesToExecute -= 1;
    if (timesToExecute === 0) {
      eventList.forEach(name => element.removeEventListener(name, execute));
    }
    func(event);
  };
  eventList.forEach(name => element.addEventListener(name, execute));
};

const listenOnce = (element: HTMLElement, eventNames: string | Array<string>, func: EventListener): void => {
  listenTimes(1, element, eventNames, func);
};

export const createRipple = (
  container: HTMLDivElement,
  position: { offsetX: number; offsetY: number },
  options: RippleOptions = {},
): HTMLDivElement => {
  const { centered, color } = options;

  const { width, height } = container.getBoundingClientRect();
  const finalPosX = centered === true ? width / 2 : position.offsetX;
  const finalPosY = centered === true ? height / 2 : position.offsetY;

  const diameter = calculateDiameter(width, height, finalPosX, finalPosY);

  const ripple = document.createElement('div');
  ripple.style.cssText += generatedStyles.rippleElement;
  ripple.style.backgroundColor = color ?? DEFAULT_COLOR;
  ripple.style.left = `${finalPosX}px`;
  ripple.style.top = `${finalPosY}px`;

  const { parentElement } = container;
  if (isNil(parentElement)) {
    // eslint-disable-next-line functional/no-throw-statements
    throw new Error('parentElement is not an element');
  }

  listenOnce(parentElement, ['pointerup', 'pointerout'], () => {
    ripple.style.opacity = '0';
  });

  // eslint-disable-next-line functional/no-let
  let count = 0;
  listenTimes(2, ripple, 'transitionend', () => {
    count += 1;
    if (count === 2) {
      ripple.remove();
    }
  });

  container.appendChild(ripple);
  requestAnimationFrame(() => (ripple.style.transform = `scale(${diameter})`));
  return ripple;
};
