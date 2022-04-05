let isPageScrolling = false
let scrollingDirection = ''
let previousPageYOffset = 0

const sectionElement = document.getElementsByTagName('section')[0]
let sectionHeight = sectionElement.scrollHeight

new ResizeObserver(() => {
  sectionHeight = sectionElement.scrollHeight
}).observe(sectionElement)

function animateScroll(pageYOffset) {
  const topDisalignment = pageYOffset % sectionHeight
  if (topDisalignment < 1) return

  const offsetToAlignment =
    scrollingDirection === 'top'
      ? -topDisalignment
      : sectionHeight - topDisalignment

  window.scrollBy({
    top: offsetToAlignment,
    left: 0,
    behavior: 'smooth',
  })
}

setInterval(watchScroll, 25)

function watchScroll() {
  const currentPageYOffset = window.pageYOffset
  if (isPageScrolling && currentPageYOffset === previousPageYOffset) {
    isPageScrolling = false
    animateScroll(currentPageYOffset)
  } else if (!isPageScrolling && currentPageYOffset !== previousPageYOffset)
    isPageScrolling = true

  scrollingDirection =
    currentPageYOffset - previousPageYOffset < 0 ? 'top' : 'bottom'
  previousPageYOffset = currentPageYOffset
}
