let listenForPageScroll = true
let sectionHeight = window.innerHeight
let targetY = 0
let animationFrameID = 0
let previousScrollY = 0
let scrollAnimationEnded = false

window.addEventListener('resize', () => {
  sectionHeight = window.innerHeight
})

function handleScroll(enable) {
  document.body.scroll = enable ? 'yes' : 'no'
  document.body.style.overflowY = enable ? 'visible' : 'hidden'
}

window.addEventListener('scroll', () => {
  handleScroll(false)

  if (listenForPageScroll && Math.abs(window.scrollY - previousScrollY) >= 1) {
    listenForPageScroll = false
    if (window.scrollY < previousScrollY) {
      targetY = Math.trunc(window.scrollY / sectionHeight) * sectionHeight
    } else {
      targetY = (Math.trunc(window.scrollY / sectionHeight) + 1) * sectionHeight
    }
    animateScroll()
  }
  previousScrollY = window.scrollY
})

function animateScroll() {
  animationFrameID = requestAnimationFrame(animateScroll)

  const offsetYToAlignment = targetY - window.scrollY

  if (Math.abs(offsetYToAlignment) < 5) {
    scrollAnimationEnded = true
    cancelAnimationFrame(animationFrameID)
    window.scrollTo(0, targetY)

    setTimeout(() => {
      listenForPageScroll = true
      scrollAnimationEnded = false
      handleScroll(true)
    }, 50)
  }
  if (scrollAnimationEnded) return

  if (offsetYToAlignment > 0)
    window.scrollBy(0, Math.ceil(offsetYToAlignment / 10) + 4)
  else window.scrollBy(0, Math.floor(offsetYToAlignment / 10) - 4)
}
