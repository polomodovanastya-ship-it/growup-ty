import AutoScroll from "embla-carousel-auto-scroll";

/** Плавная автопрокрутка; стрелки по-прежнему листают и задают направление. */
export function createAutoScrollPlugin() {
  return AutoScroll({
    speed: 0.9,
    startDelay: 600,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
    stopOnFocusIn: true,
  });
}
