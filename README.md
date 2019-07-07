<h1 align="center">
  :camera: Gatsby Starter Photo Book :camera:
</h1>

## :notebook: Features

- **Gallery**: thumbnails presented on **CSS Grid** with **infinite scroll**.
- Beautiful **"postcard" view** for photos.
- Both views are **responsive** with **minimal whitespace**.
- **Lightning fast**: while the user looks at a photo, the next photo is being prefetched so it can be delivered instantly. Gallery doesn't make you wait either; infinite scroll activates and loads more items _before_ you scroll all the way down.
- When the user clicks 'x' to return from postcard view to gallery, **scroll position** is set to the thumbnail of the last photo they viewed and a visual indicator is given to help the user adjust their sight to the next unseen photo. This is better than simply remembering scroll position, because a user can browse several photos in postcard view before returning to gallery (in that case we want to scroll to the last thumbnail, not the first). This feature degrades gracefully if the user navigates with the browser's back button instead of clicking 'x' (in that case, we just remember the scroll position).
- Friendly to users who have disabled JS. All important features have **non JS fallback**.  
For example, infinite scroll **gracefully degrades** into pagination.
- You can tell a story with your images, because the gallery has **row-based order** (many other photo website implementations use column-based order, e.g. masonry CSS, which looks great, but causes the order of images to feel random to users who are used to scanning photos horizontally.)

## :zap: Get started

1. Fork and `npm install`.
2. Drop your photos in `content/images`.
3. Run in dev mode with `gatsby develop`.  
...and you're all set! (Ok you probably want to edit some text, colors, favicon, etc. - but almost done!)

## :beetle: Known issues

- Automated photo cropping is used and it is what it is. You can manually crop some of the photos if you like.
- Mobile users' compact view aligns photos to the top instead of vertically middle. It looks good but would be better with vertical alignment. TODO.
- In dev mode only: fast scrolling sometimes causes "too many events" React error. Doesn't occur in production.

## 🎓 Attribution

Hi, I'm Atte and I created this because I wanted to share our wedding photos on a fast & beautiful user-friendly website. This is a fork of my other project [Gatsby Starter Infinite Scroll](https://github.com/baobabKoodaa/gatsby-starter-infinite-scroll), which is more of a general purpose starter whereas this one is specialized for sharing photosets. 

- My wife Marianne was integral in the design.
- Icons are from FontAwesome.
- I will create a demo site with photos from [Unsplash](https://unsplash.com).
