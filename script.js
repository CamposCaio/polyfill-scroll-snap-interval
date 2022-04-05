let isUserScrolling = false;
let scrollingDirection = "";
let previousScrollPosition = 0;

const firstSectionElement = document.getElementsByTagName("section")[0];
let sectionHeight = firstSectionElement.scrollHeight;

new ResizeObserver(() => {
  sectionHeight = firstSectionElement.scrollHeight;
}).observe(firstSectionElement);

function animateScroll(currentScrollPosition) {
  const topDisalignment = currentScrollPosition % sectionHeight;
  if (topDisalignment === 0) return;
  if (scrollingDirection === "top") {
    window.scrollBy({
      top: -topDisalignment,
      left: 0,
      behavior: "smooth",
    });
  } else {
    window.scrollBy({
      top: sectionHeight - topDisalignment,
      left: 0,
      behavior: "smooth",
    });
  }
}

setInterval(watchScroll, 25);

function watchScroll() {
  const currentScrollPosition = window.pageYOffset;
  if (isUserScrolling) {
    if (currentScrollPosition === previousScrollPosition) {
      isUserScrolling = false;
      animateScroll(currentScrollPosition);
    } else {
      scrollingDirection =
        currentScrollPosition - previousScrollPosition < 0 ? "top" : "bottom";
    }
  } else {
    if (currentScrollPosition !== previousScrollPosition) {
      isUserScrolling = true;
    }
  }
  previousScrollPosition = currentScrollPosition;
}
